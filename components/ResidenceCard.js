// Composant ResidenceCard : présentation de la résidence + CTA login / ajout annonce

function ResidenceCard(props) {
  const { residence, residenceError } = props;

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, "La résidence"),
      e(
        "p",
        null,
        "Quelques repères pratiques pour les habitants de Mały Kack."
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

