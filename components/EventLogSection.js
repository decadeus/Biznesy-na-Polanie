// Journal d'activité privé (accès par mot de passe simple)

function EventLogSection(props) {
  const lang = (props && props.lang) || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const locale = lang === "pl" ? "pl-PL" : lang === "en" ? "en-GB" : "fr-FR";

  const [password, setPassword] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(function () {
    try {
      return window.localStorage.getItem("eventLogUnlocked") === "true";
    } catch (e) {
      return false;
    }
  });
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState(null);

  function rememberUnlock(value) {
    try {
      window.localStorage.setItem("eventLogUnlocked", value ? "true" : "false");
    } catch (e) {}
  }

  function handleUnlock(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    if (String(password || "").trim() === "1010") {
      setUnlocked(true);
      setError(null);
      rememberUnlock(true);
    } else {
      setError(t(lang, "event_log_password_error"));
    }
  }

  async function loadEvents() {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await fetch("/api/admin/event-log");
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg =
          (data && data.error) || t(lang, "event_log_error_load");
        throw new Error(msg);
      }
      setItems(data && Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
      setLoadError(
        err && err.message ? err.message : t(lang, "event_log_error_load")
      );
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (unlocked) loadEvents();
  }, [unlocked]);

  function formatItemLabel(item) {
    const name = item && item.actorName ? item.actorName : t(lang, "event_log_actor_unknown");
    const postType =
      item && item.postType
        ? t(lang, "event_log_post_type_" + item.postType)
        : t(lang, "event_log_post_type_other");
    const title =
      item && item.title
        ? item.title
        : t(lang, "event_log_post_title_fallback");

    if (item && item.eventType === "signup") {
      return t(lang, "event_log_item_signup").replace("{name}", name);
    }
    if (item && item.eventType === "post_created") {
      return t(lang, "event_log_item_post")
        .replace("{name}", name)
        .replace("{type}", postType)
        .replace("{title}", title);
    }
    return t(lang, "event_log_item_unknown");
  }

  function renderItems() {
    if (loading) {
      return e(
        "p",
        { className: "event-log-loading" },
        t(lang, "event_log_loading")
      );
    }
    if (loadError) {
      return e("div", { className: "event-log-error" }, loadError);
    }
    if (!items || items.length === 0) {
      return e(
        "p",
        { className: "event-log-empty" },
        t(lang, "event_log_empty")
      );
    }
    return e(
      "div",
      { className: "event-log-list" },
      items.map((item) =>
        e(
          "div",
          { key: item.id || Math.random(), className: "event-log-item" },
          e(
            "div",
            { className: "event-log-item-date" },
            item && item.createdAt
              ? new Date(item.createdAt).toLocaleString(locale)
              : "—"
          ),
          e(
            "div",
            { className: "event-log-item-text" },
            formatItemLabel(item)
          )
        )
      )
    );
  }

  return e(
    "div",
    { className: "event-log-shell" },
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
            e("span", null, t(lang, "event_log_title"))
          )
        ),
        e(
          "p",
          { className: "event-log-subtitle" },
          t(lang, "event_log_subtitle")
        ),
        !unlocked
          ? e(
              "form",
              { className: "event-log-lock", onSubmit: handleUnlock },
              e(
                "label",
                { className: "event-log-label" },
                t(lang, "event_log_password_label")
              ),
              e("input", {
                type: "password",
                className: "event-log-input",
                value: password,
                onChange: function (ev) {
                  setPassword(ev && ev.target ? ev.target.value : "");
                },
                placeholder: t(lang, "event_log_password_placeholder")
              }),
              error && e("div", { className: "event-log-error" }, error),
              e(
                "button",
                { type: "submit", className: "btn-secondary" },
                t(lang, "event_log_unlock")
              )
            )
          : e(
              "div",
              { className: "event-log-body" },
              e(
                "div",
                { className: "event-log-actions" },
                e(
                  "button",
                  {
                    type: "button",
                    className: "btn-secondary-light",
                    onClick: loadEvents
                  },
                  t(lang, "event_log_refresh")
                )
              ),
              renderItems()
            )
      )
    )
  );
}

