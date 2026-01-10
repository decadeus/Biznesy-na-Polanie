// Composant ProfileBar : affichage du profil (édition via popup)

function ProfileBar(props) {
  const { name, avatarUrl } = props;

  return e(
    "div",
    { className: "profile-bar" },
    e(
      "div",
      { className: "profile-avatar-wrapper" },
      e("div", {
        className: "profile-avatar",
        style: {
          backgroundImage: "url(" + avatarUrl + ")"
        }
      })
    ),
    e(
      "div",
      { className: "profile-main" },
      e("div", { className: "profile-name" }, name || "Résident de Mały Kack"),
      null
    ),
    e(
      "div",
      { className: "profile-users" },
      e("span", { className: "profile-users-count" }, "235"),
      " membres"
    )
  );
}

