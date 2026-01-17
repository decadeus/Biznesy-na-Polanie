// Section de communication : bugs, design, idées de fonctionnalités

function CommunicationSection(props) {
  const lang = (props && props.lang) || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const supabase = window.supabaseClient || null;
  const residentId = (props && props.residentId) || null;
  const profileName = (props && props.profileName) || null;
  const profileAvatar = (props && props.profileAvatar) || null;
  const locale = lang === "pl" ? "pl-PL" : lang === "en" ? "en-GB" : "fr-FR";

  // Nouveau fil de discussion
  const [newTheme, setNewTheme] = React.useState("bug"); // 'bug' | 'design' | 'feature' | 'other'
  const [newMessage, setNewMessage] = React.useState("");
  // Réponse à un fil existant
  const [replyMessage, setReplyMessage] = React.useState("");
  const [replyTo, setReplyTo] = React.useState(null);

  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!supabase) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: loadError } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: true });
        if (loadError) throw loadError;
        let rows = Array.isArray(data) ? data : [];

        // Charger les votes (likes / dislikes)
        let votes = [];
        const { data: votesData, error: votesError } = await supabase
          .from("feedback_votes")
          .select("*");
        if (votesError) {
          console.warn("feedback_votes load error:", votesError.message);
        } else if (Array.isArray(votesData)) {
          votes = votesData;
        }

        const countsMap = new Map();
        const myVoteMap = new Map();
        votes.forEach(function (v) {
          const fid = v.feedback_id;
          const entry = countsMap.get(fid) || { likes: 0, dislikes: 0 };
          if (v.value === 1) entry.likes++;
          else if (v.value === -1) entry.dislikes++;
          countsMap.set(fid, entry);
          if (residentId && v.resident_key === residentId) {
            myVoteMap.set(fid, v.value);
          }
        });

        rows = rows.map(function (row) {
          const base = Object.assign({}, row);
          const c = countsMap.get(row.id) || { likes: 0, dislikes: 0 };
          base.likes = c.likes;
          base.dislikes = c.dislikes;
          base.myVote = myVoteMap.has(row.id) ? myVoteMap.get(row.id) : 0;
          return base;
        });

        setItems(rows);
      } catch (e) {
        console.error("CommunicationSection load error:", e);
        setError(
          e && e.message
            ? e.message
            : t(lang, "comm_error_load")
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [supabase]);

  async function handleSubmitNew(ev) {
    ev.preventDefault();
    if (!newMessage.trim()) {
      setError(t(lang, "comm_error_missing_message"));
      setInfo(null);
      return;
    }
    try {
      setSending(true);
      setError(null);
      setInfo(null);

      if (supabase) {
        const { error: insertError } = await supabase
          .from("feedback")
          .insert({
            author_name: profileName || null,
            author_avatar_url: profileAvatar || null,
            theme: newTheme,
            message: newMessage,
            parent_id: null
          });
        if (insertError) throw insertError;
        // Rechargement simple de la liste
        const { data, error: loadError } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: true });
        if (loadError) throw loadError;
        setItems(Array.isArray(data) ? data : []);
      } else {
        console.log("Feedback (mode local):", {
          theme: newTheme,
          message: newMessage
        });
      }

      setNewMessage("");
      setInfo(t(lang, "comm_info_posted"));
    } catch (e) {
      console.error("CommunicationSection submit error:", e);
      setError(
        e && e.message
          ? e.message
          : t(lang, "comm_error_submit")
      );
    } finally {
      setSending(false);
    }
  }

  async function handleSubmitReply(ev) {
    ev.preventDefault();
    if (!replyTo || !replyMessage.trim()) {
      setError(t(lang, "comm_error_missing_reply"));
      setInfo(null);
      return;
    }
    try {
      setSending(true);
      setError(null);
      setInfo(null);

      if (supabase) {
        const { error: insertError } = await supabase
          .from("feedback")
          .insert({
            author_name: profileName || null,
            author_avatar_url: profileAvatar || null,
            // On garde le même thème que le fil parent
            theme: replyTo.theme || "other",
            message: replyMessage,
            parent_id: replyTo.id
          });
        if (insertError) throw insertError;
        const { data, error: loadError } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: true });
        if (loadError) throw loadError;
        setItems(Array.isArray(data) ? data : []);
      } else {
        console.log("Feedback reply (mode local):", {
          parent: replyTo.id,
          message: replyMessage
        });
      }

      setReplyMessage("");
      setReplyTo(null);
      setInfo(t(lang, "comm_info_reply_posted"));
    } catch (e) {
      console.error("CommunicationSection reply error:", e);
      setError(
        e && e.message
          ? e.message
          : t(lang, "comm_error_reply")
      );
    } finally {
      setSending(false);
    }
  }

  async function handleDelete(node) {
    if (!node || !node.id) return;
    if (
      !window.confirm(t(lang, "comm_confirm_delete"))
    ) {
      return;
    }
    try {
      setSending(true);
      setError(null);
      setInfo(null);

      if (supabase) {
        const { error: deleteError } = await supabase
          .from("feedback")
          .delete()
          .eq("id", node.id);
        if (deleteError) throw deleteError;
        const { data, error: loadError } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: true });
        if (loadError) throw loadError;
        setItems(Array.isArray(data) ? data : []);
      } else {
        console.log("Feedback delete (mode local):", node.id);
      }

      if (replyTo && replyTo.id === node.id) {
        setReplyTo(null);
        setReplyMessage("");
      }
      setInfo(t(lang, "comm_info_deleted"));
    } catch (e) {
      console.error("CommunicationSection delete error:", e);
      setError(
        e && e.message
          ? e.message
          : t(lang, "comm_error_delete")
      );
    } finally {
      setSending(false);
    }
  }

  async function handleVote(node, value) {
    if (!supabase || !residentId || !node || !node.id) return;
    try {
      setSending(true);
      setError(null);
      setInfo(null);

      const current = node.myVote || 0;
      let newValue = value;
      // Si on reclique sur le même bouton, on retire le vote
      if (current === value) {
        newValue = 0;
      }

      if (newValue === 0) {
        const { error: delError } = await supabase
          .from("feedback_votes")
          .delete()
          .eq("feedback_id", node.id)
          .eq("resident_key", residentId);
        if (delError) throw delError;
      } else {
        const { error: upsertError } = await supabase
          .from("feedback_votes")
          .upsert(
            {
              feedback_id: node.id,
              resident_key: residentId,
              value: newValue
            },
            { onConflict: "feedback_id,resident_key" }
          );
        if (upsertError) throw upsertError;
      }

      // Recharger messages + votes
      const { data, error: loadError } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: true });
      if (loadError) throw loadError;
      let rows = Array.isArray(data) ? data : [];

      let votes = [];
      const { data: votesData, error: votesError } = await supabase
        .from("feedback_votes")
        .select("*");
      if (!votesError && Array.isArray(votesData)) {
        votes = votesData;
      }

      const countsMap = new Map();
      const myVoteMap = new Map();
      votes.forEach(function (v) {
        const fid = v.feedback_id;
        const entry = countsMap.get(fid) || { likes: 0, dislikes: 0 };
        if (v.value === 1) entry.likes++;
        else if (v.value === -1) entry.dislikes++;
        countsMap.set(fid, entry);
        if (residentId && v.resident_key === residentId) {
          myVoteMap.set(fid, v.value);
        }
      });

      rows = rows.map(function (row) {
        const base = Object.assign({}, row);
        const c = countsMap.get(row.id) || { likes: 0, dislikes: 0 };
        base.likes = c.likes;
        base.dislikes = c.dislikes;
        base.myVote = myVoteMap.has(row.id) ? myVoteMap.get(row.id) : 0;
        return base;
      });

      setItems(rows);
    } catch (e) {
      console.error("CommunicationSection vote error:", e);
      setError(
        e && e.message
          ? e.message
          : t(lang, "comm_error_vote")
      );
    } finally {
      setSending(false);
    }
  }

  const title = t(lang, "comm_title");
  const isReply = !!replyTo;

  // Organisation simple en fils de discussion : parent_id null = racine
  const threads = React.useMemo(() => {
    const byId = new Map();
    (items || []).forEach((it) => {
      byId.set(it.id, Object.assign({ replies: [] }, it));
    });
    const roots = [];
    byId.forEach((it) => {
      if (it.parent_id && byId.has(it.parent_id)) {
        byId.get(it.parent_id).replies.push(it);
      } else {
        roots.push(it);
      }
    });
    return roots;
  }, [items]);

  function formatTheme(theme) {
    if (theme === "bug") return t(lang, "comm_theme_bug");
    if (theme === "design") return t(lang, "comm_theme_design");
    if (theme === "feature") return t(lang, "comm_theme_feature");
    if (theme === "other") return t(lang, "comm_theme_other");
    return theme || "";
  }

  function renderNode(node, depth) {
    const created =
      node.created_at &&
      new Date(node.created_at).toLocaleString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    const isActive = replyTo && replyTo.id === node.id;
    const cardClass =
      "feedback-card " +
      (depth === 0 ? "feedback-root-card" : "feedback-reply-card") +
      (isActive ? " feedback-card-active" : "");
    const children = node.replies || [];
    const wrapperStyle = depth > 0 ? { marginLeft: depth * 16 } : undefined;
    const likesCount = typeof node.likes === "number" ? node.likes : 0;
    const dislikesCount =
      typeof node.dislikes === "number" ? node.dislikes : 0;
    const myVote = typeof node.myVote === "number" ? node.myVote : 0;

    const header = e(
      "div",
      { className: "feedback-header" },
      e(
        "div",
        { className: "feedback-author" },
        e("img", {
          className: "feedback-avatar",
          src:
            node.author_avatar_url ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80",
          alt: node.author_name || t(lang, "comm_avatar_alt")
        }),
        e(
          "div",
          { className: "feedback-author-text" },
          e(
            "div",
            { className: "feedback-author-name" },
            node.author_name || t(lang, "comm_author_fallback")
          ),
          e(
            "div",
            { className: "feedback-meta" },
            "[" + formatTheme(node.theme) + "]",
            created ? " • " + created : ""
          )
        )
      ),
      e(
        "div",
        { className: "feedback-votes" },
        e(
          "button",
          {
            type: "button",
            className:
              "feedback-vote-btn" + (myVote === 1 ? " feedback-vote-active" : ""),
            onClick: function () {
              handleVote(node, 1);
            }
          },
          "👍 ",
          likesCount
        ),
        e(
          "button",
          {
            type: "button",
            className:
              "feedback-vote-btn" +
              (myVote === -1 ? " feedback-vote-active" : ""),
            onClick: function () {
              handleVote(node, -1);
            }
          },
          "👎 ",
          dislikesCount
        )
      ),
      e(
        "button",
        {
          type: "button",
          className: "feedback-reply-btn",
          onClick: function () {
            setReplyTo(node);
            setReplyMessage("");
          }
        },
        t(lang, "comm_reply")
      ),
      node.author_name &&
        profileName &&
        node.author_name === profileName &&
        e(
          "button",
          {
            type: "button",
            className: "feedback-delete-btn",
            onClick: function () {
              handleDelete(node);
            }
          },
          t(lang, "comm_delete")
        )
    );

    const body = e(
      "div",
      { className: "feedback-text" },
      node.message
    );

    const replyForm =
      replyTo && replyTo.id === node.id
        ? e(
            "form",
            {
              className: "feedback-reply-form",
              onSubmit: handleSubmitReply
            },
            e("textarea", {
              className: "feedback-reply-textarea",
              rows: 3,
              value: replyMessage,
              onChange: function (ev) {
                setReplyMessage(ev.target.value);
              },
              placeholder: t(lang, "comm_reply_placeholder")
            }),
            e(
              "div",
              { className: "feedback-reply-actions" },
              e(
                "button",
                {
                  type: "button",
                  className: "feedback-reply-cancel",
                  onClick: function () {
                    setReplyTo(null);
                    setReplyMessage("");
                  }
                },
                t(lang, "comm_reply_cancel")
              ),
              e(
                "button",
                {
                  type: "submit",
                  className: "btn-primary",
                  disabled: sending || !replyMessage.trim()
                },
                sending
                  ? t(lang, "comm_reply_sending")
                  : t(lang, "comm_reply_send")
              )
            )
          )
        : null;

    return e(
      "div",
      {
        key: node.id,
        className: "feedback-thread",
        style: wrapperStyle
      },
      e(
        "div",
        { className: cardClass },
        header,
        body
      ),
      children.map(function (child) {
        return renderNode(child, depth + 1);
      }),
      replyForm
    );
  }

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, title)
    ),
    e(
      "p",
      { className: "page-section-text" },
      t(lang, "comm_intro")
    ),
    // Bloc : démarrer une nouvelle discussion
    e(
      "div",
      { className: "feedback-block-title" },
      t(lang, "comm_new_thread_title")
    ),
    e(
      "form",
      { className: "classified-form", onSubmit: handleSubmitNew },
      e(
        "div",
        { className: "classified-form-row" },
        e(
          "div",
          { className: "classified-form-col" },
          e(
            "label",
            null,
          t(lang, "comm_theme_label"),
            e(
              "select",
              {
                value: newTheme,
                onChange: function (ev) {
                  setNewTheme(ev.target.value);
                }
              },
            e("option", { value: "bug" }, t(lang, "comm_theme_bug")),
            e("option", { value: "design" }, t(lang, "comm_theme_design")),
            e("option", { value: "feature" }, t(lang, "comm_theme_feature")),
            e("option", { value: "other" }, t(lang, "comm_theme_other"))
            )
          )
        )
      ),
      e(
        "div",
        { className: "classified-form-full" },
        e(
          "label",
          null,
          t(lang, "comm_message_label"),
          e("textarea", {
            rows: 4,
            value: newMessage,
            onChange: function (ev) {
              setNewMessage(ev.target.value);
            },
            placeholder: t(lang, "comm_message_placeholder")
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-submit" },
        e(
          "button",
          {
            type: "submit",
            className: "btn-primary",
            disabled: sending
          },
          sending ? t(lang, "comm_submit_loading") : t(lang, "comm_submit")
        )
      )
    ),
    e("div", { className: "feedback-separator" }),
    // Bloc : discussions publiques + réponses
    e(
      "div",
      { className: "feedback-block-title" },
      t(lang, "comm_public_title")
    ),
    loading &&
      e(
        "div",
        { className: "empty", style: { marginTop: 8 } },
        t(lang, "comm_loading")
      ),
    !loading &&
      threads &&
      threads.length > 0 &&
      e(
        "div",
        { className: "feedback-list" },
        threads.map(function (root) {
          return renderNode(root, 0);
        })
      ),
    error &&
      e(
        "div",
        { className: "form-error" },
        error
      ),
    info &&
      e(
        "div",
        { className: "form-success" },
        info
      )
  );
}

