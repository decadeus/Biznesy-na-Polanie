// Formulaire pour créer un nouveau sondage

function PollForm(props) {
  const { creating, onSubmit, initialValues, isEditing, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [options, setOptions] = React.useState(() => [
    t(lang, "poll_option_yes"),
    t(lang, "poll_option_no")
  ]);
  const [durationDays, setDurationDays] = React.useState(7);

  React.useEffect(() => {
    if (!initialValues) return;
    setTitle(initialValues.title || "");
    setDescription(initialValues.description || "");
    setEndDate(initialValues.endDate || "");
    setImageFile(null);
    const initialOptions = Array.isArray(initialValues.options)
      ? initialValues.options.map((opt) =>
          typeof opt === "string" ? opt : opt && opt.label ? opt.label : ""
        )
      : [];
    const fallbackOptions = [
      t(lang, "poll_option_yes"),
      t(lang, "poll_option_no")
    ];
    setOptions(initialOptions.length >= 2 ? initialOptions : fallbackOptions);
    setDurationDays(
      initialValues.durationDays ||
        initialValues.duration_days ||
        initialValues.duration ||
        7
    );
  }, [initialValues && initialValues.id, lang]);

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
      alert(t(lang, "poll_error_required_fields"));
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
        })),
        imageFile,
        durationDays
      });
    }

    setTitle("");
    setDescription("");
    setEndDate("");
    setImageFile(null);
    setOptions([t(lang, "poll_option_yes"), t(lang, "poll_option_no")]);
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
        e("label", null, t(lang, "poll_title_label")),
        e("input", {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: t(lang, "poll_title_placeholder")
        })
      )
    ),
    e(
      "div",
      { className: "classified-form-full" },
      e("label", null, t(lang, "poll_desc_label")),
      e("textarea", {
        rows: 2,
        value: description,
        onChange: (e) => setDescription(e.target.value),
        placeholder: t(lang, "poll_desc_placeholder")
      })
    ),
    e(
      "div",
      { className: "classified-form-row" },
      e(
        "div",
        { className: "classified-form-col" },
        e("label", null, t(lang, "poll_end_label")),
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
      e("label", null, t(lang, "poll_options_label")),
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
              placeholder:
                idx === 0
                  ? t(lang, "poll_option_yes")
                  : idx === 1
                  ? t(lang, "poll_option_no")
                  : t(lang, "poll_option_other")
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
            t(lang, "poll_add_option")
          )
      )
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
          ? t(lang, "poll_submit_update")
          : t(lang, "poll_submit_create")
      )
    )
  );
}

