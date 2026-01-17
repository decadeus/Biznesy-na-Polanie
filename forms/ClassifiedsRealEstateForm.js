// Formulaire pour une annonce immobilière

function ClassifiedsRealEstateForm(props) {
  const lang = props.lang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
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
          t(lang, "classifieds_title_label"),
          e("input", {
            type: "text",
            value: props.formTitle,
            onChange: (ev) =>
              props.onChangeField("title", ev.target.value),
            placeholder: t(lang, "classifieds_title_placeholder_realestate")
          })
        )
      ),
      e(
        "div",
        { className: "classified-form-col" },
        e(
          "label",
          null,
          t(lang, "classifieds_price_label"),
          e("input", {
            type: "number",
            value: props.formPrice,
            onChange: (ev) =>
              props.onChangeField("price", ev.target.value),
            placeholder: t(lang, "classifieds_price_placeholder")
          })
        )
      )
    ),
    e(
      "label",
      { className: "classified-form-full" },
      t(lang, "classifieds_desc_label"),
      e("textarea", {
        rows: 4,
        value: props.formDescription,
        onChange: (ev) =>
          props.onChangeField("description", ev.target.value),
        placeholder: t(lang, "classifieds_desc_placeholder_realestate")
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
          t(lang, "form_image_label"),
          e("input", {
            type: "file",
            accept: "image/*",
            onChange: (ev) =>
              props.onChangeField(
                "imageFile",
                ev && ev.target && ev.target.files
                  ? ev.target.files[0]
                  : null
              )
          })
        )
      )
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
          t(lang, "form_duration_label"),
          e(
            "select",
            {
              value: props.formDurationDays || 7,
              onChange: (ev) =>
                props.onChangeField(
                  "durationDays",
                  Number(ev.target.value)
                )
            },
            e("option", { value: 3 }, t(lang, "form_duration_3d")),
            e("option", { value: 7 }, t(lang, "form_duration_1w")),
            e("option", { value: 14 }, t(lang, "form_duration_2w")),
            e("option", { value: 21 }, t(lang, "form_duration_3w")),
            e("option", { value: 30 }, t(lang, "form_duration_1m"))
          )
        )
      )
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
      props.creating
        ? t(lang, "form_saving")
        : props.isEditing
        ? t(lang, "classifieds_submit_update")
        : t(lang, "classifieds_submit_publish_immo")
    )
  );
}

