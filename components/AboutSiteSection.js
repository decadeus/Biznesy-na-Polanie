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

  const downloadTitle = t(lang, "about_download_title");
  const downloadText = t(lang, "about_download_text");

  const iosLabel = t(lang, "about_app_store");
  const androidLabel = t(lang, "about_google_play");

  const iosComing = t(lang, "about_app_store_soon");
  const androidComing = t(lang, "about_google_play_soon");

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
      t(lang, "about_intro_4")
    ),
    e(
      "p",
      { className: "page-section-text", style: { marginTop: 8 } },
      t(lang, "about_intro_5")
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

