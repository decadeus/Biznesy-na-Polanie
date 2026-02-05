require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const vm = require("vm");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3001;

// Nom attendu du groupe Facebook pour filtrer les demandes abusives
const GROUP_NAME = process.env.GROUP_NAME || "Biznesy na Polanie";
// Profil Facebook auto-validé (compte du développeur / admin local)
const DEV_AUTO_APPROVE_PROFILE_URL =
  process.env.DEV_AUTO_APPROVE_PROFILE_URL ||
  "https://www.facebook.com/johann.kepker.1/";

// Configuration Supabase (utilisée côté backend pour vérifier les sessions Supabase)
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://inekvpbycchoflnotgcr.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let supabaseAdmin = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}

// Middleware pour parser le JSON des requêtes POST
app.use(express.json());

// Servez les fichiers statiques (index.html, etc.) depuis ce dossier
app.use(express.static(__dirname));

// --- Sessions simples en mémoire (prototype) ---

// sessions[token] = { userId, createdAt, lastSeenAt }
let sessions = {};

// Utilisateurs "app" (auth locale + code + URL profil Facebook)
// { id, supabaseUserId, name, avatarUrl, facebookProfileUrl, status, createdAt, lastLoginAt, role }
let users = [];
let nextUserId = 1;

// Pas de données de démonstration par défaut : on liste uniquement
// les vraies demandes envoyées via le formulaire d'onboarding.

async function syncLocalResident(user, overrides = {}) {
  if (!supabaseAdmin || !user) return;
  try {
    const payload = {
      id: Number(user.id),
      display_name: user.name || "Résident",
      avatar_url: user.avatarUrl || null,
      facebook_profile_url: user.facebookProfileUrl || null,
      status: user.status || "pending",
      role: user.role || "resident",
      created_at: user.createdAt || new Date().toISOString(),
      last_login_at: user.lastLoginAt || null,
      ...overrides
    };
    await supabaseAdmin.from("local_residents").upsert(payload, {
      onConflict: "id"
    });
  } catch (err) {
    console.error("Sync local_residents error:", err.message || err);
  }
}

function parseCookies(req) {
  const header = req.headers.cookie;
  const cookies = {};
  if (!header) return cookies;
  header.split(";").forEach((part) => {
    const [rawKey, rawVal] = part.split("=");
    if (!rawKey) return;
    const key = rawKey.trim();
    const val = (rawVal || "").trim();
    cookies[key] = decodeURIComponent(val);
  });
  return cookies;
}

function normalizeFacebookUrl(url) {
  return String(url || "")
    .trim()
    .replace(/\/+$/, "");
}

function buildFacebookProfileUrl(supaUser) {
  if (!supaUser) return null;
  const metadata = supaUser.user_metadata || {};
  const identities = Array.isArray(supaUser.identities)
    ? supaUser.identities
    : [];
  const fbIdentity = identities.find(
    (identity) => identity && identity.provider === "facebook"
  );
  const identityData =
    fbIdentity && fbIdentity.identity_data ? fbIdentity.identity_data : {};

  const directUrl =
    metadata.facebook_profile_url ||
    metadata.profile_url ||
    identityData.profile_url ||
    identityData.profileUrl ||
    null;
  if (directUrl) {
    return normalizeFacebookUrl(directUrl);
  }

  const fbId =
    identityData.user_id ||
    identityData.id ||
    identityData.sub ||
    identityData.fb_id ||
    identityData.provider_id ||
    null;
  if (fbId && /^[0-9]+$/.test(String(fbId))) {
    return normalizeFacebookUrl(
      "https://www.facebook.com/profile.php?id=" + String(fbId)
    );
  }

  const username =
    metadata.user_name ||
    metadata.username ||
    identityData.user_name ||
    identityData.username ||
    null;
  if (username && /^[A-Za-z0-9._-]+$/.test(String(username))) {
    return normalizeFacebookUrl(
      "https://www.facebook.com/" + String(username)
    );
  }

  return null;
}

function createSession(res, userId) {
  const token = crypto.randomBytes(24).toString("hex");
  const now = new Date().toISOString();
  sessions[token] = {
    userId,
    createdAt: now,
    lastSeenAt: now
  };
  // Prototype : cookie simple, non signé
  res.cookie("sessionToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // pour du local seulement – à adapter en prod
    path: "/"
  });
}

