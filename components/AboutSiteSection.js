// Section "À propos / Comment ça marche ?"

function AboutSiteSection(props) {
  const lang = (props && props.lang) || "fr";

  const title =
    lang === "pl"
      ? "O serwisie – jak to działa?"
      : lang === "en"
      ? "About this site – how it works?"
      : "À propos du site – comment ça marche ?";

  const downloadTitle =
    lang === "pl"
      ? "Pobierz aplikacje"
      : lang === "en"
      ? "Download the app"
      : "Télécharger l'application";

  const downloadText =
    lang === "pl"
      ? "Możesz pobrać aplikacje mobilną bezpośrednio ze sklepu. To ta sama usługa, ale w wersji do zainstalowania."
      : lang === "en"
      ? "You can download the mobile app from the store. It is the same service, packaged as an installable app."
      : "Vous pouvez télécharger l'application mobile depuis les stores. C'est le même service, sous forme d'application à installer.";

  const iosLabel =
    lang === "pl"
      ? "App Store"
      : lang === "en"
      ? "App Store"
      : "App Store";
  const androidLabel =
    lang === "pl"
      ? "Google Play"
      : lang === "en"
      ? "Google Play"
      : "Google Play";

  const iosComing =
    lang === "pl"
      ? "App Store (wkrótce)"
      : lang === "en"
      ? "App Store (soon)"
      : "App Store (bientôt)";
  const androidComing =
    lang === "pl"
      ? "Google Play (wkrótce)"
      : lang === "en"
      ? "Google Play (soon)"
      : "Google Play (bientôt)";

  const links =
    typeof window !== "undefined" && window.appDownloadLinks
      ? window.appDownloadLinks
      : {};
  const iosUrl = (links && links.ios) || "";
  const androidUrl = (links && links.android) || "";

  function downloadButton(url, label, comingLabel) {
    if (url) {
      return e(
        "a",
        {
          className: "app-download-button",
          href: url,
          target: "_blank",
          rel: "noopener"
        },
        label
      );
    }
    return e(
      "span",
      {
        className: "app-download-button app-download-button-disabled",
        "aria-disabled": true
      },
      comingLabel
    );
  }

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, title)
    ),
    e(
      "p",
      { className: "page-section-text" },
      "Ce site est une petite application communautaire gratuite pour les habitants de la résidence Na Polanie – Mały Kack. L’idée est de rassembler au même endroit les informations utiles, les annonces entre voisins, les événements de la résidence et les petits services entre habitants."
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      "Pour l’instant, une partie des contenus (annonces, événements, signalements…) sont des exemples fictifs. Ils servent uniquement à montrer à quoi le site pourrait ressembler lorsque les vrais résidents commenceront à publier. Vous pouvez déjà commencer à y mettre du contenu réel : au fur et à mesure que des annonces et messages seront postés par les habitants, les fausses données seront supprimées et remplacées par du contenu réel."
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      "Le projet est réalisé à titre entièrement bénévole et le site est 100 % gratuit pour les résidents. Pas de publicité, pas de facturation, pas d’utilisation commerciale des données. Pour l’instant, tout est volontaire et expérimental : l’objectif est de tester si cet outil est utile au quotidien pour les habitants, puis de l’améliorer en fonction des retours."
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      "Mon intention est de m’occuper uniquement de la partie technique (maintenance, corrections, nouvelles fonctionnalités), et de confier la gestion du contenu à un ou deux administrateurs de la résidence. Ces administrateurs pourront ensuite ajouter des modérateurs et approuver ou refuser les nouveaux membres."
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      "Si, avec le temps, le site est suffisamment utilisé et apprécié, une évolution naturelle serait de développer une application iOS / Android dédiée. Cela permettrait par exemple de recevoir des notifications lorsqu’il y a un nouveau post important (annonce, événement, signalement, etc.)."
    ),
    e(
      "div",
      { className: "app-download" },
      e("p", { className: "app-download-title" }, downloadTitle),
      e("p", { className: "page-section-text" }, downloadText),
      e(
        "div",
        { className: "app-download-actions" },
        downloadButton(iosUrl, iosLabel, iosComing),
        downloadButton(androidUrl, androidLabel, androidComing)
      )
    )
  );
}

