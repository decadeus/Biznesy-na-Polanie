const fetch = require("node-fetch");
const vm = require("vm");

function getTodayDateInPoland() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;
  return `${year}-${month}-${day}`; // YYYY-MM-DD
}

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status} pour ${url}`);
  }
  return res.text();
}

async function loadRozkladyForLine(line) {
  const js = await fetchText(
    `https://zkmgdynia.pl/data/busman/results/js/rozklady/${line}.js`
  );

  const script =
    js +
    "\n;globalThis.__data__ = { rozkladydni: typeof rozkladydni !== 'undefined' ? rozkladydni : null, rozklady: typeof rozklady !== 'undefined' ? rozklady : null };";

  const context = { globalThis: {} };
  vm.createContext(context);
  vm.runInContext(script, context);

  const data = context.globalThis.__data__;
  if (!data || !data.rozkladydni || !data.rozklady) {
    throw new Error(
      `Impossible de récupérer rozkladydni / rozklady pour la ligne ${line}`
    );
  }
  return data;
}

async function getDeparturesForToday(line) {
  const { rozkladydni, rozklady } = await loadRozkladyForLine(line);
  const today = getTodayDateInPoland();
  const timetableIds = rozkladydni[today];

  if (!timetableIds || timetableIds.length === 0) {
    return {
      date: today,
      departures: []
    };
  }

  const TARGET_STOP = "Mały Kack Strzelców 01";
  const timesSet = new Set();

  for (const id of timetableIds) {
    const timetable = rozklady[id];
    if (!timetable) continue;

    for (const variantKey of Object.keys(timetable)) {
      const variant = timetable[variantKey];
      if (!variant || !variant.services) continue;

      const services = variant.services;
      for (const serviceId of Object.keys(services)) {
        const stopsArray = services[serviceId];
        if (!Array.isArray(stopsArray)) continue;

        for (const stopEntry of stopsArray) {
          if (stopEntry && stopEntry.stop === TARGET_STOP && stopEntry.time) {
            timesSet.add(stopEntry.time);
          }
        }
      }
    }
  }

  const departures = Array.from(timesSet).sort(
    (a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b)
  );

  return {
    date: today,
    departures
  };
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }

  try {
    const url = new URL(req.url, "http://localhost");
    const line = (url.searchParams.get("line") || "32").toString();
    if (!["32", "145", "710"].includes(line)) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          error: "Ligne non supportée. Utilise 32, 145 ou 710."
        })
      );
    }

    const result = await getDeparturesForToday(line);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        line,
        stop: "Mały Kack Strzelców 01",
        ...result
      })
    );
  } catch (err) {
    console.error("Erreur /api/departures:", err);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Impossible de récupérer les horaires depuis ZKM Gdynia."
      })
    );
  }
};

