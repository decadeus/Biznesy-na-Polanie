// Modal pour ajouter une info résidence

function ResidenceModal(props) {
  const { open, saving, error, onSubmit, onClose, lang } = props;
  if (!open) return null;
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

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
              e(
                "span",
                null,
                t(lang || "fr", "residence_modal_new")
              )
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
              t(lang || "fr", "modal_close")
            )
          ),
          e("div", { className: "divider" }),
          e(ResidenceAdminForm, {
            saving,
            error,
            onSave: onSubmit,
            lang
          })
        )
      )
    )
  );
}
