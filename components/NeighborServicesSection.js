// Composant NeighborServicesSection : petits services entre voisins

function NeighborServicesSection(props) {
  const { services, servicesError, onOpenForm } = props;

  const items = Array.isArray(services) ? services : [];

  function renderList(list) {
    if (!list.length) {
      return e(
        "div",
        { className: "empty" },
        "Aucun service proposé ou demandé pour le moment."
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      list.map((s) =>
        e(
          "article",
          { key: s.id, className: "classified-item" },
          e(CardAuthorHeader, {
            name: s.authorName,
            avatarUrl: s.authorAvatarUrl,
            role: s.authorRole,
            createdAt: s.createdAt
          }),
          s.imageUrl &&
            e("div", {
              className: "classified-thumb",
              style: { backgroundImage: "url(" + s.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "classified-body" },
            e(
              "div",
              { className: "classified-title-row" },
              e("h3", { className: "classified-title" }, s.title),
              e(
                "span",
                {
                  className: "classified-tag"
                },
                s.kind === "demande" ? "Demande" : "Offre"
              )
            ),
            e(
              "p",
              { className: "classified-text" },
              s.description || ""
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
      e("h2", null, "Petits services entre voisins"),
      e(
        "p",
        null,
        "Covoiturage, baby-sitting, aide ponctuelle, prêt d’outils…"
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        "Publier un service"
      )
    ),
    servicesError &&
      e(
        "div",
        { className: "page-section-error" },
        servicesError
      ),
    renderList(items)
  );
}

