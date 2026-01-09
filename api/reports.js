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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ items: reports }));
};

