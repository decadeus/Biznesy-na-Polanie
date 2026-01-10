// Composant ClassifiedsRealEstate : liste des annonces immobilières

function ClassifiedsRealEstate(props) {
  const { classifieds, classifiedsError, onSelect, onOpenForm } = props;
  const immobiliers = (classifieds || []).filter(
    (c) => c.type === "immobilier"
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
                "Immobilier"
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
      e("h2", null, "Annonces immobilières"),
      e(
        "p",
        null,
        "Ventes, locations et colocations dans la résidence."
      ),
      onOpenForm &&
        e(
          "button",
          {
            type: "button",
            onClick: onOpenForm,
            className: "page-section-cta"
          },
          "Publier une annonce immo"
        )
    ),
    classifiedsError &&
      e(
        "div",
        { className: "page-section-error" },
        classifiedsError
      ),
    renderList(
      immobiliers,
      "Aucune annonce immobilière pour le moment."
    )
  );
}

