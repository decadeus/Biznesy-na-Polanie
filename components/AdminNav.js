// Navigation admin/modo dans la colonne de gauche

function AdminNav(props) {
  const { current, onChange, pendingCount, lang: rawLang } = props;

  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

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
          e("span", null, t(lang, "admin_nav_label"))
        )
      ),
      e(
        "div",
        { className: "admin-nav-list" },
        item("members", t(lang, "admin_nav_members")),
        item(
          "pendingUsers",
          pendingCount && pendingCount > 0
            ? t(lang, "admin_nav_pending") + " (" + pendingCount + ")"
            : t(lang, "admin_nav_pending")
        ),
        item("stats", t(lang, "admin_nav_stats")),
        item("eventLog", t(lang, "admin_nav_eventlog"))
      )
    )
  );
}

