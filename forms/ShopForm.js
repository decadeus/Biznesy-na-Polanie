// Formulaire pour ajouter un commerce de la résidence

function ShopForm(props) {
  const { creating, onSubmit, initialValues, isEditing, lang: rawLang } =
    props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [localName, setLocalName] = React.useState("");
  const [localType, setLocalType] = React.useState("");
  const [localDescription, setLocalDescription] = React.useState("");
  const [localUrl, setLocalUrl] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);

  React.useEffect(() => {
    if (!initialValues) return;
    setLocalName(initialValues.name || "");
    setLocalType(initialValues.type || "");
    setLocalDescription(initialValues.description || "");
    setLocalUrl(initialValues.url || "");
    setImageFile(null);
  }, [initialValues && initialValues.id]);

  async function handleSubmit(e) {
    const ok = await onSubmit(e, {
      name: localName,
      type: localType,
      description: localDescription,
      url: localUrl,
      imageFile
    });
    if (ok) {
      setLocalName("");
      setLocalType("");
      setLocalDescription("");
      setLocalUrl("");
      setImageFile(null);
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
          t(lang, "shop_form_name_label"),
          e("input", {
            type: "text",
            value: localName,
            onChange: (ev) => setLocalName(ev.target.value),
            placeholder: t(lang, "shop_form_name_placeholder")
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          t(lang, "shop_form_type_label"),
          e("input", {
            type: "text",
            value: localType,
            onChange: (ev) => setLocalType(ev.target.value),
            placeholder: t(lang, "shop_form_type_placeholder")
          })
        )
      )
    ),
    e(
      "label",
      { className: "classified-form-full" },
      t(lang, "shop_form_desc_label"),
      e("textarea", {
        rows: 3,
        value: localDescription,
        onChange: (ev) => setLocalDescription(ev.target.value),
        placeholder: t(lang, "shop_form_desc_placeholder")
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
          t(lang, "shop_form_url_label"),
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
          t(lang, "shop_form_image_label"),
          e("input", {
            type: "file",
            accept: "image/*",
            onChange: (ev) =>
              setImageFile(
                ev && ev.target && ev.target.files ? ev.target.files[0] : null
              )
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
      creating
        ? t(lang, "form_saving")
        : isEditing
        ? t(lang, "shop_form_submit_update")
        : t(lang, "shop_form_submit")
    )
  );
}

