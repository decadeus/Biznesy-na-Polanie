// Vue statistiques (simulation) pour l'onglet "Statistiques"

function StatsContentBlock(props) {
  const {
    title,
    months,
    monthlySeries,
    validatedSeries,
    inProgress,
    pending,
    refused30Days
  } = props;

  const maxLine = Math.max(...monthlySeries);

  function buildPoints(arr, maxValue) {
    const pts = arr.map((val, idx) => {
      const x = (idx / (months.length - 1)) * 100;
      const scaled = maxValue > 0 ? (val / maxValue) * 28 : 0;
      const y = 36 - scaled;
      return { x, y };
    });
    return {
      pointsAttr: pts.map((p) => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" "),
      points: pts
    };
  }

  const curve = buildPoints(monthlySeries, maxLine);
  const totalValidated = (validatedSeries || []).reduce((a, b) => a + b, 0);

  const donutTotal = inProgress + pending;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { key: "en-cours", value: inProgress, color: "#22c55e" },
    { key: "pending", value: pending, color: "#f97316" }
  ];

  let offset = 0;
  const donutSegments = segments.map((s) => {
    const pct = donutTotal ? s.value / donutTotal : 0;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const seg = {
      key: s.key,
      color: s.color,
      dash,
      gap,
      offset
    };
    offset -= dash;
    return seg;
  });

  return e(
    "div",
    { className: "stats-side-card" },
    e("h3", { className: "stats-section-title" }, title),
    e(
      "div",
      { className: "stats-mini-chart" },
      e(
        "svg",
        { viewBox: "0 0 100 40", className: "stats-mini-line" },
        e("polyline", {
          className: "stats-line stats-line-members",
          points: curve.pointsAttr
        }),
        curve.points.map((p, idx) =>
          e("circle", {
            key: title + "-dot-" + idx,
            className: "stats-line-dot stats-line-dot-members",
            cx: p.x,
            cy: p.y,
            r: 1.1
          })
        )
      ),
      e(
        "div",
        { className: "stats-chart-label-row stats-mini-label-row" },
        months.map((m) =>
          e("span", { key: title + "-lbl-" + m, className: "stats-mini-label" }, m)
        )
      )
    ),
    e("hr", { className: "stats-divider" }),
    e("h4", { className: "stats-section-title" }, "Statut"),
    e(
      "div",
      { className: "stats-status-row" },
      e(
        "div",
        { className: "stats-donut-wrapper" },
        e(
          "svg",
          {
            viewBox: "0 0 42 42",
            className: "stats-donut"
          },
          e("circle", {
            className: "stats-donut-bg",
            cx: "21",
            cy: "21",
            r: radius
          }),
          donutSegments.map((seg) =>
            e("circle", {
              key: title + "-seg-" + seg.key,
              className: "stats-donut-segment",
              cx: "21",
              cy: "21",
              r: radius,
              stroke: seg.color,
              strokeWidth: 6,
              fill: "transparent",
              strokeDasharray: seg.dash + " " + seg.gap,
              strokeDashoffset: seg.offset
            })
          )
        ),
        e(
          "div",
          { className: "stats-donut-center" },
          e(
            "div",
            { className: "stats-donut-value" },
            inProgress + pending
          )
        )
      ),
      e(
        "div",
        { className: "stats-status-right stats-donut-legend" },
        e(
          "div",
          { className: "stats-donut-legend-item" },
          e("span", { className: "stats-legend-dot stats-status-valid" }),
          e("span", null, "En cours"),
          e("span", { className: "stats-donut-legend-count" }, inProgress)
        ),
        e(
          "div",
          { className: "stats-donut-legend-item" },
          e("span", { className: "stats-legend-dot stats-status-pending" }),
          e("span", null, "À valider"),
          e("span", { className: "stats-donut-legend-count" }, pending)
        )
      )
    ),
    e(
      "div",
      { className: "stats-refused-line" },
      e("span", null, "Refusés (30 derniers jours)"),
      e("span", { className: "stats-donut-legend-count" }, refused30Days)
    ),
    e(
      "div",
      { className: "stats-status-total" },
      "Total validés depuis le départ : ",
      e("strong", null, totalValidated)
    )
  );
}

