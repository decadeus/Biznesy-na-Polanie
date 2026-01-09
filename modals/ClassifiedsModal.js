// Composant ClassifiedsModal : popup simple qui délègue aux formulaires spécialisés

function ClassifiedsModal(props) {
  if (!props.open) return null;

  const isImmo = props.formType === "immobilier";

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
                isImmo ? "Nouvelle annonce immobilière" : "Nouvelle annonce entre voisins"
              )
            ),
            e(
              "button",
              {
                type: "button",
                onClick: props.onClose,
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
          isImmo
            ? e(ClassifiedsRealEstateForm, props)
            : e(ClassifiedsNeighborsForm, props)
        )
      )
    )
  );
}

