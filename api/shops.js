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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ items: shops }));
};

