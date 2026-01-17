// Composant ShopsSection : liste les commerces de la résidence
// (création / édition des fiches sera gérée plus tard via Supabase pour les comptes "commerçants")

function ShopsSection(props) {
  const { shops, shopsError, isMerchant, merchantShopId, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "shops_section_title")),
      e(
        "p",
        null,
        t(lang, "shops_section_subtitle")
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
              e(
                "div",
                {
                  className: "classified-thumb",
                  style: { backgroundImage: "url(" + (shop.imageUrl || "") + ")" }
                },
                shop.imageUrl &&
                  e("img", {
                    src: shop.imageUrl,
                    alt: "",
                    className: "classified-thumb-img"
                  })
              ),
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
                          t(lang, "shops_section_edit_simulation")
                          )
                      },
                    t(lang, "shops_section_edit_button")
                    )
              )
            )
          )
        : e(
            "div",
            { className: "empty", style: { color: "#4b5563" } },
            t(lang, "shops_section_empty")
          )
    ),
    e(
      "p",
      {
        className: "page-section-text",
        style: { marginTop: "10px", fontSize: "12px", color: "#9ca3af" }
      },
      t(lang, "shops_section_notice")
    )
  );
}

