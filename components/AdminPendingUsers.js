// AdminPendingUsers : interface modérateurs pour valider / refuser les nouveaux comptes

function AdminPendingUsers() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function loadPending() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/pending-users");
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg =
          (data && data.error) ||
          "Impossible de charger les comptes en attente.";
        throw new Error(msg);
      }
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
      setError(
        err && err.message
          ? err.message
          : "Erreur lors du chargement des comptes en attente."
      );
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadPending();
  }, []);

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
          "Impossible de mettre à jour ce compte pour le moment.";
        throw new Error(msg);
      }
      setItems((prev) => (prev || []).filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setError(
        err && err.message
          ? err.message
          : "Erreur lors de la mise à jour de ce compte."
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
            e("span", null, "Validation des nouveaux comptes")
          )
        ),
        e(
          "div",
          { className: "admin-pending-body" },
          loading &&
            e(
              "p",
              { className: "admin-pending-loading" },
              "Chargement des demandes en cours..."
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
              "Aucune demande en attente pour le moment."
            ),
          !loading &&
            items &&
            items.length > 0 &&
            e(
              "div",
              { className: "admin-pending-list" },
              items.map((u) =>
                e(
                  "article",
                  { key: u.id, className: "admin-pending-card" },
                  e(
                    "div",
                    { className: "admin-pending-main" },
                    e("div", {
                      className: "admin-pending-avatar",
                      style: {
                        backgroundImage: u.avatarUrl
                          ? "url(" + u.avatarUrl + ")"
                          : "none"
                      }
                    }),
                    e(
                      "div",
                      { className: "admin-pending-text" },
                      e(
                        "h3",
                        { className: "admin-pending-name" },
                        u.name || "Utilisateur Facebook"
                      ),
                      u.createdAt &&
                        e(
                          "p",
                          { className: "admin-pending-date" },
                          "Demande créée le ",
                          new Date(u.createdAt).toLocaleString()
                        ),
                      u.facebookProfileUrl &&
                        e(
                          "p",
                          { className: "admin-pending-link" },
                          e(
                            "a",
                            {
                              href: u.facebookProfileUrl,
                              target: "_blank",
                              rel: "noreferrer"
                            },
                            "Voir le profil Facebook"
                          )
                        )
                    )
                  ),
                  e(
                    "div",
                    { className: "admin-pending-actions" },
                    e(
                      "button",
                      {
                        type: "button",
                        className: "btn-secondary",
                        onClick: () => actOnUser(u.id, "reject")
                      },
                      "Refuser"
                    ),
                    e(
                      "button",
                      {
                        type: "button",
                        className: "btn-primary",
                        onClick: () => actOnUser(u.id, "approve")
                      },
                      "Accepter"
                    )
                  )
                )
              )
            )
        )
      )
    )
  );
}

