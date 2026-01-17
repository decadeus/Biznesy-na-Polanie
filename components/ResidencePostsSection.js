// Liste des infos de résidence (format "posts")

function ResidencePostsSection(props) {
  const {
    items,
    error,
    lang: rawLang,
    isAdmin,
    onDelete,
    onOpenForm,
    onSelect
  } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const list = Array.isArray(items) ? items : [];
  const defaultThumb =
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800";

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (!date || Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(lang === "pl" ? "pl-PL" : "fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function formatInfo(info) {
    if (!Array.isArray(info)) return "";
    return info.join(" • ");
  }

  return e(
    "section",
    { className: "page-section", id: "section-residence" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "residence_section_title")),
      e(
        "p",
        null,
        t(lang, "residence_section_lead")
      ),
      isAdmin &&
        e(
          "button",
          {
            type: "button",
            className: "page-section-cta",
            onClick: () => onOpenForm && onOpenForm()
          },
          t(lang, "residence_add_info_btn")
        )
    ),
    error &&
      e(
        "div",
        { className: "page-section-error" },
        error
      ),
    list.length
      ? e(
          "div",
          { className: "classifieds-cards-grid" },
          list.map((item) => {
            const infoText = formatInfo(item.practicalInfo);
            const dateText = formatDate(item.createdAt);
            const thumbUrl = item.imageUrl || defaultThumb;
            return e(
              "article",
              {
                key: item.id,
                className: "classified-item",
                onClick: () => onSelect && onSelect(item)
              },
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
                  e("h3", { className: "classified-title" }, item.name || ""),
                  e(
                    "span",
                    { className: "classified-tag" },
                    t(lang, "residence_post_tag")
                  )
                ),
                item.address &&
                  e("p", { className: "classified-text" }, item.address),
                item.description &&
                  e("p", { className: "classified-text" }, item.description),
                infoText &&
                  e("p", { className: "classified-text" }, infoText),
                dateText &&
                  e("div", { className: "card-author-date" }, dateText),
                isAdmin &&
                  e(
                    "div",
                    { className: "my-posts-actions" },
                    e(
                      "button",
                      {
                        type: "button",
                        className: "btn-danger-outline",
                        onClick: () => onDelete && onDelete(item)
                      },
                      t(lang, "members_btn_delete")
                    )
                  )
              )
            );
          })
        )
      : e(
          "p",
          { className: "page-section-text" },
          t(lang, "residence_posts_empty")
        )
  );
}
