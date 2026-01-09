// Modal pour afficher le détail d'un commerce

function ShopModal(props) {
  const { open, shop, onClose } = props;
  if (!open || !shop) return null;

  return e(
    "div",
    { className: "modal-backdrop" },
    e(
      "div",
      { className: "modal-card" },
      e(
        "div",
        { className: "card card-wrapper" },
        e(
          "div",
          { className: "card-content" },
          e(
            "div",
            { className: "header" },
            e(
              "div",
              { className: "line-badge" },
              e("span", null, "Commerce dans la résidence")
            ),
            e(
              "button",
              {
                type: "button",
                onClick: onClose,
                style: {
                  marginLeft: "8px",
                  padding: "3px 8px",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.6)",
                  background: "rgba(15,23,42,0.8)",
                  color: "#e5e7eb",
                  fontSize: "11px",
                  cursor: "pointer"
                }
              },
              "Fermer"
            )
          ),
          e("div", { className: "divider" }),
          shop.imageUrl &&
            e("div", {
              className: "announcement-modal-image",
              style: { backgroundImage: "url(" + shop.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "announcement-modal-body" },
            e(
              "h3",
              { className: "announcement-title" },
              shop.name
            ),
            e(
              "p",
              { className: "announcement-meta" },
              shop.type || ""
            ),
            e(
              "p",
              { className: "announcement-text" },
              shop.description || ""
            ),
            shop.url &&
              e(
                "a",
                {
                  className: "shops-quick-link",
                  href: shop.url,
                  target: "_blank",
                  rel: "noreferrer",
                  style: { marginTop: "8px", display: "inline-block" }
                },
                "Ouvrir le site"
              )
          )
        )
      )
    )
  );
}

