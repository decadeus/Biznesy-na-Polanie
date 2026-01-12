// Composant ResidenceHero : hero simple sur la page d'accueil

function ResidenceHero(props) {
    const {
      residence,
      residenceError,
      classifieds,
      authError,
      lang: rawLang
    } = props;
  
    const lang = rawLang || "fr";
    const t =
      window.i18n && window.i18n.t
        ? window.i18n.t
        : function (_lang, key) {
            return key;
          };
  
    const heroTitle = t(lang, "hero_title");
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
              t(lang, "hero_kicker")
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
                t(lang, "hero_subtitle")
              )
            )
          ),
        e(
          "div",
          { className: "hero-body" },
          e(
            "p",
            null,
            t(lang, "hero_body_intro")
          ),
          e(
            "div",
            { className: "hero-features" },
            e(
              "div",
              { className: "hero-feature" },
              e("div", { className: "hero-feature-icon hero-feature-icon-nature" }),
              e(
                "div",
                { className: "hero-feature-content" },
                e("h3", null, t(lang, "hero_feature_nature_title")),
                e(
                  "p",
                  null,
                  t(lang, "hero_feature_nature_body")
                )
              )
            ),
            e(
              "div",
              { className: "hero-feature" },
              e("div", { className: "hero-feature-icon hero-feature-icon-access" }),
              e(
                "div",
                { className: "hero-feature-content" },
                e("h3", null, t(lang, "hero_feature_access_title")),
                e(
                  "p",
                  null,
                  t(lang, "hero_feature_access_body")
                )
              )
            ),
            e(
              "div",
              { className: "hero-feature" },
              e("div", { className: "hero-feature-icon hero-feature-icon-comfort" }),
              e(
                "div",
                { className: "hero-feature-content" },
                e("h3", null, t(lang, "hero_feature_comfort_title")),
                e(
                  "p",
                  null,
                  t(lang, "hero_feature_comfort_body")
                )
              )
            )
          )
        ),
          authError &&
            e("div", { className: "hero-error" }, authError)
        )
      )
    );
  }