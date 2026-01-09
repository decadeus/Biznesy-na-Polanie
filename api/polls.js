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
    title:
      "Êtes-vous intéressé(e) par un groupe de covoiturage vers Gdynia centre ?",
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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ items: polls }));
};

