// Composant ResidenceHero : hero simple sur la page d'accueil

function ResidenceHero(props) {
    const {
      residence,
      residenceError,
      classifieds,
      authError,
      lang: rawLang,
      onFacebookLogin,
      onProfileUrlLogin
    } = props;
  
    const lang = rawLang || "fr";
    const t =
      window.i18n && window.i18n.t
        ? window.i18n.t
        : function (_lang, key) {
            return key;
          };
    const residenceName = t(lang, "hero_residence_fallback_name");
    const [profileUrl, setProfileUrl] = React.useState("");

    return e(
      "div",
      { className: "hero-shell" },
      e(
        "div",
        { className: "hero-card" },
        e(
          "div",
          { className: "hero-welcome" },
          e(
            "h1",
            { className: "hero-welcome-title" },
            t(lang, "hero_welcome_prefix") + " " + residenceName
          ),
          onFacebookLogin &&
            e(
              "button",
              {
                type: "button",
                className: "hero-fb-btn",
                onClick: onFacebookLogin
              },
              e("span", { className: "public-topbar-icon-fb" }, "f"),
              t(lang, "topbar_login_fb")
            ),
          onProfileUrlLogin &&
            e(
              React.Fragment,
              null,
              e(
                "div",
                { className: "hero-subtitle" },
                t(lang, "public_profile_login_title")
              ),
              e(
                "div",
                { className: "hero-login-row" },
                e("input", {
                  type: "url",
                  className: "input hero-login-input",
                  placeholder: t(lang, "onboarding_profile_placeholder"),
                  value: profileUrl,
                  onChange: (ev) => setProfileUrl(ev.target.value)
                }),
                e(
                  "button",
                  {
                    type: "button",
                    className: "hero-cta-alt",
                    onClick: () => onProfileUrlLogin(profileUrl)
                  },
                  t(lang, "public_profile_login_submit")
                )
              )
            )
        ),
        e(
          "div",
          { className: "hero-image" },
          e("img", {
            className: "hero-image-inner",
            src: "/images/hero.jpeg",
            alt: residenceName
          })
        )
      )
    );
  }