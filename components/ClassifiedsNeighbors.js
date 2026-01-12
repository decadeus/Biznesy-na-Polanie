// Composant ClassifiedsNeighbors : annonces diverses entre voisins

function ClassifiedsNeighbors(props) {
  const { classifieds, classifiedsError, onOpenForm, onSelect, lang: rawLang } =
    props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const divers = (classifieds || []).filter(
    (c) => c.type !== "immobilier"
  );

  function renderList(items, emptyLabel) {
    if (!items || items.length === 0) {
      return e(
        "div",
        { className: "empty" },
        emptyLabel
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      items.map((item) =>
        e(
          "article",
          {
            key: item.id,
            className: "classified-item",
            onClick: () => onSelect && onSelect(item)
          },
          e(CardAuthorHeader, {
            name: item.authorName,
            avatarUrl: item.authorAvatarUrl,
            role: item.authorRole,
            createdAt: item.createdAt
          }),
          item.imageUrl &&
            e("div", {
              className: "classified-thumb",
              style: { backgroundImage: "url(" + item.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "classified-body" },
            e(
              "div",
              { className: "classified-title-row" },
              e("h3", { className: "classified-title" }, item.title),
              e(
                "span",
                { className: "classified-tag" },
                t(lang, "neigh_tag")
              )
            ),
            e(
              "p",
              { className: "classified-text" },
              item.description
            ),
            item.price != null &&
              e(
                "p",
                { className: "classified-price" },
                item.price + " " + (item.currency || "PLN")
              )
          )
        )
      )
    );
  }

  return e(
    "section",
    { className: "page-section", id: "section-neighbors" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "neigh_section_title")),
      e(
        "p",
        null,
        t(lang, "neigh_section_subtitle")
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        t(lang, "neigh_section_cta")
      )
    ),
    classifiedsError &&
      e(
        "div",
        { className: "page-section-error" },
        classifiedsError
      ),
    renderList(
      divers,
      t(lang, "neigh_section_empty")
    )
  );
}

