// Formulaire pour créer un signalement

function ReportForm(props) {
  const { creating, onSubmit } = props;
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Merci d’indiquer au moins un titre et une description.");
      return;
    }
    if (onSubmit) {
      onSubmit({
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || null
      });
    }
    setTitle("");
    setCategory("");
    setDescription("");
    setImageUrl("");
  }

  return e(
    "form",
    { className: "classified-form", onSubmit: handleSubmit },
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Titre du signalement"),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "Ampoule HS, fuite, bruit, propreté…"
        })
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Catégorie"),
        e("input", {
          type: "text",
          value: category,
          onChange: (e) => setCategory(e.target.value),
          placeholder: "Éclairage, Propreté, Nuisances…"
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, "Description"),
      e("textarea", {
        rows: 3,
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: "Décrire le problème rencontré…"
      })
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, "Photo (URL libre d’accès, optionnelle)"),
      e("input", {
        type: "url",
        value: imageUrl,
        onChange: (e) => setImageUrl(e.target.value),
        placeholder: "https://images.pexels.com/..."
      })
    ),
    e(
      "div",
      { className: "classified-form-actions" },
      e(
        "button",
        {
          type: "submit",
          disabled: creating,
          className: "btn-primary"
        },
        creating ? "Envoi..." : "Envoyer le signalement"
      )
    )
  );
}