function getSession(req) {
  const cookies = parseCookies(req);
  const token = cookies.sessionToken;
  if (!token || !sessions[token]) return null;
  const sess = sessions[token];
  const user = users.find((u) => u.id === sess.userId);
  if (!user) {
    delete sessions[token];
    return null;
  }
  sess.lastSeenAt = new Date().toISOString();
  return { token, user };
}

function destroySession(req, res) {
  const cookies = parseCookies(req);
  const token = cookies.sessionToken;
  if (token && sessions[token]) {
    delete sessions[token];
  }
  res.clearCookie("sessionToken", { path: "/" });
  res.cookie("sessionToken", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: new Date(0),
    maxAge: 0,
    path: "/"
  });
}

function toPublicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    facebookProfileUrl: user.facebookProfileUrl || null,
    status: user.status,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt
  };
}

function requireAuth(req, res, next) {
  const session = getSession(req);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Non authentifié." });
  }
  req.currentUser = session.user;
  req.sessionToken = session.token;
  next();
}

function requireModerator(req, res, next) {
  const session = getSession(req);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Non authentifié." });
  }
  if (!["moderator", "admin"].includes(session.user.role)) {
    return res
      .status(403)
      .json({ error: "Accès réservé aux modérateurs / administrateurs." });
  }
  req.currentUser = session.user;
  req.sessionToken = session.token;
  next();
}

// Les posts (annonces, événements, services, etc.) sont gérés via Supabase

// --- Stockage local en mémoire (prototype) ---

// Avatars de secours pour les résidents
const avatarPool = [
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
];

// --- Authentification locale / Onboarding ---

// Route utilitaire : état de session courante
app.get("/api/me", (req, res) => {
  const session = getSession(req);
  if (!session || !session.user) {
    return res.json({ authenticated: false, user: null });
  }
  res.json({
    authenticated: true,
    user: toPublicUser(session.user)
  });
});

// Déconnexion simple (pour le futur si besoin)
app.post("/auth/logout", (req, res) => {
  destroySession(req, res);
  res.json({ ok: true });
});

// Onboarding / inscription (nom + code d'accès + lien profil FB + nom du groupe)
app.post("/api/onboarding/complete", (req, res) => {
  const session = getSession(req);
  const { name, facebookProfileUrl, groupName } = req.body || {};

  // Pour l'instant, on ne rend obligatoires que l'URL de profil et le nom du groupe
  if (!facebookProfileUrl || !groupName) {
    return res.status(400).json({
      error:
        "facebookProfileUrl et groupName sont requis pour finaliser l'onboarding."
    });
  }
  // name est optionnel pour le moment (simplification du flux)

  const normalizedGroupName = String(groupName).trim().toLowerCase();
  const normalizedExpected = String(GROUP_NAME).trim().toLowerCase();
  if (!normalizedGroupName || normalizedGroupName !== normalizedExpected) {
    return res
      .status(400)
      .json({ error: "Nom du groupe Facebook incorrect." });
  }

  // Cas 1 : pas encore de session -> création d'un utilisateur en attente
  if (!session || !session.user) {
    const trimmedName = String(name || "").trim();
    const now = new Date().toISOString();
    const isFirst = users.length === 0;
    const safeFacebookUrl = normalizeFacebookUrl(facebookProfileUrl).slice(0, 400);
    const autoApprove =
      safeFacebookUrl &&
      safeFacebookUrl.startsWith(DEV_AUTO_APPROVE_PROFILE_URL);

    const newUser = {
      id: nextUserId++,
      facebookId: null,
      name: trimmedName ? trimmedName.slice(0, 160) : "Résident de Mały Kack",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
      facebookProfileUrl: safeFacebookUrl,
      status: autoApprove ? "active" : "pending",
      role: autoApprove || isFirst ? "admin" : "resident",
      createdAt: now,
      lastLoginAt: null
    };
    users.push(newUser);
    syncLocalResident(newUser, {
      group_name: groupName.trim()
    });
    createSession(res, newUser.id);
    return res.json({
      ok: true,
      message: "Votre demande a été envoyée, un modérateur doit la valider.",
      user: toPublicUser(newUser)
    });
  }

  // Cas 2 : utilisateur déjà en session et en attente -> mise à jour du profil FB
  const user = session.user;
  if (user.status !== "pending") {
    return res
      .status(400)
      .json({ error: "Ce compte n'est pas en attente d'onboarding." });
  }

  const safeFacebookUrl = normalizeFacebookUrl(facebookProfileUrl).slice(0, 400);
  user.facebookProfileUrl = safeFacebookUrl;

  const autoApprove =
    safeFacebookUrl &&
    safeFacebookUrl.startsWith(DEV_AUTO_APPROVE_PROFILE_URL);
  if (autoApprove) {
    user.status = "active";
    user.role = "admin";
  }
  if (name && typeof name === "string" && name.trim()) {
    user.name = name.trim().slice(0, 160);
  }

  syncLocalResident(user, {
    group_name: groupName.trim(),
    approved_at: autoApprove ? new Date().toISOString() : null
  });

  return res.json({
    ok: true,
    message: autoApprove
      ? "Votre compte a été validé automatiquement (admin développeur)."
      : "Votre demande a été envoyée, un modérateur doit la valider.",
    user: toPublicUser(user)
  });
});

