// Composant ProfileBar : affichage du profil (édition via popup)

function ProfileBar(props) {
  const { name, avatarUrl, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

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
      e(
        "div",
        { className: "profile-name" },
        name || t(lang, "profile_default_name")
      ),
      null
    ),
    e(
      "div",
      { className: "profile-users" },
      e("span", { className: "profile-users-count" }, "235"),
      " " + t(lang, "profile_members_label")
    )
  );
}

