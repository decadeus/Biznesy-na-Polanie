// CardAuthorHeader : avatar + nom + date de publication pour les cartes (annonces, événements, etc.)

function CardAuthorHeader(props) {
  const defaultAvatar =
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200";

  const name = props.name || "Résident de Mały Kack";
  const avatarUrl = props.avatarUrl || defaultAvatar;
  const role = props.role || "resident"; // resident, admin, super_admin, moderator

  let dateLabel = null;
  if (props.createdAt) {
    try {
      dateLabel = new Date(props.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch (e) {
      dateLabel = null;
    }
  }

  return e(
    "div",
    { className: "card-author" },
    e("div", {
      className: "card-author-avatar role-" + (role || "resident"),
      style: { backgroundImage: "url(" + avatarUrl + ")" }
    }),
    e(
      "div",
      { className: "card-author-meta" },
      e("div", { className: "card-author-name" }, name),
      dateLabel &&
        e(
          "div",
          { className: "card-author-date" },
          "Publié le " + dateLabel
        )
    )
  );
}