// Connexion via Supabase OAuth (Facebook) :
// Le frontend envoie un accessToken Supabase, on vérifie l'utilisateur
// puis on crée / met à jour un utilisateur local + une session.
app.post("/api/auth/supabase-login", async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({
        error:
          "Supabase n'est pas configuré côté serveur (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants)."
      });
    }

    const { accessToken } = req.body || {};
    if (!accessToken || typeof accessToken !== "string") {
      return res
        .status(400)
        .json({ error: "accessToken Supabase manquant dans la requête." });
    }

    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
    if (error || !data || !data.user) {
      console.error("Supabase getUser error:", error && error.message);
      return res
        .status(401)
        .json({ error: "Session Supabase invalide ou expirée." });
    }

    const supaUser = data.user;
    const supaId = supaUser.id;
    const metadata = supaUser.user_metadata || {};
    const computedFacebookUrl = buildFacebookProfileUrl(supaUser);

    const displayName =
      metadata.full_name ||
      metadata.name ||
      metadata.user_name ||
      "Résident Facebook";
    const avatarUrl =
      metadata.avatar_url ||
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200";

    // Récupération du résident dans Supabase (table public.residents)
    const { data: residentRow, error: residentError } = await supabaseAdmin
      .from("residents")
      .select("*")
      .eq("id", supaId)
      .maybeSingle();

    const now = new Date().toISOString();
    let resident = residentRow;

    if (!resident) {
      // Créer un résident actif par défaut (mode ouverture temporaire)
      const insertResult = await supabaseAdmin
        .from("residents")
        .insert({
          id: supaId,
          display_name: displayName,
          avatar_url: avatarUrl,
          facebook_profile_url: computedFacebookUrl || null,
          status: "active",
          role: "resident",
          created_at: now,
          last_login_at: now
        })
        .select("*")
        .single();

      if (insertResult.error) {
        console.error(
          "Erreur création resident Supabase:",
          insertResult.error.message
        );
        return res.status(500).json({
          error:
            "Impossible de créer le profil résident dans Supabase pour le moment."
        });
      }
      resident = insertResult.data;
    } else {
      // Mettre à jour les infos de base + last_login_at
      // et auto-activer si encore en pending (mode ouverture temporaire)
      const updateResult = await supabaseAdmin
        .from("residents")
        .update({
          display_name: displayName,
          avatar_url: avatarUrl,
          facebook_profile_url:
            resident.facebook_profile_url || computedFacebookUrl || null,
          last_login_at: now,
          status: "active",
          approved_at: resident.approved_at || now
        })
        .eq("id", supaId)
        .select("*")
        .single();

      if (!updateResult.error && updateResult.data) {
        resident = updateResult.data;
      }
    }

    // On projette le resident Supabase dans notre format "user" local
    const user = {
      id: resident.id,
      supabaseUserId: supaId,
      name: resident.display_name || displayName,
      avatarUrl: resident.avatar_url || avatarUrl,
      facebookProfileUrl: resident.facebook_profile_url || null,
      status: resident.status || "pending",
      role: resident.role || "resident",
      createdAt: resident.created_at || now,
      lastLoginAt: resident.last_login_at || now
    };

    // On synchronise également notre tableau en mémoire pour les routes existantes
    const existingIndex = users.findIndex((u) => u.supabaseUserId === supaId);
    if (existingIndex === -1) {
      users.push(user);
    } else {
      users[existingIndex] = user;
    }

    createSession(res, user.id);

    return res.json({
      authenticated: user.status === "active",
      user: toPublicUser(user)
    });
  } catch (err) {
    console.error("Erreur /api/auth/supabase-login:", err);
    res.status(500).json({
      error: "Impossible de terminer la connexion via Supabase pour le moment."
    });
  }
});

