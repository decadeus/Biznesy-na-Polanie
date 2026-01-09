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

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ items: classifieds }));
};

