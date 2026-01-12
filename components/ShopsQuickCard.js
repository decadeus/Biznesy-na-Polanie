// Composant compact pour mettre en avant quelques commerçants dans la colonne de droite

function ShopsQuickCard(props) {
  const { shops, onSelect, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const list = Array.isArray(shops) ? shops : [];
  if (!list.length) return null;

  const featured = list; // on limite par le scroll, pas par le nombre

  return e(
    "div",
    { className: "card card-wrapper shops-quick-card" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e("span", null, t(lang, "shops_quick_title_main")),
          " ",
          e(
            "span",
            { style: { marginLeft: 6, fontSize: 12 } },
            t(lang, "shops_quick_title_suffix")
          )
        )
      ),
      e(
        "div",
        { className: "shops-quick-list" },
        featured.map((shop) =>
          e(
            "button",
            {
              key: shop.id,
              type: "button",
              className: "shops-quick-item",
              onClick: () => onSelect && onSelect(shop)
            },
            shop.imageUrl &&
              e("div", {
                className: "shops-quick-image",
                style: { backgroundImage: "url(" + shop.imageUrl + ")" }
              }),
            e(
              "div",
              { className: "shops-quick-main" },
              e(
                "div",
                { className: "shops-quick-name" },
                shop.name
              ),
              shop.type &&
                e(
                  "div",
                  { className: "shops-quick-type" },
                  shop.type
                ),
              shop.description &&
                e(
                  "div",
                  { className: "shops-quick-desc" },
                  shop.description
                )
            )
          )
        )
      )
    )
  );
}

