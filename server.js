require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const vm = require("vm");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3001;

// Code d'accès partagé uniquement dans le groupe Facebook (sans OAuth)
// Par défaut en local : "0000" (à surcharger via GROUP_ACCESS_CODE en prod)
const GROUP_ACCESS_CODE = process.env.GROUP_ACCESS_CODE || "0000";
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

// Simulation : 23 demandes de validation de compte déjà en attente
(() => {
  const now = new Date().toISOString();
  for (let i = 1; i <= 23; i++) {
    users.push({
      id: nextUserId++,
      supabaseUserId: null,
      name: "Demande " + i,
      avatarUrl: null,
      facebookProfileUrl: null,
      status: "pending",
      role: "resident",
      createdAt: now,
      lastLoginAt: now
    });
  }
})();

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
    secure: false // pour du local seulement – à adapter en prod
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
  res.cookie("sessionToken", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: new Date(0)
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

// --- Stockage local en mémoire (prototype) ---

// Informations de base sur la résidence (page publique) – contenu en polonais
let residenceInfo = {
  name: "Osiedle Mały Kack – Gdynia",
  address: "Mały Kack, Gdynia",
  description:
    "Prosta strona dla mieszkańców osiedla Na Polanie: rozkład jazdy autobusów, pogoda, ogłoszenia i informacje z osiedla.",
  practicalInfo: [
    "Wejścia do klatek: kody dostępu zarządzane przez administrację osiedla.",
    "Odbiór odpadów wielkogabarytowych: raz w miesiącu (szczegóły u administracji).",
    "Numery alarmowe: straż pożarna 998 / 112, policja 997."
  ],
  lastUpdatedBy: "admin-local",
  lastUpdatedAt: new Date().toISOString()
};

// Petites annonces (immobilier / objets) stockées en mémoire – contenu en polonais
// On initialise avec 3 annonces immobilières et 5 annonces diverses
let classifieds = [
  {
    id: 1,
    type: "immobilier",
    title: "Do wynajęcia: 2‑pokojowe mieszkanie Mały Kack, ul. Strzelców",
    description:
      "Właściciel wynajmie 2‑pokojowe mieszkanie z osobną kuchnią, 3. piętro, ekspozycja południowa. Idealne dla pary lub jednej osoby.",
    price: 2800,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    type: "immobilier",
    title: "Na sprzedaż: kawalerka po remoncie blisko SKM",
    description:
      "Jasna kawalerka po generalnym remoncie, 24 m², 5 minut pieszo do stacji SKM. Kuchnia w zabudowie, niskie opłaty, idealna na pierwsze mieszkanie.",
    price: 399000,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    type: "immobilier",
    title: "Współdzielenie: pokój w 3‑pokojowym mieszkaniu",
    description:
      "Wolny pokój w 3‑pokojowym mieszkaniu na 4. piętrze, spokojni współlokatorzy, blisko linii 32 i 145. Opłaty w cenie.",
    price: 1500,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    type: "objet",
    title: "Szukam / sprzedam małe biurko",
    description:
      "Szukam małego biurka do pracy zdalnej, a obecne biurko IKEA w dobrym stanie chętnie sprzedam. Kontakt przez ogłoszenie.",
    price: 200,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/907810/pexels-photo-907810.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    type: "objet",
    title: "Oddam kanapę 3‑osobową",
    description:
      "Szara kanapa 3‑osobowa, używana, ale w dobrym stanie. Odbiór osobisty z parteru w najbliższy weekend.",
    price: 0,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    type: "objet",
    title: "Sprzedam wózek dziecięcy",
    description:
      "Składany, kompaktowy wózek dziecięcy używany około roku. Idealny do miasta, w zestawie instrukcja i akcesoria.",
    price: 350,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/9824416/pexels-photo-9824416.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 7,
    type: "objet",
    title: "Zajęcia z języka polskiego dla sąsiadów",
    description:
      "Proponuję zajęcia z języka polskiego (poziom początkujący) wieczorami w sali wspólnej, mała, kameralna grupa.",
    price: 40,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/6502822/pexels-photo-6502822.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 8,
    type: "objet",
    title: "Sprzedam rower miejski",
    description:
      "Rower miejski w rozmiarze M, po przeglądzie, idealny na dojazdy do Gdyni lub Sopotu ścieżką rowerową.",
    price: 700,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextClassifiedId = classifieds.length + 1;

// Commerçants de la résidence (petits commerces locaux) – contenu en polonais
let shops = [
  {
    id: 1,
    name: "Vege Corner",
    type: "Sklep wegański",
    description:
      "Sklep 100% wegański na parterze budynku B: świeże warzywa i owoce, produkty na wagę, napoje roślinne i domowe wypieki.",
    url: "https://example.com/vege-corner",
    imageUrl:
      "https://images.pexels.com/photos/3735153/pexels-photo-3735153.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    name: "Nova Hair Studio",
    type: "Fryzjer",
    description:
      "Salon fryzjerski damsko‑męski na 1. piętrze budynku A. Strzyżenie, koloryzacja, broda. Otwarte od wtorku do soboty.",
    url: "https://example.com/nova-hair",
    imageUrl:
      "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    name: "Café Strzelców",
    type: "Kawiarnia osiedlowa",
    description:
      "Przytulna kawiarnia z tarasem wychodzącym na dziedziniec: kawa, ciasta i lekkie przekąski.",
    url: "https://example.com/cafe-strzelcow",
    imageUrl:
      "https://images.pexels.com/photos/3736397/pexels-photo-3736397.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    name: "Mini Market 24h",
    type: "Sklep całodobowy",
    description:
      "Sklep czynny do późna z podstawowymi produktami, prasą, napojami i przekąskami, przy budynku C.",
    url: "https://example.com/mini-market",
    imageUrl:
      "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    name: "Studio Yoga Oksywie",
    type: "Studio jogi",
    description:
      "Zajęcia jogi i relaksacji w małych grupach dla mieszkańców, jasna sala na 2. piętrze budynku B.",
    url: "https://example.com/studio-yoga",
    imageUrl:
      "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextShopId = shops.length + 1;

// Événements de la résidence (agenda simple) – contenu en polonais
let events = [
  {
    id: 1,
    title: "Spotkanie wspólnoty – budynek A/B",
    date: "2026-02-10",
    time: "19:00",
    location: "Sala wspólna, parter budynku B",
    description:
      "Omówienie planowanych prac, budżetu na 2026 rok oraz pytań mieszkańców.",
    imageUrl:
      "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Wiosenne sprzątanie części wspólnych",
    date: "2026-03-23",
    time: "10:00",
    location: "Główny hol wejściowy",
    description:
      "Wspólne sprzątanie terenu wokół budynków, a potem kawa z sąsiadami.",
    imageUrl:
      "https://images.pexels.com/photos/6195127/pexels-photo-6195127.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Przegląd techniczny windy – budynek A",
    date: "2026-01-15",
    time: "09:00",
    location: "Budynek A",
    description:
      "Przegląd techniczny windy. Możliwe chwilowe przerwy w działaniu w godzinach porannych.",
    imageUrl:
      "https://images.pexels.com/photos/134469/pexels-photo-134469.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextEventId = events.length + 1;

// Signalements (problèmes dans la résidence) – contenu en polonais
let reports = [
  {
    id: 1,
    category: "Oświetlenie",
    title: "Spalona żarówka na 3. piętrze, klatka B",
    description:
      "Żarówka na korytarzu między mieszkaniami 34 i 35 nie działa.",
    status: "otwarty",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/220118/pexels-photo-220118.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    category: "Czystość",
    title: "Worki ze śmieciami przy rowerowni",
    description:
      "Kilka worków ze śmieciami pozostawionych przed drzwiami do rowerowni, nieprzyjemny zapach.",
    status: "w toku",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/3735210/pexels-photo-3735210.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    category: "Hałas",
    title: "Hałas wiertarki wcześnie rano",
    description:
      "Powtarzające się prace z użyciem wiertarki między 7:00 a 8:00 w budynku A, kilka dni z rzędu.",
    status: "zamknięty",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/5691515/pexels-photo-5691515.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextReportId = reports.length + 1;

// Petits services entre voisins (aide, prêt de matériel, etc.) – contenu en polonais
let neighborServices = [
  {
    id: 1,
    kind: "offre",
    title: "Pomoc przy noszeniu zakupów",
    description:
      "Mogę pomóc sąsiadom z wyższych pięter wnosić ciężkie zakupy wieczorami w tygodniu.",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    kind: "demande",
    title: "Szukam opieki do dziecka",
    description:
      "Para z 4‑letnim dzieckiem szuka zaufanej opiekunki w budynku, 1–2 wieczory w miesiącu.",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/5088188/pexels-photo-5088188.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    kind: "offre",
    title: "Wypożyczę narzędzia do majsterkowania",
    description:
      "Wiertarka, wkrętarka i mała skrzynka z narzędziami dostępne w weekendy po wcześniejszym kontakcie.",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextServiceId = neighborServices.length + 1;

// Membres de la résidence (simulation)
const avatarPool = [
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
];

// Génère un pool de membres factices (en plus des utilisateurs réels venant de Facebook / Supabase)
// 200 residents, 10 moderators, 3 admins
let fakeResidentsCache = null;

function buildFakeResidents() {
  const firstNames = [
    "Adam",
    "Agnieszka",
    "Bartek",
    "Kasia",
    "Marek",
    "Anna",
    "Piotr",
    "Magda",
    "Tomek",
    "Ola",
    "Paweł",
    "Ewa",
    "Jan",
    "Monika",
    "Karol"
  ];
  const lastNames = [
    "Nowak",
    "Kowalski",
    "Wiśniewski",
    "Kaczmarek",
    "Lewandowski",
    "Wójcik",
    "Kamińska",
    "Zieliński",
    "Krawczyk",
    "Szymański",
    "Dąbrowski",
    "Pawlak"
  ];

  const items = [];
  let counter = 1;

  function createFake(count, role) {
    for (let i = 0; i < count; i++) {
      const fname = firstNames[(counter + i) % firstNames.length];
      const lname = lastNames[(counter * 3 + i) % lastNames.length];
      const nickname = fname + " " + lname;
      const avatarUrl =
        avatarPool[(counter + i) % avatarPool.length];

      items.push({
        id: "fake-" + counter,
        nickname,
        email: null,
        avatarUrl,
        role,
        facebookProfileUrl: null,
        status: "active"
      });
      counter++;
    }
  }

  // 3 admins, 10 modos, 200 résidents
  createFake(3, "admin");
  createFake(10, "moderator");
  createFake(200, "resident");

  return items;
}

function getFakeResidents() {
  if (!fakeResidentsCache) {
    fakeResidentsCache = buildFakeResidents();
  }
  return fakeResidentsCache;
}

// Sondages (sondages simples à choix unique)
let polls = [
  {
    id: 1,
    title: "Souhaitez-vous un nettoyage de printemps de la cour intérieure ?",
    description:
      "Cela impliquerait un samedi matin avec café et croissants offerts par la résidence.",
    options: [
      { id: 1, label: "Oui, partant(e)", votes: 3 },
      { id: 2, label: "Pourquoi pas, selon la date", votes: 1 },
      { id: 3, label: "Non, pas intéressé(e)", votes: 0 }
    ],
    endDate: "2026-02-01",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Installer un support vélo supplémentaire près de l’entrée ?",
    description:
      "Il serait vissé au sol à côté de l’abri actuel, pour 4 vélos de plus.",
    options: [
      { id: 1, label: "Oui", votes: 5 },
      { id: 2, label: "Non", votes: 2 }
    ],
    endDate: "2026-01-31",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Souhaitez-vous un sapin de Noël dans le hall principal ?",
    description:
      "Sapin décoré avec participation des enfants de la résidence.",
    options: [
      { id: 1, label: "Oui, avec décorations partagées", votes: 4 },
      { id: 2, label: "Oui, mais décoré par le syndic", votes: 1 },
      { id: 3, label: "Non", votes: 0 }
    ],
    endDate: "2026-12-01",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Êtes-vous intéressé(e) par un groupe de covoiturage vers Gdynia centre ?",
    description:
      "Trajets du matin vers le centre-ville, partage des coûts de carburant.",
    options: [
      { id: 1, label: "Oui, régulièrement", votes: 2 },
      { id: 2, label: "Oui, occasionnellement", votes: 3 },
      { id: 3, label: "Non", votes: 1 }
    ],
    endDate: "2026-03-15",
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: "Quel créneau préférez-vous pour une fête des voisins ?",
    description: "Barbecue / potluck dans la cour de la résidence.",
    options: [
      { id: 1, label: "Samedi après-midi", votes: 3 },
      { id: 2, label: "Samedi soir", votes: 2 },
      { id: 3, label: "Dimanche après-midi", votes: 0 }
    ],
    endDate: "2026-05-10",
    createdAt: new Date().toISOString()
  }
];

let nextPollId = polls.length + 1;

// votes par résident : { [pollId]: { [residentId]: optionId } }
let pollVotesByResident = {};

// Modérateurs (prototype simple, stocké en mémoire)
let moderators = [
  {
    id: 1,
    name: "Anna Kowalska",
    email: "anna@example.com"
  },
  {
    id: 2,
    name: "Piotr Nowak",
    email: "piotr@example.com"
  }
];

let nextModeratorId = moderators.length + 1;

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
  const { name, accessCode, facebookProfileUrl, groupName } = req.body || {};

  // Pour l'instant, on ne rend obligatoires que l'URL de profil et le nom du groupe
  if (!facebookProfileUrl || !groupName) {
    return res.status(400).json({
      error:
        "facebookProfileUrl et groupName sont requis pour finaliser l'onboarding."
    });
  }
  // accessCode et name sont ignorés pour le moment (simplification du flux)

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
    const safeFacebookUrl = String(facebookProfileUrl).slice(0, 400);
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

  const safeFacebookUrl = String(facebookProfileUrl).slice(0, 400);
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
      // Créer un résident en attente si aucun enregistrement n'existe encore
      const insertResult = await supabaseAdmin
        .from("residents")
        .insert({
          id: supaId,
          display_name: displayName,
          avatar_url: avatarUrl,
          status: "pending",
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
      const updateResult = await supabaseAdmin
        .from("residents")
        .update({
          display_name: displayName,
          avatar_url: avatarUrl,
          last_login_at: now
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

  const normalize = (url) => url.replace(/\/+$/, "");
  const normalized = normalize(raw);

  const user = users.find((u) => {
    const uUrl = (u.facebookProfileUrl || "").toString().trim();
    return uUrl && normalize(uUrl) === normalized;
  });

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
  const pending = users
    .filter((u) => u.status === "pending")
    .map((u) => ({
      id: u.id,
      name: u.name,
      avatarUrl: u.avatarUrl,
      facebookProfileUrl: u.facebookProfileUrl || null,
      createdAt: u.createdAt
    }));
  res.json({ items: pending });
});

app.post("/api/admin/users/:id/approve", requireModerator, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur introuvable." });
  }
  user.status = "active";
  user.lastLoginAt = new Date().toISOString();
  res.json(toPublicUser(user));
});

app.post("/api/admin/users/:id/reject", requireModerator, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur introuvable." });
  }
  user.status = "blocked";

  // Optionnel : invalider les sessions actives de cet utilisateur
  Object.keys(sessions).forEach((token) => {
    if (sessions[token].userId === user.id) {
      delete sessions[token];
    }
  });

  res.json(toPublicUser(user));
});

// --- Routes locales pour la résidence, les annonces et les commerces ---

// Infos résidence – utilisé par la carte "Présentation de la résidence"
app.get("/api/residence", (req, res) => {
  res.json(residenceInfo);
});

// Liste des modérateurs
app.get("/api/moderators", (req, res) => {
  res.json({ items: moderators });
});

// Ajout d'un modérateur (sera plus tard restreint à admin/SEO)
app.post("/api/moderators", (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "name et email sont requis pour créer un modérateur." });
  }
  const newItem = {
    id: nextModeratorId++,
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 160)
  };
  moderators.push(newItem);
  res.status(201).json(newItem);
});

// Suppression d'un modérateur
app.delete("/api/moderators/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = moderators.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Modérateur introuvable." });
  }
  const [removed] = moderators.splice(index, 1);
  res.json(removed);
});

// Liste des membres (résidents Supabase)
app.get("/api/members", async (req, res) => {
  try {
    if (!supabaseAdmin) {
      // Si Supabase n'est pas configuré, on renvoie au moins les membres factices
      return res.json({ items: getFakeResidents() });
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

    const items = realItems.concat(getFakeResidents());

    res.json({ items });
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

// Liste des petites annonces
app.get("/api/classifieds", (req, res) => {
  res.json({ items: classifieds });
});

// Création d’une nouvelle petite annonce (prototype, sans auth)
app.post("/api/classifieds", (req, res) => {
  const { type, title, description, price } = req.body || {};

  if (!type || !title || !description) {
    return res
      .status(400)
      .json({ error: "type, title et description sont requis." });
  }

  const allowedTypes = ["immobilier", "objet"];
  if (!allowedTypes.includes(type)) {
    return res
      .status(400)
      .json({ error: `type doit être parmi: ${allowedTypes.join(", ")}` });
  }

  const newItem = {
    id: nextClassifiedId++,
    type,
    title: String(title).slice(0, 160),
    description: String(description).slice(0, 2000),
    price:
      typeof price === "number"
        ? price
        : price != null && !Number.isNaN(Number(price))
        ? Number(price)
        : null,
    currency: "PLN",
    createdAt: new Date().toISOString()
  };

  classifieds.unshift(newItem);
  res.status(201).json(newItem);
});

// Commerçants
app.get("/api/shops", (req, res) => {
  res.json({ items: shops });
});

app.post("/api/shops", (req, res) => {
  const { name, type, description, url, imageUrl } = req.body || {};

  if (!name || !type || !description) {
    return res
      .status(400)
      .json({ error: "name, type et description sont requis." });
  }

  const newShop = {
    id: nextShopId++,
    name: String(name).slice(0, 120),
    type: String(type).slice(0, 80),
    description: String(description).slice(0, 2000),
    url: url ? String(url).slice(0, 200) : null,
    imageUrl: imageUrl
      ? String(imageUrl).slice(0, 400)
      : "https://images.pexels.com/photos/3735153/pexels-photo-3735153.jpeg?auto=compress&cs=tinysrgb&w=800"
  };

  shops.unshift(newShop);
  res.status(201).json(newShop);
});

// Événements
app.get("/api/events", (req, res) => {
  res.json({ items: events });
});

// Signalements
app.get("/api/reports", (req, res) => {
  res.json({ items: reports });
});

app.post("/api/reports", (req, res) => {
  const { category, title, description, imageUrl } = req.body || {};

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "title et description sont requis." });
  }

  const newReport = {
    id: nextReportId++,
    category: category ? String(category).slice(0, 80) : "Autre",
    title: String(title).slice(0, 160),
    description: String(description).slice(0, 2000),
    status: "ouvert",
    createdAt: new Date().toISOString(),
    imageUrl: imageUrl ? String(imageUrl).slice(0, 400) : null
  };

  reports.unshift(newReport);
  res.status(201).json(newReport);
});

// Petits services entre voisins
app.get("/api/services", (req, res) => {
  res.json({ items: neighborServices });
});

app.post("/api/services", (req, res) => {
  const { kind, title, description, imageUrl } = req.body || {};

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "title et description sont requis." });
  }

  const allowedKinds = ["offre", "demande"];
  const finalKind = allowedKinds.includes(kind) ? kind : "offre";

  const newService = {
    id: nextServiceId++,
    kind: finalKind,
    title: String(title).slice(0, 160),
    description: String(description).slice(0, 2000),
    createdAt: new Date().toISOString(),
    imageUrl: imageUrl ? String(imageUrl).slice(0, 400) : null
  };

  neighborServices.unshift(newService);
  res.status(201).json(newService);
});

