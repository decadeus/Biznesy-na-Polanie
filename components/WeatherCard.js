// Composant WeatherCard : affiche la météo actuelle et les prévisions courtes

function WeatherCard(props) {
  const { now, weather, weatherError, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const weatherSlots =
    weather && weather.nextHours ? buildNextWeatherSlots(weather.nextHours, now) : [];

  return e(
    "div",
    { className: "card card-wrapper weather-card" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e("span", null, t(lang, "weather_title"))
        ),
        e(
          "div",
          { className: "time-now" },
          t(lang, "weather_now_label") + " ",
          formatTime(now)
        )
      ),
      weather
        ? e(
            React.Fragment,
            null,
            e(
              "div",
              { className: "weather-main" },
              e(
                "div",
                { className: "weather-temp-circle" },
                e(
                  "div",
                  { className: "weather-temp-main" },
                  Math.round(weather.current.temperature) + "°"
                ),
                e(
                  "div",
                  { className: "weather-temp-unit" },
                t(lang, "weather_today_label")
                )
              ),
              e(
                "div",
                { className: "weather-extra" },
                e(
                  "div",
                  { className: "weather-extra-title" },
                  weatherCodeToText(weather.current.weathercode)
                ),
                e(
                  "div",
                  { className: "dep-eta" },
                  weather.current.windspeed != null
                    ? "Vent " + Math.round(weather.current.windspeed) + " km/h"
                    : ""
                )
              )
            ),
            weatherSlots.length > 0 &&
              e(
                "div",
                { className: "weather-hours" },
                weatherSlots.map((slot, idx) =>
                  e(
                    "div",
                    { key: slot.label + idx, className: "weather-hour" },
                    e(
                      "div",
                      { className: "weather-hour-label" },
                      slot.label
                    ),
                    e(
                      "div",
                      { className: "weather-hour-temp" },
                      Math.round(slot.temperature) + "°C"
                    )
                  )
                )
              ),
            e(
              "div",
              { className: "card-bottom" },
              weather.nextDays &&
                weather.nextDays.length > 0 &&
                e(
                  "div",
                  {
                    className: "departures-secondary",
                    style: { marginTop: "6px" }
                  },
                  weather.nextDays.slice(0, 2).map((d, idx) =>
                    e(
                      "div",
                      { key: d.date + idx, className: "departure-small" },
                      e(
                        "div",
                        { className: "dep-label" },
                      idx === 0
                        ? t(lang, "weather_tomorrow")
                        : t(lang, "weather_after_tomorrow")
                      ),
                      e(
                        "div",
                        { className: "dep-time" },
                        Math.round(d.tmax) + "°C"
                      ),
                      e(
                        "div",
                        { className: "dep-eta" },
                      t(lang, "weather_min_max")
                        .replace("{tmin}", String(Math.round(d.tmin)))
                        .replace("{tmax}", String(Math.round(d.tmax)))
                      )
                    )
                  )
                ),
              e(
                "div",
                { className: "footer-note" },
                e("span", null, t(lang, "weather_footer"))
              )
            )
          )
        : e(
            "div",
            { className: "empty" },
            weatherError ||
              (window.i18n && window.i18n.t
                ? window.i18n.t(lang, "weather_loading")
                : "Chargement de la météo...")
          )
    )
  );
}