// Connexion simple par URL de profil Facebook (sans OAuth)
// - Si le profil correspond à un utilisateur existant :
//   - on crée une session,
//   - si status === "active" -> authenticated: true,
//   - sinon -> authenticated: false (l'UI affichera les écrans pending/blocked).
// - Si aucun utilisateur ne correspond :
//   - on ne crée pas d'utilisateur ici,
//   - on renvoie needOnboarding: true pour ouvrir le modal de demande.
app.post("/api/login/profile", (req, res) => {
  const { facebookProfileUrl } = req.body || {};
  const raw = (facebookProfileUrl || "").toString().trim();
  if (!raw) {
    return res
      .status(400)
      .json({ error: "Merci de renseigner l'URL de votre profil Facebook." });
  }

  const normalized = normalizeFacebookUrl(raw);

  const user = users.find((u) => {
    const uUrl = (u.facebookProfileUrl || "").toString().trim();
    return uUrl && normalizeFacebookUrl(uUrl) === normalized;
  });

  if (!user && supabaseAdmin) {
    const normalizedWithSlash = normalized + "/";
    supabaseAdmin
      .from("local_residents")
      .select("*")
      .in("facebook_profile_url", [normalized, normalizedWithSlash])
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error("Erreur local_residents lookup:", error.message);
        }
        if (!data) {
          return res.json({
            authenticated: false,
            user: null,
            needOnboarding: true,
            facebookProfileUrl: normalized
          });
        }
        const mapped = {
          id: data.id,
          supabaseUserId: null,
          name: data.display_name || "Résident",
          avatarUrl:
            data.avatar_url ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
          facebookProfileUrl: data.facebook_profile_url || null,
          status: data.status || "pending",
          role: data.role || "resident",
          createdAt: data.created_at || new Date().toISOString(),
          lastLoginAt: data.last_login_at || null
        };
        const existingIndex = users.findIndex(
          (u) => Number(u.id) === Number(mapped.id)
        );
        if (existingIndex === -1) {
          users.push(mapped);
        } else {
          users[existingIndex] = mapped;
        }
        mapped.lastLoginAt = new Date().toISOString();
        createSession(res, mapped.id);
        return res.json({
          authenticated: mapped.status === "active",
          user: toPublicUser(mapped),
          status: mapped.status
        });
      })
      .catch((err) => {
        console.error("Erreur local_residents lookup:", err);
        return res.json({
          authenticated: false,
          user: null,
          needOnboarding: true,
          facebookProfileUrl: normalized
        });
      });
    return;
  }

  if (!user) {
    return res.json({
      authenticated: false,
      user: null,
      needOnboarding: true,
      facebookProfileUrl: normalized
    });
  }

  const now = new Date().toISOString();
  user.lastLoginAt = now;
  createSession(res, user.id);

  return res.json({
    authenticated: user.status === "active",
    user: toPublicUser(user),
    status: user.status
  });
});

// Route de connexion de développement (accès temporaire à la page connectée)
// À n'utiliser qu'en local pour tester l'interface sans validation de compte.
app.post("/auth/dev-login", (req, res) => {
  const now = new Date().toISOString();
  let devUser = users.find((u) => u.role === "admin");
  if (!devUser) {
    devUser = {
      id: nextUserId++,
      facebookId: null,
      name: "Admin de test",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
      facebookProfileUrl: null,
      status: "active",
      role: "admin",
      createdAt: now,
      lastLoginAt: now
    };
    users.push(devUser);
  } else {
    devUser.status = "active";
    devUser.lastLoginAt = now;
  }

  createSession(res, devUser.id);
  res.json({
    ok: true,
    user: toPublicUser(devUser)
  });
});

