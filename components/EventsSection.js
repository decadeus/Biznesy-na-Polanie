// Composant EventsSection : agenda des événements de la résidence

function EventsSection(props) {
  const { events, eventsError, onOpenForm, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const items = Array.isArray(events) ? events : [];

  function renderList(list) {
    if (!list.length) {
      return e(
        "div",
        { className: "empty" },
        t(lang, "events_section_empty")
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      list.map((ev) =>
        e(
          "article",
          { key: ev.id, className: "classified-item" },
          e(CardAuthorHeader, {
            name: ev.authorName,
            avatarUrl: ev.authorAvatarUrl,
            role: ev.authorRole,
            // Pour les événements, on affiche plutôt la date de l'événement
            createdAt: ev.date || ev.createdAt
          }),
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
                t(lang, "events_tag")
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
    { className: "page-section", id: "section-events" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "events_section_title")),
      e(
        "p",
        null,
        t(lang, "events_section_subtitle")
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        t(lang, "events_section_cta")
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

