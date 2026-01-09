// Formulaire pour créer un nouveau sondage

function PollForm(props) {
  const { creating, onSubmit } = props;
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [options, setOptions] = React.useState(["Oui", "Non"]);

  function handleChangeOption(index, value) {
    setOptions((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  function handleAddOption() {
    setOptions((prev) => {
      if (prev.length >= 5) return prev;
      return [...prev, ""];
    });
  }

  function handleRemoveOption(index) {
    setOptions((prev) => {
      if (prev.length <= 2) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cleanOptions = options
      .map((opt) => (opt || "").trim())
      .filter(Boolean);

    if (!title.trim() || !endDate.trim() || cleanOptions.length < 2) {
      alert(
        "Merci d’indiquer au moins un titre, une date de fin et 2 options non vides."
      );
      return;
    }

    if (onSubmit) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        endDate: endDate.trim(),
        options: cleanOptions.map((label, idx) => ({
          id: idx + 1,
          label
        }))
      });
    }

    setTitle("");
    setDescription("");
    setEndDate("");
    setOptions(["Oui", "Non"]);
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
        e("label", null, "Titre du sondage"),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "Ex : Faut-il organiser un nettoyage de printemps ?"
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, "Description courte (optionnelle)"),
      e("textarea", {
        rows: 2,
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: "Quelques mots de contexte pour les voisins…"
      })
    ),
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Fin du sondage"),
        e("input", {
          type: "date",
          value: endDate,
          onChange: (e) => setEndDate(e.target.value)
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, "Options de vote (2 à 5)"),
      e(
        "div",
        { className: "classified-form-options" },
        options.map((opt, idx) =>
          e(
            "div",
            { key: idx, className: "classified-form-option-row" },
            e("input", {
              type: "text",
              value: opt,
              onChange: (e) => handleChangeOption(idx, e.target.value),
              placeholder: idx === 0 ? "Oui" : idx === 1 ? "Non" : "Autre option"
            }),
            options.length > 2 &&
              e(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemoveOption(idx),
                  className: "btn-icon"
                },
                "×"
              )
          )
        ),
        options.length < 5 &&
          e(
            "button",
            {
              type: "button",
              onClick: handleAddOption,
              className: "btn-secondary"
            },
            "Ajouter une option"
          )
      )
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
        creating ? "Enregistrement..." : "Créer le sondage"
      )
    )
  );
}

