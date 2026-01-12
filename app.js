// App principale pour la webapp de résidence (sans build, React via CDN)

const { useEffect, useState } = React;

function LangSwitcher(props) {
  const lang = props.lang || "fr";
  const onChange = props.onChange || function () {};
  const variant = props.variant || "light"; // "light" | "hero"

  function btn(code, label) {
    const active = lang === code;
    return e(
      "button",
      {
        type: "button",
        className:
          "lang-switch-btn" + (active ? " lang-switch-btn-active" : ""),
        onClick: function () {
          if (!active) onChange(code);
        }
      },
      label
    );
  }

  const rootClass =
    "lang-switch" + (variant === "hero" ? " lang-switch-hero" : "");

  return e(
    "div",
    { className: rootClass },
    btn("fr", "🇫🇷"),
    btn("en", "🇬🇧"),
    btn("pl", "🇵🇱")
  );
}

function SectionsQuickNav(props) {
  const lang = props.lang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  function go(id) {
    try {
      var el = document.getElementById(id);
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (e) {}
  }

  function btn(id, labelKey) {
    const label = t(lang, labelKey);
    return e(
      "button",
      {
        type: "button",
        className: "sections-nav-btn",
        onClick: function () {
          go(id);
        }
      },
      label
    );
  }

  return e(
    "div",
    { className: "sections-nav" },
    btn("section-residence", "residence_section_title"),
    btn("section-real-estate", "re_section_title"),
    btn("section-neighbors", "neigh_section_title"),
    btn("section-events", "events_section_title"),
    btn("section-services", "services_section_title"),
    btn("section-reports", "reports_section_title")
  );
}

function App() {
  const supabase = window.supabaseClient || null;
  const [now, setNow] = useState(new Date());
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [selectedLine, setSelectedLine] = useState("32");
  const [departures, setDepartures] = useState([]);
  const [loadedDate, setLoadedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [residence, setResidence] = useState(null);
  const [residenceError, setResidenceError] = useState(null);
  const [classifieds, setClassifieds] = useState([]);
  const [classifiedsError, setClassifiedsError] = useState(null);
  const [shops, setShops] = useState([]);
  const [shopsError, setShopsError] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportsError, setReportsError] = useState(null);
  const [services, setServices] = useState([]);
  const [servicesError, setServicesError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [creatingReport, setCreatingReport] = useState(false);
  const [creatingService, setCreatingService] = useState(false);
  const [formType, setFormType] = useState("objet");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [showClassifiedsModal, setShowClassifiedsModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [profileName, setProfileName] = useState("Résident de Mały Kack");
  const [profileAvatar, setProfileAvatar] = useState(
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
  );
  // Simulation : utilisateur connecté est un commerçant associé au shop id 1
  const [isMerchant] = useState(true);
  const [merchantShopId] = useState(1);
  const [polls, setPolls] = useState([]);
  const [pollsError, setPollsError] = useState(null);
  const [creatingPoll, setCreatingPoll] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [residentId] = useState(() => getOrCreateResidentId());
  const [adminView, setAdminView] = useState("members"); // "members", "pendingUsers", "stats"
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);
  const [moderators, setModerators] = useState([]);
  const [moderatorsError, setModeratorsError] = useState(null);
  const [members, setMembers] = useState([]);
  const [membersError, setMembersError] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersPage, setMembersPage] = useState(1);
  const [membersSearch, setMembersSearch] = useState("");
  const [creatingMember, setCreatingMember] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pendingProfileUrl, setPendingProfileUrl] = useState("");
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [showAdminNav, setShowAdminNav] = useState(false);
  const [lang, setLang] = useState(() => {
    try {
      if (window.localStorage) {
        const stored = window.localStorage.getItem("appLang");
        if (stored) return stored;
      }
    } catch (e) {}
    // Par défaut, on démarre le site en polonais pour les résidents
    return "pl";
  });
  const isDevEnv =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        setAuthError(null);
        const res = await fetch("/api/me");
        if (!res.ok) {
          throw new Error("Impossible de vérifier votre session.");
        }
        const data = await res.json();
        if (data && data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (e) {
        console.error(e);
        setAuthError("Impossible de vérifier votre session.");
      } finally {
        setAuthChecked(true);
      }
    }

    loadCurrentUser();
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage) {
        window.localStorage.setItem("appLang", lang);
      }
    } catch (e) {}
  }, [lang]);

  // Synchronise l'URL avec l'état de connexion :
  // - utilisateur connecté  -> /welcome
  // - non connecté          -> /
  useEffect(() => {
    if (!authChecked) return;
    const path = window.location.pathname;
    if (currentUser && path !== "/welcome") {
      window.history.replaceState({}, "", "/welcome");
    } else if (!currentUser && path === "/welcome") {
      window.history.replaceState({}, "", "/");
    }
  }, [authChecked, currentUser]);

  // Si une session Supabase existe, on tente de la synchroniser avec le backend
  useEffect(() => {
    if (!supabase) return;
    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn("Supabase getSession error:", error.message);
          return;
        }
        if (!data || !data.session) return;
        const accessToken = data.session.access_token;
        // On informe le backend pour qu'il crée une session locale + currentUser
        const res = await fetch("/api/auth/supabase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken })
        });
        const payload = await res.json().catch(() => null);
        if (!res.ok) {
          console.warn(
            "Supabase-login backend error:",
            payload && payload.error
          );
          return;
        }
        if (payload && payload.authenticated && payload.user) {
          setCurrentUser(payload.user);
          setAuthChecked(true);
        }
      } catch (e) {
        console.warn("Supabase sync exception:", e);
      }
    })();
  }, [supabase]);

  useEffect(() => {
    async function loadDepartures() {
      try {
        if (!hasLoadedOnce) {
          setLoading(true);
        }
        setError(null);
        const res = await fetch("/api/departures?line=" + selectedLine);
        if (!res.ok) {
          throw new Error("Réponse non valide du serveur");
        }
        const data = await res.json();
        setDepartures(Array.isArray(data.departures) ? data.departures : []);
        setLoadedDate(data.date || null);
        setHasLoadedOnce(true);
      } catch (e) {
        console.error(e);
        setError("Impossible de récupérer les horaires en ligne.");
      } finally {
        if (!hasLoadedOnce) {
          setLoading(false);
        }
      }
    }

    loadDepartures();

    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, [selectedLine, hasLoadedOnce]);

  useEffect(() => {
    async function loadWeather() {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) return;
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        console.error(e);
        setWeatherError("Météo indisponible.");
      }
    }
    loadWeather();
    const id = setInterval(loadWeather, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // Persistance simple du profil dans localStorage
  useEffect(() => {
    try {
      const storedName = window.localStorage.getItem("profileName");
      const storedAvatar = window.localStorage.getItem("profileAvatar");
      if (storedName) setProfileName(storedName);
      if (storedAvatar) setProfileAvatar(storedAvatar);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("profileName", profileName || "");
      window.localStorage.setItem("profileAvatar", profileAvatar || "");
    } catch (e) {}
  }, [profileName, profileAvatar]);

  useEffect(() => {
    if (!currentUser) return;
    setProfileName((prev) =>
      prev && prev !== "Résident de Mały Kack"
        ? prev
        : currentUser.name || "Résident de Mały Kack"
    );
    // Toujours privilégier la vraie photo de profil renvoyée par le backend
    // (Supabase / Facebook). Si elle n'existe pas, on garde un fallback.
    setProfileAvatar(
      currentUser.avatarUrl ||
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
    );
  }, [currentUser]);

  useEffect(() => {
    async function loadResidence() {
      try {
        setResidenceError(null);
        const res = await fetch("/api/residence");
        if (!res.ok) {
          throw new Error("Impossible de charger les infos résidence");
        }
        const data = await res.json();
        setResidence(data);
      } catch (e) {
        console.error(e);
        setResidenceError("Infos résidence indisponibles pour le moment.");
      }
    }

    async function loadClassifieds() {
      try {
        setClassifiedsError(null);
        const res = await fetch("/api/classifieds");
        if (!res.ok) {
          throw new Error("Impossible de charger les annonces");
        }
        const data = await res.json();
        setClassifieds(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setClassifiedsError("Annonces indisponibles pour le moment.");
      }
    }

    async function loadShops() {
      try {
        setShopsError(null);
        const res = await fetch("/api/shops");
        if (!res.ok) {
          throw new Error("Impossible de charger les commerçants");
        }
        const data = await res.json();
        setShops(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setShopsError("Commerçants indisponibles pour le moment.");
      }
    }

    async function loadEvents() {
      try {
        setEventsError(null);
        const res = await fetch("/api/events");
        if (!res.ok) {
          throw new Error("Impossible de charger les événements");
        }
        const data = await res.json();
        setEvents(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setEventsError("Événements indisponibles pour le moment.");
      }
    }

    async function loadReports() {
      try {
        setReportsError(null);
        const res = await fetch("/api/reports");
        if (!res.ok) {
          throw new Error("Impossible de charger les signalements");
        }
        const data = await res.json();
        setReports(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setReportsError("Signalements indisponibles pour le moment.");
      }
    }

    async function loadServices() {
      try {
        setServicesError(null);
        const res = await fetch("/api/services");
        if (!res.ok) {
          throw new Error("Impossible de charger les services entre voisins");
        }
        const data = await res.json();
        setServices(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setServicesError("Services entre voisins indisponibles pour le moment.");
      }
    }

    async function loadPolls() {
      try {
        setPollsError(null);
        const res = await fetch("/api/polls");
        if (!res.ok) {
          throw new Error("Impossible de charger les sondages");
        }
        const data = await res.json();
        setPolls(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setPollsError("Sondages indisponibles pour le moment.");
      }
    }

    loadResidence();
    loadClassifieds();
    loadShops();
    loadEvents();
    loadReports();
    loadServices();
    loadPolls();
  }, []);

  async function handleCreateReport(payload) {
    if (!payload || !payload.title || !payload.description) return;
    try {
      setCreatingReport(true);
      setReportsError(null);
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          (errData && errData.error) ||
          "Impossible d'enregistrer le signalement.";
        throw new Error(msg);
      }
      const created = await res.json();
      setReports((prev) => [created, ...(prev || [])]);
    } catch (e) {
      console.error(e);
      setReportsError(
        e && e.message
          ? e.message
          : "Erreur lors de la création du signalement."
      );
    } finally {
      setCreatingReport(false);
    }
  }

  async function handleCreateService(payload) {
    if (!payload || !payload.title || !payload.description) return;
    try {
      setCreatingService(true);
      setServicesError(null);
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          (errData && errData.error) ||
          "Impossible d'enregistrer le service.";
        throw new Error(msg);
      }
      const created = await res.json();
      setServices((prev) => [created, ...(prev || [])]);
    } catch (e) {
      console.error(e);
      setServicesError(
        e && e.message
          ? e.message
          : "Erreur lors de la création du service."
      );
    } finally {
      setCreatingService(false);
    }
  }

  async function loadMembers() {
    try {
      setMembersLoading(true);
      setMembersError(null);
      const res = await fetch("/api/members");
      if (!res.ok) {
        throw new Error("Impossible de charger les membres.");
      }
      const data = await res.json();
      setMembers(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      console.error(e);
      setMembersError(
        e && e.message ? e.message : "Erreur lors du chargement des membres."
      );
    } finally {
      setMembersLoading(false);
    }
  }

  async function handleChangeMemberRole(id, newRole) {
    try {
      const res = await fetch("/api/members/" + id + "/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          (errData && errData.error) ||
            "Impossible de modifier le rôle de ce membre."
        );
      }
      const updated = await res.json();
      setMembers((prev) =>
        (prev || []).map((m) => (m.id === updated.id ? updated : m))
      );
    } catch (e) {
      console.error(e);
      setMembersError(
        e && e.message
          ? e.message
          : "Erreur lors de la modification du rôle du membre."
      );
    }
  }

  async function handleDeleteMember(id) {
    if (!window.confirm("Supprimer ce membre ?")) return;
    try {
      const res = await fetch("/api/members/" + id, {
        method: "DELETE"
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          (errData && errData.error) ||
            "Impossible de supprimer ce membre."
        );
      }
      await res.json();
      setMembers((prev) => (prev || []).filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
      setMembersError(
        e && e.message
          ? e.message
          : "Erreur lors de la suppression du membre."
      );
    }
  }

  async function handleCreatePoll(payload) {
    if (
      !payload ||
      !payload.title ||
      !payload.endDate ||
      !Array.isArray(payload.options) ||
      payload.options.length < 2
    ) {
      return;
    }
    try {
      setCreatingPoll(true);
      setPollsError(null);
      const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          (errData && errData.error) ||
          "Impossible d'enregistrer le sondage.";
        throw new Error(msg);
      }
      const created = await res.json();
      setPolls((prev) => [created, ...(prev || [])]);
      setShowPollModal(false);
    } catch (e) {
      console.error(e);
      setPollsError(
        e && e.message ? e.message : "Erreur lors de la création du sondage."
      );
    } finally {
      setCreatingPoll(false);
    }
  }

  async function handleVotePoll(pollId, optionId) {
    if (!pollId || !optionId) return;
    try {
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId, residentId })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          (errData && errData.error) ||
          "Impossible d'enregistrer votre vote pour ce sondage.";
        throw new Error(msg);
      }
      const updated = await res.json();
      setPolls((prev) =>
        (prev || []).map((p) => (p.id === updated.id ? updated : p))
      );
    } catch (e) {
      console.error(e);
      setPollsError(
        e && e.message
          ? e.message
          : "Erreur lors de l'enregistrement de votre vote."
      );
    }
  }

  async function handleCreateEvent(payload) {
    if (!payload || !payload.title || !payload.date || !payload.description) {
      return;
    }
    try {
      setCreatingEvent(true);
      setEventsError(null);
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          (errData && errData.error) ||
          "Impossible d'enregistrer l'événement.";
        throw new Error(msg);
      }
      const created = await res.json();
      setEvents((prev) => [created, ...(prev || [])]);
      setShowEventModal(false);
    } catch (e) {
      console.error(e);
      setEventsError(
        e && e.message
          ? e.message
          : "Erreur lors de la création de l'événement."
      );
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleCreateClassified(e) {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      alert("Merci de remplir au moins un titre et une description.");
      return;
    }
    try {
      setCreating(true);
      setClassifiedsError(null);
      const res = await fetch("/api/classifieds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: formType,
          title: formTitle,
          description: formDescription,
          price: formPrice
        })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          (errData && errData.error) ||
          "Impossible d'enregistrer l'annonce.";
        throw new Error(msg);
      }
      const created = await res.json();
      setClassifieds((prev) => [created, ...prev]);
      setFormTitle("");
      setFormDescription("");
      setFormPrice("");
    } catch (err) {
      console.error(err);
      setClassifiedsError(
        err && err.message
          ? err.message
          : "Erreur lors de la création de l'annonce."
      );
    } finally {
      setCreating(false);
    }
  }

  function handleChangeClassifiedField(field, value) {
    if (field === "type") setFormType(value);
    else if (field === "title") setFormTitle(value);
    else if (field === "description") setFormDescription(value);
    else if (field === "price") setFormPrice(value);
  }

  // Création de commerce sera finalement gérée uniquement par les modérateurs / dev
  // (via Supabase plus tard). Aucun formulaire public n'appelle cette logique côté client.

  async function loadModerators() {
    try {
      setModeratorsError(null);
      const res = await fetch("/api/moderators");
      if (!res.ok) {
        throw new Error("Impossible de charger les modérateurs.");
      }
      const data = await res.json();
      setModerators(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      console.error(e);
      setModeratorsError(
        e && e.message ? e.message : "Erreur lors du chargement des modérateurs."
      );
    }
  }

  async function handleAddModerator() {
    const name = window.prompt("Nom du modérateur :");
    if (!name) return;
    const email = window.prompt("E-mail du modérateur :");
    if (!email) return;
    try {
      setModeratorsError(null);
      const res = await fetch("/api/moderators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          (errData && errData.error) ||
            "Impossible d'ajouter ce modérateur."
        );
      }
      const created = await res.json();
      setModerators((prev) => [...prev, created]);
    } catch (e) {
      console.error(e);
      setModeratorsError(
        e && e.message ? e.message : "Erreur lors de l'ajout du modérateur."
      );
    }
  }

  async function handleRemoveModerator(id) {
    if (!window.confirm("Supprimer ce modérateur ?")) return;
    try {
      setModeratorsError(null);
      const res = await fetch("/api/moderators/" + id, {
        method: "DELETE"
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          (errData && errData.error) ||
            "Impossible de supprimer ce modérateur."
        );
      }
      await res.json();
      setModerators((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
      setModeratorsError(
        e && e.message
          ? e.message
          : "Erreur lors de la suppression du modérateur."
      );
    }
  }

  React.useEffect(() => {
    if (
      currentUser &&
      (currentUser.role === "admin" || currentUser.role === "super_admin")
    ) {
      loadModerators();
    }
  }, [currentUser && currentUser.role]);

  React.useEffect(() => {
    if (
      currentUser &&
      (currentUser.role === "moderator" ||
        currentUser.role === "admin" ||
        currentUser.role === "super_admin")
    ) {
      loadMembers();
    }
  }, [currentUser && currentUser.role]);

  async function handleDevLogin() {
    try {
      setAuthError(null);

      // En local (localhost), on utilise la vraie route backend
      if (isDevEnv) {
        const res = await fetch("/auth/dev-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          const msg =
            (data && data.error) ||
            "Impossible d'activer l'accès temporaire pour le moment.";
          throw new Error(msg);
        }
        if (data && data.user) {
          setCurrentUser(data.user);
          setAuthChecked(true);
        }
        return;
      }

      // En ligne (Vercel), on crée un utilisateur de démonstration côté front
      const now = new Date().toISOString();
      const demoUser = {
        id: "demo-super-admin",
        name: "Admin demonstracyjny",
        avatarUrl:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
        facebookProfileUrl: null,
        status: "active",
        role: "super_admin",
        createdAt: now,
        lastLoginAt: now
      };
      setCurrentUser(demoUser);
      setAuthChecked(true);
    } catch (e) {
      console.error(e);
      setAuthError(
        e && e.message
          ? e.message
          : "Impossible d'activer l'accès temporaire pour le moment."
      );
    }
  }

  async function handleSupabaseFacebookLogin() {
    if (!supabase) {
      setAuthError(
        "Supabase n'est pas initialisé côté client. Vérifiez le script dans index.html."
      );
      return;
    }
    try {
      setAuthError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: window.location.origin,
          scopes: "public_profile" // on ne demande pas l'email pour éviter Invalid Scopes
        }
      });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error("Erreur login Supabase/Facebook:", e);
      setAuthError(
        e && e.message
          ? e.message
          : "Impossible de démarrer la connexion Facebook pour le moment."
      );
    }
  }

  async function handleProfileUrlLogin(facebookProfileUrl) {
    const url = (facebookProfileUrl || "").trim();
    if (!url) {
      alert("Merci de coller l'URL de votre profil Facebook.");
      return;
    }
    try {
      setAuthError(null);
      const res = await fetch("/api/login/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facebookProfileUrl: url })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          (data && data.error) ||
            "Impossible de vérifier votre profil Facebook pour le moment."
        );
      }
      if (data && data.authenticated && data.user) {
        setCurrentUser(data.user);
        setAuthChecked(true);
        // Redirige vers la page connectée
        window.history.replaceState({}, "", "/welcome");
        return;
      }
      if (data && data.needOnboarding) {
        setPendingProfileUrl(url);
        setShowOnboarding(true);
        setAuthChecked(true);
        return;
      }
      if (data && data.user) {
        setCurrentUser(data.user);
        setAuthChecked(true);
        if (data.user.status === "active") {
          window.history.replaceState({}, "", "/welcome");
        }
      }
    } catch (e) {
      console.error(e);
      setAuthError(
        e && e.message
          ? e.message
          : "Erreur lors de la connexion avec votre lien Facebook."
      );
    }
  }

  async function handleLogoutToHome() {
    try {
      setAuthError(null);
      // Déconnexion côté backend (session cookie)
      await fetch("/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      }).catch(() => null);

      // Déconnexion Supabase (session OAuth Facebook)
      if (supabase && supabase.auth && supabase.auth.signOut) {
        try {
          await supabase.auth.signOut();
        } catch (e) {
          console.warn("Erreur supabase.auth.signOut:", e);
        }
      }
    } finally {
      setCurrentUser(null);
      setAuthChecked(true);
      setShowOnboarding(false);
      // Retour explicite sur la page d'accueil
      window.history.replaceState({}, "", "/");
    }
  }

  if (!authChecked) {
    return e(
      "div",
      { className: "app-loading" },
      "Chargement de votre session..."
    );
  }

  if (!currentUser) {
    if (showOnboarding) {
      return e(OnboardingStep, {
        currentUser: null,
        initialFacebookProfileUrl: pendingProfileUrl,
        onCompleted: function (user) {
          if (user) {
            setCurrentUser(user);
          }
          setShowOnboarding(false);
        },
        onCancel: function () {
          setShowOnboarding(false);
        }
      });
    }
    return e(
      React.Fragment,
      null,
        e(
          "div",
          { className: "public-topbar" },
        e(
          "div",
          { className: "public-topbar-left" },
          e(
            "button",
            {
              type: "button",
              className: "public-topbar-link",
              onClick: handleSupabaseFacebookLogin
            },
            window.i18n && window.i18n.t
              ? window.i18n.t(lang, "topbar_login_fb")
              : "Se connecter avec Facebook"
          ),
          e(
            "button",
            {
              type: "button",
              className: "public-topbar-link",
              onClick: handleDevLogin
            },
            window.i18n && window.i18n.t
              ? window.i18n.t(lang, "topbar_dev_access")
              : "Accès temporaire"
          )
        ),
        e(LangSwitcher, {
          lang,
          onChange: setLang
        })
      ),
      e(
        "div",
        { className: "public-home" },
        e(SectionsQuickNav, { lang }),
        e(ResidenceHero, {
          residence,
          residenceError,
          classifieds,
          authError,
          lang
        }),
        e(ClassifiedsRealEstate, {
          classifieds,
          classifiedsError,
          lang
        })
      )
    );
  }

  if (currentUser.status === "blocked") {
    return e(
      "div",
      { className: "blocked-screen" },
      e(
        "div",
        { className: "card card-wrapper" },
        e(
          "div",
          { className: "card-content" },
          e("h2", null, "Compte bloqué"),
          e(
            "p",
            null,
            "Votre compte a été bloqué par un modérateur. Contactez la résidence si vous pensez qu'il s'agit d'une erreur."
          )
        )
      )
    );
  }

  if (currentUser.status === "pending" && !currentUser.facebookProfileUrl) {
    return e(OnboardingStep, {
      currentUser,
      initialFacebookProfileUrl: currentUser.facebookProfileUrl,
      onCompleted: function (user) {
        if (user) {
          setCurrentUser(user);
        }
      },
      onCancel: null
    });
  }

  if (currentUser.status === "pending") {
    return e(
      "div",
      { className: "pending-screen" },
      e(
        "div",
        { className: "card card-wrapper" },
        e(
          "div",
          { className: "card-content" },
          e("h2", null, "En attente de validation"),
          e(
            "p",
            null,
            "Votre demande d'accès a été envoyée. Un modérateur doit maintenant valider votre compte."
          ),
          e(
            "div",
            { style: { marginTop: 16 } },
            e(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: handleLogoutToHome
              },
              "Revenir à la page d'accueil"
            )
          )
        )
      )
    );
  }

  const role = currentUser.role || "resident"; // "resident", "moderator", "admin", "super_admin"
  const isStaff =
    role === "moderator" || role === "admin" || role === "super_admin";

  const effectiveAdminView =
    !isStaff || !showAdminNav ? "dashboard" : adminView;

  const leftContent =
    effectiveAdminView === "dashboard"
      ? e(
          "div",
          { className: "page-sections" },
          e(SectionsQuickNav, { lang }),
          e(ResidenceCard, {
            residence,
            residenceError,
            lang
          }),
          e(ClassifiedsRealEstate, {
            classifieds,
            classifiedsError,
            onOpenForm: () => {
              setFormType("immobilier");
              setShowClassifiedsModal(true);
            },
            onSelect: (item) => {
              setSelectedAnnouncement(item);
              setShowAnnouncementModal(true);
            },
            lang
          }),
          e(ClassifiedsNeighbors, {
            classifieds,
            classifiedsError,
            onOpenForm: () => {
              setFormType("objet");
              setShowClassifiedsModal(true);
            },
            onSelect: (item) => {
              setSelectedAnnouncement(item);
              setShowAnnouncementModal(true);
            },
            lang
          }),
          // Section commerçants détaillée retirée pour garder la version compacte dans la colonne de droite
          e(EventsSection, {
            events,
            eventsError,
            onOpenForm: () => setShowEventModal(true),
            lang
          }),
          e(NeighborServicesSection, {
            services,
            servicesError,
            onOpenForm: () => setShowServiceModal(true),
            lang
          }),
          e(ReportsSection, {
            reports,
            reportsError,
            onOpenForm: () => setShowReportModal(true),
            lang
          })
        )
      : effectiveAdminView === "members"
      ? e(
          "div",
          { className: "page-sections" },
          e(MembersTable, {
            members,
            loading: membersLoading,
            error: membersError,
            role,
            page: membersPage,
            onChangePage: setMembersPage,
            search: membersSearch,
            onSearchChange: setMembersSearch,
            onChangeRole: handleChangeMemberRole,
            onDelete: handleDeleteMember,
            onAdd: () => setShowAddMemberModal(true),
            lang
          })
        )
      : effectiveAdminView === "pendingUsers"
      ? e(
          "div",
          { className: "page-sections" },
          e(AdminPendingUsers, {
            onCountChange: setPendingRequestsCount
          })
        )
      : e(
          "div",
          { className: "page-sections" },
          e(StatsOverview, {
            polls,
            members,
            classifieds
          })
        );

  return e(
    React.Fragment,
    null,
    e(
      "div",
      { className: "dashboard" },
      e(
        "div",
        { className: "dashboard-hero" },
        e(
          "div",
          { className: "dashboard-hero-inner" },
          e(
            "div",
            { className: "dashboard-hero-title" },
            window.i18n && window.i18n.t
              ? window.i18n.t(lang, "dashboard_hero_title")
              : "Résidence Mały Kack – Gdynia"
          ),
          e(
            "div",
            { className: "dashboard-hero-subtitle" },
            window.i18n && window.i18n.t
              ? window.i18n.t(lang, "dashboard_hero_subtitle")
              : "Infos pratiques, bus, météo et vie de la résidence."
            ),
          isStaff &&
            e(
              "div",
              { className: "dashboard-hero-admin-toggle" },
              e(
                "button",
                {
                  type: "button",
                  className: "btn-primary",
                  onClick: function () {
                    setShowAdminNav(function (prev) {
                      return !prev;
                    });
                  }
                },
                window.i18n && window.i18n.t
                  ? window.i18n.t(
                      lang,
                      showAdminNav
                        ? "admin_hero_btn_close"
                        : "admin_hero_btn_open"
                    )
                  : showAdminNav
                  ? "Hide admin navigation"
                  : "Open admin navigation"
              )
            )
        ),
        e(
          "div",
          { className: "dashboard-hero-right" },
          e(
            "button",
            {
              type: "button",
              className: "dashboard-hero-back",
              onClick: handleLogoutToHome
            },
            window.i18n && window.i18n.t
              ? window.i18n.t(lang, "dashboard_back_home")
              : "Revenir à la page d'accueil"
          ),
          e(LangSwitcher, {
            lang,
            onChange: setLang,
            variant: "hero"
          })
        )
      ),
      e(
        "div",
        { className: "dashboard-main" },
        isStaff &&
          showAdminNav &&
          e(
            "div",
            { className: "dashboard-main-nav" },
            e(AdminNav, {
              current: adminView,
              onChange: setAdminView,
              pendingCount: pendingRequestsCount,
              lang
            })
          ),
        e(
          "div",
          { className: "dashboard-main-left" },
          leftContent
        ),
          e(
            "div",
            { className: "dashboard-main-right" },
            e(ProfileBar, {
              name: profileName,
              avatarUrl: profileAvatar,
            onOpenSettings: null
            }),
            e(BusCard, {
              now,
              selectedLine,
              setSelectedLine,
              departures,
              loadedDate,
              loading,
            error,
            lang
            }),
            e(WeatherCard, {
              now,
              weather,
            weatherError,
            lang
            }),
            e(ShopsQuickCard, {
              shops,
            lang,
              onSelect: (shop) => {
                setSelectedShop(shop);
                setShowShopModal(true);
              }
            }),
            e(PollsQuickCard, {
              polls,
            onVote: handleVotePoll,
            lang
            }),
            e(ModeratorsCard, {
              role,
              moderators,
              error: moderatorsError,
              onAdd: handleAddModerator,
            onRemove: handleRemoveModerator,
            lang
            })
          )
      )
    ),
    e(ClassifiedsModal, {
      open: showClassifiedsModal,
      classifiedsError,
      creating,
      formType,
      formTitle,
      formDescription,
      formPrice,
      onChangeField: handleChangeClassifiedField,
      onSubmit: handleCreateClassified,
      onClose: () => setShowClassifiedsModal(false)
    }),
    e(EventModal, {
      open: showEventModal,
      creating: creatingEvent,
      onSubmit: handleCreateEvent,
      onClose: () => setShowEventModal(false)
    }),
    e(ReportModal, {
      open: showReportModal,
      creating: creatingReport,
      onSubmit: handleCreateReport,
      onClose: () => setShowReportModal(false)
    }),
    e(NeighborServiceModal, {
      open: showServiceModal,
      creating: creatingService,
      onSubmit: handleCreateService,
      onClose: () => setShowServiceModal(false)
    }),
    e(ShopModal, {
      open: showShopModal,
      shop: selectedShop,
      onClose: () => {
        setShowShopModal(false);
        setSelectedShop(null);
      }
    }),
    e(AddMemberModal, {
      open: showAddMemberModal,
      creating: creatingMember,
      onSubmit: async ({ email, role: roleForNew }) => {
        const emailTrimmed = (email || "").trim();
        if (!emailTrimmed) {
          alert("Merci de saisir un e-mail pour le nouveau membre.");
          return;
        }
        const nickname = emailTrimmed.split("@")[0] || emailTrimmed;
        const effectiveRole =
          roleForNew && ["member", "admin", "moderator"].includes(roleForNew)
            ? roleForNew
            : "member";
        try {
          setCreatingMember(true);
          setMembersError(null);
          const res = await fetch("/api/members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nickname,
              email: emailTrimmed,
              role: effectiveRole
            })
          });
          if (!res.ok) {
            const errData = await res.json().catch(() => null);
            throw new Error(
              (errData && errData.error) || "Impossible d'ajouter ce membre."
            );
          }
          const created = await res.json();
          setMembers((prev) => [...(prev || []), created]);
          setShowAddMemberModal(false);
        } catch (e) {
          console.error(e);
          setMembersError(
            e && e.message
              ? e.message
              : "Erreur lors de l'ajout du membre."
          );
        } finally {
          setCreatingMember(false);
        }
      },
      onClose: () => setShowAddMemberModal(false)
    }),
    e(PollModal, {
      open: showPollModal,
      creating: creatingPoll,
      onSubmit: handleCreatePoll,
      onClose: () => setShowPollModal(false)
    }),
    e(AnnouncementModal, {
      open: showAnnouncementModal,
      item: selectedAnnouncement,
      onClose: () => {
        setShowAnnouncementModal(false);
        setSelectedAnnouncement(null);
      }
    })
  );
}

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(e(App));