function StatsOverview(props) {
  const { polls, members, classifieds } = props;

  const months = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc"
  ];

  // Valeurs simulées
  const membersByMonth = [180, 186, 193, 201, 210, 220, 231, 238, 244, 249, 252, 255];
  const interactionsByMonth = [35, 48, 62, 78, 90, 104, 118, 130, 142, 150, 158, 165];
  const pollsByMonth = [1, 1, 2, 2, 1, 2, 2, 3, 2, 2, 3, 3];
  const pollsValidatedByMonth = [1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 3, 3];
  const classifiedsByMonth = [3, 4, 5, 4, 6, 7, 6, 7, 6, 8, 7, 9];
  const annoncesVoisinsByMonth = classifiedsByMonth.map((v) => Math.max(1, v - 2));
  const annoncesVoisinsValidated = classifiedsByMonth.map((v) => Math.max(1, v - 3));
  const eventsByMonth = [0, 1, 1, 1, 2, 2, 2, 3, 2, 3, 3, 4];
  const eventsValidated = eventsByMonth;
  const reportsByMonth = [1, 1, 2, 3, 2, 3, 4, 3, 4, 5, 4, 5];
  const reportsValidated = reportsByMonth;
  const servicesByMonth = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7];
  const servicesValidated = servicesByMonth;

  const maxMain = Math.max(...membersByMonth, ...interactionsByMonth);

  function buildMainPoints(arr) {
    const pts = arr.map((val, idx) => {
      const x = (idx / (months.length - 1)) * 100;
      const scaled = maxMain > 0 ? (val / maxMain) * 28 : 0;
      const y = 36 - scaled;
      return { x, y };
    });
    return {
      pointsAttr: pts.map((p) => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" "),
      points: pts
    };
  }

  const membersCurve = buildMainPoints(membersByMonth);
  const interactionsCurve = buildMainPoints(interactionsByMonth);

  const totalMembers = Array.isArray(members) ? members.length : 0;
  const totalPolls = Array.isArray(polls) ? polls.length : 0;
  const totalClassifieds = Array.isArray(classifieds) ? classifieds.length : 0;

  return e(
    "div",
    { className: "page-sections" },
    e(
      "section",
      { className: "page-section stats-header" },
      e("h2", null, "Vue d’ensemble statistique"),
      e(
        "p",
        { className: "page-section-text" },
        "Évolution simulée de la communauté, des interactions et des contenus publiés."
      ),
      e(
        "div",
        { className: "stats-kpi-row" },
        e(
          "div",
          { className: "stats-kpi-card" },
          e("div", { className: "stats-kpi-label" }, "Membres actuels"),
          e("div", { className: "stats-kpi-value" }, totalMembers || 255),
          e("div", { className: "stats-kpi-sub" }, "+18% sur 12 mois (simulation)")
        ),
        e(
          "div",
          { className: "stats-kpi-card" },
          e("div", { className: "stats-kpi-label" }, "Interactions / mois"),
          e("div", { className: "stats-kpi-value" }, "150"),
          e("div", { className: "stats-kpi-sub" }, "messages, sondages, annonces")
        ),
        e(
          "div",
          { className: "stats-kpi-card" },
          e("div", { className: "stats-kpi-label" }, "Sondages actifs"),
          e("div", { className: "stats-kpi-value" }, totalPolls || 5),
          e("div", { className: "stats-kpi-sub" }, "sur les 3 derniers mois (simulation)")
        ),
        e(
          "div",
          { className: "stats-kpi-card" },
          e("div", { className: "stats-kpi-label" }, "Annonces publiées"),
          e("div", { className: "stats-kpi-value" }, totalClassifieds || 8),
          e("div", { className: "stats-kpi-sub" }, "immobilier + entre voisins")
        )
      )
    ),
    e(
      "section",
      { className: "page-section stats-main-grid" },
      e(
        "div",
        { className: "stats-chart-card" },
        e("h3", { className: "stats-section-title" }, "Croissance des membres & interactions"),
        e(
          "div",
          { className: "stats-legend" },
          e("span", { className: "stats-legend-dot stats-legend-members" }),
          e("span", null, "Membres"),
          e("span", { className: "stats-legend-dot stats-legend-interactions" }),
          e("span", null, "Interactions")
        ),
        e(
          "div",
          { className: "stats-chart" },
          e(
            "svg",
            { viewBox: "0 0 100 40", className: "stats-line-chart" },
            e("polyline", {
              className: "stats-line stats-line-members",
              points: membersCurve.pointsAttr
            }),
            e("polyline", {
              className: "stats-line stats-line-interactions",
              points: interactionsCurve.pointsAttr
            }),
            membersCurve.points.map((p, idx) =>
              e("circle", {
                key: "m-dot-" + idx,
                className: "stats-line-dot stats-line-dot-members",
                cx: p.x,
                cy: p.y,
                r: 1.1
              })
            ),
            interactionsCurve.points.map((p, idx) =>
              e("circle", {
                key: "i-dot-" + idx,
                className: "stats-line-dot stats-line-dot-interactions",
                cx: p.x,
                cy: p.y,
                r: 1.1
              })
            )
          ),
          e(
            "div",
            { className: "stats-chart-label-row" },
            months.map((m) =>
              e("span", { key: "lbl-" + m, className: "stats-chart-label" }, m)
            )
          )
        )
      )
    ),
    e(
      "section",
      { className: "page-section stats-bottom-grid" },
      e(StatsContentBlock, {
        title: "Sondages par mois",
        months,
        monthlySeries: pollsByMonth,
        validatedSeries: pollsValidatedByMonth,
        inProgress: 58,
        pending: 9,
        refused30Days: 5
      }),
      e(StatsContentBlock, {
        title: "Annonces immobilières par mois",
        months,
        monthlySeries: classifiedsByMonth,
        validatedSeries: classifiedsByMonth,
        inProgress: 32,
        pending: 4,
        refused30Days: 3
      }),
      e(StatsContentBlock, {
        title: "Annonces entre voisins par mois",
        months,
        monthlySeries: annoncesVoisinsByMonth,
        validatedSeries: annoncesVoisinsValidated,
        inProgress: 18,
        pending: 3,
        refused30Days: 2
      }),
      e(StatsContentBlock, {
        title: "Événements par mois",
        months,
        monthlySeries: eventsByMonth,
        validatedSeries: eventsValidated,
        inProgress: 6,
        pending: 1,
        refused30Days: 1
      }),
      e(StatsContentBlock, {
        title: "Signalements par mois",
        months,
        monthlySeries: reportsByMonth,
        validatedSeries: reportsValidated,
        inProgress: 10,
        pending: 2,
        refused30Days: 1
      }),
      e(StatsContentBlock, {
        title: "Petits services par mois",
        months,
        monthlySeries: servicesByMonth,
        validatedSeries: servicesValidated,
        inProgress: 14,
        pending: 2,
        refused30Days: 1
      })
    )
  );
}

