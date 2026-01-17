// Formulaire pour créer un signalement

function ReportForm(props) {
  const { creating, onSubmit, initialValues, isEditing, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [durationDays, setDurationDays] = React.useState(7);

  React.useEffect(() => {
    if (!initialValues) return;
    setTitle(initialValues.title || "");
    setCategory(initialValues.category || "");
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
        category: category.trim(),
        description: description.trim(),
        imageFile,
        durationDays
      });
    }
    setTitle("");
    setCategory("");
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
        e("label", null, t(lang, "report_title_label")),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: t(lang, "report_title_placeholder")
        })
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, t(lang, "report_category_label")),
        e("input", {
          type: "text",
          value: category,
          onChange: (e) => setCategory(e.target.value),
          placeholder: t(lang, "report_category_placeholder")
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, t(lang, "report_desc_label")),
      e("textarea", {
        rows: 3,
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: t(lang, "report_desc_placeholder")
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
          ? t(lang, "report_submit_update")
          : t(lang, "report_submit_create")
      )
    )
  );
}

