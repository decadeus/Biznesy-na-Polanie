// Composant compact : affiche plusieurs sondages empilés avec le même layout (camembert + options)

function PollsQuickCard(props) {
  const { polls, onVote } = props;
  const list = Array.isArray(polls) ? polls : [];
  if (!list.length) return null;

  const colors = ["#4f46e5", "#14b8a6", "#f97316", "#ec4899", "#22c55e"];

  function renderPoll(poll, index) {
    const options = Array.isArray(poll.options) ? poll.options : [];
    const totalVotes = options.reduce((sum, o) => sum + (o.votes || 0), 0);

    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    const arcs = options.map((opt, idx) => {
      const pct = totalVotes
        ? (opt.votes || 0) / totalVotes
        : 1 / Math.max(options.length, 1);
      const dash = pct * circumference;
      const gap = circumference - dash;
      const arc = {
        key: opt.id,
        color: colors[idx % colors.length],
        dash,
        gap,
        offset
      };
      offset -= dash;
      return arc;
    });

    function percent(opt) {
      if (!totalVotes) return "0 %";
      return Math.round(((opt.votes || 0) * 100) / totalVotes) + " %";
    }

    return e(
      "div",
      { key: poll.id, className: "poll-quick-entry" },
      e(
        "div",
        { className: "poll-quick-title" },
        poll.title
      ),
      poll.description &&
        e(
          "div",
          { className: "poll-quick-desc" },
          poll.description
        ),
      e(
        "div",
        { className: "poll-quick-body" },
        e(
          "div",
          { className: "poll-quick-chart" },
          e(
            "svg",
            {
              viewBox: "0 0 42 42",
              className: "poll-quick-donut"
            },
            e("circle", {
              className: "poll-quick-bg",
              cx: "21",
              cy: "21",
              r: radius
            }),
            arcs.map((arc) =>
              e("circle", {
                key: arc.key,
                className: "poll-quick-segment",
                cx: "21",
                cy: "21",
                r: radius,
                stroke: arc.color,
                strokeWidth: 5,
                fill: "transparent",
                strokeDasharray: arc.dash + " " + arc.gap,
                strokeDashoffset: arc.offset
              })
            )
          ),
          e(
            "div",
            { className: "poll-quick-total" },
            totalVotes ? totalVotes + " votes" : "Aucun vote"
          )
        ),
        e(
          "div",
          { className: "poll-quick-options" },
          options.map((opt, idx) =>
            e(
              "button",
              {
                key: opt.id,
                type: "button",
                className: "poll-quick-option",
                onClick: () => onVote && onVote(poll.id, opt.id)
              },
              e("span", {
                className: "poll-quick-dot",
                style: { backgroundColor: colors[idx % colors.length] }
              }),
              e("span", { className: "poll-quick-label" }, opt.label),
              e(
                "span",
                { className: "poll-quick-stat" },
                percent(opt)
              )
            )
          )
        )
      ),
      poll.endDate &&
        e(
          "div",
          { className: "poll-end-date" },
          "Fin le ",
          poll.endDate
        )
    );
  }

  return e(
    "div",
    { className: "card card-wrapper poll-quick-card" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e("span", null, "Sondages"),
          " ",
          e("span", { style: { marginLeft: 6, fontSize: 12 } }, "entre voisins")
        )
      ),
      e(
        "div",
        { className: "polls-quick-list" },
        list.map(renderPoll)
      )
    )
  );
}

