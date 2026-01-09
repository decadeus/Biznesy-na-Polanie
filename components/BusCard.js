// Composant BusCard : affiche les prochains départs de bus

function BusCard(props) {
  const {
    now,
    selectedLine,
    setSelectedLine,
    departures,
    loadedDate,
    loading,
    error
  } = props;

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
          e("span", null, "Mały Kack")
        ),
        e(
          "div",
          { className: "time-now" },
          "Maintenant ",
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
              ? "Chargement des horaires depuis ZKM Gdynia..."
              : selectedLine === "32"
              ? "Prochains départs direction Pogórze Dolne Złota"
              : "Prochains départs direction Karwiny Tuwima"
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
                    "Prochain départ"
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
                      ? "maintenant"
                      : next[0].diff === 1
                      ? "dans 1 min"
                      : "dans " + next[0].diff + " min"
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
                        index === 0 ? "Suivant" : "Ensuite"
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
                          ? "maintenant"
                          : dep.diff === 1
                          ? "dans 1 min"
                          : "dans " + dep.diff + " min"
                      )
                    )
                  )
                )
            )
          : e(
              "div",
              { className: "empty" },
              loading
                ? "Chargement..."
                : "Aucun autre départ prévu aujourd'hui pour cet arrêt."
            ),
        e(
          "div",
          { className: "footer-note" },
          e(
            "span",
            null,
            loadedDate
              ? "Horaires ZKM pour le " + loadedDate + "."
              : "Horaires ZKM."
          )
        )
      )
    )
  );
}

