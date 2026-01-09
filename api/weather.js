const fetch = require("node-fetch");

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status} pour ${url}`);
  }
  return res.json();
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=54.5189&longitude=18.5305&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FWarsaw";

    const data = await fetchJson(url);
    const current = data.current_weather;

    let nextDays = [];
    if (data.daily && Array.isArray(data.daily.time)) {
      for (let i = 1; i <= 2 && i < data.daily.time.length; i++) {
        nextDays.push({
          date: data.daily.time[i],
          tmin: data.daily.temperature_2m_min[i],
          tmax: data.daily.temperature_2m_max[i],
          weathercode: data.daily.weathercode[i]
        });
      }
    }

    let nextHours = [];
    if (
      data.hourly &&
      Array.isArray(data.hourly.time) &&
      Array.isArray(data.hourly.temperature_2m)
    ) {
      const refTimeStr =
        current && typeof current.time === "string"
          ? current.time
          : data.hourly.time[0];

      const startIndex = data.hourly.time.findIndex((t) => t >= refTimeStr);
      const from = startIndex === -1 ? 0 : startIndex;

      for (
        let i = from;
        i < data.hourly.time.length && nextHours.length < 24;
        i++
      ) {
        nextHours.push({
          time: data.hourly.time[i],
          temperature: data.hourly.temperature_2m[i]
        });
      }
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        location: "Gdynia",
        current,
        nextDays,
        nextHours
      })
    );
  } catch (err) {
    console.error("Erreur /api/weather:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Impossible de récupérer la météo." }));
  }
};

