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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ items: events }));
};

