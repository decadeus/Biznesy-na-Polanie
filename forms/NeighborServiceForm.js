// Formulaire pour créer un petit service entre voisins

function NeighborServiceForm(props) {
  const { creating, onSubmit, initialValues, isEditing, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [title, setTitle] = React.useState("");
  const [kind, setKind] = React.useState("offre");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [durationDays, setDurationDays] = React.useState(7);

  React.useEffect(() => {
    if (!initialValues) return;
    setTitle(initialValues.title || "");
    setKind(initialValues.kind || "offre");
    setDescription(initialValues.description || "");
    setImageFile(null);
    setDurationDays(
      initialValues.durationDays ||
        initialValues.duration_days ||
        initialValues.duration ||
        7
    );
  }, [initialValues && initialValues.id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert(t(lang, "form_error_title_desc_required"));
      return;
    }
    if (onSubmit) {
      onSubmit({
        title: title.trim(),
        kind: kind || "offre",
        description: description.trim(),
        imageFile,
        durationDays
      });
    }
    setTitle("");
    setKind("offre");
    setDescription("");
    setImageFile(null);
    setDurationDays(7);
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
        e("label", null, t(lang, "service_title_label")),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: t(lang, "service_title_placeholder")
        })
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, t(lang, "service_kind_label")),
        e(
          "select",
          {
            value: kind,
            onChange: (e) => setKind(e.target.value)
          },
          e("option", { value: "offre" }, t(lang, "service_kind_offer")),
          e("option", { value: "demande" }, t(lang, "service_kind_request"))
        )
      )
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, t(lang, "service_desc_label")),
      e("textarea", {
        rows: 3,
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: t(lang, "service_desc_placeholder")
      })
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, t(lang, "form_image_label")),
      e("input", {
        type: "file",
        accept: "image/*",
        onChange: (e) =>
          setImageFile(
            e && e.target && e.target.files ? e.target.files[0] : null
          )
      })
    ),
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, t(lang, "form_duration_label")),
        e(
          "select",
          {
            value: durationDays,
            onChange: (e) => setDurationDays(Number(e.target.value))
          },
          e("option", { value: 3 }, t(lang, "form_duration_3d")),
          e("option", { value: 7 }, t(lang, "form_duration_1w")),
          e("option", { value: 14 }, t(lang, "form_duration_2w")),
          e("option", { value: 21 }, t(lang, "form_duration_3w")),
          e("option", { value: 30 }, t(lang, "form_duration_1m"))
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
        creating
          ? t(lang, "form_saving")
          : isEditing
          ? t(lang, "service_submit_update")
          : t(lang, "service_submit_create")
      )
    )
  );
}

