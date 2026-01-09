const residenceInfo = {
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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(residenceInfo));
};