// Sondages
app.get("/api/polls", (req, res) => {
  res.json({ items: polls });
});

// Création de sondage (prototype : à restreindre aux modos plus tard)
app.post("/api/polls", (req, res) => {
  const { title, description, options, endDate } = req.body || {};

  if (!title || !Array.isArray(options) || options.length < 2 || !endDate) {
    return res.status(400).json({
      error:
        "title, endDate et un tableau options (2 à 5 libellés) sont requis."
    });
  }

  if (options.length > 5) {
    return res
      .status(400)
      .json({ error: "Un sondage ne peut pas avoir plus de 5 options." });
  }

  const cleanedOptions = options
    .map((opt, idx) => {
      const label =
        typeof opt === "string"
          ? opt
          : opt && typeof opt.label === "string"
          ? opt.label
          : "";
      const trimmed = label.trim();
      if (!trimmed) return null;
      return {
        id: idx + 1,
        label: trimmed.slice(0, 140),
        votes: 0
      };
    })
    .filter(Boolean);

  if (cleanedOptions.length < 2) {
    return res
      .status(400)
      .json({ error: "Au moins deux options non vides sont nécessaires." });
  }

  const newPoll = {
    id: nextPollId++,
    title: String(title).slice(0, 180),
    description: description ? String(description).slice(0, 400) : "",
    options: cleanedOptions,
    endDate: String(endDate).slice(0, 30),
    createdAt: new Date().toISOString()
  };

  polls.unshift(newPoll);
  res.status(201).json(newPoll);
});

