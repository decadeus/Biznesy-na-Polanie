// Modal pour afficher le détail d'une info résidence

function ResidencePostModal(props) {
  const { open, item, onClose, lang: rawLang } = props;
  if (!open || !item) return null;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (!date || Number.isNaN(date.getTime())) return "";
    const locale = lang === "pl" ? "pl-PL" : lang === "en" ? "en-GB" : "fr-FR";
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  const infoText = Array.isArray(item.practicalInfo)
    ? item.practicalInfo.join(" • ")
    : "";
  const dateText = formatDate(item.createdAt);

  return e(
    "div",
    { className: "modal-backdrop" },
    e(
      "div",
      { className: "modal-card" },
      e(
        "div",
        { className: "card card-wrapper" },
        e(
          "div",
          { className: "card-content" },
          e(
            "div",
            { className: "header" },
            e(
              "div",
              { className: "line-badge" },
              e("span", null, t(lang, "residence_modal_title"))
            ),
            e(
              "button",
              {
                type: "button",
                onClick: onClose,
                style: {
                  marginLeft: "8px",
                  padding: "3px 8px",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.6)",
                  background: "rgba(15,23,42,0.8)",
                  color: "#e5e7eb",
                  fontSize: "11px",
                  cursor: "pointer"
                }
              },
              t(lang, "modal_close")
            )
          ),
          e("div", { className: "divider" }),
          item.imageUrl &&
            e("div", {
              className: "announcement-modal-image",
              style: { backgroundImage: "url(" + item.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "announcement-modal-body" },
            e("h3", { className: "announcement-title" }, item.name || ""),
            e(
              "p",
              { className: "announcement-meta" },
              t(lang, "residence_post_tag"),
              dateText
                ? " • " +
                    t(lang, "post_published_on").replace("{date}", dateText)
                : ""
            ),
            item.address &&
              e("p", { className: "announcement-text" }, item.address),
            item.description &&
              e("p", { className: "announcement-text" }, item.description),
            infoText &&
              e("p", { className: "announcement-text" }, infoText)
          )
        )
      )
    )
  );
}
