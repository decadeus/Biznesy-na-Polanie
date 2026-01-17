// Composant ClassifiedsBoard : deux zones de listes (immobilier / diverses)

function ClassifiedsBoard(props) {
  const { classifieds, classifiedsError, onOpenForm, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  const immobiliers = classifieds.filter((c) => c.type === "immobilier");
  const divers = classifieds.filter((c) => c.type !== "immobilier");

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
      { className: "classifieds-list" },
      items.slice(0, 5).map((item) =>
        e(
          "article",
          { key: item.id, className: "classified-item" },
          e(
            "div",
            {
              className: "classified-thumb",
              style: {
                backgroundImage: "url(" + (item.imageUrl || "") + ")"
              }
            },
            item.imageUrl &&
              e("img", {
                src: item.imageUrl,
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
              e("h3", { className: "classified-title" }, item.title),
              e(
                "span",
                { className: "classified-tag" },
                item.type === "immobilier"
                  ? t(lang, "re_tag")
                  : t(lang, "classifieds_board_tag_other")
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
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "classifieds_board_title")),
      e(
        "p",
        null,
        t(lang, "classifieds_board_subtitle")
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        t(lang, "classifieds_board_cta")
      )
    ),
    classifiedsError &&
      e(
        "div",
        { className: "page-section-error" },
        classifiedsError
      ),
    e(
      "div",
      { className: "classifieds-grid" },
      e(
        "div",
        { className: "classifieds-block" },
          e(
            "h3",
            { className: "classifieds-column-title" },
            t(lang, "classifieds_board_realestate_title")
          ),
        renderList(
          immobiliers,
          t(lang, "classifieds_board_realestate_empty")
        )
      ),
      e(
        "div",
        { className: "classifieds-block" },
        e(
          "h3",
          { className: "classifieds-column-title" },
            t(lang, "classifieds_board_neighbors_title")
        ),
        renderList(
          divers,
          t(lang, "classifieds_board_neighbors_empty")
        )
      )
    )
  );
}

