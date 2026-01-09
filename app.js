// App principale pour la webapp de résidence (sans build, React via CDN)

const { useEffect, useState } = React;

function App() {
  const [now, setNow] = useState(new Date());
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
  const [loggedIn, setLoggedIn] = useState(false);
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
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);

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

  if (!loggedIn) {
    return e(ResidenceHero, {
      residence,
      residenceError,
      classifieds,
      onLogin: () => setLoggedIn(true)
    });
  }

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
            "Résidence Mały Kack – Gdynia"
          ),
          e(
            "div",
            { className: "dashboard-hero-subtitle" },
            "Infos pratiques, bus, météo et vie de la résidence."
          )
        )
      ),
      e(
        "div",
        { className: "dashboard-main" },
        e(
          "div",
          { className: "dashboard-main-left" },
          e(
            "div",
            { className: "page-sections" },
            e(ResidenceCard, {
              residence,
              residenceError
            }),
            e(ClassifiedsRealEstate, {
              classifieds,
              classifiedsError,
              onSelect: (item) => {
                setSelectedAnnouncement(item);
                setShowAnnouncementModal(true);
              }
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
              }
            }),
            // Section commerçants détaillée retirée pour garder la version compacte dans la colonne de droite
            e(EventsSection, {
              events,
              eventsError,
              onOpenForm: () => setShowEventModal(true)
            }),
            e(ReportsSection, {
              reports,
              reportsError,
              onOpenForm: () => setShowReportModal(true)
            }),
            e(NeighborServicesSection, {
              services,
              servicesError,
              onOpenForm: () => setShowServiceModal(true)
            })
          )
        ),
        e(
          "div",
          { className: "dashboard-main-right" },
          e(ProfileBar, {
            name: profileName,
            avatarUrl: profileAvatar,
            onNameChange: setProfileName,
            onAvatarChange: setProfileAvatar
          }),
          e(BusCard, {
            now,
            selectedLine,
            setSelectedLine,
            departures,
            loadedDate,
            loading,
            error
          }),
          e(WeatherCard, {
            now,
            weather,
            weatherError
          }),
          e(ShopsQuickCard, {
            shops,
            onSelect: (shop) => {
              setSelectedShop(shop);
              setShowShopModal(true);
            }
          }),
          e(PollsQuickCard, {
            polls,
            onVote: handleVotePoll
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

