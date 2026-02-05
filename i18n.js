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
      dashboard_logout: "Se déconnecter",

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
      bus_footer_generic: "Horaires ZKM.",
      bus_fab_label: "Horaires bus"
      
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
      moderators_cta: "Ajouter / gérer les modérateurs",

      // Tableau des membres (version FR)
      members_title: "Membres de la résidence",
      members_subtitle:
        "Liste des membres et de leurs rôles (administrateurs, modérateurs, résidents).",
      members_search_placeholder:
        "Rechercher un membre (pseudo ou profil)…",
      members_add_btn: "Ajouter un membre",
      members_loading: "Chargement de la liste des membres…",
      members_section_super: "Super admin (SEO)",
      members_section_admins: "Administrateurs",
      members_section_mods: "Modérateurs",
      members_section_members: "Résidents (page {page} / {total})",
      members_th_avatar: "Avatar",
      members_th_nickname: "Pseudo",
      members_th_profile: "Profil Facebook",
      members_th_role: "Rôle",
      members_th_actions: "Actions",
      members_role_super: "Super admin",
      members_role_admin: "Admin",
      members_role_moderator: "Modérateur",
      members_role_member: "Résident",
      members_btn_view_fb: "Voir le profil FB",
      members_btn_make_moderator: "Donner le rôle de modérateur",
      members_btn_make_member: "Définir comme résident",
      members_btn_delete: "Supprimer",
      members_pager_prev: "Précédente",
      members_pager_next: "Suivante",
      members_pager_label: "Page {page} / {total}",

      residence_add_info_btn: "Ajouter une info",
      residence_post_tag: "Résidence",
      residence_modal_title: "Info résidence",
      service_modal_title: "Service entre voisins",
      report_modal_title: "Signalement",
      event_post_modal_title: "Événement",
      poll_post_modal_title: "Sondage",
      residence_posts_empty: "Aucune information pour le moment.",

      residence_admin_title: "Ajouter une info résidence",
      residence_admin_name_label: "Nom",
      residence_admin_name_placeholder: "Nom de la résidence",
      residence_admin_address_label: "Adresse",
      residence_admin_address_placeholder: "Adresse",
      residence_admin_desc_label: "Description",
      residence_admin_desc_placeholder: "Description générale de la résidence",
      residence_admin_practical_label: "Infos pratiques",
      residence_admin_practical_placeholder: "Une ligne = une info pratique.",
      residence_admin_submit: "Enregistrer",
      residence_admin_submit_saving: "Enregistrement...",

      modal_close: "Fermer",
      classifieds_modal_edit: "Modifier l'annonce",
      classifieds_modal_new_realestate: "Nouvelle annonce immobilière",
      classifieds_modal_new_neighbor: "Nouvelle annonce entre voisins",
      event_modal_edit: "Modifier l'événement",
      event_modal_new: "Nouvel événement",
      report_modal_edit: "Modifier le signalement",
      report_modal_new: "Nouveau signalement",
      service_modal_edit: "Modifier le service",
      service_modal_new: "Nouveau service",
      poll_modal_edit: "Modifier le sondage",
      poll_modal_new: "Nouveau sondage",
      residence_modal_new: "Nouvelle info résidence",

      form_image_label: "Image (optionnelle)",
      form_duration_label: "Durée d'affichage",
      form_saving: "Enregistrement...",
      form_duration_3d: "3 jours",
      form_duration_1w: "1 semaine",
      form_duration_2w: "2 semaines",
      form_duration_3w: "3 semaines",
      form_duration_1m: "1 mois",

      classifieds_title_label: "Titre de l'annonce",
      classifieds_title_placeholder_neighbor: "Ex: Vélo de ville à vendre",
      classifieds_title_placeholder_realestate: "Ex: À louer 2 pièces Mały Kack",
      classifieds_price_label_optional: "Prix (optionnel, PLN)",
      classifieds_price_label: "Loyer / prix (PLN)",
      classifieds_price_placeholder: "Ex: 600",
      classifieds_desc_label: "Description",
      classifieds_desc_placeholder_neighbor:
        "Détaille l'objet, l'état, la disponibilité ou le service proposé...",
      classifieds_desc_placeholder_realestate:
        "Surface, étage, équipements, charges, disponibilité...",
      classifieds_submit_publish: "Publier l'annonce",
      classifieds_submit_publish_immo: "Publier l'annonce immo",
      classifieds_submit_update: "Mettre à jour",

      event_title_label: "Titre de l’événement",
      event_title_placeholder: "Réunion de copropriété, nettoyage, fête…",
      event_date_label: "Date",
      event_time_label: "Heure (optionnel)",
      event_location_label: "Lieu (optionnel)",
      event_location_placeholder: "Hall d’entrée, salle commune…",
      event_desc_label: "Description",
      event_desc_placeholder: "Détails pratiques, consignes pour les résidents…",
      event_submit_create: "Créer l’événement",
      event_submit_update: "Mettre à jour",

      report_title_label: "Titre du signalement",
      report_title_placeholder: "Ampoule HS, fuite, bruit, propreté…",
      report_category_label: "Catégorie",
      report_category_placeholder: "Éclairage, Propreté, Nuisances…",
      report_desc_label: "Description",
      report_desc_placeholder: "Décrire le problème rencontré…",
      report_submit_create: "Envoyer le signalement",
      report_submit_update: "Mettre à jour",

      service_title_label: "Titre",
      service_title_placeholder: "Propose trajet, cherche baby-sitter…",
      service_kind_label: "Type",
      service_kind_offer: "Offre",
      service_kind_request: "Demande",
      service_desc_label: "Description",
      service_desc_placeholder: "Décrire le service proposé ou recherché…",
      service_submit_create: "Publier",
      service_submit_update: "Mettre à jour",

      poll_title_label: "Titre du sondage",
      poll_title_placeholder:
        "Ex : Faut-il organiser un nettoyage de printemps ?",
      poll_desc_label: "Description courte (optionnelle)",
      poll_desc_placeholder: "Quelques mots de contexte pour les voisins…",
      poll_end_label: "Fin du sondage",
      poll_options_label: "Options de vote (2 à 5)",
      poll_option_yes: "Oui",
      poll_option_no: "Non",
      poll_option_other: "Autre option",
      poll_add_option: "Ajouter une option",
      poll_submit_create: "Créer le sondage",
      poll_submit_update: "Mettre à jour",

      shop_modal_title: "Commerce dans la résidence",
      shop_modal_open_site: "Ouvrir le site",
      shop_form_name_label: "Nom du commerce",
      shop_form_name_placeholder: "Ex: Vege Corner",
      shop_form_type_label: "Type",
      shop_form_type_placeholder: "Ex: Magasin vegan, Coiffeur...",
      shop_form_desc_label: "Description",
      shop_form_desc_placeholder:
        "Horaires, services proposés, étage/bâtiment, infos pratiques...",
      shop_form_url_label: "Site web (optionnel)",
      shop_form_image_label: "Photo (optionnelle)",
      shop_form_submit: "Ajouter le commerce",
      shop_form_submit_update: "Mettre à jour",

      form_error_title_desc_required:
        "Merci d’indiquer au moins un titre et une description.",
      poll_error_required_fields:
        "Merci d’indiquer au moins un titre, une date de fin et 2 options non vides.",

      add_member_modal_title: "Ajouter un membre",
      add_member_alert_missing: "Merci de saisir l'URL du profil Facebook.",
      add_member_label_fb: "URL du profil Facebook",
      add_member_placeholder_fb: "https://www.facebook.com/...",
      add_member_role_label: "Rôle",
      add_member_role_member: "Membre",
      add_member_role_admin: "Admin",
      add_member_role_moderator: "Modérateur",
      add_member_submit: "Ajouter",
      add_member_submit_loading: "Ajout...",
      event_form_error_required:
        "Merci d’indiquer au moins un titre, une date et une description.",

      menu_home: "Accueil",
      menu_about: "Infos sur le site",
      menu_changelog: "Évolutions",
      menu_feedback: "Contact / idées",
      menu_my_posts: "Mes publications",
      changelog_title: "Évolutions du site",
      changelog_intro:
        "Suivi des corrections, améliorations et nouvelles fonctionnalités.",
      changelog_empty: "Aucune évolution publiée pour le moment.",
      changelog_type_feature: "Fonctionnalité",
      changelog_type_news: "Nouveauté",
      changelog_type_bug: "Bug",
      changelog_type_improvement: "Amélioration",
      sections_nav_placeholder: "Aller vers une section…",

      profile_default_name: "Résident de Mały Kack",

      auth_loading_session: "Chargement de votre session...",
      auth_error_session: "Impossible de vérifier votre session.",
      error_invalid_server_response: "Réponse non valide du serveur",
      error_bus_fetch: "Impossible de récupérer les horaires en ligne.",
      error_weather_unavailable: "Météo indisponible.",

      error_supabase_not_configured: "Supabase n'est pas configuré côté client.",
      error_supabase_not_initialized:
        "Supabase n'est pas initialisé côté client. Vérifiez le script dans index.html.",
      error_residence_supabase_unavailable:
        "Supabase n'est pas configuré côté client (résidence indisponible).",
      error_residence_not_found: "Aucune information de résidence trouvée.",
      error_residence_unavailable:
        "Infos résidence indisponibles pour le moment.",
      error_classifieds_supabase_unavailable:
        "Supabase n'est pas configuré côté client (annonces indisponibles).",
      error_classifieds_unavailable:
        "Annonces indisponibles pour le moment.",
      error_shops_supabase_unavailable:
        "Supabase n'est pas configuré côté client (commerçants indisponibles).",
      error_shops_unavailable:
        "Commerçants indisponibles pour le moment.",
      error_shop_create: "Impossible d'ajouter le commerce.",
      error_shop_delete: "Impossible de supprimer le commerce.",
      error_shop_limit_reached:
        "Vous avez déjà une fiche commerçant.",
      error_shop_update: "Impossible de modifier le commerce.",
      error_events_supabase_unavailable:
        "Supabase n'est pas configuré côté client (événements indisponibles).",
      error_events_unavailable: "Événements indisponibles pour le moment.",
      error_reports_supabase_unavailable:
        "Supabase n'est pas configuré côté client (signalements indisponibles).",
      error_reports_unavailable:
        "Signalements indisponibles pour le moment.",
      error_services_supabase_unavailable:
        "Supabase n'est pas configuré côté client (services indisponibles).",
      error_services_unavailable:
        "Services entre voisins indisponibles pour le moment.",
      error_polls_supabase_unavailable:
        "Supabase n'est pas configuré côté client (sondages indisponibles).",
      error_polls_unavailable: "Sondages indisponibles pour le moment.",

      error_report_create_supabase:
        "Supabase n'est pas configuré côté client (signalement non enregistré).",
      error_report_create: "Erreur lors de la création du signalement.",
      error_report_update_supabase:
        "Supabase n'est pas configuré côté client (signalement non modifié).",
      error_report_update: "Erreur lors de la modification du signalement.",
      error_service_create_supabase:
        "Supabase n'est pas configuré côté client (service non enregistré).",
      error_service_create: "Erreur lors de la création du service.",
      error_service_update_supabase:
        "Supabase n'est pas configuré côté client (service non modifié).",
      error_service_update: "Erreur lors de la modification du service.",
      error_members_load: "Impossible de charger les membres.",
      error_member_role_update_forbidden:
        "Impossible de modifier le rôle de ce membre.",
      error_member_role_update:
        "Erreur lors de la modification du rôle du membre.",
      confirm_member_delete: "Supprimer ce membre ?",
      error_member_delete:
        "Supabase n'est pas configuré côté client (suppression impossible).",
      error_member_delete_generic: "Erreur lors de la suppression du membre.",

      error_poll_create_supabase:
        "Supabase n'est pas configuré côté client (sondage non enregistré).",
      error_poll_create: "Erreur lors de la création du sondage.",
      error_poll_update_supabase:
        "Supabase n'est pas configuré côté client (sondage non modifié).",
      error_poll_update: "Erreur lors de la modification du sondage.",
      error_poll_vote_supabase:
        "Supabase n'est pas configuré côté client (vote impossible).",
      error_poll_already_voted: "Vous avez déjà voté pour ce sondage.",
      error_poll_not_found: "Sondage introuvable.",
      error_poll_vote: "Erreur lors de l'enregistrement de votre vote.",

      error_event_create_supabase:
        "Supabase n'est pas configuré côté client (événement non enregistré).",
      error_event_create: "Erreur lors de la création de l'événement.",
      error_event_update_supabase:
        "Supabase n'est pas configuré côté client (événement non modifié).",
      error_event_update: "Erreur lors de la modification de l'événement.",

      error_classified_create_supabase:
        "Supabase n'est pas configuré côté client (annonce non enregistrée).",
      error_classified_create: "Erreur lors de la création de l'annonce.",
      error_classified_update_supabase:
        "Supabase n'est pas configuré côté client (annonce non modifiée).",
      error_classified_update: "Erreur lors de la modification de l'annonce.",

      error_residence_save_supabase:
        "Supabase n'est pas configuré côté client (résidence non enregistrée).",
      error_residence_save: "Erreur lors de la mise à jour de la résidence.",
      confirm_residence_delete: "Supprimer cette info ?",
      error_residence_delete_supabase:
        "Supabase n'est pas configuré côté client (suppression impossible).",
      error_residence_delete: "Erreur lors de la suppression.",
      error_delete_supabase:
        "Supabase n'est pas configuré côté client (suppression impossible).",
      error_delete_generic: "Erreur lors de la suppression.",
      confirm_post_delete: "Supprimer cette publication ?",

      error_temp_access_unavailable:
        "Impossible d'activer l'accès temporaire pour le moment.",
      error_fb_login_start:
        "Impossible de démarrer la connexion Facebook pour le moment.",
      error_fb_app_inactive:
        "L'application Facebook est inactive. Activez-la dans Meta for Developers ou utilisez la connexion par URL de profil.",
      error_fb_profile_check:
        "Impossible de vérifier votre profil Facebook pour le moment.",
      alert_fb_profile_url_missing:
        "Merci de coller l'URL de votre profil Facebook.",

      error_member_email_missing:
        "Merci de saisir un e-mail pour le nouveau membre.",
      error_member_create: "Impossible d'ajouter ce membre.",
      error_member_create_generic:
        "Erreur lors de l'ajout du membre.",

      demo_user_name: "Admin de démonstration",

      blocked_title: "Compte bloqué",
      blocked_body:
        "Votre compte a été bloqué par un modérateur. Contactez la résidence si vous pensez qu'il s'agit d'une erreur.",
      pending_title: "En attente de validation",
      pending_body:
        "Votre demande d'accès a été envoyée. Un modérateur doit maintenant valider votre compte.",
      pending_back_home: "Revenir à la page d'accueil",

      time_day_short: "j",
      time_hour_short: "h",
      time_min_short: "min",

      my_posts_title: "Mes publications",
      my_posts_intro: "Retrouvez ici tous les posts que vous avez publiés.",
      my_posts_section_classifieds: "Annonces",
      my_posts_section_events: "Événements",
      my_posts_section_reports: "Signalements",
      my_posts_section_services: "Services entre voisins",
      my_posts_section_polls: "Sondages",
      my_posts_empty: "Aucune publication dans cette catégorie.",
      my_posts_created_at: "Créé le",
      my_posts_date: "Date",
      my_posts_time: "Heure",
      my_posts_status: "Statut",
      my_posts_kind: "Type",
      my_posts_end_date: "Fin",
      my_posts_type_realestate: "immobilier",
      my_posts_type_item: "objet",
      my_posts_kind_offer: "offre",
      my_posts_kind_request: "demande",
      my_posts_remaining: "Reste",
      my_posts_edit: "Modifier",
      my_posts_remove: "Supprimer",
      my_posts_pending: "En validation",

      comm_title: "Contact / suggestions",
      comm_intro:
        "Cette page vous permet de poser des questions ou de donner votre avis sur le site. Vous pouvez signaler un bug, proposer une idée de design ou suggérer une nouvelle fonctionnalité.",
      comm_new_thread_title: "Démarrer une nouvelle discussion",
      comm_public_title: "Discussions publiques",
      comm_loading: "Chargement des messages...",
      comm_theme_label: "Thème",
      comm_theme_bug: "Bug ou problème technique",
      comm_theme_design: "Design / ergonomie",
      comm_theme_feature: "Idée de fonctionnalité",
      comm_theme_other: "Autre",
      comm_message_label: "Votre message",
      comm_message_placeholder:
        "Décrivez le bug, l’idée de design ou la fonctionnalité que vous aimeriez voir…",
      comm_submit: "Publier le message",
      comm_submit_loading: "Envoi en cours...",
      comm_error_load: "Impossible de charger les messages pour le moment.",
      comm_error_submit:
        "Impossible d'enregistrer votre message pour le moment.",
      comm_error_reply:
        "Impossible d'enregistrer votre réponse pour le moment.",
      comm_error_delete: "Impossible de supprimer ce message pour le moment.",
      comm_error_vote: "Impossible d'enregistrer votre vote pour le moment.",
      comm_error_missing_message:
        "Merci de décrire votre question ou suggestion.",
      comm_error_missing_reply: "Merci de saisir une réponse avant d’envoyer.",
      comm_info_posted:
        "Votre discussion a été publiée. Merci pour votre retour !",
      comm_info_reply_posted: "Votre réponse a été publiée.",
      comm_info_deleted: "Le message et ses réponses ont été supprimés.",
      comm_confirm_delete:
        "Supprimer ce message et toutes les réponses associées ?",
      comm_reply: "Répondre",
      comm_delete: "Supprimer",
      comm_reply_placeholder: "Votre réponse…",
      comm_reply_cancel: "Annuler",
      comm_reply_send: "Envoyer la réponse",
      comm_reply_sending: "Envoi...",
      comm_author_fallback: "Résident",
      comm_avatar_alt: "Avatar",

      hero_residence_fallback_name: "Osiedle Mały Kack – Gdynia",
      hero_welcome_prefix: "Bienvenue à",
      public_go_welcome: "Aller à l'espace",
      public_profile_login_title: "Connexion par URL de profil Facebook",
      public_profile_login_submit: "Valider",
      footer_privacy: "Politique de confidentialite",
      footer_data_deletion: "Suppression des donnees",
      footer_terms: "Conditions de service",

      about_title: "À propos du site – comment ça marche ?",
      about_intro_1:
        "Ce site est une petite application communautaire gratuite pour les habitants de la résidence Na Polanie – Mały Kack. L’idée est de rassembler au même endroit les informations utiles, les annonces entre voisins, les événements de la résidence et les petits services entre habitants.",
      about_intro_2:
        "Pour l’instant, une partie des contenus (annonces, événements, signalements…) sont des exemples fictifs. Ils servent uniquement à montrer à quoi le site pourrait ressembler lorsque les vrais résidents commenceront à publier. Vous pouvez déjà commencer à y mettre du contenu réel : au fur et à mesure que des annonces et messages seront postés par les habitants, les fausses données seront supprimées et remplacées par du contenu réel.",
      about_intro_3:
        "Le projet est réalisé à titre entièrement bénévole et le site est 100 % gratuit pour les résidents. Pas de publicité, pas de facturation, pas d’utilisation commerciale des données. L’objectif est d’en faire un outil réellement utilisé au quotidien par les habitants, puis de l’améliorer en continu en fonction des retours.",
      about_intro_3b:
        "Aucun post sponsorisé ni commerce sponsorisé n’est autorisé sur la plateforme.",
      about_intro_4:
        "Mon intention est de m’occuper uniquement de la partie technique (maintenance, corrections, nouvelles fonctionnalités), et de confier la gestion du contenu à un ou deux administrateurs de la résidence. Ces administrateurs pourront ensuite ajouter des modérateurs et approuver ou refuser les nouveaux membres.",
      about_intro_5:
        "Si, avec le temps, le site est suffisamment utilisé et apprécié, une évolution naturelle serait de développer une application iOS / Android dédiée. Cela permettrait par exemple de recevoir des notifications lorsqu’il y a un nouveau post important (annonce, événement, signalement, etc.).",
      about_download_title: "Télécharger l'application",
      about_download_text:
        "Vous pouvez télécharger l'application mobile depuis les stores. C'est le même service, sous forme d'application à installer.",
      about_app_store: "App Store",
      about_google_play: "Google Play",
      about_app_store_soon: "App Store (bientôt)",
      about_google_play_soon: "Google Play (bientôt)",

      profile_members_label: "membres",

      onboarding_badge: "Première connexion",
      onboarding_title: "Demande d'accès à l'espace résidents",
      onboarding_intro_before:
        "Pour confirmer que vous faites bien partie du groupe Facebook de la résidence, merci d'indiquer le ",
      onboarding_intro_strong: "nom exact du groupe Facebook",
      onboarding_intro_after: " ainsi que l'URL de votre profil Facebook.",
      onboarding_group_label: "Nom du groupe Facebook",
      onboarding_group_placeholder: "Nom exact indiqué dans le groupe",
      onboarding_profile_label: "URL de votre profil Facebook",
      onboarding_profile_placeholder: "https://www.facebook.com/...",
      onboarding_submit: "Envoyer ma demande",
      onboarding_submit_loading: "Envoi en cours...",
      onboarding_cancel: "Annuler",
      onboarding_note:
        "Une fois votre demande validée par un modérateur, vous aurez accès à l'espace résidents (annonces, sondages, signalements, etc.).",
      onboarding_error_missing:
        "Merci de renseigner le nom du groupe Facebook et l'URL de votre profil Facebook.",
      onboarding_error_submit:
        "Impossible de finaliser votre première connexion pour le moment.",
      onboarding_error_generic:
        "Erreur lors de la finalisation de votre première connexion.",
      onboarding_success:
        "Votre demande a été envoyée, un modérateur doit maintenant la valider.",

      admin_pending_title: "Validation des nouveaux comptes",
      admin_pending_loading: "Chargement des demandes en cours...",
      admin_pending_empty: "Aucune demande en attente pour le moment.",
      admin_pending_count: "Demandes en attente ({n})",
      admin_pending_user_fallback: "Utilisateur à valider",
      admin_pending_view_fb: "Voir le compte FB",
      admin_pending_reject: "Refuser",
      admin_pending_accept: "Accepter",
      admin_pending_table_avatar: "Avatar",
      admin_pending_table_name: "Nom",
      admin_pending_table_fb: "Profil Facebook",
      admin_pending_table_date: "Date",
      admin_pending_table_actions: "Actions",
      admin_pending_error_load:
        "Impossible de charger les comptes en attente.",
      admin_pending_error_load_generic:
        "Erreur lors du chargement des comptes en attente.",
      admin_pending_error_update:
        "Impossible de mettre à jour ce compte pour le moment.",
      admin_pending_error_update_generic:
        "Erreur lors de la mise à jour de ce compte.",

      classifieds_board_title: "Annonces de la résidence",
      classifieds_board_subtitle:
        "Immobilier, locations, objets à vendre ou à donner entre voisins.",
      classifieds_board_cta: "Publier une annonce",
      classifieds_board_realestate_title: "Annonces immobilières",
      classifieds_board_realestate_empty:
        "Aucune annonce immobilière pour le moment.",
      classifieds_board_neighbors_title: "Annonces entre voisins",
      classifieds_board_neighbors_empty:
        "Aucune annonce d'objet ou diverse pour le moment.",
      classifieds_board_tag_other: "Divers",

      shops_section_title: "Commerçants dans la résidence",
      shops_section_subtitle:
        "Magasin vegan, coiffeur et autres commerces situés dans ou au pied des immeubles.",
      shops_section_edit_button: "Modifier ma fiche",
      shops_section_edit_simulation:
        "Simulation: ici le commerçant pourrait modifier sa fiche via Supabase.",
      shops_admin_add_button: "Ajouter un commerce",
      shops_admin_hide_form: "Fermer",
      shops_admin_edit_button: "Modifier",
      shops_admin_delete_button: "Supprimer",
      shops_admin_delete_confirm: "Supprimer ce commerce ?",
      shops_admin_title: "Commerces dans la résidence",
      shops_admin_empty: "Aucun commerce à gérer.",
      shops_admin_limit_reached:
        "Vous avez déjà une fiche commerçant.",
      shops_section_empty:
        "Aucun commerce référencé pour le moment.",
      shops_section_notice: "",

      polls_section_title: "Sondages entre voisins",
      polls_section_subtitle:
        "Donner votre avis sur la vie de la résidence.",
      polls_section_cta: "Créer un sondage",
      polls_section_empty: "Aucun sondage en cours pour le moment.",
      polls_status_closed: "Terminé",
      polls_status_open: "En cours",
      polls_end_prefix: "Fin le ",

      post_published_on: "Publié le {date}",

      stats_overview_title: "Vue d’ensemble statistique",
      stats_overview_subtitle:
        "Évolution simulée de la communauté, des interactions et des contenus publiés.",
      stats_kpi_members_label: "Membres actuels",
      stats_kpi_members_sub: "+18% sur 12 mois (simulation)",
      stats_kpi_interactions_label: "Interactions / mois",
      stats_kpi_interactions_sub: "messages, sondages, annonces",
      stats_kpi_polls_label: "Sondages actifs",
      stats_kpi_polls_sub: "sur les 3 derniers mois (simulation)",
      stats_kpi_classifieds_label: "Annonces publiées",
      stats_kpi_classifieds_sub: "immobilier + entre voisins",
      stats_chart_main_title: "Croissance des membres & interactions",
      stats_chart_members_label: "Membres",
      stats_chart_interactions_label: "Interactions",
      stats_status_title: "Statut",
      stats_status_in_progress: "En cours",
      stats_status_pending: "À valider",
      stats_refused_30: "Refusés (30 derniers jours)",
      stats_total_validated_prefix: "Total validés depuis le départ : {n}",
      stats_polls_per_month: "Sondages par mois",
      stats_realestate_per_month: "Annonces immobilières par mois",
      stats_neighbors_per_month: "Annonces entre voisins par mois",
      stats_events_per_month: "Événements par mois",
      stats_reports_per_month: "Signalements par mois",
      stats_services_per_month: "Petits services par mois",
      month_jan: "Jan",
      month_feb: "Fév",
      month_mar: "Mar",
      month_apr: "Avr",
      month_may: "Mai",
      month_jun: "Juin",
      month_jul: "Juil",
      month_aug: "Août",
      month_sep: "Sep",
      month_oct: "Oct",
      month_nov: "Nov",
      month_dec: "Déc"
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
      dashboard_logout: "Log out",

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
      bus_footer_generic: "ZKM timetable.",
      bus_fab_label: "Bus timetable"

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
      moderators_cta: "Add / manage moderators",

      // Members table (EN)
      members_title: "Residence members",
      members_subtitle:
        "Sample list of residents and their roles (administrators, moderators).",
      members_search_placeholder:
        "Search for a resident (nickname or profile)…",
      members_add_btn: "Add member",
      members_loading: "Loading members list…",
      members_section_super: "Super admin (SEO)",
      members_section_admins: "Administrators",
      members_section_mods: "Moderators",
      members_section_members: "Residents (page {page} / {total})",
      members_th_avatar: "Avatar",
      members_th_nickname: "Nickname",
      members_th_profile: "Facebook profile",
      members_th_role: "Role",
      members_th_actions: "Actions",
      members_role_super: "Super admin",
      members_role_admin: "Admin",
      members_role_moderator: "Moderator",
      members_role_member: "Resident",
      members_btn_view_fb: "View FB profile",
      members_btn_make_moderator: "Promote to moderator",
      members_btn_make_member: "Set as resident",
      members_btn_delete: "Delete",
      members_pager_prev: "Previous",
      members_pager_next: "Next",
      members_pager_label: "Page {page} / {total}",

      residence_add_info_btn: "Add info",
      residence_post_tag: "Residence",
      residence_modal_title: "Residence info",
      service_modal_title: "Neighbour service",
      report_modal_title: "Report",
      event_post_modal_title: "Event",
      poll_post_modal_title: "Poll",
      residence_posts_empty: "No residence info yet.",

      residence_admin_title: "Add residence info",
      residence_admin_name_label: "Name",
      residence_admin_name_placeholder: "Residence name",
      residence_admin_address_label: "Address",
      residence_admin_address_placeholder: "Address",
      residence_admin_desc_label: "Description",
      residence_admin_desc_placeholder: "General description of the residence",
      residence_admin_practical_label: "Practical info",
      residence_admin_practical_placeholder: "One line = one practical item.",
      residence_admin_submit: "Save",
      residence_admin_submit_saving: "Saving...",

      modal_close: "Close",
      classifieds_modal_edit: "Edit listing",
      classifieds_modal_new_realestate: "New real estate listing",
      classifieds_modal_new_neighbor: "New neighbour listing",
      event_modal_edit: "Edit event",
      event_modal_new: "New event",
      report_modal_edit: "Edit report",
      report_modal_new: "New report",
      service_modal_edit: "Edit service",
      service_modal_new: "New service",
      poll_modal_edit: "Edit poll",
      poll_modal_new: "New poll",
      residence_modal_new: "New residence info",

      form_image_label: "Image (optional)",
      form_duration_label: "Display duration",
      form_saving: "Saving...",
      form_duration_3d: "3 days",
      form_duration_1w: "1 week",
      form_duration_2w: "2 weeks",
      form_duration_3w: "3 weeks",
      form_duration_1m: "1 month",

      classifieds_title_label: "Listing title",
      classifieds_title_placeholder_neighbor: "E.g. City bike for sale",
      classifieds_title_placeholder_realestate: "E.g. 2-room flat for rent",
      classifieds_price_label_optional: "Price (optional, PLN)",
      classifieds_price_label: "Rent / price (PLN)",
      classifieds_price_placeholder: "E.g. 600",
      classifieds_desc_label: "Description",
      classifieds_desc_placeholder_neighbor:
        "Describe the item, condition, availability or service offered...",
      classifieds_desc_placeholder_realestate:
        "Size, floor, equipment, fees, availability...",
      classifieds_submit_publish: "Publish listing",
      classifieds_submit_publish_immo: "Publish real estate listing",
      classifieds_submit_update: "Update",

      event_title_label: "Event title",
      event_title_placeholder: "Meeting, cleaning, party…",
      event_date_label: "Date",
      event_time_label: "Time (optional)",
      event_location_label: "Location (optional)",
      event_location_placeholder: "Entrance hall, common room…",
      event_desc_label: "Description",
      event_desc_placeholder: "Practical details and instructions…",
      event_submit_create: "Create event",
      event_submit_update: "Update",

      report_title_label: "Report title",
      report_title_placeholder: "Light bulb, leak, noise, cleanliness…",
      report_category_label: "Category",
      report_category_placeholder: "Lighting, cleanliness, noise…",
      report_desc_label: "Description",
      report_desc_placeholder: "Describe the issue…",
      report_submit_create: "Send report",
      report_submit_update: "Update",

      service_title_label: "Title",
      service_title_placeholder: "Offer a ride, looking for babysitter…",
      service_kind_label: "Type",
      service_kind_offer: "Offer",
      service_kind_request: "Request",
      service_desc_label: "Description",
      service_desc_placeholder: "Describe the service offered or needed…",
      service_submit_create: "Publish",
      service_submit_update: "Update",

      poll_title_label: "Poll title",
      poll_title_placeholder: "E.g. Should we organize spring cleaning?",
      poll_desc_label: "Short description (optional)",
      poll_desc_placeholder: "A few words of context…",
      poll_end_label: "Poll end date",
      poll_options_label: "Vote options (2 to 5)",
      poll_option_yes: "Yes",
      poll_option_no: "No",
      poll_option_other: "Other option",
      poll_add_option: "Add option",
      poll_submit_create: "Create poll",
      poll_submit_update: "Update",

      shop_modal_title: "On-site shop",
      shop_modal_open_site: "Open website",
      shop_form_name_label: "Shop name",
      shop_form_name_placeholder: "E.g. Vege Corner",
      shop_form_type_label: "Type",
      shop_form_type_placeholder: "E.g. Vegan store, Hairdresser...",
      shop_form_desc_label: "Description",
      shop_form_desc_placeholder:
        "Hours, services, floor/building, practical info...",
      shop_form_url_label: "Website (optional)",
      shop_form_image_label: "Photo (optional)",
      shop_form_submit: "Add shop",
      shop_form_submit_update: "Update",

      form_error_title_desc_required:
        "Please provide at least a title and a description.",
      poll_error_required_fields:
        "Please provide a title, an end date, and 2 non-empty options.",

      add_member_modal_title: "Add member",
      add_member_alert_missing: "Please provide the Facebook profile URL.",
      add_member_label_fb: "Facebook profile URL",
      add_member_placeholder_fb: "https://www.facebook.com/...",
      add_member_role_label: "Role",
      add_member_role_member: "Member",
      add_member_role_admin: "Admin",
      add_member_role_moderator: "Moderator",
      add_member_submit: "Add",
      add_member_submit_loading: "Adding...",
      event_form_error_required:
        "Please provide at least a title, a date, and a description.",

      menu_home: "Home",
      menu_about: "About the site",
      menu_changelog: "Updates",
      menu_feedback: "Contact / ideas",
      menu_my_posts: "My posts",
      changelog_title: "Site updates",
      changelog_intro: "Track fixes, improvements, and new features.",
      changelog_empty: "No updates published yet.",
      changelog_type_feature: "Feature",
      changelog_type_news: "News",
      changelog_type_bug: "Bug",
      changelog_type_improvement: "Improvement",
      sections_nav_placeholder: "Go to a section…",

      profile_default_name: "Mały Kack resident",

      auth_loading_session: "Loading your session...",
      auth_error_session: "Unable to verify your session.",
      error_invalid_server_response: "Invalid server response",
      error_bus_fetch: "Unable to fetch live timetables.",
      error_weather_unavailable: "Weather unavailable.",

      error_supabase_not_configured: "Supabase is not configured on the client.",
      error_supabase_not_initialized:
        "Supabase is not initialized on the client. Check the script in index.html.",
      error_residence_supabase_unavailable:
        "Supabase is not configured on the client (residence unavailable).",
      error_residence_not_found: "No residence information found.",
      error_residence_unavailable: "Residence info unavailable for now.",
      error_classifieds_supabase_unavailable:
        "Supabase is not configured on the client (classifieds unavailable).",
      error_classifieds_unavailable: "Classifieds unavailable for now.",
      error_shops_supabase_unavailable:
        "Supabase is not configured on the client (shops unavailable).",
      error_shops_unavailable: "Shops unavailable for now.",
      error_shop_create: "Failed to add the shop.",
      error_shop_delete: "Failed to delete the shop.",
      error_shop_limit_reached: "You already have a shop listing.",
      error_shop_update: "Failed to update the shop.",
      error_events_supabase_unavailable:
        "Supabase is not configured on the client (events unavailable).",
      error_events_unavailable: "Events unavailable for now.",
      error_reports_supabase_unavailable:
        "Supabase is not configured on the client (reports unavailable).",
      error_reports_unavailable: "Reports unavailable for now.",
      error_services_supabase_unavailable:
        "Supabase is not configured on the client (services unavailable).",
      error_services_unavailable: "Neighbour services unavailable for now.",
      error_polls_supabase_unavailable:
        "Supabase is not configured on the client (polls unavailable).",
      error_polls_unavailable: "Polls unavailable for now.",

      error_report_create_supabase:
        "Supabase is not configured on the client (report not saved).",
      error_report_create: "Failed to create the report.",
      error_report_update_supabase:
        "Supabase is not configured on the client (report not updated).",
      error_report_update: "Failed to update the report.",
      error_service_create_supabase:
        "Supabase is not configured on the client (service not saved).",
      error_service_create: "Failed to create the service.",
      error_service_update_supabase:
        "Supabase is not configured on the client (service not updated).",
      error_service_update: "Failed to update the service.",
      error_members_load: "Unable to load members.",
      error_member_role_update_forbidden:
        "Unable to change this member's role.",
      error_member_role_update: "Failed to update the member role.",
      confirm_member_delete: "Delete this member?",
      error_member_delete:
        "Supabase is not configured on the client (delete not possible).",
      error_member_delete_generic: "Failed to delete the member.",

      error_poll_create_supabase:
        "Supabase is not configured on the client (poll not saved).",
      error_poll_create: "Failed to create the poll.",
      error_poll_update_supabase:
        "Supabase is not configured on the client (poll not updated).",
      error_poll_update: "Failed to update the poll.",
      error_poll_vote_supabase:
        "Supabase is not configured on the client (vote not possible).",
      error_poll_already_voted: "You have already voted on this poll.",
      error_poll_not_found: "Poll not found.",
      error_poll_vote: "Failed to save your vote.",

      error_event_create_supabase:
        "Supabase is not configured on the client (event not saved).",
      error_event_create: "Failed to create the event.",
      error_event_update_supabase:
        "Supabase is not configured on the client (event not updated).",
      error_event_update: "Failed to update the event.",

      error_classified_create_supabase:
        "Supabase is not configured on the client (listing not saved).",
      error_classified_create: "Failed to create the listing.",
      error_classified_update_supabase:
        "Supabase is not configured on the client (listing not updated).",
      error_classified_update: "Failed to update the listing.",

      error_residence_save_supabase:
        "Supabase is not configured on the client (residence not saved).",
      error_residence_save: "Failed to update residence info.",
      confirm_residence_delete: "Delete this info?",
      error_residence_delete_supabase:
        "Supabase is not configured on the client (delete not possible).",
      error_residence_delete: "Failed to delete.",
      error_delete_supabase:
        "Supabase is not configured on the client (delete not possible).",
      error_delete_generic: "Failed to delete.",
      confirm_post_delete: "Delete this post?",

      error_temp_access_unavailable:
        "Temporary access cannot be enabled right now.",
      error_fb_login_start:
        "Unable to start Facebook login right now.",
      error_fb_app_inactive:
        "The Facebook app is inactive. Activate it in Meta for Developers or use profile URL login.",
      error_fb_profile_check:
        "Unable to verify your Facebook profile right now.",
      alert_fb_profile_url_missing:
        "Please paste the URL of your Facebook profile.",

      error_member_email_missing: "Please enter an email for the new member.",
      error_member_create: "Unable to add this member.",
      error_member_create_generic: "Failed to add the member.",

      demo_user_name: "Demo admin",

      blocked_title: "Account blocked",
      blocked_body:
        "Your account was blocked by a moderator. Contact the residence if you think this is a mistake.",
      pending_title: "Pending approval",
      pending_body:
        "Your access request has been sent. A moderator must now approve your account.",
      pending_back_home: "Back to home page",

      time_day_short: "d",
      time_hour_short: "h",
      time_min_short: "min",

      my_posts_title: "My posts",
      my_posts_intro: "Here you can find all the posts you have published.",
      my_posts_section_classifieds: "Classifieds",
      my_posts_section_events: "Events",
      my_posts_section_reports: "Reports",
      my_posts_section_services: "Neighbor services",
      my_posts_section_polls: "Polls",
      my_posts_empty: "No posts in this category yet.",
      my_posts_created_at: "Created",
      my_posts_date: "Date",
      my_posts_time: "Time",
      my_posts_status: "Status",
      my_posts_kind: "Type",
      my_posts_end_date: "Ends",
      my_posts_type_realestate: "real estate",
      my_posts_type_item: "item",
      my_posts_kind_offer: "offer",
      my_posts_kind_request: "request",
      my_posts_remaining: "Remaining",
      my_posts_edit: "Edit",
      my_posts_remove: "Delete",
      my_posts_pending: "Pending approval",

      comm_title: "Contact / feedback",
      comm_intro:
        "This page lets you ask questions or give feedback about the site. You can report a bug, suggest a design idea, or propose a new feature.",
      comm_new_thread_title: "Start a new discussion",
      comm_public_title: "Public discussions",
      comm_loading: "Loading messages...",
      comm_theme_label: "Theme",
      comm_theme_bug: "Bug or technical issue",
      comm_theme_design: "Design / UX",
      comm_theme_feature: "Feature idea",
      comm_theme_other: "Other",
      comm_message_label: "Your message",
      comm_message_placeholder:
        "Describe the bug, design idea, or feature you'd like to see…",
      comm_submit: "Post message",
      comm_submit_loading: "Sending...",
      comm_error_load: "Unable to load messages right now.",
      comm_error_submit: "Unable to save your message right now.",
      comm_error_reply: "Unable to save your reply right now.",
      comm_error_delete: "Unable to delete this message right now.",
      comm_error_vote: "Unable to save your vote right now.",
      comm_error_missing_message: "Please describe your question or suggestion.",
      comm_error_missing_reply: "Please enter a reply before sending.",
      comm_info_posted: "Your discussion was posted. Thanks for your feedback!",
      comm_info_reply_posted: "Your reply was posted.",
      comm_info_deleted: "The message and its replies were deleted.",
      comm_confirm_delete: "Delete this message and all associated replies?",
      comm_reply: "Reply",
      comm_delete: "Delete",
      comm_reply_placeholder: "Your reply…",
      comm_reply_cancel: "Cancel",
      comm_reply_send: "Send reply",
      comm_reply_sending: "Sending...",
      comm_author_fallback: "Resident",
      comm_avatar_alt: "Avatar",

      hero_residence_fallback_name: "Osiedle Mały Kack – Gdynia",
      hero_welcome_prefix: "Welcome to",
      public_go_welcome: "Go to welcome",
      public_profile_login_title: "Login with Facebook profile URL",
      public_profile_login_submit: "Continue",
      footer_privacy: "Privacy policy",
      footer_data_deletion: "Data deletion",
      footer_terms: "Terms of service",

      about_title: "About this site – how it works?",
      about_intro_1:
        "This site is a small free community app for residents of the Na Polanie – Mały Kack residence. The idea is to bring together useful information, neighbour listings, residence events and small services between residents.",
      about_intro_2:
        "For now, part of the content (listings, events, reports…) are sample entries. They are only here to show what the site could look like when real residents start posting. You can already add real content: as residents post announcements and messages, the sample data will be removed and replaced with real content.",
      about_intro_3:
        "This project is entirely volunteer‑run and the site is 100% free for residents. No ads, no billing, no commercial use of data. The goal is to make it a tool that residents actually use every day, and to keep improving it based on feedback.",
      about_intro_3b:
        "No sponsored posts or sponsored businesses are allowed on the platform.",
      about_intro_4:
        "My intention is to handle only the technical side (maintenance, fixes, new features) and entrust content management to one or two residence administrators. These administrators can then add moderators and approve or reject new members.",
      about_intro_5:
        "If, over time, the site is used and appreciated enough, a natural next step would be to develop a dedicated iOS / Android app. This would make it possible to receive notifications when there is an important new post (announcement, event, report, etc.).",
      about_download_title: "Download the app",
      about_download_text:
        "You can download the mobile app from the stores. It is the same service, packaged as an installable app.",
      about_app_store: "App Store",
      about_google_play: "Google Play",
      about_app_store_soon: "App Store (soon)",
      about_google_play_soon: "Google Play (soon)",

      profile_members_label: "members",

      onboarding_badge: "First login",
      onboarding_title: "Access request to the residents area",
      onboarding_intro_before:
        "To confirm you belong to the residence Facebook group, please provide the ",
      onboarding_intro_strong: "exact name of the Facebook group",
      onboarding_intro_after: " as well as the URL of your Facebook profile.",
      onboarding_group_label: "Facebook group name",
      onboarding_group_placeholder: "Exact name shown in the group",
      onboarding_profile_label: "Your Facebook profile URL",
      onboarding_profile_placeholder: "https://www.facebook.com/...",
      onboarding_submit: "Send my request",
      onboarding_submit_loading: "Sending...",
      onboarding_cancel: "Cancel",
      onboarding_note:
        "Once your request is validated by a moderator, you will have access to the residents area (listings, polls, reports, etc.).",
      onboarding_error_missing:
        "Please provide the Facebook group name and your Facebook profile URL.",
      onboarding_error_submit:
        "Unable to complete your first login right now.",
      onboarding_error_generic:
        "Error while completing your first login.",
      onboarding_success:
        "Your request has been sent; a moderator now needs to validate it.",

      admin_pending_title: "Validate new accounts",
      admin_pending_loading: "Loading pending requests...",
      admin_pending_empty: "No pending requests at the moment.",
      admin_pending_count: "Pending requests ({n})",
      admin_pending_user_fallback: "User to validate",
      admin_pending_view_fb: "View FB profile",
      admin_pending_reject: "Reject",
      admin_pending_accept: "Accept",
      admin_pending_table_avatar: "Avatar",
      admin_pending_table_name: "Name",
      admin_pending_table_fb: "Facebook profile",
      admin_pending_table_date: "Date",
      admin_pending_table_actions: "Actions",
      admin_pending_error_load: "Unable to load pending accounts.",
      admin_pending_error_load_generic:
        "Failed to load pending accounts.",
      admin_pending_error_update:
        "Unable to update this account right now.",
      admin_pending_error_update_generic:
        "Failed to update this account.",

      classifieds_board_title: "Residence listings",
      classifieds_board_subtitle:
        "Real estate, rentals, items for sale or to give away between neighbours.",
      classifieds_board_cta: "Publish a listing",
      classifieds_board_realestate_title: "Real estate listings",
      classifieds_board_realestate_empty:
        "No real estate listings at the moment.",
      classifieds_board_neighbors_title: "Neighbour listings",
      classifieds_board_neighbors_empty:
        "No items or miscellaneous listings at the moment.",
      classifieds_board_tag_other: "Other",

      shops_section_title: "On-site shops",
      shops_section_subtitle:
        "Vegan store, hairdresser and other businesses located in or near the buildings.",
      shops_section_edit_button: "Edit my listing",
      shops_section_edit_simulation:
        "Simulation: the shop owner could edit their listing here via Supabase.",
      shops_admin_add_button: "Add shop",
      shops_admin_hide_form: "Close",
      shops_admin_edit_button: "Edit",
      shops_admin_delete_button: "Delete",
      shops_admin_delete_confirm: "Delete this shop?",
      shops_admin_title: "Shops in the residence",
      shops_admin_empty: "No shops to manage.",
      shops_admin_limit_reached: "You already have a shop listing.",
      shops_section_empty:
        "No shop listed for now.",
      shops_section_notice: "",

      polls_section_title: "Neighbour polls",
      polls_section_subtitle:
        "Share your opinion about life in the residence.",
      polls_section_cta: "Create a poll",
      polls_section_empty: "No active polls at the moment.",
      polls_status_closed: "Closed",
      polls_status_open: "Open",
      polls_end_prefix: "Ends on ",

      post_published_on: "Published on {date}",

      stats_overview_title: "Overview statistics",
      stats_overview_subtitle:
        "Simulated evolution of the community, interactions and published content.",
      stats_kpi_members_label: "Current members",
      stats_kpi_members_sub: "+18% over 12 months (simulation)",
      stats_kpi_interactions_label: "Interactions / month",
      stats_kpi_interactions_sub: "messages, polls, listings",
      stats_kpi_polls_label: "Active polls",
      stats_kpi_polls_sub: "over the last 3 months (simulation)",
      stats_kpi_classifieds_label: "Listings published",
      stats_kpi_classifieds_sub: "real estate + neighbours",
      stats_chart_main_title: "Member & interaction growth",
      stats_chart_members_label: "Members",
      stats_chart_interactions_label: "Interactions",
      stats_status_title: "Status",
      stats_status_in_progress: "In progress",
      stats_status_pending: "Pending",
      stats_refused_30: "Rejected (last 30 days)",
      stats_total_validated_prefix: "Total validated since start: {n}",
      stats_polls_per_month: "Polls per month",
      stats_realestate_per_month: "Real estate listings per month",
      stats_neighbors_per_month: "Neighbour listings per month",
      stats_events_per_month: "Events per month",
      stats_reports_per_month: "Reports per month",
      stats_services_per_month: "Neighbour services per month",
      month_jan: "Jan",
      month_feb: "Feb",
      month_mar: "Mar",
      month_apr: "Apr",
      month_may: "May",
      month_jun: "Jun",
      month_jul: "Jul",
      month_aug: "Aug",
      month_sep: "Sep",
      month_oct: "Oct",
      month_nov: "Nov",
      month_dec: "Dec"
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
      dashboard_logout: "Wyloguj się",

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
      bus_footer_generic: "Rozkład ZKM.",
      bus_fab_label: "Rozkład jazdy"

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
      members_pager_label: "Strona {page} / {total}",

      residence_add_info_btn: "Dodaj informacje",
      residence_post_tag: "Osiedle",
      residence_modal_title: "Informacja o osiedlu",
      service_modal_title: "Usługa sąsiedzka",
      report_modal_title: "Zgłoszenie",
      event_post_modal_title: "Wydarzenie",
      poll_post_modal_title: "Ankieta",
      residence_posts_empty: "Brak informacji o osiedlu.",

      residence_admin_title: "Dodaj informacje o osiedlu",
      residence_admin_name_label: "Nazwa",
      residence_admin_name_placeholder: "Nazwa osiedla",
      residence_admin_address_label: "Adres",
      residence_admin_address_placeholder: "Adres",
      residence_admin_desc_label: "Opis",
      residence_admin_desc_placeholder: "Opis ogólny osiedla",
      residence_admin_practical_label: "Informacje praktyczne",
      residence_admin_practical_placeholder: "Jedna linia = jedna informacja.",
      residence_admin_submit: "Zapisz",
      residence_admin_submit_saving: "Zapisywanie...",

      modal_close: "Zamknij",
      classifieds_modal_edit: "Edytuj ogłoszenie",
      classifieds_modal_new_realestate: "Nowe ogłoszenie nieruchomości",
      classifieds_modal_new_neighbor: "Nowe ogłoszenie sąsiedzkie",
      event_modal_edit: "Edytuj wydarzenie",
      event_modal_new: "Nowe wydarzenie",
      report_modal_edit: "Edytuj zgłoszenie",
      report_modal_new: "Nowe zgłoszenie",
      service_modal_edit: "Edytuj usługę",
      service_modal_new: "Nowa usługa",
      poll_modal_edit: "Edytuj ankietę",
      poll_modal_new: "Nowa ankieta",
      residence_modal_new: "Nowa informacja o osiedlu",

      form_image_label: "Obraz (opcjonalnie)",
      form_duration_label: "Czas wyświetlania",
      form_saving: "Zapisywanie...",
      form_duration_3d: "3 dni",
      form_duration_1w: "1 tydzień",
      form_duration_2w: "2 tygodnie",
      form_duration_3w: "3 tygodnie",
      form_duration_1m: "1 miesiąc",

      classifieds_title_label: "Tytuł ogłoszenia",
      classifieds_title_placeholder_neighbor: "Np. Rower miejski na sprzedaż",
      classifieds_title_placeholder_realestate: "Np. 2 pokoje do wynajęcia",
      classifieds_price_label_optional: "Cena (opcjonalnie, PLN)",
      classifieds_price_label: "Czynsz / cena (PLN)",
      classifieds_price_placeholder: "Np. 600",
      classifieds_desc_label: "Opis",
      classifieds_desc_placeholder_neighbor:
        "Opisz przedmiot, stan, dostępność lub usługę...",
      classifieds_desc_placeholder_realestate:
        "Metraż, piętro, wyposażenie, opłaty, dostępność...",
      classifieds_submit_publish: "Opublikuj ogłoszenie",
      classifieds_submit_publish_immo: "Opublikuj ogłoszenie nieruchomości",
      classifieds_submit_update: "Zaktualizuj",

      event_title_label: "Tytuł wydarzenia",
      event_title_placeholder: "Zebranie, sprzątanie, impreza…",
      event_date_label: "Data",
      event_time_label: "Godzina (opcjonalnie)",
      event_location_label: "Miejsce (opcjonalnie)",
      event_location_placeholder: "Hol wejściowy, sala wspólna…",
      event_desc_label: "Opis",
      event_desc_placeholder: "Szczegóły praktyczne i zalecenia…",
      event_submit_create: "Utwórz wydarzenie",
      event_submit_update: "Zaktualizuj",

      report_title_label: "Tytuł zgłoszenia",
      report_title_placeholder: "Żarówka, wyciek, hałas, czystość…",
      report_category_label: "Kategoria",
      report_category_placeholder: "Oświetlenie, czystość, hałas…",
      report_desc_label: "Opis",
      report_desc_placeholder: "Opisz problem…",
      report_submit_create: "Wyślij zgłoszenie",
      report_submit_update: "Zaktualizuj",

      service_title_label: "Tytuł",
      service_title_placeholder: "Oferuję transport, szukam opiekunki…",
      service_kind_label: "Typ",
      service_kind_offer: "Oferta",
      service_kind_request: "Prośba",
      service_desc_label: "Opis",
      service_desc_placeholder: "Opisz usługę lub potrzebę…",
      service_submit_create: "Opublikuj",
      service_submit_update: "Zaktualizuj",

      poll_title_label: "Tytuł ankiety",
      poll_title_placeholder: "Np. Wiosenne sprzątanie?",
      poll_desc_label: "Krótki opis (opcjonalnie)",
      poll_desc_placeholder: "Kilka słów kontekstu…",
      poll_end_label: "Koniec ankiety",
      poll_options_label: "Opcje głosowania (2 do 5)",
      poll_option_yes: "Tak",
      poll_option_no: "Nie",
      poll_option_other: "Inna opcja",
      poll_add_option: "Dodaj opcję",
      poll_submit_create: "Utwórz ankietę",
      poll_submit_update: "Zaktualizuj",

      shop_modal_title: "Sklep w budynku",
      shop_modal_open_site: "Otwórz stronę",
      shop_form_name_label: "Nazwa sklepu",
      shop_form_name_placeholder: "Np. Vege Corner",
      shop_form_type_label: "Typ",
      shop_form_type_placeholder: "Np. sklep vegan, fryzjer...",
      shop_form_desc_label: "Opis",
      shop_form_desc_placeholder:
        "Godziny, usługi, piętro/budynek, informacje praktyczne...",
      shop_form_url_label: "Strona www (opcjonalnie)",
      shop_form_image_label: "Zdjęcie (opcjonalnie)",
      shop_form_submit: "Dodaj sklep",
      shop_form_submit_update: "Zaktualizuj",

      form_error_title_desc_required:
        "Podaj co najmniej tytuł i opis.",
      poll_error_required_fields:
        "Podaj tytuł, datę zakończenia i 2 niepuste opcje.",

      add_member_modal_title: "Dodaj członka",
      add_member_alert_missing:
        "Podaj adres URL profilu na Facebooku.",
      add_member_label_fb: "URL profilu na Facebooku",
      add_member_placeholder_fb: "https://www.facebook.com/...",
      add_member_role_label: "Rola",
      add_member_role_member: "Członek",
      add_member_role_admin: "Admin",
      add_member_role_moderator: "Moderator",
      add_member_submit: "Dodaj",
      add_member_submit_loading: "Dodawanie...",
      event_form_error_required:
        "Podaj co najmniej tytuł, datę i opis.",

      menu_home: "Strona główna",
      menu_about: "O serwisie",
      menu_changelog: "Zmiany",
      menu_feedback: "Kontakt / pomysły",
      menu_my_posts: "Moje wpisy",
      changelog_title: "Zmiany w serwisie",
      changelog_intro:
        "Lista poprawek, usprawnień i nowych funkcji.",
      changelog_empty: "Brak opublikowanych zmian.",
      changelog_type_feature: "Funkcja",
      changelog_type_news: "Nowość",
      changelog_type_bug: "Błąd",
      changelog_type_improvement: "Usprawnienie",
      sections_nav_placeholder: "Przejdź do sekcji…",

      profile_default_name: "Mieszkaniec Mały Kack",

      auth_loading_session: "Ładowanie sesji...",
      auth_error_session: "Nie można zweryfikować sesji.",
      error_invalid_server_response: "Nieprawidłowa odpowiedź serwera",
      error_bus_fetch: "Nie można pobrać rozkładu jazdy.",
      error_weather_unavailable: "Pogoda niedostępna.",

      error_supabase_not_configured: "Supabase nie jest skonfigurowany po stronie klienta.",
      error_supabase_not_initialized:
        "Supabase nie jest zainicjalizowany po stronie klienta. Sprawdź skrypt w index.html.",
      error_residence_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (informacje o osiedlu niedostępne).",
      error_residence_not_found: "Nie znaleziono informacji o osiedlu.",
      error_residence_unavailable: "Informacje o osiedlu są chwilowo niedostępne.",
      error_classifieds_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (ogłoszenia niedostępne).",
      error_classifieds_unavailable: "Ogłoszenia są chwilowo niedostępne.",
      error_shops_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (sklepy niedostępne).",
      error_shops_unavailable: "Sklepy są chwilowo niedostępne.",
      error_shop_create: "Nie udało się dodać sklepu.",
      error_shop_delete: "Nie udało się usunąć sklepu.",
      error_shop_limit_reached: "Masz już własną wizytówkę sklepu.",
      error_shop_update: "Nie udało się zaktualizować sklepu.",
      error_events_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (wydarzenia niedostępne).",
      error_events_unavailable: "Wydarzenia są chwilowo niedostępne.",
      error_reports_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (zgłoszenia niedostępne).",
      error_reports_unavailable: "Zgłoszenia są chwilowo niedostępne.",
      error_services_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (usługi niedostępne).",
      error_services_unavailable: "Usługi są chwilowo niedostępne.",
      error_polls_supabase_unavailable:
        "Supabase nie jest skonfigurowany po stronie klienta (ankiety niedostępne).",
      error_polls_unavailable: "Ankiety są chwilowo niedostępne.",

      error_report_create_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (zgłoszenie nie zostało zapisane).",
      error_report_create: "Nie udało się utworzyć zgłoszenia.",
      error_report_update_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (zgłoszenie nie zostało zaktualizowane).",
      error_report_update: "Nie udało się zaktualizować zgłoszenia.",
      error_service_create_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (usługa nie została zapisana).",
      error_service_create: "Nie udało się utworzyć usługi.",
      error_service_update_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (usługa nie została zaktualizowana).",
      error_service_update: "Nie udało się zaktualizować usługi.",
      error_members_load: "Nie można wczytać listy członków.",
      error_member_role_update_forbidden:
        "Nie można zmienić roli tego członka.",
      error_member_role_update: "Błąd podczas zmiany roli członka.",
      confirm_member_delete: "Usunąć tego członka?",
      error_member_delete:
        "Supabase nie jest skonfigurowany po stronie klienta (usunięcie niemożliwe).",
      error_member_delete_generic: "Błąd podczas usuwania członka.",

      error_poll_create_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (ankieta nie została zapisana).",
      error_poll_create: "Nie udało się utworzyć ankiety.",
      error_poll_update_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (ankieta nie została zaktualizowana).",
      error_poll_update: "Nie udało się zaktualizować ankiety.",
      error_poll_vote_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (głosowanie niemożliwe).",
      error_poll_already_voted: "Oddałeś(-aś) już głos w tej ankiecie.",
      error_poll_not_found: "Nie znaleziono ankiety.",
      error_poll_vote: "Nie udało się zapisać głosu.",

      error_event_create_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (wydarzenie nie zostało zapisane).",
      error_event_create: "Nie udało się utworzyć wydarzenia.",
      error_event_update_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (wydarzenie nie zostało zaktualizowane).",
      error_event_update: "Nie udało się zaktualizować wydarzenia.",

      error_classified_create_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (ogłoszenie nie zostało zapisane).",
      error_classified_create: "Nie udało się utworzyć ogłoszenia.",
      error_classified_update_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (ogłoszenie nie zostało zaktualizowane).",
      error_classified_update: "Nie udało się zaktualizować ogłoszenia.",

      error_residence_save_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (informacja o osiedlu nie została zapisana).",
      error_residence_save: "Nie udało się zaktualizować informacji o osiedlu.",
      confirm_residence_delete: "Usunąć tę informację?",
      error_residence_delete_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (usunięcie niemożliwe).",
      error_residence_delete: "Nie udało się usunąć.",
      error_delete_supabase:
        "Supabase nie jest skonfigurowany po stronie klienta (usunięcie niemożliwe).",
      error_delete_generic: "Nie udało się usunąć.",
      confirm_post_delete: "Usunąć tę publikację?",

      error_temp_access_unavailable:
        "Tymczasowy dostęp nie może być teraz włączony.",
      error_fb_login_start:
        "Nie można teraz rozpocząć logowania przez Facebooka.",
      error_fb_app_inactive:
        "Aplikacja Facebook jest nieaktywna. Aktywuj ją w Meta for Developers lub użyj logowania przez URL profilu.",
      error_fb_profile_check:
        "Nie można teraz zweryfikować profilu na Facebooku.",
      alert_fb_profile_url_missing:
        "Wklej adres URL swojego profilu na Facebooku.",

      error_member_email_missing:
        "Podaj adres e-mail dla nowego członka.",
      error_member_create: "Nie można dodać tego członka.",
      error_member_create_generic: "Błąd podczas dodawania członka.",

      demo_user_name: "Administrator demo",

      blocked_title: "Konto zablokowane",
      blocked_body:
        "Twoje konto zostało zablokowane przez moderatora. Skontaktuj się z administracją, jeśli uważasz, że to pomyłka.",
      pending_title: "Oczekuje na zatwierdzenie",
      pending_body:
        "Twoje zgłoszenie zostało wysłane. Moderator musi teraz zatwierdzić Twoje konto.",
      pending_back_home: "Wróć do strony głównej",

      time_day_short: "d",
      time_hour_short: "h",
      time_min_short: "min",

      my_posts_title: "Moje wpisy",
      my_posts_intro: "Tutaj znajdziesz wszystkie wpisy, które opublikowałeś(-aś).",
      my_posts_section_classifieds: "Ogłoszenia",
      my_posts_section_events: "Wydarzenia",
      my_posts_section_reports: "Zgłoszenia",
      my_posts_section_services: "Sąsiedzkie usługi",
      my_posts_section_polls: "Ankiety",
      my_posts_empty: "Brak publikacji w tej kategorii.",
      my_posts_created_at: "Utworzono",
      my_posts_date: "Data",
      my_posts_time: "Godzina",
      my_posts_status: "Status",
      my_posts_kind: "Typ",
      my_posts_end_date: "Koniec",
      my_posts_type_realestate: "nieruchomość",
      my_posts_type_item: "przedmiot",
      my_posts_kind_offer: "oferta",
      my_posts_kind_request: "prośba",
      my_posts_remaining: "Pozostało",
      my_posts_edit: "Edytuj",
      my_posts_remove: "Usuń",
      my_posts_pending: "W trakcie weryfikacji",

      comm_title: "Kontakt / pomysły",
      comm_intro:
        "Ta strona pozwala zadawać pytania lub przekazywać opinie o serwisie. Możesz zgłosić błąd, zaproponować pomysł na design lub zaproponować nową funkcję.",
      comm_new_thread_title: "Rozpocznij nową dyskusję",
      comm_public_title: "Dyskusje publiczne",
      comm_loading: "Ładowanie wiadomości...",
      comm_theme_label: "Temat",
      comm_theme_bug: "Błąd lub problem techniczny",
      comm_theme_design: "Design / UX",
      comm_theme_feature: "Pomysł na funkcję",
      comm_theme_other: "Inne",
      comm_message_label: "Twoja wiadomość",
      comm_message_placeholder:
        "Opisz błąd, pomysł na design lub funkcję, którą chcesz zobaczyć…",
      comm_submit: "Opublikuj wiadomość",
      comm_submit_loading: "Wysyłanie...",
      comm_error_load: "Nie można teraz wczytać wiadomości.",
      comm_error_submit: "Nie można teraz zapisać wiadomości.",
      comm_error_reply: "Nie można teraz zapisać odpowiedzi.",
      comm_error_delete: "Nie można teraz usunąć tej wiadomości.",
      comm_error_vote: "Nie można teraz zapisać głosu.",
      comm_error_missing_message: "Opisz swoje pytanie lub sugestię.",
      comm_error_missing_reply: "Wpisz odpowiedź przed wysłaniem.",
      comm_info_posted: "Twoja dyskusja została opublikowana. Dziękujemy!",
      comm_info_reply_posted: "Twoja odpowiedź została opublikowana.",
      comm_info_deleted: "Wiadomość i odpowiedzi zostały usunięte.",
      comm_confirm_delete: "Usunąć tę wiadomość i wszystkie odpowiedzi?",
      comm_reply: "Odpowiedz",
      comm_delete: "Usuń",
      comm_reply_placeholder: "Twoja odpowiedź…",
      comm_reply_cancel: "Anuluj",
      comm_reply_send: "Wyślij odpowiedź",
      comm_reply_sending: "Wysyłanie...",
      comm_author_fallback: "Mieszkaniec",
      comm_avatar_alt: "Avatar",

      hero_residence_fallback_name: "Osiedle Mały Kack – Gdynia",
      hero_welcome_prefix: "Witamy w",
      public_go_welcome: "Przejdź do powitania",
      public_profile_login_title: "Logowanie przez URL profilu Facebook",
      public_profile_login_submit: "Dalej",
      footer_privacy: "Polityka prywatnosci",
      footer_data_deletion: "Usuniecie danych",
      footer_terms: "Warunki korzystania z uslugi",

      about_title: "O serwisie – jak to działa?",
      about_intro_1:
        "Ta strona to mała, darmowa aplikacja społecznościowa dla mieszkańców osiedla Na Polanie – Mały Kack. Celem jest zebranie w jednym miejscu przydatnych informacji, ogłoszeń sąsiedzkich, wydarzeń osiedlowych i drobnych usług między mieszkańcami.",
      about_intro_2:
        "Na razie część treści (ogłoszenia, wydarzenia, zgłoszenia…) to przykładowe dane. Mają one jedynie pokazać, jak serwis może wyglądać, gdy prawdziwi mieszkańcy zaczną publikować. Możesz już dodawać realne treści: gdy mieszkańcy będą publikować ogłoszenia i wiadomości, dane przykładowe zostaną usunięte i zastąpione rzeczywistymi.",
      about_intro_3:
        "Projekt jest w pełni wolontariacki, a serwis jest w 100% darmowy dla mieszkańców. Bez reklam, bez opłat, bez komercyjnego wykorzystania danych. Celem jest stworzenie narzędzia, z którego mieszkańcy będą realnie korzystać na co dzień, i jego stałe ulepszanie na podstawie opinii.",
      about_intro_3b:
        "Na platformie nie są dozwolone posty sponsorowane ani sponsorowane sklepy.",
      about_intro_4:
        "Moim celem jest zajmowanie się wyłącznie częścią techniczną (utrzymanie, poprawki, nowe funkcje), a zarządzanie treściami przekazać jednemu lub dwóm administratorom osiedla. Administratorzy będą mogli dodawać moderatorów oraz zatwierdzać lub odrzucać nowych członków.",
      about_intro_5:
        "Jeśli z czasem serwis będzie wystarczająco używany i ceniony, naturalnym krokiem będzie stworzenie dedykowanej aplikacji iOS / Android. Pozwoli to np. otrzymywać powiadomienia, gdy pojawi się ważny nowy wpis (ogłoszenie, wydarzenie, zgłoszenie itp.).",
      about_download_title: "Pobierz aplikację",
      about_download_text:
        "Możesz pobrać aplikację mobilną ze sklepów. To ta sama usługa w wersji do zainstalowania.",
      about_app_store: "App Store",
      about_google_play: "Google Play",
      about_app_store_soon: "App Store (wkrótce)",
      about_google_play_soon: "Google Play (wkrótce)",

      profile_members_label: "członków",

      onboarding_badge: "Pierwsze logowanie",
      onboarding_title: "Prośba o dostęp do strefy mieszkańców",
      onboarding_intro_before:
        "Aby potwierdzić, że należysz do osiedlowej grupy na Facebooku, podaj ",
      onboarding_intro_strong: "dokładną nazwę grupy na Facebooku",
      onboarding_intro_after: " oraz adres URL swojego profilu na Facebooku.",
      onboarding_group_label: "Nazwa grupy na Facebooku",
      onboarding_group_placeholder: "Dokładna nazwa widoczna w grupie",
      onboarding_profile_label: "URL Twojego profilu na Facebooku",
      onboarding_profile_placeholder: "https://www.facebook.com/...",
      onboarding_submit: "Wyślij prośbę",
      onboarding_submit_loading: "Wysyłanie...",
      onboarding_cancel: "Anuluj",
      onboarding_note:
        "Po zatwierdzeniu prośby przez moderatora uzyskasz dostęp do strefy mieszkańców (ogłoszenia, ankiety, zgłoszenia itp.).",
      onboarding_error_missing:
        "Podaj nazwę grupy na Facebooku i adres URL swojego profilu na Facebooku.",
      onboarding_error_submit:
        "Nie można teraz dokończyć pierwszego logowania.",
      onboarding_error_generic:
        "Błąd podczas kończenia pierwszego logowania.",
      onboarding_success:
        "Twoja prośba została wysłana, moderator musi ją teraz zatwierdzić.",

      admin_pending_title: "Weryfikacja nowych kont",
      admin_pending_loading: "Ładowanie oczekujących zgłoszeń...",
      admin_pending_empty: "Brak oczekujących zgłoszeń.",
      admin_pending_count: "Oczekujące zgłoszenia ({n})",
      admin_pending_user_fallback: "Użytkownik do weryfikacji",
      admin_pending_view_fb: "Zobacz profil FB",
      admin_pending_reject: "Odrzuć",
      admin_pending_accept: "Akceptuj",
      admin_pending_table_avatar: "Avatar",
      admin_pending_table_name: "Imię",
      admin_pending_table_fb: "Profil Facebook",
      admin_pending_table_date: "Data",
      admin_pending_table_actions: "Akcje",
      admin_pending_error_load:
        "Nie można wczytać oczekujących kont.",
      admin_pending_error_load_generic:
        "Błąd podczas wczytywania oczekujących kont.",
      admin_pending_error_update:
        "Nie można teraz zaktualizować tego konta.",
      admin_pending_error_update_generic:
        "Błąd podczas aktualizacji tego konta.",

      classifieds_board_title: "Ogłoszenia osiedlowe",
      classifieds_board_subtitle:
        "Nieruchomości, wynajem, rzeczy na sprzedaż lub do oddania między sąsiadami.",
      classifieds_board_cta: "Dodaj ogłoszenie",
      classifieds_board_realestate_title: "Ogłoszenia nieruchomości",
      classifieds_board_realestate_empty:
        "Brak ogłoszeń nieruchomości w tym momencie.",
      classifieds_board_neighbors_title: "Ogłoszenia sąsiedzkie",
      classifieds_board_neighbors_empty:
        "Brak ogłoszeń o przedmiotach lub innych w tym momencie.",
      classifieds_board_tag_other: "Inne",

      shops_section_title: "Sklepy na osiedlu",
      shops_section_subtitle:
        "Sklep vegan, fryzjer i inne punkty usługowe w lub obok budynków.",
      shops_section_edit_button: "Edytuj mój wpis",
      shops_section_edit_simulation:
        "Symulacja: tutaj właściciel mógłby edytować swoją wizytówkę przez Supabase.",
      shops_admin_add_button: "Dodaj sklep",
      shops_admin_hide_form: "Zamknij",
      shops_admin_edit_button: "Edytuj",
      shops_admin_delete_button: "Usuń",
      shops_admin_delete_confirm: "Usunąć ten sklep?",
      shops_admin_title: "Sklepy w rezydencji",
      shops_admin_empty: "Brak sklepów do zarządzania.",
      shops_admin_limit_reached: "Masz już własną wizytówkę sklepu.",
      shops_section_empty:
        "Brak sklepów na osiedlu.",
      shops_section_notice: "",

      polls_section_title: "Ankiety sąsiedzkie",
      polls_section_subtitle:
        "Wyraź swoją opinię o życiu na osiedlu.",
      polls_section_cta: "Utwórz ankietę",
      polls_section_empty: "Brak aktywnych ankiet w tym momencie.",
      polls_status_closed: "Zakończone",
      polls_status_open: "W toku",
      polls_end_prefix: "Koniec ",

      post_published_on: "Opublikowano {date}",

      stats_overview_title: "Podsumowanie statystyk",
      stats_overview_subtitle:
        "Symulowany rozwój społeczności, interakcji i publikowanych treści.",
      stats_kpi_members_label: "Obecni członkowie",
      stats_kpi_members_sub: "+18% w ciągu 12 miesięcy (symulacja)",
      stats_kpi_interactions_label: "Interakcje / miesiąc",
      stats_kpi_interactions_sub: "wiadomości, ankiety, ogłoszenia",
      stats_kpi_polls_label: "Aktywne ankiety",
      stats_kpi_polls_sub: "z ostatnich 3 miesięcy (symulacja)",
      stats_kpi_classifieds_label: "Opublikowane ogłoszenia",
      stats_kpi_classifieds_sub: "nieruchomości + sąsiedzi",
      stats_chart_main_title: "Wzrost liczby członków i interakcji",
      stats_chart_members_label: "Członkowie",
      stats_chart_interactions_label: "Interakcje",
      stats_status_title: "Status",
      stats_status_in_progress: "W toku",
      stats_status_pending: "Do zatwierdzenia",
      stats_refused_30: "Odrzucone (ostatnie 30 dni)",
      stats_total_validated_prefix: "Łącznie zatwierdzone od początku: {n}",
      stats_polls_per_month: "Ankiety na miesiąc",
      stats_realestate_per_month: "Ogłoszenia nieruchomości na miesiąc",
      stats_neighbors_per_month: "Ogłoszenia sąsiedzkie na miesiąc",
      stats_events_per_month: "Wydarzenia na miesiąc",
      stats_reports_per_month: "Zgłoszenia na miesiąc",
      stats_services_per_month: "Usługi sąsiedzkie na miesiąc",
      month_jan: "Sty",
      month_feb: "Lut",
      month_mar: "Mar",
      month_apr: "Kwi",
      month_may: "Maj",
      month_jun: "Cze",
      month_jul: "Lip",
      month_aug: "Sie",
      month_sep: "Wrz",
      month_oct: "Paź",
      month_nov: "Lis",
      month_dec: "Gru"
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

