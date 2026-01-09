// Composant ShopsSection : liste les commerces de la résidence
// (création / édition des fiches sera gérée plus tard via Supabase pour les comptes "commerçants")

function ShopsSection(props) {
  const { shops, shopsError, isMerchant, merchantShopId } = props;

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, "Commerçants dans la résidence"),
      e(
        "p",
        null,
        "Magasin vegan, coiffeur et autres commerces situés dans ou au pied des immeubles."
      )
    ),
    shopsError &&
      e(
        "div",
        { className: "page-section-error" },
        shopsError
      ),
    e(
      "div",
      { className: "classifieds-list" },
      (shops || []).length
        ? shops.map((shop) =>
            e(
              "article",
              { key: shop.id, className: "classified-item" },
              shop.imageUrl &&
                e("div", {
                  className: "classified-thumb",
                  style: { backgroundImage: "url(" + shop.imageUrl + ")" }
                }),
              e(
                "div",
                { className: "classified-body" },
                e(
                  "div",
                  { className: "classified-title-row" },
                  e(
                    "h3",
                    { className: "classified-title" },
                    shop.name
                  ),
                  e(
                    "span",
                    { className: "classified-tag" },
                    shop.type
                  )
                ),
                e(
                  "p",
                  { className: "classified-text" },
                  shop.description
                ),
                shop.url &&
                  e(
                    "p",
                    { className: "classified-price" },
                    shop.url
                    ),
                  isMerchant &&
                    shop.id === merchantShopId &&
                    e(
                      "button",
                      {
                        type: "button",
                        className: "shop-edit-btn",
                        onClick: () =>
                          alert(
                            "Simulation: ici le commerçant pourrait modifier sa fiche via Supabase."
                          )
                      },
                      "Modifier ma fiche"
                    )
              )
            )
          )
        : e(
            "div",
            { className: "empty", style: { color: "#4b5563" } },
            "Les fiches commerçants seront gérées par les modérateurs."
          )
    ),
    e(
      "p",
      {
        className: "page-section-text",
        style: { marginTop: "10px", fontSize: "12px", color: "#9ca3af" }
      },
      "L’ajout et la modification des commerces seront réservés aux comptes commerçants/administration (via Supabase)."
    )
  );
}

