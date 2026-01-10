// Modal pour ajouter un membre (email + rôle)

function AddMemberModal(props) {
  const { open, creating, onSubmit, onClose } = props;
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
      alert("Merci de saisir l'URL du profil Facebook du membre.");
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
              e("span", null, "Ajouter un membre")
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
              "Fermer"
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
              e("label", null, "URL du profil Facebook"),
                e("input", {
                type: "url",
                  value: email,
                  onChange: (ev) => setEmail(ev.target.value),
                placeholder: "https://www.facebook.com/...",
                  required: true
                })
              ),
              e(
                "div",
                { className: "classified-form-col" },
                e("label", null, "Rôle"),
                e(
                  "select",
                  {
                    value: role,
                    onChange: (ev) => setRole(ev.target.value)
                  },
                  e("option", { value: "member" }, "Membre"),
                  e("option", { value: "admin" }, "Admin"),
                  e("option", { value: "moderator" }, "Modérateur")
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
                creating ? "Ajout..." : "Ajouter"
              )
            )
          )
        )
      )
    )
  );
}

