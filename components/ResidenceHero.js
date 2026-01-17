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
    const residenceName =
      (residence && (residence.name || residence.displayName)) ||
      "Résidence Mały Kack";

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
            lang === "pl"
              ? "Witamy w " + residenceName
              : lang === "en"
              ? "Welcome to " + residenceName
              : "Bienvenue à " + residenceName
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
              lang === "pl"
                ? "Zaloguj się przez Facebooka"
                : lang === "en"
                ? "Log in with Facebook"
                : "Se connecter avec Facebook"
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