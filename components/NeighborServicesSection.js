// Composant NeighborServicesSection : petits services entre voisins

function NeighborServicesSection(props) {
  const { services, servicesError, onOpenForm, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  const items = Array.isArray(services) ? services : [];

  const defaultServiceThumb =
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800";

  function renderList(list) {
    if (!list.length) {
      return e(
        "div",
        { className: "empty" },
        t(lang, "services_section_empty")
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      list.map((s) => {
        const thumbUrl = s.imageUrl || defaultServiceThumb;
        return e(
          "article",
          { key: s.id, className: "classified-item" },
          e(CardAuthorHeader, {
            name: s.authorName,
            avatarUrl: s.authorAvatarUrl,
            role: s.authorRole,
            createdAt: s.createdAt
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
              e("h3", { className: "classified-title" }, s.title),
              e(
                "span",
                {
                  className: "classified-tag"
                },
                s.kind === "demande"
                  ? t(lang, "services_tag_request")
                  : t(lang, "services_tag_offer")
              )
            ),
            e(
              "p",
              { className: "classified-text" },
              s.description || ""
            )
          )
        );
      })
    );
  }

  return e(
    "section",
    { className: "page-section", id: "section-services" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "services_section_title")),
      e(
        "p",
        null,
        t(lang, "services_section_subtitle")
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        t(lang, "services_section_cta")
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

