// OnboardingStep : demande d'accès résident
// Demande un nom/pseudo + code d'accès du groupe + URL du profil Facebook

function OnboardingStep(props) {
  const {
    currentUser,
    onCompleted,
    onCancel,
    initialFacebookProfileUrl,
    lang: rawLang
  } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const derivedInitialUrl =
    (initialFacebookProfileUrl ||
      (currentUser && currentUser.facebookProfileUrl) ||
      ""
    ).trim();
  const [facebookProfileUrl, setFacebookProfileUrl] =
    React.useState(derivedInitialUrl);
  const [groupName, setGroupName] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  React.useEffect(() => {
    setFacebookProfileUrl(derivedInitialUrl);
  }, [derivedInitialUrl]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!facebookProfileUrl.trim() || !groupName.trim()) {
      setError(t(lang, "onboarding_error_missing"));
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage(null);
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facebookProfileUrl: facebookProfileUrl.trim(),
          groupName: groupName.trim()
        })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg =
          (data && data.error) ||
          t(lang, "onboarding_error_submit");
        throw new Error(msg);
      }
      setSuccessMessage(t(lang, "onboarding_success"));
      if (onCompleted) {
        onCompleted(data && data.user ? data.user : null);
      }
    } catch (err) {
      console.error(err);
      setError(
        err && err.message
          ? err.message
          : t(lang, "onboarding_error_generic")
      );
    } finally {
      setSubmitting(false);
    }
  }

  return e(
    "div",
    { className: "onboarding-shell" },
    e(
      "div",
      { className: "card card-wrapper onboarding-card" },
      e(
        "div",
        { className: "card-content" },
        e(
          "div",
          { className: "header" },
          e(
            "div",
            { className: "line-badge" },
            e("span", null, t(lang, "onboarding_badge"))
          )
        ),
        e(
          "div",
          { className: "onboarding-body" },
          e("h2", null, t(lang, "onboarding_title")),
          e(
            "p",
            null,
            t(lang, "onboarding_intro_before"),
            e("strong", null, t(lang, "onboarding_intro_strong")),
            t(lang, "onboarding_intro_after")
          ),
          e(
            "form",
            { className: "onboarding-form", onSubmit: handleSubmit },
            e(
              "label",
              { className: "form-field" },
              e(
                "span",
                { className: "form-label" },
                t(lang, "onboarding_group_label")
              ),
              e("input", {
                type: "text",
                value: groupName,
                onChange: (ev) => setGroupName(ev.target.value),
                placeholder: t(lang, "onboarding_group_placeholder"),
                className: "input"
              })
            ),
            e(
              "label",
              { className: "form-field" },
              e(
                "span",
                { className: "form-label" },
                t(lang, "onboarding_profile_label")
              ),
              e("input", {
                type: "url",
                value: facebookProfileUrl,
                onChange: (ev) => setFacebookProfileUrl(ev.target.value),
                placeholder: t(lang, "onboarding_profile_placeholder"),
                className: "input"
              })
            ),
            error &&
              e(
                "div",
                { className: "form-error" },
                error
              ),
            successMessage &&
              e(
                "div",
                { className: "form-success" },
                successMessage
              ),
            e(
              "div",
              { className: "form-actions" },
              e(
                "button",
                {
                  type: "submit",
                  className: "btn-primary",
                  disabled: submitting
                },
                submitting
                  ? t(lang, "onboarding_submit_loading")
                  : t(lang, "onboarding_submit")
              ),
              onCancel &&
                e(
                  "button",
                  {
                    type: "button",
                    className: "btn-secondary",
                    onClick: onCancel,
                    disabled: submitting
                  },
                  t(lang, "onboarding_cancel")
                )
            )
          ),
          e(
            "p",
            { className: "onboarding-note" },
            t(lang, "onboarding_note")
          )
        )
      )
    )
  );
}

