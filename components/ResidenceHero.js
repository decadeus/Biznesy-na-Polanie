// Composant ResidenceHero : hero simple sur la page d'accueil

function ResidenceHero(props) {
    const {
      residence,
      residenceError,
      classifieds,
      authError,
      lang: rawLang,
      onFacebookLogin
    } = props;
  
    const lang = rawLang || "fr";
    const t =
      window.i18n && window.i18n.t
        ? window.i18n.t
        : function (_lang, key) {
            return key;
          };
    const residenceName =
      (residence && (residence.name || residence.displayName)) ||
      t(lang, "hero_residence_fallback_name");

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