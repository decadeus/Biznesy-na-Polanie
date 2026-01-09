// Formulaire pour une annonce immobilière

function ClassifiedsRealEstateForm(props) {
  // S'assure que le type est bien "immobilier"
  if (props.formType !== "immobilier") {
    props.onChangeField("type", "immobilier");
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
          "Titre de l'annonce immobilière",
          e("input", {
            type: "text",
            value: props.formTitle,
            onChange: (ev) =>
              props.onChangeField("title", ev.target.value),
            placeholder: "Ex: À louer 2 pièces Mały Kack"
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          "Loyer / prix (PLN)",
          e("input", {
            type: "number",
            value: props.formPrice,
            onChange: (ev) =>
              props.onChangeField("price", ev.target.value),
            placeholder: "Ex: 2800"
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
          "Surface, étage, équipements, charges, disponibilité..."
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
      props.creating ? "Enregistrement..." : "Publier l'annonce immo"
    )
  );
}

