// Section "À propos / Comment ça marche ?"

function AboutSiteSection(props) {
  const lang = (props && props.lang) || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  const title = t(lang, "about_title");

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
      t(lang, "about_intro_1")
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      t(lang, "about_intro_2")
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      t(lang, "about_intro_3")
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      t(lang, "about_intro_3b")
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      t(lang, "about_intro_4")
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      t(lang, "about_intro_5")
    ),
    null
  );
}

