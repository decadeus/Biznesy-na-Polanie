// Composant EventsSection : agenda des événements de la résidence

function EventsSection(props) {
  const { events, eventsError, onOpenForm } = props;
  const items = Array.isArray(events) ? events : [];

  function renderList(list) {
    if (!list.length) {
      return e(
        "div",
        { className: "empty" },
        "Aucun événement à venir pour le moment."
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      list.map((ev) =>
        e(
          "article",
          { key: ev.id, className: "classified-item" },
          ev.imageUrl &&
            e("div", {
              className: "classified-thumb",
              style: { backgroundImage: "url(" + ev.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "classified-body" },
            e(
              "div",
              { className: "classified-title-row" },
              e("h3", { className: "classified-title" }, ev.title),
              e(
                "span",
                { className: "classified-tag" },
                "Événement"
              )
            ),
            e(
              "p",
              { className: "classified-text" },
              (ev.date ? ev.date : ""),
              ev.time ? " • " + ev.time : "",
              ev.location ? " • " + ev.location : "",
              ev.description ? " — " + ev.description : ""
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
      e("h2", null, "Événements de la résidence"),
      e(
        "p",
        null,
        "Réunions, travaux programmés et moments conviviaux."
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        "Créer un événement"
      )
    ),
    eventsError &&
      e(
        "div",
        { className: "page-section-error" },
        eventsError
      ),
    renderList(items)
  );
}

