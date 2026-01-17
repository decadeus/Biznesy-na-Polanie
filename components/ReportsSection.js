// Composant ReportsSection : signalements des résidents

function ReportsSection(props) {
  const { reports, reportsError, onOpenForm, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  const items = Array.isArray(reports) ? reports : [];

  const defaultReportThumb =
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800";

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
      list.map((r) => {
        const thumbUrl = r.imageUrl || defaultReportThumb;
        return e(
          "article",
          { key: r.id, className: "classified-item" },
          e(CardAuthorHeader, {
            name: r.authorName,
            avatarUrl: r.authorAvatarUrl,
            role: r.authorRole,
            createdAt: r.createdAt
          }),
          e(
            "div",
            {
              className: "classified-thumb",
              style: { backgroundImage: "url(" + thumbUrl + ")" }
            },
            e("img", {
              src: thumbUrl,
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
              e("h3", { className: "classified-title" }, r.title),
              e(
                "span",
                { className: "classified-tag" },
                r.status ? r.status : t(lang, "reports_tag_default")
              )
            ),
            e(
              "p",
              { className: "classified-text" },
              r.category ? r.category + " — " : "",
              r.description || ""
            )
          )
        );
      })
    );
  }

  return e(
    "section",
    { className: "page-section", id: "section-reports" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "reports_section_title")),
      e(
        "p",
        null,
        t(lang, "reports_section_subtitle")
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        t(lang, "reports_section_cta")
      )
    ),
    reportsError &&
      e(
        "div",
        { className: "page-section-error" },
        reportsError
      ),
    renderList(items, t(lang, "reports_section_empty"))
  );
}

