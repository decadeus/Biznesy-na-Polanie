-- Schéma Supabase pour l'app résidence (résidents + rôles + validation)

-- 1) Types ENUM pour les statuts et rôles
create type public.resident_status as enum ('pending', 'active', 'blocked');
create type public.resident_role as enum ('resident', 'moderator', 'admin');

-- 2) Table principale des résidents
create table public.residents (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,                           -- nom affiché dans l’app
  avatar_url text,                             -- avatar Facebook ou personnalisé
  facebook_profile_url text,                   -- lien cliquable FB
  status resident_status not null default 'pending',
  role resident_role not null default 'resident',
  group_name text,                             -- nom du groupe FB fourni
  created_at timestamptz not null default now(),
  last_login_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id),  -- modo/admin qui a validé
  blocked_at timestamptz,
  blocked_by uuid references auth.users(id)    -- modo/admin qui a bloqué
);

comment on table public.residents is 'Infos des résidents liées à auth.users (statut, rôle, profil FB).';

-- 3) RLS : activer la sécurité au niveau des lignes
alter table public.residents enable row level security;

-- 3a) Politique : chaque utilisateur voit / modifie sa propre fiche
create policy "residents_self_select"
on public.residents
for select
using (auth.uid() = id);

create policy "residents_self_update"
on public.residents
for update
using (auth.uid() = id);

-- 3b) Politique : les modérateurs/admins peuvent tout voir et tout mettre à jour
-- On s’appuie sur la colonne role = 'moderator' ou 'admin'
create policy "residents_staff_select"
on public.residents
for select
using (
  exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('moderator', 'admin')
  )
);

create policy "residents_staff_update"
on public.residents
for update
using (
  exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('moderator', 'admin')
  )
);

-- 4) Vue pratique pour les comptes en attente (pour l’écran d’admin)
create view public.pending_residents as
select
  id,
  display_name,
  avatar_url,
  facebook_profile_url,
  group_name,
  created_at
from public.residents
where status = 'pending';

