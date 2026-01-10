// Composant ResidenceHero : hero simple sur la page d'accueil

function ResidenceHero(props) {
    const {
      residence,
      residenceError,
      classifieds,
      onOpenOnboarding,
      onProfileLogin,
      onSupabaseLogin,
      onDevLogin,
      authError
    } = props;
  
    const heroTitle = "Résidence Strzelców 42/40 – Mały Kack, Gdynia";
  
    return e(
      "div",
      { className: "hero-shell" },
      e(
        "div",
        { className: "hero-card" },
        e(
          "div",
          { className: "hero-image" },
          e("div", { className: "hero-image-inner" })
        ),
        e(
          "div",
          { className: "hero-content" },
          e(
            "div",
            { className: "hero-heading" },
            e(
              "div",
              { className: "hero-kicker" },
              "Présentation de la résidence"
            ),
            e(
              "h1",
              { className: "hero-title" },
              e(
                "span",
                { className: "hero-title-main" },
                heroTitle
              ),
              e(
                "span",
                { className: "hero-title-accent" },
                "un cadre de vie calme et bien connecté"
              )
            )
          ),
          e(
            "div",
            { className: "hero-body" },
            e(
              "p",
              null,
              "Petite web app locale pour les résidents : infos pratiques, bus, météo et annonces."
            )
          ),
          e(
            "div",
            { className: "hero-cta-row" },
            e(
              "button",
              {
                type: "button",
                onClick: onOpenOnboarding,
                className: "hero-cta-main"
              },
              "Demander un accès résident"
            ),
            onSupabaseLogin &&
              e(
                "button",
                {
                  type: "button",
                  onClick: onSupabaseLogin,
                  className: "hero-cta-alt"
                },
                "Se connecter avec Facebook"
              ),
            onDevLogin &&
              e(
                "button",
                {
                  type: "button",
                  onClick: onDevLogin,
                  className: "hero-cta-alt"
                },
                "Accès temporaire (test)"
              )
          ),
          onProfileLogin &&
            e(
              "div",
              { className: "hero-login-row" },
              e("input", {
                id: "hero-profile-url",
                type: "url",
                className: "input hero-login-input",
                placeholder: "Collez ici l'URL de votre profil Facebook"
              }),
              e(
                "button",
                {
                  type: "button",
                  className: "btn-secondary",
                  onClick: function () {
                    var el = document.getElementById("hero-profile-url");
                    var value = el && el.value ? el.value : "";
                    if (onProfileLogin) onProfileLogin(value);
                  }
                },
                "Se connecter avec mon lien Facebook"
              )
            ),
          authError &&
            e("div", { className: "hero-error" }, authError)
        )
      )
    );
  }