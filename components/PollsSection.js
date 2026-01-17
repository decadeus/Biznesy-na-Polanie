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
              (poll.options || []).map((opt) =>
                e(
                  "button",
                  {
                    key: opt.id,
                    type: "button",
                    disabled: isClosed || !onVote,
                    className: "poll-option-row",
                    onClick: () => onVote && onVote(poll.id, opt.id)
                  },
                  e(
                    "span",
                    { className: "poll-option-label" },
                    opt.label
                  ),
                  e(
                    "span",
                    { className: "poll-option-stat" },
                    totalVotes ? (opt.votes || 0) + " • " : "",
                    computePercent(opt, totalVotes)
                  )
                )
              )
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

