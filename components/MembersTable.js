// Tableau des membres (simulation) avec recherche, pagination et gestion des rôles

function MembersTable(props) {
  const {
    members,
    loading,
    error,
    role,
    page,
    onChangePage,
    search,
    onSearchChange,
    onChangeRole,
    onDelete,
    onAdd,
    lang: rawLang
  } = props;

  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  const pageSize = 20;
  const list = Array.isArray(members) ? members : [];

  function normalize(str) {
    return (str || "").toString().toLowerCase();
  }

  const filtered = list.filter((m) => {
    if (!search) return true;
    const q = normalize(search);
    return (
      normalize(m.nickname).includes(q) ||
      normalize(m.email).includes(q) ||
      normalize(m.facebookProfileUrl).includes(q)
    );
  });

  const seo = filtered.filter((m) => m.role === "super_admin");
  const admins = filtered.filter((m) => m.role === "admin");
  const moderators = filtered.filter((m) => m.role === "moderator");
  // Les "membres" incluent désormais les rôles "member" (ancien) et "resident" (nouveau)
  const membersOnly = filtered.filter(
    (m) => m.role === "member" || m.role === "resident"
  );

  const totalPages = Math.max(1, Math.ceil(membersOnly.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageMembers = membersOnly.slice(startIndex, startIndex + pageSize);

  function renderRow(m) {
    const isBaseMember = m.role === "member" || m.role === "resident";
    const canPromoteToModerator =
      (role === "admin" || role === "super_admin") && isBaseMember;
    const canDemoteToMember =
      (role === "admin" || role === "super_admin") && m.role === "moderator";
    const canDelete =
      (role === "admin" || role === "super_admin") && isBaseMember;

    return e(
      "tr",
      { key: m.id },
      e(
        "td",
        null,
        e("div", {
          className: "member-avatar",
          style: { backgroundImage: "url(" + m.avatarUrl + ")" }
        })
      ),
      e("td", null, m.nickname),
      e(
        "td",
        null,
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light",
            disabled: !m.facebookProfileUrl,
            onClick: m.facebookProfileUrl
              ? () =>
                  window.open(
                    m.facebookProfileUrl,
                    "_blank",
                    "noopener,noreferrer"
                  )
              : undefined
          },
          t(lang, "members_btn_view_fb")
        )
      ),
      e(
        "td",
        null,
        e(
          "span",
          { className: "member-role member-role-" + m.role },
          m.role === "super_admin"
            ? t(lang, "members_role_super")
            : m.role === "admin"
            ? t(lang, "members_role_admin")
            : m.role === "moderator"
            ? t(lang, "members_role_moderator")
            : t(lang, "members_role_member")
        )
      ),
      e(
        "td",
        null,
        e(
          "div",
          { className: "member-actions" },
          canPromoteToModerator &&
            e(
              "button",
              {
                type: "button",
                className: "btn-secondary-light",
                onClick: () => onChangeRole && onChangeRole(m.id, "moderator")
              },
              t(lang, "members_btn_make_moderator")
            ),
          canDemoteToMember &&
            e(
              "button",
              {
                type: "button",
                className: "btn-secondary-light",
                onClick: () =>
                  onChangeRole && onChangeRole(m.id, "resident")
              },
              t(lang, "members_btn_make_member")
            ),
          canDelete &&
            e(
              "button",
              {
                type: "button",
                className: "btn-secondary-light",
                onClick: () => onDelete && onDelete(m.id)
              },
              t(lang, "members_btn_delete")
            )
        )
      )
    );
  }

  function renderSection(title, items) {
    if (!items.length) return null;
    return e(
      "div",
      { className: "member-section" },
      e("h3", { className: "member-section-title" }, title),
      e(
        "table",
        { className: "members-table" },
        e(
          "thead",
          null,
          e(
            "tr",
            null,
            e("th", null, t(lang, "members_th_avatar")),
            e("th", null, t(lang, "members_th_nickname")),
            e("th", null, t(lang, "members_th_profile")),
            e("th", null, t(lang, "members_th_role")),
            e("th", null, t(lang, "members_th_actions"))
          )
        ),
        e("tbody", null, items.map((m) => renderRow(m)))
      )
    );
  }

  return e(
    "section",
    { className: "page-section" },
    e("h2", null, t(lang, "members_title")),
    e(
      "p",
      { className: "page-section-text" },
      t(lang, "members_subtitle")
    ),
    e(
      "div",
      { className: "members-toolbar" },
      e("input", {
        type: "search",
        className: "members-search",
        placeholder: t(lang, "members_search_placeholder"),
        value: search,
        onChange: (ev) => onSearchChange && onSearchChange(ev.target.value)
      }),
      (role === "admin" || role === "super_admin") &&
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light members-add-btn",
            onClick: () => onAdd && onAdd()
          },
          t(lang, "members_add_btn")
        )
    ),
    loading &&
      e(
        "div",
        { className: "empty", style: { marginTop: 8 } },
        t(lang, "members_loading")
      ),
    error &&
      e(
        "div",
        { className: "page-section-error" },
        error
      ),
    !loading &&
      !error &&
      e(
        "div",
        { className: "members-sections" },
        renderSection(t(lang, "members_section_super"), seo),
        renderSection(t(lang, "members_section_admins"), admins),
        renderSection(t(lang, "members_section_mods"), moderators),
        renderSection(
          t(lang, "members_section_members")
            .replace("{page}", String(currentPage))
            .replace("{total}", String(totalPages)),
          pageMembers
        )
      ),
    !loading &&
      !error &&
      totalPages > 1 &&
      e(
        "div",
        { className: "members-pagination" },
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light",
            disabled: currentPage === 1,
            onClick: () => onChangePage && onChangePage(currentPage - 1)
          },
          t(lang, "members_pager_prev")
        ),
        e(
          "span",
          { className: "members-page-indicator" },
          t(lang, "members_pager_label")
            .replace("{page}", String(currentPage))
            .replace("{total}", String(totalPages))
        ),
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light",
            disabled: currentPage === totalPages,
            onClick: () => onChangePage && onChangePage(currentPage + 1)
          },
          t(lang, "members_pager_next")
        )
      )
  );
}

