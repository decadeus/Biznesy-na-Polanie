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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ items: neighborServices }));
};

