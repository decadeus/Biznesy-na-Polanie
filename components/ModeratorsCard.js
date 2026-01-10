// Carte de gestion des modérateurs (visible pour SEO et Admin)

function ModeratorsCard(props) {
  const { role, moderators, error, onAdd, onRemove } = props;
  if (role !== "super_admin" && role !== "admin") return null;

  const items = Array.isArray(moderators) ? moderators : [];

  return e(
    "div",
    { className: "card card-wrapper moderators-card" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e("span", null, "Modération"),
          " ",
          e(
            "span",
            { style: { marginLeft: 6, fontSize: 12 } },
            role === "super_admin" ? "Super admin" : "Admin"
          )
        )
      ),
      error &&
        e(
          "div",
          { className: "page-section-error", style: { marginTop: 6 } },
          error
        ),
      e(
        "div",
        { className: "moderators-list" },
        items.length
          ? items.map((m) =>
              e(
                "div",
                { key: m.id, className: "moderator-pill" },
                e(
                  "div",
                  { className: "moderator-main" },
                  e("div", { className: "moderator-name" }, m.name),
                  e("div", { className: "moderator-email" }, m.email)
                ),
                e(
                  "button",
                  {
                    type: "button",
                    className: "moderator-remove",
                    onClick: () => onRemove && onRemove(m.id)
                  },
                  "×"
                )
              )
            )
          : e(
              "div",
              { className: "empty", style: { color: "#4b5563" } },
              "Aucun modérateur défini pour le moment."
            )
      ),
      e(
        "div",
        { className: "moderators-actions" },
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light",
            onClick: () => onAdd && onAdd()
          },
          "Ajouter / gérer les modérateurs"
        )
      )
    )
  );
}

