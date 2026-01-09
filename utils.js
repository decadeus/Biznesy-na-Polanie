// Fonctions utilitaires et alias React global (sans bundler)

// Alias pratique pour React.createElement utilisable dans tous les fichiers
var e = React.createElement;

function isWeekend(date) {
  const day = date.getDay(); // 0 = dimanche, 6 = samedi
  return day === 0 || day === 6;
}

function minutesSinceMidnight(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(date) {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return h + ":" + m;
}

function getNextDepartures(now, list) {
  const nowMin = minutesSinceMidnight(now);
  const withDiff = list
    .map((t) => {
      const depMin = parseTimeToMinutes(t);
      return { time: t, diff: depMin - nowMin };
    })
    .filter((x) => x.diff >= 0)
    .sort((a, b) => a.diff - b.diff);

  return withDiff.slice(0, 3);
}

function weatherCodeToText(code) {
  const map = {
    0: "Ciel dégagé",
    1: "Plutôt dégagé",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine légère",
    53: "Bruine modérée",
    55: "Bruine forte",
    61: "Pluie faible",
    63: "Pluie modérée",
    65: "Pluie forte",
    71: "Neige faible",
    73: "Neige modérée",
    75: "Neige forte",
    80: "Averses faibles",
    81: "Averses modérées",
    82: "Averses fortes"
  };
  return map[code] || "Météo inconnue";
}

// Construit des créneaux toutes les 2 heures sur ~10 heures à partir de maintenant
function buildNextWeatherSlots(hours, now) {
  if (!hours || hours.length === 0) return [];
  const nowMs = now.getTime();
  const future = hours
    .map((h) => ({
      ...h,
      date: new Date(h.time)
    }))
    .filter((h) => h.date.getTime() >= nowMs)
    .sort((a, b) => a.date - b.date);

  const slots = [];
  for (let i = 0; i < future.length && slots.length < 5; i += 2) {
    const h = future[i];
    slots.push({
      label:
        String(h.date.getHours()).padStart(2, "0") +
        "h" +
        (h.date.getMinutes() ? String(h.date.getMinutes()).padStart(2, "0") : ""),
      temperature: h.temperature
    });
  }
  return slots;
}

// Identifiant stable (local) pour un résident connecté
function getOrCreateResidentId() {
  try {
    let id = window.localStorage.getItem("residentId");
    if (!id) {
      if (window.crypto && window.crypto.randomUUID) {
        id = window.crypto.randomUUID();
      } else {
        id =
          "res-" +
          Date.now().toString(36) +
          "-" +
          Math.random().toString(16).slice(2);
      }
      window.localStorage.setItem("residentId", id);
    }
    return id;
  } catch (e) {
    return "resident-anon";
  }
}


