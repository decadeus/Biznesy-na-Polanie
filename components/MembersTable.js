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
    onAdd
  } = props;

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
  const membersOnly = filtered.filter((m) => m.role === "member");

  const totalPages = Math.max(1, Math.ceil(membersOnly.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageMembers = membersOnly.slice(startIndex, startIndex + pageSize);

  function renderRow(m) {
    const canPromoteToModerator =
      (role === "admin" || role === "super_admin") && m.role === "member";
    const canDemoteToMember =
      (role === "admin" || role === "super_admin") && m.role === "moderator";
    const canDelete =
      (role === "admin" || role === "super_admin") && m.role === "member";

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
        m.facebookProfileUrl
          ? e(
              "a",
              {
                href: m.facebookProfileUrl,
                target: "_blank",
                rel: "noreferrer"
              },
              "Voir le profil Facebook"
            )
          : m.email || "—"
      ),
      e(
        "td",
        null,
        e(
          "span",
          { className: "member-role member-role-" + m.role },
          m.role === "super_admin"
            ? "Super admin"
            : m.role === "admin"
            ? "Admin"
            : m.role === "moderator"
            ? "Modérateur"
            : "Membre"
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
              "Nommer modo"
            ),
          canDemoteToMember &&
            e(
              "button",
              {
                type: "button",
                className: "btn-secondary-light",
                onClick: () => onChangeRole && onChangeRole(m.id, "member")
              },
              "Rendre membre"
            ),
          canDelete &&
            e(
              "button",
              {
                type: "button",
                className: "btn-secondary-light",
                onClick: () => onDelete && onDelete(m.id)
              },
              "Supprimer"
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
            e("th", null, "Avatar"),
            e("th", null, "Surnom"),
            e("th", null, "Profil Facebook"),
            e("th", null, "Rôle"),
            e("th", null, "Actions")
          )
        ),
        e("tbody", null, items.map((m) => renderRow(m)))
      )
    );
  }

  return e(
    "section",
    { className: "page-section" },
    e("h2", null, "Membres de la résidence"),
    e(
      "p",
      { className: "page-section-text" },
      "Gestion simulée des résidents, des rôles et des modérateurs."
    ),
    e(
      "div",
      { className: "members-toolbar" },
      e("input", {
        type: "search",
        className: "members-search",
        placeholder: "Rechercher un membre (surnom ou profil)…",
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
          "Ajouter un membre"
        )
    ),
    loading &&
      e(
        "div",
        { className: "empty", style: { marginTop: 8 } },
        "Chargement des membres…"
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
        renderSection("Super admin (SEO)", seo),
        renderSection("Administrateurs", admins),
        renderSection("Modérateurs", moderators),
        renderSection(
          "Membres (page " + currentPage + " / " + totalPages + ")",
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
          "Précédent"
        ),
        e(
          "span",
          { className: "members-page-indicator" },
          "Page ",
          currentPage,
          " / ",
          totalPages
        ),
        e(
          "button",
          {
            type: "button",
            className: "btn-secondary-light",
            disabled: currentPage === totalPages,
            onClick: () => onChangePage && onChangePage(currentPage + 1)
          },
          "Suivant"
        )
      )
  );
}

