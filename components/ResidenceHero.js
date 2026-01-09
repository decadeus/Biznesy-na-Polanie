// Composant ResidenceHero : hero de présentation sur la page d'accueil

function ResidenceHero(props) {
  const { residence, residenceError, classifieds, onLogin } = props;

  const heroTitle = "Résidence Strzelców 42/40 – Mały Kack, Gdynia";
  const immobiliers = (classifieds || []).filter(
    (c) => c.type === "immobilier"
  );

  return e(
    "div",
    { className: "hero-shell" },
    // Bloc hero principal
    e(
      "div",
      { className: "hero-card" },
      // Image à gauche
      e(
        "div",
        { className: "hero-image" },
        e("div", { className: "hero-image-inner" })
      ),
      // Texte à droite
      e(
        "div",
        { className: "hero-content" },
        e(
          "div",
          { className: "hero-heading" },
          e(
            "div",
            { className: "hero-kicker" },
            "Présentation de la résidence"
          ),
          e(
            "h1",
            { className: "hero-title" },
            e(
              "span",
              { className: "hero-title-main" },
              heroTitle
            ),
            e(
              "span",
              { className: "hero-title-accent" },
              "un cadre de vie calme et bien connecté"
            )
          )
        ),
        e(
          "div",
          { className: "hero-body" },
          e(
            "p",
            null,
            "La résidence Strzelców 42/40 se situe à Mały Kack, un quartier résidentiel calme entre le centre de Gdynia et les collines boisées du parc paysager. Le domaine est composé de plusieurs immeubles modernes, avec des entrées sécurisées et des parties communes soignées, où l’on croise facilement ses voisins au quotidien."
          ),
          e(
            "p",
            null,
            "En quelques minutes à pied, vous accédez aux arrêts de bus (dont la ligne 32) et à la gare SKM, ce qui facilite les déplacements vers le centre de Gdynia, Sopot ou Gdańsk. À proximité immédiate, on trouve des commerces du quotidien, des services dans ou autour de la résidence et des sentiers de promenade dans les collines voisines."
          ),
          e(
            "p",
            null,
            "L’application Ligne 32 propose aussi des pages de communication réservées aux résidents : annonces immobilières, annonces entre voisins, petits services, signalements et informations pratiques partagées par la communauté."
          ),
          e(
            "h3",
            { className: "hero-subtitle" },
            "Commodités de la résidence et du quartier"
          ),
          e(
            "div",
            { className: "hero-amenities" },
            e(
              "div",
              { className: "hero-amenities-column" },
              e("h4", null, "Dans la résidence"),
              e(
                "ul",
                { className: "hero-advantages" },
                e(
                  "li",
                  { className: "hero-adv-card" },
                  e("img", {
                    className: "hero-adv-icon",
                    src: "https://img.icons8.com/fluency/48/home.png",
                    alt: "Immeubles modernes"
                  }),
                  e(
                    "div",
                    { className: "hero-adv-text" },
                    e("strong", null, "Immeubles modernes"),
                    e(
                      "span",
                      null,
                      "Entrées sécurisées, parties communes entretenues."
                    )
                  )
                ),
                e(
                  "li",
                  { className: "hero-adv-card" },
                  e("img", {
                    className: "hero-adv-icon",
                    src: "https://img.icons8.com/fluency/48/conference-call.png",
                    alt: "Communauté"
                  }),
                  e(
                    "div",
                    { className: "hero-adv-text" },
                    e("strong", null, "Communauté de voisins"),
                    e(
                      "span",
                      null,
                      "Échanges, services entre voisins et événements locaux."
                    )
                  )
                )
              )
            ),
            e(
              "div",
              { className: "hero-amenities-column" },
              e("h4", null, "Dans le quartier"),
              e(
                "ul",
                { className: "hero-advantages" },
                e(
                  "li",
                  { className: "hero-adv-card" },
                  e("img", {
                    className: "hero-adv-icon",
                    src: "https://img.icons8.com/fluency/48/city-buildings.png",
                    alt: "Quartier calme et connecté"
                  }),
                  e(
                    "div",
                    { className: "hero-adv-text" },
                    e("strong", null, "Quartier calme et connecté"),
                    e(
                      "span",
                      null,
                      "Bus, SKM et centre de Gdynia accessibles rapidement."
                    )
                  )
                ),
                e(
                  "li",
                  { className: "hero-adv-card" },
                  e("img", {
                    className: "hero-adv-icon",
                    src: "https://img.icons8.com/fluency/48/park.png",
                    alt: "Nature proche"
                  }),
                  e(
                    "div",
                    { className: "hero-adv-text" },
                    e("strong", null, "Proche de la nature"),
                    e(
                      "span",
                      null,
                      "Accès direct aux collines et sentiers de Mały Kack."
                    )
                  )
                )
              )
            )
          ),
          residenceError &&
            e(
              "div",
              { className: "hero-error" },
              residenceError
            )
        ),
        e(
          "div",
          { className: "hero-cta-row" },
          e(
            "button",
            {
              type: "button",
              onClick: onLogin,
              className: "hero-cta-main"
            },
            "Accéder au tableau de bord"
          ),
          e(
            "div",
            { className: "hero-cta-secondary" },
            "Connexion par e-mail, sans mot de passe."
          )
        )
      )
    ),
    // Bloc infos complémentaires : infos pratiques + carte + aperçus
    e(
      "div",
      { className: "hero-extra" },
      e(
        "div",
        { className: "hero-extra-row" },
        e(
          "section",
          { className: "hero-extra-section hero-extra-info" },
          e(
            "h2",
            null,
            "Une résidence confortable"
          ),
          e(
            "p",
            null,
            "Quelques points clés pour se représenter le confort et le quotidien à Strzelców 42/40."
          ),
          e(
            "ul",
            { className: "hero-info-list" },
            e(
              "li",
              null,
              e("span", { className: "hero-info-bullet" }, "✔"),
              e(
                "span",
                null,
                "Adresse : Strzelców 42/40, Mały Kack – Gdynia, dans un quartier résidentiel calme."
              )
            ),
            e(
              "li",
              null,
              e("span", { className: "hero-info-bullet" }, "✔"),
              e(
                "span",
                null,
                "Transports : bus 32 (Mały Kack Strzelców 01) et autres lignes de quartier, gare SKM Mały Kack à proximité."
              )
            ),
            e(
              "li",
              null,
              e("span", { className: "hero-info-bullet" }, "✔"),
              e(
                "span",
                null,
                "Commerces dans la résidence : petits commerces de proximité comme une épicerie vegan et un salon de coiffure."
              )
            ),
            e(
              "li",
              null,
              e("span", { className: "hero-info-bullet" }, "✔"),
              e(
                "span",
                null,
                "Commerces aux alentours : superettes, boulangeries, cafés et services du quotidien accessibles à pied."
              )
            ),
            e(
              "li",
              null,
              e("span", { className: "hero-info-bullet" }, "✔"),
              e(
                "span",
                null,
                "Espaces verts : accès rapide aux collines boisées et sentiers du parc paysager pour marcher ou faire du vélo."
              )
            )
          )
        ),
        e(
          "section",
          { className: "hero-extra-section hero-extra-map" },
          e(
            "h2",
            null,
            "Localisation de la résidence"
          ),
          e(
            "p",
            null,
            "Vue approximative de la zone pour se repérer dans le quartier."
          ),
          e("iframe", {
            className: "hero-map",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            src:
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2336.5708696197613!2d18.5205!3d54.4955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fda1b6d9f0a7a7%3A0x0000000000000000!2sStrzelc%C3%B3w%2042%2C%20Gdynia!5e0!3m2!1sfr!2spl!4v1700000000000"
          })
        )
      ),
      e(
        "section",
        { className: "hero-extra-section hero-extra-immo" },
        e(
          "div",
          { className: "hero-extra-header" },
          e(
            "h2",
            null,
            "Annonces immobilières dans la résidence"
          ),
          e(
            "p",
            null,
            "Un aperçu des dernières annonces publiées par les résidents."
          )
        ),
        e(
          "div",
          { className: "hero-immo-grid" },
          (immobiliers || []).slice(0, 3).map((item) =>
            e(
              "article",
              { key: item.id, className: "hero-immo-card" },
              item.imageUrl &&
                e("div", {
                  className: "hero-immo-thumb",
                  style: { backgroundImage: "url(" + item.imageUrl + ")" }
                }),
              e(
                "div",
                { className: "hero-immo-body" },
                e(
                  "h3",
                  { className: "hero-immo-title" },
                  item.title
                ),
                item.price != null &&
                  e(
                    "p",
                    { className: "hero-immo-price" },
                    item.price + " " + (item.currency || "PLN")
                  ),
                e(
                  "p",
                  { className: "hero-immo-text" },
                  item.description
                )
              )
            )
          ),
          (!immobiliers || immobiliers.length === 0) &&
            e(
              "p",
              { className: "hero-immo-empty" },
              "Aucune annonce immobilière n’a encore été publiée."
            )
        )
      ),
      e(
        "section",
        { className: "hero-extra-section hero-extra-gallery" },
        e(
          "h2",
          null,
          "Ambiance du quartier"
        ),
        e(
          "p",
          null,
          "Quelques images d’inspiration pour se représenter l’atmosphère des immeubles, des espaces verts et de la ville."
        ),
        e(
          "div",
          { className: "hero-gallery" },
          e("div", {
            className: "hero-gallery-item",
            style: {
              backgroundImage:
                "url(https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200)"
            }
          }),
          e("div", {
            className: "hero-gallery-item",
            style: {
              backgroundImage:
                "url(https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1200)"
            }
          }),
          e("div", {
            className: "hero-gallery-item",
            style: {
              backgroundImage:
                "url(https://images.pexels.com/photos/259846/pexels-photo-259846.jpeg?auto=compress&cs=tinysrgb&w=1200)"
            }
          })
        )
      )
    )
  );
}

