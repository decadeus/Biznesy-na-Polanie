// Formulaire pour une annonce "entre voisins" (objet / service)

function ClassifiedsNeighborsForm(props) {
  // S'assure que le type par défaut est "objet" si rien n'est défini
  if (!props.formType || props.formType === "immobilier") {
    props.onChangeField("type", "objet");
  }

  return e(
    "form",
    {
      onSubmit: props.onSubmit,
      className: "classified-form"
    },
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          "Titre de l'annonce",
          e("input", {
            type: "text",
            value: props.formTitle,
            onChange: (ev) =>
              props.onChangeField("title", ev.target.value),
            placeholder: "Ex: Vélo de ville à vendre"
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          "Prix (optionnel, PLN)",
          e("input", {
            type: "number",
            value: props.formPrice,
            onChange: (ev) =>
              props.onChangeField("price", ev.target.value),
            placeholder: "Ex: 600"
          })
        )
      )
    ),
    e(
      "label",
      { className: "classified-form-full" },
      "Description",
      e("textarea", {
        rows: 4,
        value: props.formDescription,
        onChange: (ev) =>
          props.onChangeField("description", ev.target.value),
        placeholder:
          "Détaille l'objet, l'état, la disponibilité ou le service proposé..."
      })
    ),
    props.classifiedsError &&
      e(
        "div",
        { className: "page-section-error" },
        props.classifiedsError
      ),
    e(
      "button",
      {
        type: "submit",
        disabled: props.creating,
        className: "classified-form-submit"
      },
      props.creating ? "Enregistrement..." : "Publier l'annonce"
    )
  );
}

