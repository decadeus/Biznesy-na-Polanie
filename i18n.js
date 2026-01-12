// Simple i18n helper for static texts (FR / EN / PL)
;(function () {
  const messages = {
    fr: {
      hero_title: "Résidence Strzelców 42/40 – Mały Kack, Gdynia",
      hero_subtitle: "un cadre de vie calme et bien connecté",
      hero_kicker: "Présentation de la résidence",
      hero_body_intro:
        "La résidence Na Polanie est un ensemble moderne situé au 30 ul. Strzelców, dans le quartier Mały Kack à Gdynia, en lisière du Parc Paysager de la Tricité.",
      hero_feature_nature_title: "Cadre naturel",
      hero_feature_nature_body:
        "Accès direct aux sentiers forestiers du parc paysager, vues dégagées et ambiance très calme.",
      hero_feature_access_title: "Bien connectée",
      hero_feature_access_body:
        "Arrêts de bus vers le centre de Gdynia et le reste de la Tricité à quelques minutes à pied.",
      hero_feature_comfort_title: "Confort moderne",
      hero_feature_comfort_body:
        "Appartements lumineux, balcons ou terrasses, parking souterrain et parties communes soignées.",

      residence_section_title: "La résidence",
      residence_section_lead:
        "Quelques repères pratiques pour les habitants de Mały Kack.",

      admin_nav_members: "Membres",
      admin_nav_pending: "À valider",
      admin_nav_stats: "Statistiques",
      admin_nav_label: "Navigation admin",

      admin_hero_hint:
        "Vous avez accès aux outils d'administration (membres, à valider, statistiques). Utilisez le bouton ci-dessous pour ouvrir la navigation.",
      admin_hero_btn_open: "Ouvrir la navigation admin",
      admin_hero_btn_close: "Masquer la navigation admin",

      lang_label: "Langue",

      dashboard_hero_title: "Résidence Mały Kack – Gdynia",
      dashboard_hero_subtitle:
        "Infos pratiques, bus, météo et vie de la résidence.",
      dashboard_back_home: "Revenir à la page d'accueil",

      topbar_login_fb: "Se connecter avec Facebook",
      topbar_dev_access: "Accès temporaire",

      re_section_title: "Annonces immobilières",
      re_section_subtitle: "Ventes, locations et colocations dans la résidence.",
      re_section_cta: "Publier une annonce immo",
      re_section_empty: "Aucune annonce immobilière pour le moment.",
      re_tag: "Immobilier",

      neigh_section_title: "Annonces entre voisins",
      neigh_section_subtitle:
        "Objets à vendre ou à donner, services, cours, entraide dans l’immeuble.",
      neigh_section_cta: "Publier une annonce",
      neigh_section_empty: "Aucune annonce entre voisins pour le moment.",
      neigh_tag: "Entre voisins",

      events_section_title: "Événements de la résidence",
      events_section_subtitle: "Réunions, travaux programmés et moments conviviaux.",
      events_section_cta: "Créer un événement",
      events_section_empty: "Aucun événement à venir pour le moment.",
      events_tag: "Événement",

      services_section_title: "Petits services entre voisins",
      services_section_subtitle:
        "Covoiturage, baby-sitting, aide ponctuelle, prêt d’outils…",
      services_section_cta: "Publier un service",
      services_section_empty:
        "Aucun service proposé ou demandé pour le moment.",
      services_tag_offer: "Offre",
      services_tag_request: "Demande",

      reports_section_title: "Signalements",
      reports_section_subtitle:
        "Signaler un problème dans la résidence (lumière, propreté, bruit…).",
      reports_section_cta: "Nouveau signalement",
      reports_section_empty: "Aucun signalement pour le moment.",
      reports_tag_default: "Signalement",

      bus_header_location: "Mały Kack",
      bus_now_label: "Maintenant",
      bus_loading_full: "Chargement des horaires depuis ZKM Gdynia...",
      bus_next_dir_32: "Prochains départs direction Pogórze Dolne Złota",
      bus_next_dir_145: "Prochains départs direction Karwiny Tuwima",
      bus_next_dir_710: "Prochains départs direction Sopot",
      bus_next_label: "Prochain départ",
      bus_next_small_1: "Suivant",
      bus_next_small_2: "Ensuite",
      bus_eta_now: "maintenant",
      bus_eta_in_1: "dans 1 min",
      bus_eta_in_n: "dans {n} min",
      bus_loading_short: "Chargement...",
      bus_no_more_today:
        "Aucun autre départ prévu aujourd'hui pour cet arrêt.",
      bus_footer_with_date: "Horaires ZKM pour le {date}.",
      bus_footer_generic: "Horaires ZKM."
      
      ,

      weather_title: "Météo Gdynia",
      weather_now_label: "Maintenant",
      weather_today_label: "Aujourd'hui",
      weather_tomorrow: "Demain",
      weather_after_tomorrow: "Après-demain",
      weather_min_max: "min {tmin}°C • max {tmax}°C",
      weather_footer: "Données météo • Open-Meteo",
      weather_loading: "Chargement de la météo...",

      shops_quick_title_main: "Commerçant",
      shops_quick_title_suffix: "dans l’immeuble",

      polls_quick_title_main: "Sondages",
      polls_quick_title_suffix: "entre voisins",
      polls_quick_total_votes: "{n} votes",
      polls_quick_no_votes: "Aucun vote",
      polls_quick_end: "Fin le {date}",

      moderators_title: "Modération",
      moderators_role_super: "Super admin",
      moderators_role_admin: "Admin",
      moderators_empty: "Aucun modérateur défini pour le moment.",
      moderators_cta: "Ajouter / gérer les modérateurs"
    },
    en: {
      hero_title: "Strzelców 42/40 Residence – Mały Kack, Gdynia",
      hero_subtitle: "a quiet and well‑connected place to live",
      hero_kicker: "Residence overview",
      hero_body_intro:
        "Na Polanie is a modern residential complex located at 30 Strzelców Street in the Mały Kack district of Gdynia, on the edge of the Tri‑City Landscape Park.",
      hero_feature_nature_title: "Natural setting",
      hero_feature_nature_body:
        "Direct access to forest paths, open views over greenery and a very quiet atmosphere.",
      hero_feature_access_title: "Well connected",
      hero_feature_access_body:
        "Bus stops to Gdynia city centre and the rest of the Tri‑City within a few minutes’ walk.",
      hero_feature_comfort_title: "Modern comfort",
      hero_feature_comfort_body:
        "Bright apartments with balconies or terraces, underground parking and well‑kept common areas.",

      residence_section_title: "The residence",
      residence_section_lead:
        "A few practical points for residents of Mały Kack.",

      admin_nav_members: "Members",
      admin_nav_pending: "To review",
      admin_nav_stats: "Statistics",
      admin_nav_label: "Admin navigation",

      admin_hero_hint:
        "You have access to administration tools (members, pending requests, statistics). Use the button below to open the navigation.",
      admin_hero_btn_open: "Open admin navigation",
      admin_hero_btn_close: "Hide admin navigation",

      lang_label: "Language",

      dashboard_hero_title: "Mały Kack Residence – Gdynia",
      dashboard_hero_subtitle:
        "Practical info, buses, weather and the life of the residence.",
      dashboard_back_home: "Back to home page",

      topbar_login_fb: "Sign in with Facebook",
      topbar_dev_access: "Temporary access",

      re_section_title: "Real estate listings",
      re_section_subtitle: "Flats for sale, rent and flat‑sharing in the residence.",
      re_section_cta: "Publish a real estate ad",
      re_section_empty: "No real estate listings at the moment.",
      re_tag: "Real estate",

      neigh_section_title: "Neighbour‑to‑neighbour listings",
      neigh_section_subtitle:
        "Items for sale or free, services, lessons, everyday help.",
      neigh_section_cta: "Publish a listing",
      neigh_section_empty: "No neighbour listings at the moment.",
      neigh_tag: "Between neighbours",

      events_section_title: "Residence events",
      events_section_subtitle: "Meetings, planned works and friendly gatherings.",
      events_section_cta: "Create an event",
      events_section_empty: "No upcoming events at the moment.",
      events_tag: "Event",

      services_section_title: "Neighbour services",
      services_section_subtitle:
        "Car‑sharing, baby‑sitting, occasional help, tool lending…",
      services_section_cta: "Publish a service",
      services_section_empty: "No services offered or requested at the moment.",
      services_tag_offer: "Offer",
      services_tag_request: "Request",

      reports_section_title: "Reports",
      reports_section_subtitle:
        "Report an issue in the residence (lights, cleanliness, noise…).",
      reports_section_cta: "New report",
      reports_section_empty: "No reports at the moment.",
      reports_tag_default: "Report",

      bus_header_location: "Mały Kack",
      bus_now_label: "Now",
      bus_loading_full: "Loading timetable from ZKM Gdynia...",
      bus_next_dir_32: "Next departures towards Pogórze Dolne Złota",
      bus_next_dir_145: "Next departures towards Karwiny Tuwima",
      bus_next_dir_710: "Next departures towards Sopot",
      bus_next_label: "Next departure",
      bus_next_small_1: "Next",
      bus_next_small_2: "Later",
      bus_eta_now: "now",
      bus_eta_in_1: "in 1 min",
      bus_eta_in_n: "in {n} min",
      bus_loading_short: "Loading...",
      bus_no_more_today: "No more departures planned today for this stop.",
      bus_footer_with_date: "ZKM timetable for {date}.",
      bus_footer_generic: "ZKM timetable."

      ,

      weather_title: "Weather Gdynia",
      weather_now_label: "Now",
      weather_today_label: "Today",
      weather_tomorrow: "Tomorrow",
      weather_after_tomorrow: "The day after tomorrow",
      weather_min_max: "min {tmin}°C • max {tmax}°C",
      weather_footer: "Weather data • Open-Meteo",
      weather_loading: "Loading weather...",

      shops_quick_title_main: "Shop",
      shops_quick_title_suffix: "in the building",

      polls_quick_title_main: "Polls",
      polls_quick_title_suffix: "between neighbours",
      polls_quick_total_votes: "{n} votes",
      polls_quick_no_votes: "No votes yet",
      polls_quick_end: "Ends on {date}",

      moderators_title: "Moderation",
      moderators_role_super: "Super admin",
      moderators_role_admin: "Admin",
      moderators_empty: "No moderators defined yet.",
      moderators_cta: "Add / manage moderators"
    },
    pl: {
      hero_title: "Osiedle Na Polanie – ul. Strzelców 42/40, Mały Kack",
      hero_subtitle: "spokojne i dobrze skomunikowane miejsce do życia",
      hero_kicker: "Prezentacja osiedla",
      hero_body_intro:
        "Osiedle Na Polanie to nowoczesny kompleks mieszkaniowy przy ul. Strzelców 30 w dzielnicy Mały Kack w Gdyni, na skraju Trójmiejskiego Parku Krajobrazowego.",
      hero_feature_nature_title: "Blisko natury",
      hero_feature_nature_body:
        "Bezpośredni dostęp do leśnych ścieżek, widok na zieleń i bardzo spokojna okolica.",
      hero_feature_access_title: "Dobra komunikacja",
      hero_feature_access_body:
        "Przystanki autobusowe w kilka minut pieszo, z dojazdem do centrum Gdyni i reszty Trójmiasta.",
      hero_feature_comfort_title: "Nowoczesny komfort",
      hero_feature_comfort_body:
        "Jasne mieszkania z balkonami lub tarasami, parking podziemny i zadbane części wspólne.",

      residence_section_title: "Osiedle",
      residence_section_lead:
        "Kilka praktycznych informacji dla mieszkańców Małego Kacka.",

      admin_nav_members: "Mieszkańcy",
      admin_nav_pending: "Do zatwierdzenia",
      admin_nav_stats: "Statystyki",
      admin_nav_label: "Nawigacja administracyjna",

      admin_hero_hint:
        "Masz dostęp do narzędzi administracyjnych (mieszkańcy, zgłoszenia do zatwierdzenia, statystyki). Użyj przycisku poniżej, aby otworzyć nawigację.",
      admin_hero_btn_open: "Otwórz nawigację admina",
      admin_hero_btn_close: "Ukryj nawigację admina",

      lang_label: "Język",

      dashboard_hero_title: "Osiedle Mały Kack – Gdynia",
      dashboard_hero_subtitle:
        "Informacje praktyczne, rozkład jazdy autobusów, pogoda i życie osiedla.",
      dashboard_back_home: "Powrót do strony głównej",

      topbar_login_fb: "Zaloguj się przez Facebooka",
      topbar_dev_access: "Dostęp tymczasowy",

      re_section_title: "Ogłoszenia nieruchomości",
      re_section_subtitle:
        "Sprzedaż, wynajem i współdzielenie mieszkań na osiedlu.",
      re_section_cta: "Dodaj ogłoszenie nieruchomości",
      re_section_empty: "Brak ogłoszeń nieruchomości w tym momencie.",
      re_tag: "Nieruchomości",

      neigh_section_title: "Ogłoszenia między sąsiadami",
      neigh_section_subtitle:
        "Rzeczy na sprzedaż lub do oddania, usługi, korepetycje, pomoc sąsiedzka.",
      neigh_section_cta: "Dodaj ogłoszenie",
      neigh_section_empty: "Brak ogłoszeń między sąsiadami w tym momencie.",
      neigh_tag: "Między sąsiadami",

      events_section_title: "Wydarzenia na osiedlu",
      events_section_subtitle:
        "Spotkania, zaplanowane prace i sąsiedzkie wydarzenia.",
      events_section_cta: "Utwórz wydarzenie",
      events_section_empty: "Brak nadchodzących wydarzeń.",
      events_tag: "Wydarzenie",

      services_section_title: "Drobne usługi sąsiedzkie",
      services_section_subtitle:
        "Wspólne dojazdy, opieka nad dziećmi, doraźna pomoc, wypożyczanie narzędzi…",
      services_section_cta: "Dodaj usługę",
      services_section_empty:
        "Brak usług oferowanych lub poszukiwanych w tym momencie.",
      services_tag_offer: "Oferta",
      services_tag_request: "Prośba",

      reports_section_title: "Zgłoszenia",
      reports_section_subtitle:
        "Zgłoś problem na osiedlu (oświetlenie, czystość, hałas…).",
      reports_section_cta: "Nowe zgłoszenie",
      reports_section_empty: "Brak zgłoszeń.",
      reports_tag_default: "Zgłoszenie",

      bus_header_location: "Mały Kack",
      bus_now_label: "Teraz",
      bus_loading_full: "Ładowanie rozkładu z ZKM Gdynia...",
      bus_next_dir_32: "Najbliższe odjazdy w kierunku Pogórze Dolne Złota",
      bus_next_dir_145: "Najbliższe odjazdy w kierunku Karwiny Tuwima",
      bus_next_dir_710: "Najbliższe odjazdy w kierunku Sopotu",
      bus_next_label: "Najbliższy odjazd",
      bus_next_small_1: "Następny",
      bus_next_small_2: "Później",
      bus_eta_now: "teraz",
      bus_eta_in_1: "za 1 min",
      bus_eta_in_n: "za {n} min",
      bus_loading_short: "Ładowanie...",
      bus_no_more_today:
        "Brak kolejnych odjazdów dzisiaj z tego przystanku.",
      bus_footer_with_date: "Rozkład ZKM na dzień {date}.",
      bus_footer_generic: "Rozkład ZKM."

      ,

      weather_title: "Pogoda Gdynia",
      weather_now_label: "Teraz",
      weather_today_label: "Dzisiaj",
      weather_tomorrow: "Jutro",
      weather_after_tomorrow: "Pojutrze",
      weather_min_max: "min {tmin}°C • max {tmax}°C",
      weather_footer: "Dane pogodowe • Open-Meteo",
      weather_loading: "Ładowanie pogody...",

      shops_quick_title_main: "Sklep",
      shops_quick_title_suffix: "w budynku",

      polls_quick_title_main: "Ankiety",
      polls_quick_title_suffix: "między sąsiadami",
      polls_quick_total_votes: "{n} głosów",
      polls_quick_no_votes: "Brak głosów",
      polls_quick_end: "Koniec {date}",

      moderators_title: "Moderacja",
      moderators_role_super: "Super admin",
      moderators_role_admin: "Admin",
      moderators_empty: "Brak zdefiniowanych moderatorów.",
      moderators_cta: "Dodaj / zarządzaj moderatorami"

      ,

      members_title: "Mieszkańcy osiedla",
      members_subtitle:
        "Przykładowa lista mieszkańców oraz ról (administratorzy, moderatorzy).",
      members_search_placeholder:
        "Szukaj mieszkańca (pseudonim lub profil)…",
      members_add_btn: "Dodaj mieszkańca",
      members_loading: "Ładowanie listy mieszkańców…",
      members_section_super: "Super admin (SEO)",
      members_section_admins: "Administratorzy",
      members_section_mods: "Moderatorzy",
      members_section_members: "Mieszkańcy (strona {page} / {total})",
      members_th_avatar: "Avatar",
      members_th_nickname: "Pseudonim",
      members_th_profile: "Profil Facebook",
      members_th_role: "Rola",
      members_th_actions: "Akcje",
      members_role_super: "Super admin",
      members_role_admin: "Admin",
      members_role_moderator: "Moderator",
      members_role_member: "Mieszkaniec",
      members_btn_view_fb: "Zobacz profil FB",
      members_btn_make_moderator: "Nadaj rolę moderatora",
      members_btn_make_member: "Ustaw jako mieszkańca",
      members_btn_delete: "Usuń",
      members_pager_prev: "Poprzednia",
      members_pager_next: "Następna",
      members_pager_label: "Strona {page} / {total}"
    }
  };

  function t(lang, key) {
    const dict = messages[lang] || messages.fr;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    const fallback = messages.fr[key];
    return fallback || key;
  }

  function normalizeLang(raw) {
    if (!raw) return "fr";
    const lower = raw.toLowerCase();
    if (lower.startsWith("pl")) return "pl";
    if (lower.startsWith("en")) return "en";
    if (lower.startsWith("fr")) return "fr";
    return "fr";
  }

  window.i18n = {
    messages,
    t,
    normalizeLang,
    supportedLangs: ["fr", "en", "pl"]
  };
})();