app.post("/api/polls/:id/vote", (req, res) => {
  const pollId = Number(req.params.id);
  const { optionId, residentId } = req.body || {};

  if (!pollId || !optionId || !residentId) {
    return res.status(400).json({
      error: "pollId, optionId et residentId sont requis."
    });
  }

  const poll = polls.find((p) => p.id === pollId);
  if (!poll) {
    return res.status(404).json({ error: "Sondage introuvable." });
  }

  if (poll.endDate && new Date(poll.endDate) < new Date()) {
    return res.status(400).json({ error: "Le sondage est terminé." });
  }

  const option = (poll.options || []).find(
    (opt) => Number(opt.id) === Number(optionId)
  );
  if (!option) {
    return res.status(400).json({ error: "Option invalide pour ce sondage." });
  }

  if (!pollVotesByResident[pollId]) {
    pollVotesByResident[pollId] = {};
  }

  if (pollVotesByResident[pollId][residentId]) {
    return res
      .status(400)
      .json({ error: "Vous avez déjà voté pour ce sondage." });
  }

  option.votes = (option.votes || 0) + 1;
  pollVotesByResident[pollId][residentId] = option.id;

  res.json(poll);
});

// Création d'événement (prototype, pourra être réservé aux modos plus tard)
app.post("/api/events", (req, res) => {
  const { title, date, time, location, description, imageUrl } = req.body || {};

  if (!title || !date || !description) {
    return res.status(400).json({
      error: "title, date et description sont requis."
    });
  }

  const newEvent = {
    id: nextEventId++,
    title: String(title).slice(0, 160),
    date: String(date).slice(0, 20),
    time: time ? String(time).slice(0, 10) : "",
    location: location ? String(location).slice(0, 200) : "",
    description: String(description).slice(0, 2000),
    imageUrl: imageUrl ? String(imageUrl).slice(0, 400) : null
  };

  events.unshift(newEvent);
  res.status(201).json(newEvent);
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

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

