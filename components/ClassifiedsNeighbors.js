// Composant ClassifiedsNeighbors : annonces diverses entre voisins

function ClassifiedsNeighbors(props) {
  const { classifieds, classifiedsError, onOpenForm, onSelect } = props;
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
                "Entre voisins"
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
      e("h2", null, "Annonces entre voisins"),
      e(
        "p",
        null,
        "Objets à vendre ou à donner, services, cours, entraide dans l’immeuble."
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
    renderList(
      divers,
      "Aucune annonce entre voisins pour le moment."
    )
  );
}

