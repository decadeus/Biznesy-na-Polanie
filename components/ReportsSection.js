// Composant ReportsSection : signalements des résidents

function ReportsSection(props) {
  const { reports, reportsError, onOpenForm } = props;

  const items = Array.isArray(reports) ? reports : [];

  function renderList(list) {
    if (!list.length) {
      return e(
        "div",
        { className: "empty" },
        "Aucun signalement pour le moment."
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      list.map((r) =>
        e(
          "article",
          { key: r.id, className: "classified-item" },
          r.imageUrl &&
            e("div", {
              className: "classified-thumb",
              style: { backgroundImage: "url(" + r.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "classified-body" },
            e(
              "div",
              { className: "classified-title-row" },
              e("h3", { className: "classified-title" }, r.title),
              e(
                "span",
                { className: "classified-tag" },
                r.status ? r.status : "Signalement"
              )
            ),
            e(
              "p",
              { className: "classified-text" },
              r.category ? r.category + " — " : "",
              r.description || ""
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
      e("h2", null, "Signalements"),
      e(
        "p",
        null,
        "Signaler un problème dans la résidence (lumière, propreté, bruit…)."
      )
    ),
    reportsError &&
      e(
        "div",
        { className: "page-section-error" },
        reportsError
      ),
    renderList(items),
    e(
      "div",
      { className: "report-form-actions" },
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        "Nouveau signalement"
      )
    )
  );
}

