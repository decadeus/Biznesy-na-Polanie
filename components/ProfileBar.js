// Composant ProfileBar : permet de modifier le surnom et la photo de profil

function ProfileBar(props) {
  const { name, avatarUrl, onNameChange, onAvatarChange } = props;

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
      { className: "profile-fields" },
      e(
        "label",
        { className: "profile-field" },
        e("span", null, "Surnom"),
        e("input", {
          type: "text",
          value: name,
          onChange: (ev) => onNameChange(ev.target.value),
          placeholder: "Ton surnom dans la résidence"
        })
      ),
      e(
        "label",
        { className: "profile-field" },
        e("span", null, "Photo de profil (URL)"),
        e("input", {
          type: "url",
          value: avatarUrl,
          onChange: (ev) => onAvatarChange(ev.target.value),
          placeholder: "https://…"
        })
      )
    ),
    e(
      "div",
      { className: "profile-users" },
      "235 résidents utilisent cette app (simulation)"
    )
  );
}

