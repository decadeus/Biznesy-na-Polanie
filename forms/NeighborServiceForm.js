// Formulaire pour créer un petit service entre voisins

function NeighborServiceForm(props) {
  const { creating, onSubmit } = props;
  const [title, setTitle] = React.useState("");
  const [kind, setKind] = React.useState("offre");
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
        kind: kind || "offre",
        description: description.trim(),
        imageUrl: imageUrl.trim() || null
      });
    }
    setTitle("");
    setKind("offre");
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
        e("label", null, "Titre"),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "Propose trajet, cherche baby-sitter…"
        })
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, "Type"),
        e(
          "select",
          {
            value: kind,
            onChange: (e) => setKind(e.target.value)
          },
          e("option", { value: "offre" }, "Offre"),
          e("option", { value: "demande" }, "Demande")
        )
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
        placeholder: "Décrire le service proposé ou recherché…"
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
        creating ? "Envoi..." : "Publier"
      )
    )
  );
}

