// Formulaire pour ajouter un commerce de la résidence

function ShopForm(props) {
  const { creating, onSubmit } = props;
  const [localName, setLocalName] = React.useState("");
  const [localType, setLocalType] = React.useState("");
  const [localDescription, setLocalDescription] = React.useState("");
  const [localUrl, setLocalUrl] = React.useState("");
  const [localImageUrl, setLocalImageUrl] = React.useState("");

  async function handleSubmit(e) {
    const ok = await onSubmit(e, {
      name: localName,
      type: localType,
      description: localDescription,
      url: localUrl,
      imageUrl: localImageUrl
    });
    if (ok) {
      setLocalName("");
      setLocalType("");
      setLocalDescription("");
      setLocalUrl("");
      setLocalImageUrl("");
    }
  }

  return e(
    "form",
    {
      onSubmit: handleSubmit,
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
          "Nom du commerce",
          e("input", {
            type: "text",
            value: localName,
            onChange: (ev) => setLocalName(ev.target.value),
            placeholder: "Ex: Vege Corner"
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          "Type",
          e("input", {
            type: "text",
            value: localType,
            onChange: (ev) => setLocalType(ev.target.value),
            placeholder: "Ex: Magasin vegan, Coiffeur..."
          })
        )
      )
    ),
    e(
      "label",
      { className: "classified-form-full" },
      "Description",
      e("textarea", {
        rows: 3,
        value: localDescription,
        onChange: (ev) => setLocalDescription(ev.target.value),
        placeholder:
          "Horaires, services proposés, étage/bâtiment, infos pratiques..."
      })
    ),
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          "Site web (optionnel)",
          e("input", {
            type: "url",
            value: localUrl,
            onChange: (ev) => setLocalUrl(ev.target.value),
            placeholder: "https://…"
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          "Photo (URL optionnelle)",
          e("input", {
            type: "url",
            value: localImageUrl,
            onChange: (ev) => setLocalImageUrl(ev.target.value),
            placeholder: "https://…"
          })
        )
      )
    ),
    e(
      "button",
      {
        type: "submit",
        disabled: creating,
        className: "classified-form-submit"
      },
      creating ? "Enregistrement..." : "Ajouter le commerce"
    )
  );
}

