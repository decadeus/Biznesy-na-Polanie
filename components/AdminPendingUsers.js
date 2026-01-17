// AdminPendingUsers : interface modérateurs pour valider / refuser les nouveaux comptes

function AdminPendingUsers(props) {
  const lang = (props && props.lang) || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const locale = lang === "pl" ? "pl-PL" : lang === "en" ? "en-GB" : "fr-FR";
  const defaultAvatar =
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200";
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 900 : false;

  async function loadPending() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/pending-users");
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg =
          (data && data.error) ||
          t(lang, "admin_pending_error_load");
        throw new Error(msg);
      }
      const list = Array.isArray(data.items) ? data.items : [];
      setItems(list);
      if (props && typeof props.onCountChange === "function") {
        props.onCountChange(list.length);
      }
    } catch (err) {
      console.error(err);
      setError(
        err && err.message
          ? err.message
          : t(lang, "admin_pending_error_load_generic")
      );
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadPending();
  }, []);

  function renderRow(u) {
    return e(
      "tr",
      { key: u.id },
      e(
        "td",
        null,
        e("div", {
          className: "member-avatar",
          style: {
            backgroundImage:
              "url(" + (u.avatarUrl || defaultAvatar) + ")"
          }
        })
      ),
      e("td", null, u.name || t(lang, "admin_pending_user_fallback")),
      e(
        "td",
        null,
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light",
            disabled: !u.facebookProfileUrl,
            onClick: u.facebookProfileUrl
              ? () =>
                  window.open(
                    u.facebookProfileUrl,
                    "_blank",
                    "noopener,noreferrer"
                  )
              : undefined
          },
          t(lang, "admin_pending_view_fb")
        )
      ),
      e(
        "td",
        null,
        u.createdAt
          ? new Date(u.createdAt).toLocaleDateString(locale, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })
          : "—"
      ),
      e(
        "td",
        null,
        e(
          "div",
          { className: "member-actions" },
          e(
            "button",
            {
              type: "button",
              className: "btn-secondary-light",
              onClick: () => actOnUser(u.id, "reject")
            },
            t(lang, "admin_pending_reject")
          ),
          e(
            "button",
            {
              type: "button",
              className: "btn-secondary",
              onClick: () => actOnUser(u.id, "approve")
            },
            t(lang, "admin_pending_accept")
          )
        )
      )
    );
  }

  async function actOnUser(id, action) {
    try {
      setError(null);
      const res = await fetch(`/api/admin/users/${id}/${action}`, {
        method: "POST"
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg =
          (data && data.error) ||
          t(lang, "admin_pending_error_update");
        throw new Error(msg);
      }
      setItems((prev) => {
        const next = (prev || []).filter((u) => u.id !== id);
        if (props && typeof props.onCountChange === "function") {
          props.onCountChange(next.length);
        }
        return next;
      });
    } catch (err) {
      console.error(err);
      setError(
        err && err.message
          ? err.message
          : t(lang, "admin_pending_error_update_generic")
      );
    }
  }

  return e(
    "div",
    { className: "admin-pending-shell" },
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
            e("span", null, t(lang, "admin_pending_title"))
          )
        ),
        e(
          "div",
          { className: "admin-pending-body" },
          loading &&
            e(
              "p",
              { className: "admin-pending-loading" },
              t(lang, "admin_pending_loading")
            ),
          error &&
            e(
              "div",
              { className: "admin-pending-error" },
              error
            ),
          !loading &&
            (!items || items.length === 0) &&
            !error &&
            e(
              "p",
              { className: "admin-pending-empty" },
              t(lang, "admin_pending_empty")
            ),
          !loading &&
            items &&
            items.length > 0 &&
            (isMobile
              ? e(
                  "div",
                  { className: "member-section member-section-mobile" },
                  e(
                    "h3",
                    { className: "member-section-title" },
                    t(lang, "admin_pending_count").replace(
                      "{n}",
                      String(items.length)
                    )
                  ),
                  e(
                    "div",
                    { className: "member-cards" },
                    items.map((u) =>
                      e(
                        "div",
                        { key: u.id, className: "member-card" },
                        e(
                          "div",
                          { className: "member-card-header" },
                          e("div", {
                            className: "member-avatar",
                            style: {
                              backgroundImage:
                                "url(" + (u.avatarUrl || defaultAvatar) + ")"
                            }
                          }),
                          e(
                            "div",
                            { className: "member-card-main" },
                            e(
                              "div",
                              { className: "member-card-name" },
                              u.name || t(lang, "admin_pending_user_fallback")
                            ),
                            e(
                              "div",
                              { className: "member-card-date" },
                              u.createdAt
                                ? new Date(u.createdAt).toLocaleDateString(
                                    locale,
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric"
                                    }
                                  )
                                : "—"
                            )
                          )
                        ),
                        e(
                          "div",
                          { className: "member-card-body" },
                          e(
                            "button",
                            {
                              type: "button",
                              className:
                                "btn-secondary-light member-card-fb",
                              disabled: !u.facebookProfileUrl,
                              onClick: u.facebookProfileUrl
                                ? () =>
                                    window.open(
                                      u.facebookProfileUrl,
                                      "_blank",
                                      "noopener,noreferrer"
                                    )
                                : undefined
                            },
                            t(lang, "admin_pending_view_fb")
                          )
                        ),
                        e(
                          "div",
                          { className: "member-card-actions" },
                          e(
                            "button",
                            {
                              type: "button",
                              className: "btn-secondary-light",
                              onClick: () => actOnUser(u.id, "reject")
                            },
                            t(lang, "admin_pending_reject")
                          ),
                          e(
                            "button",
                            {
                              type: "button",
                              className: "btn-secondary",
                              onClick: () => actOnUser(u.id, "approve")
                            },
                            t(lang, "admin_pending_accept")
                          )
                        )
                      )
                    )
                  )
                )
              : e(
                  "div",
                  { className: "member-section" },
                  e(
                    "h3",
                    { className: "member-section-title" },
                    t(lang, "admin_pending_count").replace(
                      "{n}",
                      String(items.length)
                    )
                  ),
                  e(
                    "table",
                    { className: "members-table" },
                    e(
                      "thead",
                      null,
                      e(
                        "tr",
                        null,
                        e("th", null, t(lang, "admin_pending_table_avatar")),
                        e("th", null, t(lang, "admin_pending_table_name")),
                        e("th", null, t(lang, "admin_pending_table_fb")),
                        e("th", null, t(lang, "admin_pending_table_date")),
                        e("th", null, t(lang, "admin_pending_table_actions"))
                      )
                    ),
                    e("tbody", null, items.map((u) => renderRow(u)))
                  )
                ))
        )
      )
    )
  );
}