// Espace modérateur : gestion des comptes en attente
app.get("/api/admin/pending-users", requireModerator, (req, res) => {
  if (!supabaseAdmin) {
    const pending = users
      .filter((u) => u.status === "pending")
      .map((u) => ({
        id: u.id,
        name: u.name,
        avatarUrl: u.avatarUrl,
        facebookProfileUrl: u.facebookProfileUrl || null,
        createdAt: u.createdAt
      }));
    return res.json({ items: pending });
  }
  supabaseAdmin
    .from("local_residents")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .then(({ data, error }) => {
      if (error) {
        console.error("Erreur chargement local_residents:", error.message);
        const pending = users
          .filter((u) => u.status === "pending")
          .map((u) => ({
            id: u.id,
            name: u.name,
            avatarUrl: u.avatarUrl,
            facebookProfileUrl: u.facebookProfileUrl || null,
            createdAt: u.createdAt
          }));
        return res.json({ items: pending });
      }
      const mapped = (data || []).map((row) => ({
        id: row.id,
        name: row.display_name || "Résident",
        avatarUrl: row.avatar_url || null,
        facebookProfileUrl: row.facebook_profile_url || null,
        createdAt: row.created_at
      }));
      return res.json({ items: mapped });
    })
    .catch((err) => {
      console.error("Erreur chargement local_residents:", err);
      const pending = users
        .filter((u) => u.status === "pending")
        .map((u) => ({
          id: u.id,
          name: u.name,
          avatarUrl: u.avatarUrl,
          facebookProfileUrl: u.facebookProfileUrl || null,
          createdAt: u.createdAt
        }));
      return res.json({ items: pending });
    });
});

app.post("/api/admin/users/:id/approve", requireModerator, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => Number(u.id) === id);
  if (user) {
    user.status = "active";
    user.lastLoginAt = new Date().toISOString();
    syncLocalResident(user, { approved_at: user.lastLoginAt });
    return res.json(toPublicUser(user));
  }
  if (!supabaseAdmin) {
    return res.status(404).json({ error: "Utilisateur introuvable." });
  }
  supabaseAdmin
    .from("local_residents")
    .update({ status: "active", approved_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single()
    .then(({ data, error }) => {
      if (error || !data) {
        return res.status(404).json({ error: "Utilisateur introuvable." });
      }
      return res.json({
        id: data.id,
        name: data.display_name || "Résident",
        avatarUrl: data.avatar_url || null,
        facebookProfileUrl: data.facebook_profile_url || null,
        status: data.status || "active",
        role: data.role || "resident"
      });
    })
    .catch(() => res.status(404).json({ error: "Utilisateur introuvable." }));
});

app.post("/api/admin/users/:id/reject", requireModerator, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => Number(u.id) === id);
  if (user) {
    user.status = "blocked";

    // Optionnel : invalider les sessions actives de cet utilisateur
    Object.keys(sessions).forEach((token) => {
      if (sessions[token].userId === user.id) {
        delete sessions[token];
      }
    });

    syncLocalResident(user, { blocked_at: new Date().toISOString() });
    return res.json(toPublicUser(user));
  }
  if (!supabaseAdmin) {
    return res.status(404).json({ error: "Utilisateur introuvable." });
  }
  supabaseAdmin
    .from("local_residents")
    .update({ status: "blocked", blocked_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single()
    .then(({ data, error }) => {
      if (error || !data) {
        return res.status(404).json({ error: "Utilisateur introuvable." });
      }
      return res.json({
        id: data.id,
        name: data.display_name || "Résident",
        avatarUrl: data.avatar_url || null,
        facebookProfileUrl: data.facebook_profile_url || null,
        status: data.status || "blocked",
        role: data.role || "resident"
      });
    })
    .catch(() => res.status(404).json({ error: "Utilisateur introuvable." }));
});

// --- Routes locales pour la résidence et les commerces ---

