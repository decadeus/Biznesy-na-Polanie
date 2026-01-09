const express = require("express");
const fetch = require("node-fetch");
const vm = require("vm");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour parser le JSON des requêtes POST
app.use(express.json());

// Servez les fichiers statiques (index.html, etc.) depuis ce dossier
app.use(express.static(__dirname));

// --- Stockage local en mémoire (prototype) ---

// Informations de base sur la résidence (page publique)
let residenceInfo = {
  name: "Résidence Mały Kack – Gdynia",
  address: "Mały Kack, Gdynia",
  description:
    "Petite web app locale pour les résidents : infos pratiques, horaires de bus, météo et petites annonces.",
  practicalInfo: [
    "Entrées : codes d’accès gérés par le syndic.",
    "Ramassage des déchets encombrants : une fois par mois (infos à venir).",
    "Contacts d’urgence : pompiers 998 / 112, police 997."
  ],
  lastUpdatedBy: "admin-local",
  lastUpdatedAt: new Date().toISOString()
};

// Petites annonces (immobilier / objets) stockées en mémoire
// On initialise avec 3 annonces immobilières et 5 annonces diverses
let classifieds = [
  {
    id: 1,
    type: "immobilier",
    title: "À louer : 2 pièces Mały Kack Strzelców",
    description:
      "Propriétaire loue appartement 2 pièces, cuisine équipée, 3e étage, exposé sud. Idéal pour un couple ou une personne seule.",
    price: 2800,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    type: "immobilier",
    title: "À vendre : studio rénové proche SKM",
    description:
      "Studio lumineux entièrement rénové, 24 m², à 5 minutes de la gare SKM. Cuisine équipée, faibles charges, idéal premier achat.",
    price: 399000,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    type: "immobilier",
    title: "Colocation : chambre dans 3 pièces",
    description:
      "Une chambre se libère dans un appartement 3 pièces au 4e étage, coloc calme, proche des lignes 32 et 145. Charges incluses.",
    price: 1500,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    type: "objet",
    title: "Recherche / vends petit bureau",
    description:
      "Je cherche un petit bureau pour télétravail, et je vends mon ancien bureau IKEA en bon état. Me contacter si intéressé.",
    price: 200,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/37347/office-freelancer-computer-business-37347.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    type: "objet",
    title: "Canapé 3 places à donner",
    description:
      "Canapé 3 places gris, utilisé mais propre. À venir chercher au rez-de-chaussée le week-end prochain.",
    price: 0,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    type: "objet",
    title: "Vends poussette enfant",
    description:
      "Poussette compacte pliable, utilisée 1 an. Très pratique pour la ville, livret et accessoires inclus.",
    price: 350,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/981157/pexels-photo-981157.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 7,
    type: "objet",
    title: "Cours de polonais entre voisins",
    description:
      "Je propose des cours de polonais (niveau débutant) le soir dans la salle commune, petit groupe convivial.",
    price: 40,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/8617930/pexels-photo-8617930.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 8,
    type: "objet",
    title: "Vélo de ville à vendre",
    description:
      "Vélo de ville taille M, récemment révisé, idéal pour se rendre à Gdynia ou Sopot par la piste cyclable.",
    price: 700,
    currency: "PLN",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextClassifiedId = classifieds.length + 1;

// Commerçants de la résidence (petits commerces locaux)
let shops = [
  {
    id: 1,
    name: "Vege Corner",
    type: "Magasin vegan",
    description:
      "Épicerie 100 % vegan au rez-de-chaussée du bâtiment B : produits frais, vrac, boissons végétales, pâtisseries maison.",
    url: "https://example.com/vege-corner",
    imageUrl:
      "https://images.pexels.com/photos/3735153/pexels-photo-3735153.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    name: "Nova Hair Studio",
    type: "Coiffeur",
    description:
      "Salon de coiffure mixte au 1er étage du bâtiment A. Coupes, couleurs, barbe. Ouvert du mardi au samedi.",
    url: "https://example.com/nova-hair",
    imageUrl:
      "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    name: "Café Strzelców",
    type: "Café de quartier",
    description:
      "Petite cafétéria cosy avec terrasse donnant sur la cour intérieure : cafés, pâtisseries et snacks légers.",
    url: "https://example.com/cafe-strzelcow",
    imageUrl:
      "https://images.pexels.com/photos/3736397/pexels-photo-3736397.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    name: "Mini Market 24h",
    type: "Épicerie de nuit",
    description:
      "Épicerie ouverte tard avec produits du quotidien, journaux, boissons et snacks, au pied du bâtiment C.",
    url: "https://example.com/mini-market",
    imageUrl:
      "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    name: "Studio Yoga Oksywie",
    type: "Studio de yoga",
    description:
      "Cours de yoga et de relaxation en petits groupes pour les résidents, salle lumineuse au 2e étage du bâtiment B.",
    url: "https://example.com/studio-yoga",
    imageUrl:
      "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextShopId = shops.length + 1;

// Événements de la résidence (agenda simple)
let events = [
  {
    id: 1,
    title: "Réunion de copropriété – bâtiment A/B",
    date: "2026-02-10",
    time: "19:00",
    location: "Salle commune, rez-de-chaussée bâtiment B",
    description:
      "Point sur les travaux prévus, budget 2026 et questions des résidents.",
    imageUrl:
      "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Nettoyage de printemps des parties communes",
    date: "2026-03-23",
    time: "10:00",
    location: "Hall d'entrée principal",
    description:
      "Petit nettoyage collectif des abords de l’immeuble, suivi d’un café entre voisins.",
    imageUrl:
      "https://images.pexels.com/photos/6195127/pexels-photo-6195127.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Intervention technique ascenseur bâtiment A",
    date: "2026-01-15",
    time: "09:00",
    location: "Bâtiment A",
    description:
      "Maintenance préventive de l’ascenseur. Des coupures ponctuelles de service sont à prévoir dans la matinée.",
    imageUrl:
      "https://images.pexels.com/photos/134469/pexels-photo-134469.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextEventId = events.length + 1;

// Signalements (problèmes dans la résidence)
let reports = [
  {
    id: 1,
    category: "Éclairage",
    title: "Ampoule HS au 3e étage, cage B",
    description:
      "L’ampoule du couloir entre les appartements 34 et 35 ne s’allume plus.",
    status: "ouvert",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/220118/pexels-photo-220118.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    category: "Propreté",
    title: "Sacs poubelle abandonnés près du local à vélos",
    description:
      "Plusieurs sacs ont été laissés devant la porte du local à vélos, odeurs désagréables.",
    status: "en cours",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/3735210/pexels-photo-3735210.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    category: "Nuisances sonores",
    title: "Bruit de perceuse tôt le matin",
    description:
      "Travaux répétés entre 7h et 8h dans le bâtiment A, plusieurs jours de suite.",
    status: "clos",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/5691515/pexels-photo-5691515.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextReportId = reports.length + 1;

// Petits services entre voisins (aide, prêt de matériel, etc.)
let neighborServices = [
  {
    id: 1,
    kind: "offre",
    title: "Propose aide pour porter les courses",
    description:
      "Je peux aider les voisins des étages hauts à monter leurs courses le soir en semaine.",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    kind: "demande",
    title: "Recherche baby-sitting ponctuel",
    description:
      "Couple avec un enfant de 4 ans, cherche baby-sitter de confiance dans l’immeuble 1 à 2 soirs par mois.",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/5088188/pexels-photo-5088188.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    kind: "offre",
    title: "Prêt d’outils de bricolage",
    description:
      "Perceuse, visseuse, petite caisse à outils disponibles le week-end sur demande.",
    createdAt: new Date().toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

let nextServiceId = neighborServices.length + 1;

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

// --- Routes locales pour la résidence, les annonces et les commerces ---

// Infos résidence – utilisé par la carte "Présentation de la résidence"
app.get("/api/residence", (req, res) => {
  res.json(residenceInfo);
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
    if (!["32", "145"].includes(line)) {
      return res.status(400).json({ error: "Ligne non supportée. Utilise 32 ou 145." });
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

