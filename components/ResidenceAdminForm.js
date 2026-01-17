// Formulaire admin pour les infos de résidence

function ResidenceAdminForm(props) {
  const { saving, error, onSave, lang: rawLang } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [practicalInfo, setPracticalInfo] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);

  function handleSubmit(ev) {
    ev.preventDefault();
    const list = String(practicalInfo || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (onSave) {
      onSave({
        name: name.trim(),
        address: address.trim(),
        description: description.trim(),
        practicalInfo: list,
        imageFile
      });
    }
    setName("");
    setAddress("");
    setDescription("");
    setPracticalInfo("");
    setImageFile(null);
  }

  const title = t(lang, "residence_admin_title");

  const helper = t(lang, "residence_admin_practical_placeholder");

  return e(
    "section",
    { className: "page-section" },
    e(
      "div",
      { className: "page-section-header" },
      e("h2", null, title)
    ),
    e(
      "form",
      { className: "classified-form", onSubmit: handleSubmit },
      e(
        "div",
        { className: "classified-form-row" },
        e(
          "div",
          { className: "classified-form-col" },
          e("label", null, t(lang, "residence_admin_name_label")),
          e("input", {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: t(lang, "residence_admin_name_placeholder")
          })
        ),
        e(
          "div",
          { className: "classified-form-col" },
          e("label", null, t(lang, "residence_admin_address_label")),
          e("input", {
            type: "text",
            value: address,
            onChange: (e) => setAddress(e.target.value),
            placeholder: t(lang, "residence_admin_address_placeholder")
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-full" },
        e("label", null, t(lang, "residence_admin_desc_label")),
        e("textarea", {
          rows: 3,
          value: description,
          onChange: (e) => setDescription(e.target.value),
          placeholder: t(lang, "residence_admin_desc_placeholder")
        })
      ),
      e(
        "div",
        { className: "classified-form-full" },
        e("label", null, t(lang, "residence_admin_practical_label")),
        e("textarea", {
          rows: 4,
          value: practicalInfo,
          onChange: (e) => setPracticalInfo(e.target.value),
          placeholder: helper
        })
      ),
      e(
        "div",
        { className: "classified-form-full" },
        e("label", null, t(lang, "form_image_label")),
        e("input", {
          type: "file",
          accept: "image/*",
          onChange: (e) => {
            const file = e && e.target && e.target.files && e.target.files[0];
            setImageFile(file || null);
          }
        })
      ),
      error &&
        e(
          "div",
          { className: "page-section-error" },
          error
        ),
      e(
        "div",
        { className: "classified-form-actions" },
        e(
          "button",
          { type: "submit", className: "btn-primary", disabled: saving },
          saving
            ? t(lang, "residence_admin_submit_saving")
            : t(lang, "residence_admin_submit")
        )
      )
    )
  );
}
