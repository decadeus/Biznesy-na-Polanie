// Formulaire pour créer un nouvel événement

function EventForm(props) {
  const { creating, onSubmit } = props;
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !description.trim()) {
      alert("Merci d’indiquer au moins un titre, une date et une description.");
      return;
    }
    if (onSubmit) {
      onSubmit({
        title: title.trim(),
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || null
      });
    }
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
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
        e("label", null, "Titre de l’événement"),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "Réunion de copropriété, nettoyage, fête…"
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Date"),
        e("input", {
          type: "date",
          value: date,
          onChange: (e) => setDate(e.target.value)
        })
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Heure (optionnel)"),
        e("input", {
          type: "time",
          value: time,
          onChange: (e) => setTime(e.target.value)
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Lieu (optionnel)"),
        e("input", {
          type: "text",
          value: location,
          onChange: (e) => setLocation(e.target.value),
          placeholder: "Hall d’entrée, salle commune…"
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
        placeholder: "Détails pratiques, consignes pour les résidents…"
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
        creating ? "Enregistrement..." : "Créer l’événement"
      )
    )
  );
}

