// Composant AnnouncementModal : affiche le détail complet d'une annonce

function AnnouncementModal(props) {
  const { open, item, onClose } = props;
  if (!open || !item) return null;

  const isImmo = item.type === "immobilier";

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
              e(
                "span",
                null,
                isImmo ? "Annonce immobilière" : "Annonce entre voisins"
              )
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
          item.imageUrl &&
            e("div", {
              className: "announcement-modal-image",
              style: { backgroundImage: "url(" + item.imageUrl + ")" }
            }),
          e(
            "div",
            { className: "announcement-modal-body" },
            e(
              "h3",
              { className: "announcement-title" },
              item.title
            ),
            e(
              "p",
              { className: "announcement-meta" },
              isImmo ? "Immobilier" : "Entre voisins",
              item.price != null
                ? " • " + item.price + " " + (item.currency || "PLN")
                : ""
            ),
            e(
              "p",
              { className: "announcement-text" },
              item.description
            )
          )
        )
      )
    )
  );
}

