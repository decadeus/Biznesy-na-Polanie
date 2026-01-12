// Composant ResidenceCard : présentation de la résidence + CTA login / ajout annonce

function ResidenceCard(props) {
  const { residence, residenceError, lang: rawLang } = props;

  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  return e(
    "section",
    { className: "page-section", id: "section-residence" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "residence_section_title")),
      e(
        "p",
        null,
        t(lang, "residence_section_lead")
      )
    ),
    residence
      ? e(
          React.Fragment,
          null,
          e(
            "p",
            { className: "page-section-address" },
            residence.address || ""
          ),
          e(
            "p",
            { className: "page-section-text" },
            residence.description ||
              "Petite web app locale pour les résidents."
          ),
          residence.practicalInfo &&
            Array.isArray(residence.practicalInfo) &&
            residence.practicalInfo.length > 0 &&
            e(
              "ul",
              { className: "page-section-list" },
              residence.practicalInfo.map((item, idx) =>
                e("li", { key: idx }, item)
              )
            )
        )
      : e(
          "p",
          { className: "page-section-text" },
          residenceError || "Chargement des infos résidence..."
        )
  );
}

