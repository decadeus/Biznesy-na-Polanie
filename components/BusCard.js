// Composant BusCard : affiche les prochains départs de bus

function BusCard(props) {
  const {
    now,
    selectedLine,
    setSelectedLine,
    departures,
    loadedDate,
    loading,
    error,
    lang: rawLang
  } = props;

  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  const next = getNextDepartures(now, departures);

  return e(
    "div",
    { className: "card card-wrapper" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e(
            "button",
            {
              className:
                "line-switch-button" + (selectedLine === "32" ? " active" : ""),
              onClick: () => setSelectedLine("32")
            },
            "32"
          ),
          e(
            "button",
            {
              className:
                "line-switch-button" + (selectedLine === "145" ? " active" : ""),
              onClick: () => setSelectedLine("145")
            },
            "145"
          ),
          e(
            "button",
            {
              className:
                "line-switch-button" + (selectedLine === "710" ? " active" : ""),
              onClick: () => setSelectedLine("710")
            },
            "710"
          ),
          e("span", null, t(lang, "bus_header_location"))
        ),
        e(
          "div",
          { className: "time-now" },
        t(lang, "bus_now_label") + " ",
          formatTime(now)
        )
      ),
      e(
        "div",
        null,
        !error &&
          e(
            "div",
            { className: "subtitle" },
            loading
              ? t(lang, "bus_loading_full")
              : selectedLine === "32"
              ? t(lang, "bus_next_dir_32")
              : selectedLine === "145"
              ? t(lang, "bus_next_dir_145")
              : t(lang, "bus_next_dir_710")
          ),
        error &&
          e(
            "div",
            { className: "subtitle" },
            error
          )
      ),
      e("div", { className: "divider" }),
      e(
        "div",
        { className: "card-bottom" },
        !loading && !error && next.length > 0
          ? e(
              "div",
              { className: "departures" },
              e(
                "div",
                { className: "departure-row" },
                e(
                  "div",
                  null,
                  e(
                    "div",
                    { className: "dep-label" },
                    t(lang, "bus_next_label")
                  ),
                  e(
                    "div",
                    { className: "dep-time dep-time-large" },
                    next[0].time
                  )
                ),
                e(
                  "div",
                  null,
                  e(
                    "div",
                    { className: "dep-eta" },
                    next[0].diff === 0
                      ? t(lang, "bus_eta_now")
                      : next[0].diff === 1
                      ? t(lang, "bus_eta_in_1")
                      : t(lang, "bus_eta_in_n").replace(
                          "{n}",
                          String(next[0].diff)
                        )
                  )
                )
              ),
              next.length > 1 &&
                e(
                  "div",
                  { className: "departures-secondary" },
                  next.slice(1, 3).map((dep, index) =>
                    e(
                      "div",
                      {
                        key: dep.time + index,
                        className: "departure-small"
                      },
                      e(
                        "div",
                        { className: "dep-label" },
                        index === 0
                          ? t(lang, "bus_next_small_1")
                          : t(lang, "bus_next_small_2")
                      ),
                      e(
                        "div",
                        { className: "dep-time" },
                        dep.time
                      ),
                      e(
                        "div",
                        { className: "dep-eta" },
                        dep.diff === 0
                          ? t(lang, "bus_eta_now")
                          : dep.diff === 1
                          ? t(lang, "bus_eta_in_1")
                          : t(lang, "bus_eta_in_n").replace(
                              "{n}",
                              String(dep.diff)
                            )
                      )
                    )
                  )
                )
            )
          : e(
              "div",
              { className: "empty" },
              loading
                ? t(lang, "bus_loading_short")
                : t(lang, "bus_no_more_today")
            ),
        e(
          "div",
          { className: "footer-note" },
          e(
            "span",
            null,
            loadedDate
              ? t(lang, "bus_footer_with_date").replace(
                  "{date}",
                  loadedDate
                )
              : t(lang, "bus_footer_generic")
          )
        )
      )
    )
  );
}

