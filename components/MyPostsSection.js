// Section "Mes publications"

function MyPostsSection(props) {
  const lang = (props && props.lang) || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const classifieds = (props && props.classifieds) || [];
  const events = (props && props.events) || [];
  const reports = (props && props.reports) || [];
  const services = (props && props.services) || [];
  const polls = (props && props.polls) || [];
  const onEdit = (props && props.onEdit) || null;
  const onDelete = (props && props.onDelete) || null;

  const locale = lang === "pl" ? "pl-PL" : lang === "en" ? "en-GB" : "fr-FR";

  const title = t(lang, "my_posts_title");

  const intro = t(lang, "my_posts_intro");

  const labels = {
    classifieds: t(lang, "my_posts_section_classifieds"),
    events: t(lang, "my_posts_section_events"),
    reports: t(lang, "my_posts_section_reports"),
    services: t(lang, "my_posts_section_services"),
    polls: t(lang, "my_posts_section_polls"),
    empty: t(lang, "my_posts_empty"),
    createdAt: t(lang, "my_posts_created_at"),
    date: t(lang, "my_posts_date"),
    time: t(lang, "my_posts_time"),
    status: t(lang, "my_posts_status"),
    kind: t(lang, "my_posts_kind"),
    endDate: t(lang, "my_posts_end_date"),
    typeImmobilier: t(lang, "my_posts_type_realestate"),
    typeObjet: t(lang, "my_posts_type_item"),
    kindOffre: t(lang, "my_posts_kind_offer"),
    kindDemande: t(lang, "my_posts_kind_request"),
    remaining: t(lang, "my_posts_remaining"),
    edit: t(lang, "my_posts_edit"),
    remove: t(lang, "my_posts_remove"),
    pending: t(lang, "my_posts_pending")
  };

  function safeDate(value) {
    if (!value) return null;
    const date = new Date(value);
    if (!date || Number.isNaN(date.getTime())) return null;
    return date;
  }

  function formatDate(value) {
    const date = safeDate(value);
    if (!date) return null;
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function formatClassifiedType(type) {
    if (type === "immobilier") return labels.typeImmobilier;
    if (type === "objet") return labels.typeObjet;
    return type;
  }

  function formatServiceKind(kind) {
    if (kind === "offre") return labels.kindOffre;
    if (kind === "demande") return labels.kindDemande;
    return kind;
  }

  function formatMeta(item, kind) {
    const parts = [];
    if (kind === "events") {
      if (item.date) parts.push(labels.date + " " + item.date);
      if (item.time) parts.push(labels.time + " " + item.time);
    }
    if (kind === "reports" && item.status) {
      parts.push(labels.status + " " + item.status);
    }
    if (kind === "services" && item.kind) {
      parts.push(labels.kind + " " + formatServiceKind(item.kind));
    }
    if (kind === "classifieds" && item.type) {
      parts.push(labels.kind + " " + formatClassifiedType(item.type));
    }
    if (kind === "polls" && item.endDate) {
      parts.push(labels.endDate + " " + item.endDate);
    }
    if (item.status === "pending") {
      parts.push(labels.pending);
    }
    if (item.createdAt) {
      const created = formatDate(item.createdAt);
      if (created) parts.push(labels.createdAt + " " + created);
    }
    return parts.join(" · ");
  }

  function getRemainingMs(item) {
    if (!item) return null;
    const base =
      item.modifiedAt ||
      item.modified_at ||
      item.createdAt ||
      item.created_at ||
      null;
    if (!base) return null;
    const baseDate = new Date(base);
    if (!baseDate || Number.isNaN(baseDate.getTime())) return null;
    const duration =
      item.durationDays || item.duration_days || item.duration || 7;
    const expiresAt = baseDate.getTime() + duration * 24 * 60 * 60 * 1000;
    return expiresAt - Date.now();
  }

  function formatRemaining(ms) {
    if (ms == null) return null;
    const totalMinutes = Math.max(0, Math.floor(ms / 60000));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;
    if (days > 0) {
      return (
        days +
        t(lang, "time_day_short") +
        " " +
        hours +
        t(lang, "time_hour_short")
      );
    }
    if (hours > 0) {
      return (
        hours +
        t(lang, "time_hour_short") +
        " " +
        minutes +
        t(lang, "time_min_short")
      );
    }
    return minutes + t(lang, "time_min_short");
  }

  const defaultThumb =
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800";

  function getTagLabel(item, kind) {
    if (kind === "classifieds") {
      return formatClassifiedType(item && item.type ? item.type : "");
    }
    if (kind === "events") return labels.events;
    if (kind === "reports") return labels.reports;
    if (kind === "services") return labels.services;
    if (kind === "polls") return labels.polls;
    return "";
  }

  function renderSection(sectionKey, sectionTitle, items) {
    const list = Array.isArray(items) ? items : [];
    return e(
      "section",
      { className: "page-section" },
      e(
        "div",
        { className: "page-section-header" },
        e("h2", null, sectionTitle)
      ),
      list.length
        ? e(
            "div",
            { className: "classifieds-cards-grid my-posts-grid" },
            list.map(function (item, index) {
              const meta = formatMeta(item || {}, sectionKey);
              const remaining = formatRemaining(getRemainingMs(item));
              const thumbUrl = (item && item.imageUrl) || defaultThumb;
              const tagLabel = getTagLabel(item, sectionKey);
              return e(
                "article",
                {
                  className: "classified-item my-posts-card",
                  key: sectionKey + "-" + (item && item.id ? item.id : index)
                },
                e(CardAuthorHeader, {
                  name: item && item.authorName ? item.authorName : null,
                  avatarUrl:
                    item && item.authorAvatarUrl ? item.authorAvatarUrl : null,
                  role: item && item.authorRole ? item.authorRole : null,
                  createdAt: item && item.createdAt ? item.createdAt : null,
                  lang
                }),
                e(
                  "div",
                  {
                    className: "classified-thumb",
                    style: { backgroundImage: "url(" + thumbUrl + ")" }
                  },
                  e("img", {
                    src: thumbUrl,
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
                    e(
                      "h3",
                      { className: "classified-title" },
                      (item && item.title) || (item && item.name) || "—"
                    ),
                    tagLabel &&
                      e(
                        "span",
                        { className: "classified-tag" },
                        tagLabel
                      )
                  ),
                  item && item.description &&
                    e(
                      "p",
                      { className: "classified-text" },
                      item.description
                    ),
                  item && item.price != null &&
                    e(
                      "p",
                      { className: "classified-price" },
                      item.price + " " + (item.currency || "PLN")
                    ),
                  meta && e("div", { className: "my-posts-meta" }, meta),
                  remaining &&
                    e(
                      "div",
                      { className: "my-posts-remaining" },
                      labels.remaining + ": " + remaining
                    ),
                  e(
                    "div",
                    { className: "my-posts-actions" },
                    onEdit &&
                      e(
                        "button",
                        {
                          type: "button",
                          className: "btn-secondary",
                          onClick: () => onEdit(sectionKey, item)
                        },
                        labels.edit
                      ),
                    onDelete &&
                      e(
                        "button",
                        {
                          type: "button",
                          className: "btn-danger-outline",
                          onClick: () => onDelete(sectionKey, item)
                        },
                        labels.remove
                      )
                  )
                )
              );
            })
          )
        : e("p", { className: "page-section-text" }, labels.empty)
    );
  }

  return e(
    "div",
    { className: "my-posts" },
    e(
      "section",
      { className: "page-section" },
      e(
        "div",
        { className: "page-section-header" },
        e("h2", null, title)
      ),
      e("p", { className: "page-section-text" }, intro)
    ),
    renderSection("classifieds", labels.classifieds, classifieds),
    renderSection("events", labels.events, events),
    renderSection("reports", labels.reports, reports),
    renderSection("services", labels.services, services),
    renderSection("polls", labels.polls, polls)
  );
}
