// Navigation admin/modo dans la colonne de gauche

function AdminNav(props) {
  const { current, onChange } = props;

  function item(key, label) {
    const active = current === key;
    return e(
      "button",
      {
        type: "button",
        className:
          "admin-nav-item" + (active ? " admin-nav-item-active" : ""),
        onClick: () => onChange && onChange(key)
      },
      label
    );
  }

  return e(
    "div",
    { className: "card card-wrapper admin-nav-card" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e("span", null, "Navigation admin")
        )
      ),
      e(
        "div",
        { className: "admin-nav-list" },
        item("dashboard", "Tableau de bord"),
        item("members", "Membres"),
        item("pendingUsers", "Validations comptes"),
        item("stats", "Statistiques")
      )
    )
  );
}

