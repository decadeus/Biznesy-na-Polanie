// Card admin pour gérer les commerces (ajout / suppression)

function ShopsAdminCard(props) {
  const {
    shops,
    creating,
    onAdd,
    onDelete,
    onEdit,
    canAdd,
    canDelete,
    canEditAll,
    currentUserId,
    editingShop,
    lang: rawLang
  } = props;
  const lang = rawLang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const list = Array.isArray(shops) ? shops : [];

  const [showForm, setShowForm] = React.useState(false);

  function handleToggleForm() {
    setShowForm(function (prev) {
      return !prev;
    });
  }

  React.useEffect(() => {
    if (editingShop) {
      setShowForm(true);
    }
  }, [editingShop && editingShop.id]);

  function handleDeleteShop(shop) {
    if (!shop || !onDelete || !canDelete) return;
    const confirmText = t(lang, "shops_admin_delete_confirm");
    if (window.confirm(confirmText)) {
      onDelete(shop);
    }
  }

  function handleEditShop(shop) {
    if (!shop || !onEdit) return;
    onEdit(shop);
    setShowForm(true);
  }

  return e(
    "div",
    { className: "card card-wrapper shops-admin-card" },
    e(
      "div",
      { className: "card-content" },
      e(
        "div",
        { className: "header" },
        e(
          "div",
          { className: "line-badge" },
          e("span", null, t(lang, "shops_admin_title"))
        )
      ),
      canAdd &&
        e(
          "div",
          { className: "shops-admin-actions" },
          e(
            "button",
            {
              type: "button",
              className: "btn-secondary",
              onClick: handleToggleForm
            },
            showForm
              ? t(lang, "shops_admin_hide_form")
              : t(lang, "shops_admin_add_button")
          )
        ),
      showForm &&
        (canAdd || editingShop) &&
        e(ShopForm, {
          creating,
          onSubmit: onAdd,
          initialValues: editingShop || null,
          isEditing: Boolean(editingShop),
          lang
        }),
      !canAdd &&
        !editingShop &&
        e(
          "div",
          { className: "shops-admin-limit" },
          t(lang, "shops_admin_limit_reached")
        ),
      list.length
        ? e(
            "div",
            { className: "classifieds-list shops-admin-list" },
            list.map((shop) => {
              const canEditShop =
                canEditAll ||
                (currentUserId &&
                  String(shop.residentId || "") === String(currentUserId));
              return e(
                "article",
                { key: shop.id, className: "classified-item" },
                e(
                  "div",
                  {
                    className: "classified-thumb",
                    style: {
                      backgroundImage: "url(" + (shop.imageUrl || "") + ")"
                    }
                  },
                  shop.imageUrl &&
                    e("img", {
                      src: shop.imageUrl,
                      alt: "",
                      className: "classified-thumb-img"
                    })
                ),
                e(
                  "div",
                  { className: "classified-body" },
                  e(
                    "div",
                    { className: "classified-title-row" },
                    e(
                      "h3",
                      { className: "classified-title" },
                      shop.name
                    ),
                    e(
                      "span",
                      { className: "classified-tag" },
                      shop.type
                    )
                  ),
                  e(
                    "p",
                    { className: "classified-text" },
                    shop.description
                  ),
                  shop.url &&
                    e(
                      "p",
                      { className: "classified-price" },
                      shop.url
                    ),
                  e(
                    "div",
                    { className: "shop-card-actions" },
                    canEditShop &&
                      e(
                        "button",
                        {
                          type: "button",
                          className: "shop-edit-btn",
                          onClick: () => handleEditShop(shop)
                        },
                        t(lang, "shops_admin_edit_button")
                      ),
                    canDelete &&
                      e(
                        "button",
                        {
                          type: "button",
                          className: "shop-delete-btn",
                          onClick: () => handleDeleteShop(shop)
                        },
                        t(lang, "shops_admin_delete_button")
                      )
                  )
                )
              );
            })
          )
        : e(
            "div",
            { className: "shops-admin-empty" },
            t(lang, "shops_admin_empty")
          )
    )
  );
}
