// Composant PollsSection : sondages pour les résidents

function PollsSection(props) {
  const { polls, pollsError, onOpenForm, onVote, onSelect, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const items = Array.isArray(polls) ? polls : [];

  function computePercent(option, total) {
    if (!total) return "0%";
    const pct = Math.round(((option.votes || 0) * 100) / total);
    return pct + " %";
  }

  const optionStyles = [
    { bg: "#e0e7ff", border: "#6366f1", text: "#1e1b4b" },
    { bg: "#ccfbf1", border: "#14b8a6", text: "#134e4a" },
    { bg: "#ffedd5", border: "#f97316", text: "#7c2d12" },
    { bg: "#ffe4e6", border: "#ec4899", text: "#831843" },
    { bg: "#dcfce7", border: "#22c55e", text: "#14532d" }
  ];

  function renderList(list) {
    if (!list.length) {
      return e(
        "div",
        { className: "empty" },
        t(lang, "polls_section_empty")
      );
    }

    return e(
      "div",
      { className: "classifieds-cards-grid" },
      list.map((poll) => {
        const totalVotes = (poll.options || []).reduce(
          (sum, o) => sum + (o.votes || 0),
          0
        );
        const isClosed =
          poll.endDate && new Date(poll.endDate) < new Date().setHours(0, 0, 0, 0);

        return e(
          "article",
          {
            key: poll.id,
            className: "classified-item",
            onClick: () => onSelect && onSelect(poll)
          },
          poll.imageUrl &&
            e(
              "div",
              {
                className: "classified-thumb",
                style: { backgroundImage: "url(" + poll.imageUrl + ")" }
              },
              e("img", {
                src: poll.imageUrl,
                alt: "",
                className: "classified-thumb-img"
              })
            ),
          e(
            "div",
            { className: "classified-body" },
            e(
              "div",
              { className: "classified-title-row" },
              e("h3", { className: "classified-title" }, poll.title),
              e(
                "span",
                { className: "classified-tag" },
                isClosed
                  ? t(lang, "polls_status_closed")
                  : t(lang, "polls_status_open")
              )
            ),
            poll.description &&
              e(
                "p",
                { className: "classified-text" },
                poll.description
              ),
            e(
              "div",
              { className: "poll-options" },
              (poll.options || []).map((opt, idx) => {
                const palette =
                  optionStyles[idx % optionStyles.length];
                const optionStyle = isClosed
                  ? null
                  : {
                      backgroundColor: palette.bg,
                      borderColor: palette.border,
                      color: palette.text
                    };
                const statStyle = isClosed
                  ? null
                  : { color: palette.text };
                return e(
                  "button",
                  {
                    key: opt.id,
                    type: "button",
                    disabled: isClosed || !onVote,
                    className: "poll-option-row",
                    style: optionStyle,
                    onClick: (event) => {
                      if (event && event.stopPropagation) {
                        event.stopPropagation();
                      }
                      if (onVote) {
                        onVote(poll.id, opt.id);
                      }
                    }
                  },
                  e(
                    "span",
                    { className: "poll-option-label" },
                    opt.label
                  ),
                  e(
                    "span",
                    { className: "poll-option-stat", style: statStyle },
                    totalVotes ? (opt.votes || 0) + " • " : "",
                    computePercent(opt, totalVotes)
                  )
                );
              })
            ),
            poll.endDate &&
              e(
                "p",
                { className: "poll-end-date" },
                t(lang, "polls_end_prefix"),
                poll.endDate
              )
          )
        );
      })
    );
  }

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, t(lang, "polls_section_title")),
      e(
        "p",
        null,
        t(lang, "polls_section_subtitle")
      ),
      e(
        "button",
        {
          type: "button",
          onClick: onOpenForm,
          className: "page-section-cta"
        },
        t(lang, "polls_section_cta")
      )
    ),
    pollsError &&
      e(
        "div",
        { className: "page-section-error" },
        pollsError
      ),
    renderList(items)
  );
}

