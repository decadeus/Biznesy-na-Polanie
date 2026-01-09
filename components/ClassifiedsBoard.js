// Composant ClassifiedsBoard : deux zones de listes (immobilier / diverses)

function ClassifiedsBoard(props) {
  const { classifieds, classifiedsError, onOpenForm } = props;

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
          item.imageUrl &&
            e("div", {
              className: "classified-thumb",
              style: {
                backgroundImage: "url(" + item.imageUrl + ")"
              }
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
                item.type === "immobilier" ? "Immobilier" : "Divers"
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
      e("h2", null, "Annonces de la résidence"),
      e(
        "p",
        null,
        "Immobilier, locations, objets à vendre ou à donner entre voisins."
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        "Publier une annonce"
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
            "Annonces immobilières"
          ),
        renderList(
          immobiliers,
          "Aucune annonce immobilière pour le moment."
        )
      ),
      e(
        "div",
        { className: "classifieds-block" },
        e(
          "h3",
          { className: "classifieds-column-title" },
            "Annonces entre voisins"
        ),
        renderList(
          divers,
          "Aucune annonce d'objet ou diverse pour le moment."
        )
      )
    )
  );
}

