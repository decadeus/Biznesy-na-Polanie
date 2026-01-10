// OnboardingStep : demande d'accès résident
// Demande un nom/pseudo + code d'accès du groupe + URL du profil Facebook

function OnboardingStep(props) {
  const { currentUser, onCompleted, onCancel, initialFacebookProfileUrl } =
    props;
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
      setError(
        "Merci de renseigner le nom du groupe Facebook et l'URL de votre profil Facebook."
      );
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
          "Impossible de finaliser votre première connexion pour le moment.";
        throw new Error(msg);
      }
      setSuccessMessage(
        "Votre demande a été envoyée, un modérateur doit maintenant la valider."
      );
      if (onCompleted) {
        onCompleted(data && data.user ? data.user : null);
      }
    } catch (err) {
      console.error(err);
      setError(
        err && err.message
          ? err.message
          : "Erreur lors de la finalisation de votre première connexion."
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
            e("span", null, "Première connexion")
          )
        ),
        e(
          "div",
          { className: "onboarding-body" },
          e(
            "h2",
            null,
            "Demande d'accès à l'espace résidents"
          ),
          e(
            "p",
            null,
            "Pour confirmer que vous faites bien partie du groupe Facebook de la résidence, merci d'indiquer le ",
            e("strong", null, "nom exact du groupe Facebook"),
            " ainsi que l'URL de votre profil Facebook."
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
                "Nom du groupe Facebook"
              ),
              e("input", {
                type: "text",
                value: groupName,
                onChange: (ev) => setGroupName(ev.target.value),
                placeholder: "Nom exact indiqué dans le groupe",
                className: "input"
              })
            ),
            e(
              "label",
              { className: "form-field" },
              e("span", { className: "form-label" }, "URL de votre profil Facebook"),
              e("input", {
                type: "url",
                value: facebookProfileUrl,
                onChange: (ev) => setFacebookProfileUrl(ev.target.value),
                placeholder: "https://www.facebook.com/...",
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
                submitting ? "Envoi en cours..." : "Envoyer ma demande"
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
                  "Annuler"
                )
            )
          ),
          e(
            "p",
            { className: "onboarding-note" },
            "Une fois votre demande validée par un modérateur, vous aurez accès à l'espace résidents (annonces, sondages, signalements, etc.)."
          )
        )
      )
    )
  );
}

