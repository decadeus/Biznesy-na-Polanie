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


-- 5) Contenus publics (annonces, commerces, événements, signalements, services)
-- Ces tables sont utilisées pour remplacer les données en mémoire de server.js.

-- 5.0 Durées d'affichage possibles pour les posts
create table if not exists public.post_durations (
  id          bigint generated always as identity primary key,
  label       text not null,
  days        integer not null,
  is_default  boolean default false
);

-- 5.0bis Informations de résidence
create table if not exists public.residence (
  id              bigint generated always as identity primary key,
  name            text not null,
  address         text,
  description     text,
  practical_info  jsonb,
  image_url       text,
  status          text default 'active',
  created_at      timestamptz default now(),
  last_updated_by text,
  last_updated_at timestamptz default now()
);

alter table public.residence enable row level security;

drop policy if exists "residence_select" on public.residence;
drop policy if exists "residence_insert_admin" on public.residence;
drop policy if exists "residence_update_admin" on public.residence;
drop policy if exists "residence_delete_admin" on public.residence;

create policy "residence_select"
on public.residence
for select
using (
  status = 'active'
  or exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('admin', 'super_admin')
  )
);

create policy "residence_insert_admin"
on public.residence
for insert
with check (
  exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('admin', 'super_admin')
  )
);

create policy "residence_update_admin"
on public.residence
for update
using (
  exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('admin', 'super_admin')
  )
)
with check (
  exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('admin', 'super_admin')
  )
);

create policy "residence_delete_admin"
on public.residence
for delete
using (
  exists (
    select 1 from public.residents r
    where r.id = auth.uid()
      and r.role in ('admin', 'super_admin')
  )
);

-- 5.1 Petites annonces (immobilier + objets entre voisins)
create table if not exists public.classifieds (
  id          bigint generated always as identity primary key,
  resident_id uuid references public.residents(id),
  type        text not null,             -- 'immobilier' | 'objet' ...
  title       text not null,
  description text not null,
  price       numeric,
  currency    text default 'PLN',
  status      text default 'active',
  created_at  timestamptz default now(),
  modified_at timestamptz,
  duration_days integer default 7,
  image_url   text
);

-- 5.2 Commerçants de la résidence
create table if not exists public.shops (
  id          bigint generated always as identity primary key,
  name        text not null,
  type        text not null,
  description text not null,
  url         text,
  image_url   text
);

-- 5.3 Événements de la résidence
create table if not exists public.events (
  id          bigint generated always as identity primary key,
  resident_id uuid references public.residents(id),
  title       text not null,
  date        date not null,
  time        text,             -- éventuellement à passer en type TIME
  location    text,
  description text,
  image_url   text,
  created_at  timestamptz default now(),
  modified_at timestamptz,
  duration_days integer default 7
);

-- 5.4 Signalements
create table if not exists public.reports (
  id          bigint generated always as identity primary key,
  resident_id uuid references public.residents(id),
  category    text not null,
  title       text not null,
  description text not null,
  status      text not null,
  created_at  timestamptz default now(),
  image_url   text,
  modified_at timestamptz,
  duration_days integer default 7
);

-- 5.5 Petits services entre voisins
create table if not exists public.neighbor_services (
  id          bigint generated always as identity primary key,
  resident_id uuid references public.residents(id),
  kind        text not null,    -- 'offre' | 'demande'
  title       text not null,
  description text not null,
  created_at  timestamptz default now(),
  image_url   text,
  modified_at timestamptz,
  duration_days integer default 7
);

-- 5.6 Sondages
create table if not exists public.polls (
  id          bigint generated always as identity primary key,
  resident_id uuid references public.residents(id),
  title       text not null,
  description text,
  options     jsonb not null,
  end_date    date,
  created_at  timestamptz default now(),
  modified_at timestamptz,
  duration_days integer default 7
);

-- 5.6 Feedback / contact (bugs, design, idées de fonctionnalités)
create table if not exists public.feedback (
  id          bigint generated always as identity primary key,
  resident_id uuid references public.residents(id),
  author_name text,
  author_avatar_url text,
  theme       text not null,    -- 'bug' | 'design' | 'feature' | 'other'
  message     text not null,
  created_at  timestamptz default now()
);

alter table public.feedback
  add column if not exists parent_id bigint;

-- S'assurer que la contrainte de clé étrangère utilise ON DELETE CASCADE
alter table public.feedback
  drop constraint if exists feedback_parent_id_fkey;

alter table public.feedback
  add constraint feedback_parent_id_fkey
  foreign key (parent_id) references public.feedback(id) on delete cascade;

alter table public.feedback enable row level security;

drop policy if exists "feedback_select_all" on public.feedback;
create policy "feedback_select_all"
on public.feedback
for select
using (true);

drop policy if exists "feedback_insert_all" on public.feedback;
create policy "feedback_insert_all"
on public.feedback
for insert
with check (true);

drop policy if exists "feedback_delete_all" on public.feedback;
create policy "feedback_delete_all"
on public.feedback
for delete
using (true);

-- 5.6bis Votes sur les feedback (like / dislike)
create table if not exists public.feedback_votes (
  id           bigint generated always as identity primary key,
  feedback_id  bigint not null references public.feedback(id) on delete cascade,
  resident_key text not null,
  value        smallint not null check (value in (-1, 1)),
  created_at   timestamptz default now()
);

create unique index if not exists feedback_votes_unique
on public.feedback_votes(feedback_id, resident_key);

alter table public.feedback_votes enable row level security;

-- Politique très ouverte pour la démo : tout le monde peut lire / écrire / supprimer
drop policy if exists "feedback_votes_all" on public.feedback_votes;
create policy "feedback_votes_all"
on public.feedback_votes
for all
using (true)
with check (true);