// Liste des membres (résidents Supabase)
app.get("/api/members", async (req, res) => {
  try {
    if (!supabaseAdmin) {
      const localItems = (users || []).map((u) => ({
        id: u.id,
        nickname: u.name || "Résident",
        email: null,
        avatarUrl:
          u.avatarUrl ||
          avatarPool[Math.floor(Math.random() * avatarPool.length)],
        role: u.role || "resident",
        facebookProfileUrl: u.facebookProfileUrl || null,
        status: u.status || "pending"
      }));
      return res.json({ items: localItems });
    }

    const { data, error } = await supabaseAdmin
      .from("residents")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Erreur chargement residents Supabase:", error.message);
      return res
        .status(500)
        .json({ error: "Impossible de charger les membres depuis Supabase." });
    }

    const realItems = (data || []).map((row) => ({
      id: row.id,
      nickname: row.display_name || "Résident",
      email: null,
      avatarUrl:
        row.avatar_url ||
        avatarPool[Math.floor(Math.random() * avatarPool.length)],
      role: row.role || "resident",
      facebookProfileUrl: row.facebook_profile_url || null,
      status: row.status || "pending"
    }));

    const { data: localData, error: localError } = await supabaseAdmin
      .from("local_residents")
      .select("*")
      .order("created_at", { ascending: true });
    if (localError) {
      console.error("Erreur chargement local_residents:", localError.message);
    }
    const localItems = (localData || []).map((row) => ({
      id: row.id,
      nickname: row.display_name || "Résident",
      email: null,
      avatarUrl:
        row.avatar_url ||
        avatarPool[Math.floor(Math.random() * avatarPool.length)],
      role: row.role || "resident",
      facebookProfileUrl: row.facebook_profile_url || null,
      status: row.status || "pending"
    }));

    res.json({ items: realItems.concat(localItems) });
  } catch (e) {
    console.error("Erreur /api/members:", e);
    res
      .status(500)
      .json({ error: "Impossible de charger les membres pour le moment." });
  }
});

// Ajout direct de membre : non supporté (les résidents sont créés via Login Facebook)
app.post("/api/members", (req, res) => {
  return res.status(400).json({
    error:
      "Les résidents sont créés automatiquement lorsqu'ils se connectent avec Facebook. Aucun ajout manuel n'est nécessaire."
  });
});

// Mise à jour du rôle d'un membre (table residents)
app.post("/api/members/:id/role", async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({
      error:
        "Supabase n'est pas configuré côté serveur (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants)."
    });
  }

  const id = req.params.id;
  const { role } = req.body || {};
  if (!role) {
    return res.status(400).json({ error: "role est requis." });
  }
  const allowed = ["super_admin", "admin", "moderator", "resident"];
  if (!allowed.includes(role)) {
    return res
      .status(400)
      .json({ error: "role doit être parmi: " + allowed.join(", ") });
  }

  const { data, error } = await supabaseAdmin
    .from("residents")
    .update({ role })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Erreur update role resident:", error.message);
    return res
      .status(500)
      .json({ error: "Impossible de modifier le rôle de ce membre." });
  }
  if (!data) {
    return res.status(404).json({ error: "Membre introuvable." });
  }

  const mapped = {
    id: data.id,
    nickname: data.display_name || "Résident",
    email: null,
    avatarUrl:
      data.avatar_url ||
      avatarPool[Math.floor(Math.random() * avatarPool.length)],
    role: data.role || "resident",
    facebookProfileUrl: data.facebook_profile_url || null,
    status: data.status || "pending"
  };

  res.json(mapped);
});

// Suppression d'un membre : on le marque simplement comme "blocked"
app.delete("/api/members/:id", async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({
      error:
        "Supabase n'est pas configuré côté serveur (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants)."
    });
  }

  const id = req.params.id;
  const { data, error } = await supabaseAdmin
    .from("residents")
    .update({ status: "blocked" })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Erreur suppression (blocage) resident:", error.message);
    return res
      .status(500)
      .json({ error: "Impossible de bloquer ce membre pour le moment." });
  }
  if (!data) {
    return res.status(404).json({ error: "Membre introuvable." });
  }

  const mapped = {
    id: data.id,
    nickname: data.display_name || "Résident",
    email: null,
    avatarUrl:
      data.avatar_url ||
      avatarPool[Math.floor(Math.random() * avatarPool.length)],
    role: data.role || "resident",
    facebookProfileUrl: data.facebook_profile_url || null,
    status: data.status || "blocked"
  };

  res.json(mapped);
});

function getTodayDateInPoland() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;
  return `${year}-${month}-${day}`; // YYYY-MM-DD
}

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status} pour ${url}`);
  }
  return res.text();
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status} pour ${url}`);
  }
  return res.json();
}

