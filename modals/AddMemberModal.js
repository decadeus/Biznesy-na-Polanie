// Modal pour ajouter un membre (email + rôle)

function AddMemberModal(props) {
  const { open, creating, onSubmit, onClose, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("member");

  React.useEffect(() => {
    if (open) {
      setEmail("");
      setRole("member");
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      alert(t(lang, "add_member_alert_missing"));
      return;
    }
    onSubmit && onSubmit({ email: email.trim(), role });
  }

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
              e("span", null, t(lang, "add_member_modal_title"))
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
          e(
            "form",
            { className: "classified-form", onSubmit: handleSubmit },
            e(
              "div",
              { className: "classified-form-row" },
              e(
                "div",
                { className: "classified-form-col" },
              e("label", null, t(lang, "add_member_label_fb")),
                e("input", {
                type: "url",
                  value: email,
                  onChange: (ev) => setEmail(ev.target.value),
                placeholder: t(lang, "add_member_placeholder_fb"),
                  required: true
                })
              ),
              e(
                "div",
                { className: "classified-form-col" },
                e("label", null, t(lang, "add_member_role_label")),
                e(
                  "select",
                  {
                    value: role,
                    onChange: (ev) => setRole(ev.target.value)
                  },
                  e(
                    "option",
                    { value: "member" },
                    t(lang, "add_member_role_member")
                  ),
                  e(
                    "option",
                    { value: "admin" },
                    t(lang, "add_member_role_admin")
                  ),
                  e(
                    "option",
                    { value: "moderator" },
                    t(lang, "add_member_role_moderator")
                  )
                )
              )
            ),
            e(
              "div",
              { className: "classified-form-actions" },
              e(
                "button",
                {
                  type: "submit",
                  className: "btn-primary",
                  disabled: creating
                },
                creating
                  ? t(lang, "add_member_submit_loading")
                  : t(lang, "add_member_submit")
              )
            )
          )
        )
      )
    )
  );
}

