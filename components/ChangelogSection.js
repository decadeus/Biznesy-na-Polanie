// Section "Évolutions du site" (changelog)

function ChangelogSection(props) {
  const lang = (props && props.lang) || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const locale = lang === "pl" ? "pl-PL" : lang === "en" ? "en-GB" : "fr-FR";

  const entries = [
    {
      date: "2026-02-14",
      type: "improvement",
      title: {
        fr: "Votes et tri des publications",
        en: "Post voting and sorting",
        pl: "Głosowanie i sortowanie publikacji"
      },
      items: {
        fr: [
          "Bientôt, vous pourrez voter sur les publications et les trier par date ou par « j’aime »."
        ],
        en: [
          "Soon, you will be able to vote on posts and sort them by date or by likes."
        ],
        pl: [
          "Wkrótce będzie można głosować na publikacje i sortować je według daty lub liczby polubień."
        ]
      }
    },
  
    {
      date: "2026-02-04",
      type: "information",
      title: {
        fr: "Qui peut accéder ?",
        en: "Who can access?",
        pl: "Kto może uzyskać dostęp?"
      },
      items: {
        fr: [
          "L'accès au site web dépendra du choix des admins. Il leur appartient de choisir s'ils désirent étendre l'accès aux personnes vers d'autres résidences. La seule condition étant la réglementation pour l'utilisation du site web."
        ],
        en: [
          "Website access depends on the admins' choice. They can decide whether they want to extend access to people in other residences. The only condition is compliance with the regulations for using the website."
        ],
        pl: [
          "Dostęp do strony zależy od decyzji administratorów. To oni decydują, czy chcą rozszerzyć dostęp na osoby z innych rezydencji. Jedynym warunkiem jest przestrzeganie zasad korzystania ze strony."
        ]
      }
    },
    {
      date: "2026-02-03",
      type: "bug",
      title: {
        fr: "Connexion via FB",
        en: "Login via Facebook",
        pl: "Logowanie przez Facebooka"
      },
      items: {
        fr: [
          "Facebook met plus d'une semaine pour valider un nouveau site web qui utilise la connexion via FB. Maintenant, la connexion se fait sans problème."
        ],
        en: [
          "Facebook can take more than a week to validate a new website that uses Facebook login. The login now works without issues."
        ],
        pl: [
          "Facebook potrafi potrzebować ponad tygodnia na zatwierdzenie nowej strony korzystającej z logowania przez Facebooka. Teraz logowanie działa bez problemów."
        ]
      }
    }
  ];

  function formatDate(value) {
    try {
      return new Date(value).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (e) {
      return value;
    }
  }

  function typeLabel(type) {
    if (type === "bugfix" || type === "bug")
      return t(lang, "changelog_type_bug");
    if (type === "improvement") return t(lang, "changelog_type_improvement");
    if (type === "news") return t(lang, "changelog_type_news");
    return t(lang, "changelog_type_feature");
  }

  function typeClass(type) {
    if (type === "bugfix" || type === "bug")
      return "changelog-tag changelog-tag-bugfix";
    if (type === "improvement")
      return "changelog-tag changelog-tag-improvement";
    if (type === "news") return "changelog-tag changelog-tag-news";
    return "changelog-tag changelog-tag-feature";
  }

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "changelog_title")),
      e("p", null, t(lang, "changelog_intro"))
    ),
    entries && entries.length
      ? entries.map(function (entry, idx) {
          const title =
            entry && entry.title
              ? entry.title[lang] || entry.title.fr || entry.title.en
              : "";
          const items =
            entry && entry.items
              ? entry.items[lang] || entry.items.fr || entry.items.en || []
              : [];
          return e(
            "div",
            { key: idx, className: "changelog-entry" },
            e(
              "div",
              { className: "changelog-entry-header" },
              e("span", { className: "changelog-entry-date" }, formatDate(entry.date)),
              e("span", { className: typeClass(entry.type) }, typeLabel(entry.type))
            ),
            e("div", { className: "changelog-entry-title" }, title),
            items && items.length
              ? e(
                  "ul",
                  { className: "page-section-list" },
                  items.map(function (item, itemIdx) {
                    return e("li", { key: itemIdx }, item);
                  })
                )
              : null
          );
        })
      : e(
          "p",
          { className: "page-section-text", style: { marginTop: 8 } },
          t(lang, "changelog_empty")
        ),
    null
  );
}