async function loadRozkladyForLine(line) {
  const js = await fetchText(
    `https://zkmgdynia.pl/data/busman/results/js/rozklady/${line}.js`
  );

  // On expose uniquement les objets qui nous intéressent dans un contexte isolé
  const script =
    js +
    "\n;globalThis.__data__ = { rozkladydni: typeof rozkladydni !== 'undefined' ? rozkladydni : null, rozklady: typeof rozklady !== 'undefined' ? rozklady : null };";

  const context = { globalThis: {} };
  vm.createContext(context);
  vm.runInContext(script, context);

  const data = context.globalThis.__data__;
  if (!data || !data.rozkladydni || !data.rozklady) {
    throw new Error(
      `Impossible de récupérer rozkladydni / rozklady pour la ligne ${line}`
    );
  }
  return data;
}

async function getDeparturesForToday(line) {
  const { rozkladydni, rozklady } = await loadRozkladyForLine(line);
  const today = getTodayDateInPoland();
  const timetableIds = rozkladydni[today];

  if (!timetableIds || timetableIds.length === 0) {
    return {
      date: today,
      departures: []
    };
  }

  const TARGET_STOP = "Mały Kack Strzelców 01";
  const timesSet = new Set();

  for (const id of timetableIds) {
    const timetable = rozklady[id];
    if (!timetable) continue;

    // timetable = { '1': { name, services }, '2': { ... }, ... }
    for (const variantKey of Object.keys(timetable)) {
      const variant = timetable[variantKey];
      if (!variant || !variant.services) continue;

      const services = variant.services;
      for (const serviceId of Object.keys(services)) {
        const stopsArray = services[serviceId];
        if (!Array.isArray(stopsArray)) continue;

        for (const stopEntry of stopsArray) {
          if (stopEntry && stopEntry.stop === TARGET_STOP && stopEntry.time) {
            timesSet.add(stopEntry.time);
          }
        }
      }
    }
  }

  const departures = Array.from(timesSet).sort(
    (a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b)
  );

  return {
    date: today,
    departures
  };
}

app.get("/api/departures", async (req, res) => {
  try {
    const line = (req.query.line || "32").toString();
    if (!["32", "145", "710"].includes(line)) {
      return res
        .status(400)
        .json({ error: "Ligne non supportée. Utilise 32, 145 ou 710." });
    }

    const result = await getDeparturesForToday(line);
    res.json({
      line,
      stop: "Mały Kack Strzelców 01",
      ...result
    });
  } catch (err) {
    console.error("Erreur /api/departures:", err);
    res.status(500).json({ error: "Impossible de récupérer les horaires depuis ZKM Gdynia." });
  }
});

// Météo de Gdynia (basée sur l'API open-meteo, sans clé)
app.get("/api/weather", async (req, res) => {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=54.5189&longitude=18.5305&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FWarsaw";

    const data = await fetchJson(url);
    const current = data.current_weather;

    let nextDays = [];
    if (data.daily && Array.isArray(data.daily.time)) {
      // 0 = aujourd'hui, 1 = demain, 2 = après-demain
      for (let i = 1; i <= 2 && i < data.daily.time.length; i++) {
        nextDays.push({
          date: data.daily.time[i],
          tmin: data.daily.temperature_2m_min[i],
          tmax: data.daily.temperature_2m_max[i],
          weathercode: data.daily.weathercode[i]
        });
      }
    }

    let nextHours = [];
    if (
      data.hourly &&
      Array.isArray(data.hourly.time) &&
      Array.isArray(data.hourly.temperature_2m)
    ) {
      // Variations de température sur les 24 prochaines heures à partir de "maintenant"
      const refTimeStr =
        current && typeof current.time === "string"
          ? current.time
          : data.hourly.time[0];

      const startIndex = data.hourly.time.findIndex((t) => t >= refTimeStr);
      const from = startIndex === -1 ? 0 : startIndex;

      for (
        let i = from;
        i < data.hourly.time.length && nextHours.length < 24;
        i++
      ) {
        nextHours.push({
          time: data.hourly.time[i],
          temperature: data.hourly.temperature_2m[i]
        });
      }
    }

    res.json({
      location: "Gdynia",
      current,
      nextDays,
      nextHours
    });
  } catch (err) {
    console.error("Erreur /api/weather:", err);
    res.status(500).json({ error: "Impossible de récupérer la météo." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;

