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

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 900 : false;

  const [floating, setFloating] = React.useState(false);
  const navRef = React.useRef(null);
  const initialTopRef = React.useRef(null);

  React.useEffect(() => {
    if (!isMobile) {
      setFloating(false);
      return;
    }

    function handleScroll() {
      if (!navRef.current) return;
      if (initialTopRef.current == null) {
        const rect = navRef.current.getBoundingClientRect();
        initialTopRef.current = rect.top + window.scrollY;
      }
      const threshold = initialTopRef.current - 8;
      setFloating(window.scrollY >= threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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

  function option(id, labelKey) {
    const label = t(lang, labelKey);
    return e("option", { value: id }, label);
  }

  const placeholder = t(lang, "sections_nav_placeholder");

  const navClassName =
    "sections-nav" + (floating ? " sections-nav-floating" : "");

  return e(
    "div",
    { className: navClassName, ref: navRef },
    // Boutons pills pour les écrans larges
    e(
      "div",
      { className: "sections-nav-buttons" },
      btn("section-residence", "residence_section_title"),
      btn("section-real-estate", "re_section_title"),
      btn("section-neighbors", "neigh_section_title"),
      btn("section-events", "events_section_title"),
      btn("section-services", "services_section_title"),
      btn("section-reports", "reports_section_title")
    ),
    // Liste déroulante pour le responsive mobile
    e(
      "select",
      {
        className: "sections-nav-select",
        onChange: function (ev) {
          var targetId = ev && ev.target && ev.target.value;
          if (targetId) {
            go(targetId);
            // on remet la valeur vide pour pouvoir re-choisir la même section
            ev.target.value = "";
          }
        },
        defaultValue: ""
      },
      e("option", { value: "" }, placeholder),
      option("section-residence", "residence_section_title"),
      option("section-real-estate", "re_section_title"),
      option("section-neighbors", "neigh_section_title"),
      option("section-events", "events_section_title"),
      option("section-services", "services_section_title"),
      option("section-reports", "reports_section_title")
    )
  );
}

// Menu principal pour basculer entre les pages (accueil / à propos / communication)
function MainMenu(props) {
  const current = props.current || "home";
  const onChange = props.onChange || function () {};
  const lang = props.lang || "fr";
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };

  function btn(key, label) {
    const active = current === key;
    return e(
      "button",
      {
        type: "button",
        className:
          "main-menu-btn" + (active ? " main-menu-btn-active" : ""),
        onClick: function () {
          if (!active) onChange(key);
        }
      },
      label
    );
  }

  return e(
    "div",
    { className: "main-menu" },
    btn("home", t(lang, "menu_home")),
    btn("myPosts", t(lang, "menu_my_posts")),
    btn("about", t(lang, "menu_about")),
    btn("feedback", t(lang, "menu_feedback"))
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
  const [residenceItems, setResidenceItems] = useState([]);
  const [residenceError, setResidenceError] = useState(null);
  const [savingResidence, setSavingResidence] = useState(false);
  const [showResidenceForm, setShowResidenceForm] = useState(false);
  const [selectedResidencePost, setSelectedResidencePost] = useState(null);
  const [showResidencePostModal, setShowResidencePostModal] = useState(false);
  const [selectedServicePost, setSelectedServicePost] = useState(null);
  const [showServicePostModal, setShowServicePostModal] = useState(false);
  const [selectedReportPost, setSelectedReportPost] = useState(null);
  const [showReportPostModal, setShowReportPostModal] = useState(false);
  const [selectedEventPost, setSelectedEventPost] = useState(null);
  const [showEventPostModal, setShowEventPostModal] = useState(false);
  const [selectedPollPost, setSelectedPollPost] = useState(null);
  const [showPollPostModal, setShowPollPostModal] = useState(false);
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
  const [formDurationDays, setFormDurationDays] = useState(7);
  const [formImageFile, setFormImageFile] = useState(null);
  const [showClassifiedsModal, setShowClassifiedsModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [profileName, setProfileName] = useState(() => {
    try {
      const storedLang = window.localStorage
        ? window.localStorage.getItem("appLang")
        : null;
      if (window.i18n && window.i18n.t) {
        return window.i18n.t(storedLang || "pl", "profile_default_name");
      }
    } catch (e) {}
    return "";
  });
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
  const [editingPost, setEditingPost] = useState(null);
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
  const t =
    window.i18n && window.i18n.t
      ? window.i18n.t
      : function (_lang, key) {
          return key;
        };
  const [mainPage, setMainPage] = useState("home"); // "home" | "about" | "feedback"
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
          throw new Error(t(lang, "auth_error_session"));
        }
        const data = await res.json();
        if (data && data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (e) {
        console.error(e);
        setAuthError(t(lang, "auth_error_session"));
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
          throw new Error(t(lang, "error_invalid_server_response"));
        }
        const data = await res.json();
        setDepartures(Array.isArray(data.departures) ? data.departures : []);
        setLoadedDate(data.date || null);
        setHasLoadedOnce(true);
      } catch (e) {
        console.error(e);
        setError(t(lang, "error_bus_fetch"));
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
        setWeatherError(t(lang, "error_weather_unavailable"));
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
    const defaultName = t(lang, "profile_default_name");
    setProfileName((prev) =>
      prev && prev !== defaultName
        ? prev
        : currentUser.name || defaultName
    );
    // Toujours privilégier la vraie photo de profil renvoyée par le backend
    // (Supabase / Facebook). Si elle n'existe pas, on garde un fallback.
    setProfileAvatar(
      currentUser.avatarUrl ||
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
    );
  }, [currentUser, lang]);

  function mapClassifiedRow(row) {
    return Object.assign({}, row, {
      imageUrl: row.image_url || row.imageUrl || null,
      authorId: row.resident_id || row.residentId || row.authorId || null,
      durationDays: row.duration_days || row.durationDays || 7,
      modifiedAt: row.modified_at || row.modifiedAt || null,
      status: row.status || row.status_id || "active",
      authorName:
        row.resident && row.resident.display_name
          ? row.resident.display_name
          : row.authorName || null,
      authorAvatarUrl:
        row.resident && row.resident.avatar_url
          ? row.resident.avatar_url
          : row.authorAvatarUrl || null,
      authorRole:
        row.resident && row.resident.role
          ? row.resident.role
          : row.authorRole || null,
      createdAt: row.created_at || row.createdAt || null
    });
  }

  function mapEventRow(row) {
    return Object.assign({}, row, {
      imageUrl: row.image_url || row.imageUrl || null,
      authorId: row.resident_id || row.residentId || row.authorId || null,
      durationDays: row.duration_days || row.durationDays || 7,
      modifiedAt: row.modified_at || row.modifiedAt || null,
      authorName:
        row.resident && row.resident.display_name
          ? row.resident.display_name
          : row.authorName || null,
      authorAvatarUrl:
        row.resident && row.resident.avatar_url
          ? row.resident.avatar_url
          : row.authorAvatarUrl || null,
      authorRole:
        row.resident && row.resident.role
          ? row.resident.role
          : row.authorRole || null,
      createdAt: row.created_at || row.createdAt || null
    });
  }

  function mapReportRow(row) {
    return Object.assign({}, row, {
      imageUrl: row.image_url || row.imageUrl || null,
      authorId: row.resident_id || row.residentId || row.authorId || null,
      durationDays: row.duration_days || row.durationDays || 7,
      modifiedAt: row.modified_at || row.modifiedAt || null,
      authorName:
        row.resident && row.resident.display_name
          ? row.resident.display_name
          : row.authorName || null,
      authorAvatarUrl:
        row.resident && row.resident.avatar_url
          ? row.resident.avatar_url
          : row.authorAvatarUrl || null,
      authorRole:
        row.resident && row.resident.role
          ? row.resident.role
          : row.authorRole || null,
      createdAt: row.created_at || row.createdAt || null
    });
  }

  function mapServiceRow(row) {
                return Object.assign({}, row, {
                  imageUrl: row.image_url || row.imageUrl || null,
      authorId: row.resident_id || row.residentId || row.authorId || null,
      durationDays: row.duration_days || row.durationDays || 7,
      modifiedAt: row.modified_at || row.modifiedAt || null,
                  authorName:
                    row.resident && row.resident.display_name
                      ? row.resident.display_name
                      : row.authorName || null,
                  authorAvatarUrl:
                    row.resident && row.resident.avatar_url
                      ? row.resident.avatar_url
                      : row.authorAvatarUrl || null,
                  authorRole:
                    row.resident && row.resident.role
                      ? row.resident.role
                      : row.authorRole || null,
                  createdAt: row.created_at || row.createdAt || null
                });
  }

  function mapPollRow(row) {
    return Object.assign({}, row, {
      endDate: row.end_date || row.endDate || null,
      options: Array.isArray(row.options) ? row.options : [],
      durationDays: row.duration_days || row.durationDays || 7,
      modifiedAt: row.modified_at || row.modifiedAt || null,
      createdAt: row.created_at || row.createdAt || null,
      authorId: row.resident_id || row.residentId || row.authorId || null
    });
  }

  function mapResidenceRow(row) {
    return {
      id: row.id,
      name: row.name || "",
      address: row.address || "",
      description: row.description || "",
      imageUrl: row.image_url || row.imageUrl || null,
      practicalInfo: Array.isArray(row.practical_info)
        ? row.practical_info
        : row.practical_info
        ? [row.practical_info]
        : [],
      lastUpdatedBy: row.last_updated_by || null,
      lastUpdatedAt: row.last_updated_at || row.updated_at || null,
      createdAt: row.created_at || null,
      status: row.status || "active"
    };
  }

  function getSupabaseErrorMessage(error, fallback) {
    if (error && error.message) return error.message;
    return fallback;
  }

  async function uploadPostImage(file, folder) {
    if (!file) return null;
    if (!supabase) {
      throw new Error(t(lang, "error_supabase_not_configured"));
    }
    const safeName = String(file.name || "image")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(0, 80);
    const ext = safeName.includes(".")
      ? safeName.split(".").pop()
      : "jpg";
    const filePath =
      folder +
      "/" +
      (currentUser && currentUser.id ? currentUser.id : "anon") +
      "/" +
      Date.now() +
      "-" +
      Math.random().toString(36).slice(2, 8) +
      "." +
      ext;
    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(filePath, file, { upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);
    return data && data.publicUrl ? data.publicUrl : null;
  }

  useEffect(() => {
    async function loadResidence() {
      try {
        setResidenceError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_residence_supabase_unavailable")
          );
        }
        const { data, error } = await supabase
          .from("residence")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (!data || data.length === 0) {
          throw new Error(t(lang, "error_residence_not_found"));
        }
        const items = data.map(mapResidenceRow);
        const activeItems = items.filter((item) => item.status === "active");
        setResidenceItems(activeItems);
        setResidence(activeItems[0] || null);
      } catch (e) {
        console.error(e);
        setResidenceError(t(lang, "error_residence_unavailable"));
      }
    }

    async function loadClassifieds() {
      try {
        setClassifiedsError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_classifieds_supabase_unavailable")
          );
        }
        const { data, error } = await supabase
          .from("classifieds")
          .select("*, resident:resident_id(display_name, avatar_url, role)");
        if (error) throw error;
        const items = Array.isArray(data) ? data.map(mapClassifiedRow) : [];
        setClassifieds(items);
      } catch (e) {
        console.error(e);
        setClassifiedsError(t(lang, "error_classifieds_unavailable"));
      }
    }

    async function loadShops() {
      try {
        setShopsError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_shops_supabase_unavailable")
          );
        }
          const { data, error } = await supabase.from("shops").select("*");
          if (error) throw error;
          const items = Array.isArray(data)
            ? data.map(function (row) {
                return Object.assign({}, row, {
                  imageUrl: row.image_url || row.imageUrl || null
                });
              })
            : [];
          setShops(items);
      } catch (e) {
        console.error(e);
        setShopsError(t(lang, "error_shops_unavailable"));
      }
    }

    async function loadEvents() {
      try {
        setEventsError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_events_supabase_unavailable")
          );
        }
          const { data, error } = await supabase
            .from("events")
          .select("*, resident:resident_id(display_name, avatar_url, role)");
          if (error) throw error;
        const items = Array.isArray(data) ? data.map(mapEventRow) : [];
          setEvents(items);
      } catch (e) {
        console.error(e);
        setEventsError(t(lang, "error_events_unavailable"));
      }
    }

    async function loadReports() {
      try {
        setReportsError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_reports_supabase_unavailable")
          );
        }
          const { data, error } = await supabase
            .from("reports")
          .select("*, resident:resident_id(display_name, avatar_url, role)");
          if (error) throw error;
        const items = Array.isArray(data) ? data.map(mapReportRow) : [];
          setReports(items);
      } catch (e) {
        console.error(e);
        setReportsError(t(lang, "error_reports_unavailable"));
      }
    }

    async function loadServices() {
      try {
        setServicesError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_services_supabase_unavailable")
          );
        }
          const { data, error } = await supabase
            .from("neighbor_services")
          .select("*, resident:resident_id(display_name, avatar_url, role)");
          if (error) throw error;
        const items = Array.isArray(data) ? data.map(mapServiceRow) : [];
          setServices(items);
      } catch (e) {
        console.error(e);
        setServicesError(t(lang, "error_services_unavailable"));
      }
    }

    async function loadPolls() {
      try {
        setPollsError(null);
        if (!supabase) {
          throw new Error(
            t(lang, "error_polls_supabase_unavailable")
          );
        }
        const { data, error } = await supabase.from("polls").select("*");
        if (error) throw error;
        const items = Array.isArray(data) ? data.map(mapPollRow) : [];
        setPolls(items);
      } catch (e) {
        console.error(e);
        setPollsError(t(lang, "error_polls_unavailable"));
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

  function getDurationDaysFromItem(item) {
    const raw =
      item &&
      (item.durationDays || item.duration_days || item.duration || null);
    const num = Number(raw);
    return Number.isFinite(num) && num > 0 ? num : 7;
  }

  function getPostBaseDate(item) {
    if (!item) return null;
    const raw =
      item.modifiedAt ||
      item.modified_at ||
      item.createdAt ||
      item.created_at ||
      null;
    if (!raw) return null;
    const date = new Date(raw);
    if (!date || Number.isNaN(date.getTime())) return null;
    return date;
  }

  function getRemainingMs(item) {
    const baseDate = getPostBaseDate(item);
    if (!baseDate) return null;
    const duration = getDurationDaysFromItem(item);
    const expiresAt = baseDate.getTime() + duration * 24 * 60 * 60 * 1000;
    return expiresAt - Date.now();
  }

  function isActivePost(item) {
    const remaining = getRemainingMs(item);
    if (remaining == null) return true;
    return remaining > 0;
  }

  async function handleCreateReport(payload) {
    if (!payload || !payload.title || !payload.description) return;
    const isEditing =
      editingPost &&
      editingPost.kind === "reports" &&
      editingPost.item &&
      editingPost.item.id != null;
    if (isEditing) {
      return handleUpdateReport(editingPost.item.id, payload);
    }
    try {
      setCreatingReport(true);
      setReportsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_report_create_supabase")
        );
      }
      const insertPayload = {
        title: payload.title,
        category: payload.category || "",
        description: payload.description,
        image_url: payload.imageUrl || null,
        status: "ouvert",
        duration_days: payload.durationDays || 7,
        resident_id: currentUser ? currentUser.id : null
      };
      if (payload.imageFile) {
        insertPayload.image_url = await uploadPostImage(
          payload.imageFile,
          "reports"
        );
      }
      const { data, error } = await supabase
        .from("reports")
        .insert(insertPayload)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const created = data ? mapReportRow(data) : null;
      if (created) {
      setReports((prev) => [created, ...(prev || [])]);
      }
    } catch (e) {
      console.error(e);
      setReportsError(
        e && e.message ? e.message : t(lang, "error_report_create")
      );
    } finally {
      setCreatingReport(false);
    }
  }

  async function handleCreateService(payload) {
    if (!payload || !payload.title || !payload.description) return;
    const isEditing =
      editingPost &&
      editingPost.kind === "services" &&
      editingPost.item &&
      editingPost.item.id != null;
    if (isEditing) {
      return handleUpdateService(editingPost.item.id, payload);
    }
    try {
      setCreatingService(true);
      setServicesError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_service_create_supabase")
        );
      }
      const insertPayload = {
        title: payload.title,
        kind: payload.kind || "offre",
        description: payload.description,
        duration_days: payload.durationDays || 7,
        resident_id: currentUser ? currentUser.id : null
      };
      if (payload.imageFile) {
        insertPayload.image_url = await uploadPostImage(
          payload.imageFile,
          "services"
        );
      }
      const { data, error } = await supabase
        .from("neighbor_services")
        .insert(insertPayload)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const created = data ? mapServiceRow(data) : null;
      if (created) {
      setServices((prev) => [created, ...(prev || [])]);
      }
    } catch (e) {
      console.error(e);
      setServicesError(
        e && e.message ? e.message : t(lang, "error_service_create")
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
        throw new Error(t(lang, "error_members_load"));
      }
      const data = await res.json();
      setMembers(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      console.error(e);
      setMembersError(
        e && e.message ? e.message : t(lang, "error_members_load")
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
            t(lang, "error_member_role_update_forbidden")
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
          : t(lang, "error_member_role_update")
      );
    }
  }

  async function handleDeleteMember(id) {
    if (!window.confirm(t(lang, "confirm_member_delete"))) return;
    try {
      const res = await fetch("/api/members/" + id, {
        method: "DELETE"
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          (errData && errData.error) ||
            t(lang, "error_member_delete")
        );
      }
      await res.json();
      setMembers((prev) => (prev || []).filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
      setMembersError(
        e && e.message ? e.message : t(lang, "error_member_delete_generic")
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
    const isEditing =
      editingPost &&
      editingPost.kind === "polls" &&
      editingPost.item &&
      editingPost.item.id != null;
    if (isEditing) {
      return handleUpdatePoll(editingPost.item.id, payload);
    }
    try {
      setCreatingPoll(true);
      setPollsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_poll_create_supabase")
        );
      }
      const cleanedOptions = (payload.options || []).map((opt) => ({
        id: opt.id,
        label: opt.label,
        votes: 0
      }));
      const insertPayload = {
        title: payload.title,
        description: payload.description || "",
        end_date: payload.endDate,
        options: cleanedOptions,
        duration_days: payload.durationDays || 7,
        resident_id: currentUser ? currentUser.id : null
      };
      const { data, error } = await supabase
        .from("polls")
        .insert(insertPayload)
        .select("*")
        .single();
      if (error) throw error;
      const created = data ? mapPollRow(data) : null;
      if (created) {
      setPolls((prev) => [created, ...(prev || [])]);
      }
      setShowPollModal(false);
    } catch (e) {
      console.error(e);
      setPollsError(
        e && e.message ? e.message : t(lang, "error_poll_create")
      );
    } finally {
      setCreatingPoll(false);
    }
  }

  async function handleVotePoll(pollId, optionId) {
    if (!pollId || !optionId) return;
    try {
      if (!supabase) {
        throw new Error(
          t(lang, "error_poll_vote_supabase")
        );
      }
      let votesByPoll = {};
      try {
        votesByPoll = JSON.parse(
          window.localStorage.getItem("pollVotesByResident") || "{}"
        );
      } catch (e) {
        votesByPoll = {};
      }
      if (votesByPoll[pollId]) {
        throw new Error(t(lang, "error_poll_already_voted"));
      }
      const poll = (polls || []).find((p) => p.id === pollId);
      if (!poll) {
        throw new Error(t(lang, "error_poll_not_found"));
      }
      const updatedOptions = (poll.options || []).map((opt) => {
        if (Number(opt.id) !== Number(optionId)) return opt;
        return Object.assign({}, opt, { votes: (opt.votes || 0) + 1 });
      });
      const { data, error } = await supabase
        .from("polls")
        .update({ options: updatedOptions })
        .eq("id", pollId)
        .select("*")
        .single();
      if (error) throw error;
      const updated = data ? mapPollRow(data) : null;
      if (updated) {
      setPolls((prev) =>
        (prev || []).map((p) => (p.id === updated.id ? updated : p))
        );
      }
      votesByPoll[pollId] = optionId;
      window.localStorage.setItem(
        "pollVotesByResident",
        JSON.stringify(votesByPoll)
      );
    } catch (e) {
      console.error(e);
      setPollsError(
        e && e.message
          ? e.message
          : t(lang, "error_poll_vote")
      );
    }
  }

  async function handleCreateEvent(payload) {
    if (!payload || !payload.title || !payload.date || !payload.description) {
      return;
    }
    const isEditing =
      editingPost &&
      editingPost.kind === "events" &&
      editingPost.item &&
      editingPost.item.id != null;
    if (isEditing) {
      return handleUpdateEvent(editingPost.item.id, payload);
    }
    try {
      setCreatingEvent(true);
      setEventsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_event_create_supabase")
        );
      }
      const insertPayload = {
        title: payload.title,
        date: payload.date,
        time: payload.time || null,
        location: payload.location || null,
        description: payload.description || "",
        duration_days: payload.durationDays || 7,
        resident_id: currentUser ? currentUser.id : null
      };
      if (payload.imageFile) {
        insertPayload.image_url = await uploadPostImage(
          payload.imageFile,
          "events"
        );
      }
      const { data, error } = await supabase
        .from("events")
        .insert(insertPayload)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const created = data ? mapEventRow(data) : null;
      if (created) {
      setEvents((prev) => [created, ...(prev || [])]);
      }
      setShowEventModal(false);
    } catch (e) {
      console.error(e);
      setEventsError(
        e && e.message ? e.message : t(lang, "error_event_create")
      );
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleCreateClassified(e) {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      alert(t(lang, "form_error_title_desc_required"));
      return;
    }
    const isEditing =
      editingPost &&
      editingPost.kind === "classifieds" &&
      editingPost.item &&
      editingPost.item.id != null;
    if (isEditing) {
      return handleUpdateClassified(editingPost.item.id);
    }
    try {
      setCreating(true);
      setClassifiedsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_classified_create_supabase")
        );
      }
      const insertPayload = {
          type: formType,
          title: formTitle,
          description: formDescription,
        price:
          formPrice != null && !Number.isNaN(Number(formPrice))
            ? Number(formPrice)
            : null,
        currency: "PLN",
        duration_days: formDurationDays || 7,
        resident_id: currentUser ? currentUser.id : null
      };
      if (formImageFile) {
        insertPayload.image_url = await uploadPostImage(
          formImageFile,
          "classifieds"
        );
      }
      const { data, error } = await supabase
        .from("classifieds")
        .insert(insertPayload)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const created = data ? mapClassifiedRow(data) : null;
      if (created) {
      setClassifieds((prev) => [created, ...prev]);
      }
      setFormTitle("");
      setFormDescription("");
      setFormPrice("");
      setFormDurationDays(7);
      setFormImageFile(null);
    } catch (err) {
      console.error(err);
      setClassifiedsError(
        err && err.message ? err.message : t(lang, "error_classified_create")
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleUpdateClassified(id) {
    try {
      setCreating(true);
      setClassifiedsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_classified_update_supabase")
        );
      }
      const updatePayload = {
        type: formType,
        title: formTitle,
        description: formDescription,
        price:
          formPrice != null && !Number.isNaN(Number(formPrice))
            ? Number(formPrice)
            : null,
        duration_days: formDurationDays || 7,
        modified_at: new Date().toISOString()
      };
      if (formImageFile) {
        updatePayload.image_url = await uploadPostImage(
          formImageFile,
          "classifieds"
        );
      }
      const { data, error } = await supabase
        .from("classifieds")
        .update(updatePayload)
        .eq("id", id)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const updated = data ? mapClassifiedRow(data) : null;
      if (updated) {
        setClassifieds((prev) =>
          (prev || []).map((item) => (item.id === updated.id ? updated : item))
        );
      }
      setEditingPost(null);
      setShowClassifiedsModal(false);
      setFormTitle("");
      setFormDescription("");
      setFormPrice("");
      setFormDurationDays(7);
      setFormImageFile(null);
    } catch (err) {
      console.error(err);
      setClassifiedsError(
        err && err.message ? err.message : t(lang, "error_classified_update")
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleSaveResidence(payload) {
    try {
      setSavingResidence(true);
      setResidenceError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_residence_save_supabase")
        );
      }
      const safePayload = {
        name: payload.name || "",
        address: payload.address || "",
        description: payload.description || "",
        practical_info: Array.isArray(payload.practicalInfo)
          ? payload.practicalInfo
          : [],
        last_updated_by: currentUser ? currentUser.name || null : null,
        last_updated_at: new Date().toISOString(),
        status: "active"
      };
      if (payload.imageFile) {
        safePayload.image_url = await uploadPostImage(
          payload.imageFile,
          "residence"
        );
      }
      const { data, error } = await supabase
        .from("residence")
        .insert(safePayload)
        .select("*")
        .single();
      if (error) throw error;
      if (data) {
        const created = mapResidenceRow(data);
        setResidenceItems((prev) => [created, ...(prev || [])]);
        setResidence(created);
      }
    } catch (e) {
      console.error(e);
      setResidenceError(
        e && e.message ? e.message : t(lang, "error_residence_save")
      );
    } finally {
      setSavingResidence(false);
    }
  }

  async function handleDeleteResidence(item) {
    if (!item || !item.id) return;
    if (!window.confirm(t(lang, "confirm_residence_delete"))) return;
    try {
      setResidenceError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_residence_delete_supabase")
        );
      }
      const { error } = await supabase
        .from("residence")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      setResidenceItems((prev) => (prev || []).filter((r) => r.id !== item.id));
      setResidence((prev) => (prev && prev.id === item.id ? null : prev));
    } catch (e) {
      console.error(e);
      setResidenceError(
        e && e.message ? e.message : t(lang, "error_residence_delete")
      );
    }
  }

  function handleChangeClassifiedField(field, value) {
    if (field === "type") setFormType(value);
    else if (field === "title") setFormTitle(value);
    else if (field === "description") setFormDescription(value);
    else if (field === "price") setFormPrice(value);
    else if (field === "durationDays") setFormDurationDays(value);
    else if (field === "imageFile") setFormImageFile(value || null);
  }

  function getPostId(item) {
    return item && item.id != null ? item.id : null;
  }

  async function handleUpdateEvent(id, payload) {
    try {
      setCreatingEvent(true);
      setEventsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_event_update_supabase")
        );
      }
      const updatePayload = {
        title: payload.title,
        date: payload.date,
        time: payload.time || null,
        location: payload.location || null,
        description: payload.description || "",
        duration_days: payload.durationDays || 7,
        modified_at: new Date().toISOString()
      };
      if (payload.imageFile) {
        updatePayload.image_url = await uploadPostImage(
          payload.imageFile,
          "events"
        );
      }
      const { data, error } = await supabase
        .from("events")
        .update(updatePayload)
        .eq("id", id)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const updated = data ? mapEventRow(data) : null;
      if (updated) {
        setEvents((prev) =>
          (prev || []).map((item) => (item.id === updated.id ? updated : item))
        );
      }
      setEditingPost(null);
      setShowEventModal(false);
    } catch (e) {
      console.error(e);
      setEventsError(
        e && e.message ? e.message : t(lang, "error_event_update")
      );
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleUpdateReport(id, payload) {
    try {
      setCreatingReport(true);
      setReportsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_report_update_supabase")
        );
      }
      const updatePayload = {
        title: payload.title,
        category: payload.category || "",
        description: payload.description || "",
        duration_days: payload.durationDays || 7,
        modified_at: new Date().toISOString()
      };
      if (payload.imageFile) {
        updatePayload.image_url = await uploadPostImage(
          payload.imageFile,
          "reports"
        );
      }
      const { data, error } = await supabase
        .from("reports")
        .update(updatePayload)
        .eq("id", id)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const updated = data ? mapReportRow(data) : null;
      if (updated) {
        setReports((prev) =>
          (prev || []).map((item) => (item.id === updated.id ? updated : item))
        );
      }
      setEditingPost(null);
      setShowReportModal(false);
    } catch (e) {
      console.error(e);
      setReportsError(
        e && e.message ? e.message : t(lang, "error_report_update")
      );
    } finally {
      setCreatingReport(false);
    }
  }

  async function handleUpdateService(id, payload) {
    try {
      setCreatingService(true);
      setServicesError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_service_update_supabase")
        );
      }
      const updatePayload = {
        title: payload.title,
        kind: payload.kind || "offre",
        description: payload.description || "",
        duration_days: payload.durationDays || 7,
        modified_at: new Date().toISOString()
      };
      if (payload.imageFile) {
        updatePayload.image_url = await uploadPostImage(
          payload.imageFile,
          "services"
        );
      }
      const { data, error } = await supabase
        .from("neighbor_services")
        .update(updatePayload)
        .eq("id", id)
        .select("*, resident:resident_id(display_name, avatar_url, role)")
        .single();
      if (error) throw error;
      const updated = data ? mapServiceRow(data) : null;
      if (updated) {
        setServices((prev) =>
          (prev || []).map((item) => (item.id === updated.id ? updated : item))
        );
      }
      setEditingPost(null);
      setShowServiceModal(false);
    } catch (e) {
      console.error(e);
      setServicesError(
        e && e.message ? e.message : t(lang, "error_service_update")
      );
    } finally {
      setCreatingService(false);
    }
  }

  async function handleUpdatePoll(id, payload) {
    try {
      setCreatingPoll(true);
      setPollsError(null);
      if (!supabase) {
        throw new Error(
          t(lang, "error_poll_update_supabase")
        );
      }
      const updatedOptions = (payload.options || []).map((opt, idx) => ({
        id: idx + 1,
        label: opt.label,
        votes:
          (editingPost &&
            editingPost.item &&
            Array.isArray(editingPost.item.options) &&
            editingPost.item.options[idx] &&
            editingPost.item.options[idx].votes) ||
          0
      }));
      const updatePayload = {
        title: payload.title,
        description: payload.description || "",
        end_date: payload.endDate || null,
        options: updatedOptions,
        duration_days: payload.durationDays || 7,
        modified_at: new Date().toISOString()
      };
      const { data, error } = await supabase
        .from("polls")
        .update(updatePayload)
        .eq("id", id)
        .select("*")
        .single();
      if (error) throw error;
      const updated = data ? mapPollRow(data) : null;
      if (updated) {
        setPolls((prev) =>
          (prev || []).map((item) => (item.id === updated.id ? updated : item))
        );
      }
      setEditingPost(null);
      setShowPollModal(false);
    } catch (e) {
      console.error(e);
      setPollsError(
        e && e.message ? e.message : t(lang, "error_poll_update")
      );
    } finally {
      setCreatingPoll(false);
    }
  }

  async function handleDeleteMyPost(kind, item) {
    const id = getPostId(item);
    if (!id) return;
    if (!window.confirm(t(lang, "confirm_post_delete"))) return;
    try {
      if (!supabase) {
        throw new Error(
          t(lang, "error_delete_supabase")
        );
      }
      const tableByKind = {
        classifieds: "classifieds",
        events: "events",
        reports: "reports",
        services: "neighbor_services",
        polls: "polls"
      };
      const table = tableByKind[kind];
      if (!table) return;
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      if (kind === "classifieds") {
        setClassifieds((prev) => (prev || []).filter((p) => p.id !== id));
      } else if (kind === "events") {
        setEvents((prev) => (prev || []).filter((p) => p.id !== id));
      } else if (kind === "reports") {
        setReports((prev) => (prev || []).filter((p) => p.id !== id));
      } else if (kind === "services") {
        setServices((prev) => (prev || []).filter((p) => p.id !== id));
      } else if (kind === "polls") {
        setPolls((prev) => (prev || []).filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
      const msg =
        e && e.message
          ? e.message
          : t(lang, "error_delete_generic");
      if (kind === "classifieds") setClassifiedsError(msg);
      else if (kind === "events") setEventsError(msg);
      else if (kind === "reports") setReportsError(msg);
      else if (kind === "services") setServicesError(msg);
      else if (kind === "polls") setPollsError(msg);
    }
  }

  function handleEditMyPost(kind, item) {
    if (!item) return;
    setEditingPost({ kind, item });
    if (kind === "classifieds") {
      setFormType(item.type || "objet");
      setFormTitle(item.title || "");
      setFormDescription(item.description || "");
      setFormPrice(item.price != null ? item.price : "");
      setFormDurationDays(getDurationDaysFromItem(item));
      setShowClassifiedsModal(true);
    } else if (kind === "events") {
      setShowEventModal(true);
    } else if (kind === "reports") {
      setShowReportModal(true);
    } else if (kind === "services") {
      setShowServiceModal(true);
    } else if (kind === "polls") {
      setShowPollModal(true);
    }
  }

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
            t(lang, "error_temp_access_unavailable");
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
        name: t(lang, "demo_user_name"),
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
          : t(lang, "error_temp_access_unavailable")
      );
    }
  }

  async function handleSupabaseFacebookLogin() {
    if (!supabase) {
      setAuthError(
        t(lang, "error_supabase_not_initialized")
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
          : t(lang, "error_fb_login_start")
      );
    }
  }

  async function handleProfileUrlLogin(facebookProfileUrl) {
    const url = (facebookProfileUrl || "").trim();
    if (!url) {
      alert(t(lang, "alert_fb_profile_url_missing"));
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
            t(lang, "error_fb_profile_check")
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
          : t(lang, "error_fb_profile_check")
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
      t(lang, "auth_loading_session")
    );
  }

  if (!currentUser) {
    if (showOnboarding) {
      return e(OnboardingStep, {
        currentUser: null,
        initialFacebookProfileUrl: pendingProfileUrl,
        lang,
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
        e(LangSwitcher, {
          lang,
          onChange: setLang
        })
      ),
      e(
        "div",
        { className: "public-home" },
        e(ResidenceHero, {
          residence,
          residenceError,
          classifieds,
          authError,
          lang,
          onFacebookLogin: handleSupabaseFacebookLogin
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
          e("h2", null, t(lang, "blocked_title")),
          e(
            "p",
            null,
            t(lang, "blocked_body")
          )
        )
      )
    );
  }

  if (currentUser.status === "pending" && !currentUser.facebookProfileUrl) {
    return e(OnboardingStep, {
      currentUser,
      initialFacebookProfileUrl: currentUser.facebookProfileUrl,
      lang,
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
          e("h2", null, t(lang, "pending_title")),
          e(
            "p",
            null,
            t(lang, "pending_body")
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
              t(lang, "pending_back_home")
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

  // Quand on est dans la navigation admin (membres / à valider / stats),
  // on n'affiche pas la colonne de droite (bus, météo, etc.).
  const showRightColumn = !(isStaff && showAdminNav);

  function getItemAuthorId(item) {
    if (!item) return null;
    return (
      item.authorId ||
      item.author_id ||
      item.resident_id ||
      item.residentId ||
      null
    );
  }

  function isMyPost(item) {
    if (!currentUser || !currentUser.id) return false;
    const authorId = getItemAuthorId(item);
    if (!authorId) return false;
    return String(authorId) === String(currentUser.id);
  }

  const myPosts = {
    classifieds: (classifieds || []).filter(isMyPost).filter(isActivePost),
    events: (events || []).filter(isMyPost).filter(isActivePost),
    reports: (reports || []).filter(isMyPost).filter(isActivePost),
    services: (services || []).filter(isMyPost).filter(isActivePost),
    polls: (polls || []).filter(isMyPost).filter(isActivePost)
  };

  const visibleClassifieds = (classifieds || []).filter((item) => {
    if (!item || item.status !== "pending") return true;
    return isMyPost(item);
  });

  const editingKind = editingPost && editingPost.kind;
  const editingItem = editingPost && editingPost.item;

  let leftContent;
  if (effectiveAdminView !== "dashboard") {
    leftContent =
      effectiveAdminView === "members"
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
            onCountChange: setPendingRequestsCount,
            lang
          })
        )
      : e(
          "div",
          { className: "page-sections" },
          e(StatsOverview, {
            polls,
            members,
            classifieds,
            lang
          })
        );
  } else {
    // Vue dashboard : on bascule en fonction de mainPage (home / about / feedback)
    if (mainPage === "myPosts") {
      leftContent = e(
        "div",
        { className: "page-sections" },
        e(MyPostsSection, {
          lang,
          classifieds: myPosts.classifieds,
          events: myPosts.events,
          reports: myPosts.reports,
          services: myPosts.services,
          polls: myPosts.polls,
          onEdit: handleEditMyPost,
          onDelete: handleDeleteMyPost
        })
      );
    } else if (mainPage === "about") {
      leftContent = e(
        "div",
        { className: "page-sections" },
        e(AboutSiteSection, { lang })
      );
    } else if (mainPage === "feedback") {
      leftContent = e(
        "div",
        { className: "page-sections" },
        e(CommunicationSection, {
          lang,
          residentId,
          profileName,
          profileAvatar
        })
      );
    } else {
      leftContent = e(
        "div",
        { className: "page-sections" },
        e(SectionsQuickNav, { lang }),
        e(ResidencePostsSection, {
          items: residenceItems,
          error: residenceError,
          lang,
          isAdmin: role === "admin" || role === "super_admin",
          onDelete: handleDeleteResidence,
          onOpenForm: () => setShowResidenceForm(true),
          onSelect: (item) => {
            setSelectedResidencePost(item);
            setShowResidencePostModal(true);
          }
        }),
        e(ClassifiedsNeighbors, {
          classifieds: visibleClassifieds,
          classifiedsError,
          onOpenForm: () => {
            setEditingPost(null);
            setFormType("objet");
            setFormDurationDays(7);
            setShowClassifiedsModal(true);
          },
          onSelect: (item) => {
            setSelectedAnnouncement(item);
            setShowAnnouncementModal(true);
          },
          lang
        }),
        e(EventsSection, {
          events,
          eventsError,
          onOpenForm: () => {
            setEditingPost(null);
            setShowEventModal(true);
          },
          onSelect: (item) => {
            setSelectedEventPost(item);
            setShowEventPostModal(true);
          },
          lang
        }),
        e(NeighborServicesSection, {
          services,
          servicesError,
          onOpenForm: () => {
            setEditingPost(null);
            setShowServiceModal(true);
          },
          onSelect: (item) => {
            setSelectedServicePost(item);
            setShowServicePostModal(true);
          },
          lang
        }),
        e(ReportsSection, {
          reports,
          reportsError,
          onOpenForm: () => {
            setEditingPost(null);
            setShowReportModal(true);
          },
          onSelect: (item) => {
            setSelectedReportPost(item);
            setShowReportPostModal(true);
          },
          lang
        }),
        e(PollsSection, {
          polls,
          pollsError,
          onOpenForm: () => {
            setEditingPost(null);
            setShowPollModal(true);
          },
          onVote: handleVotePoll,
          onSelect: (item) => {
            setSelectedPollPost(item);
            setShowPollPostModal(true);
          },
          lang
        })
      );
    }
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
            t(lang, "dashboard_hero_title")
          ),
          e(
            "div",
            { className: "dashboard-hero-subtitle" },
            t(lang, "dashboard_hero_subtitle")
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
                t(
                      lang,
                  showAdminNav ? "admin_hero_btn_close" : "admin_hero_btn_open"
                    )
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
            t(lang, "dashboard_back_home")
          ),
          e(LangSwitcher, {
            lang,
            onChange: setLang,
            variant: "hero"
          })
        )
      ),
      e(MainMenu, {
        current: mainPage,
        onChange: setMainPage,
        lang
      }),
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
        showRightColumn &&
          e(
            "div",
            { className: "dashboard-main-right" },
            e(ProfileBar, {
              name: profileName,
              avatarUrl: profileAvatar,
              lang,
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
      formDurationDays,
      onChangeField: handleChangeClassifiedField,
      onSubmit: handleCreateClassified,
      isEditing: editingKind === "classifieds",
      lang,
      onClose: () => {
        setShowClassifiedsModal(false);
        if (editingKind === "classifieds") setEditingPost(null);
      }
    }),
    e(EventModal, {
      open: showEventModal,
      creating: creatingEvent,
      onSubmit: handleCreateEvent,
      initialValues: editingKind === "events" ? editingItem : null,
      isEditing: editingKind === "events",
      lang,
      onClose: () => {
        setShowEventModal(false);
        if (editingKind === "events") setEditingPost(null);
      }
    }),
    e(ReportModal, {
      open: showReportModal,
      creating: creatingReport,
      onSubmit: handleCreateReport,
      initialValues: editingKind === "reports" ? editingItem : null,
      isEditing: editingKind === "reports",
      lang,
      onClose: () => {
        setShowReportModal(false);
        if (editingKind === "reports") setEditingPost(null);
      }
    }),
    e(NeighborServiceModal, {
      open: showServiceModal,
      creating: creatingService,
      onSubmit: handleCreateService,
      initialValues: editingKind === "services" ? editingItem : null,
      isEditing: editingKind === "services",
      lang,
      onClose: () => {
        setShowServiceModal(false);
        if (editingKind === "services") setEditingPost(null);
      }
    }),
    e(ShopModal, {
      open: showShopModal,
      shop: selectedShop,
      lang,
      onClose: () => {
        setShowShopModal(false);
        setSelectedShop(null);
      }
    }),
    e(ResidenceModal, {
      open:
        showResidenceForm &&
        (role === "admin" || role === "super_admin"),
      saving: savingResidence,
      error: residenceError,
      onSubmit: handleSaveResidence,
      onClose: () => setShowResidenceForm(false),
      lang
    }),
    e(ResidencePostModal, {
      open: showResidencePostModal,
      item: selectedResidencePost,
      lang,
      onClose: () => {
        setShowResidencePostModal(false);
        setSelectedResidencePost(null);
      }
    }),
    e(ServicePostModal, {
      open: showServicePostModal,
      item: selectedServicePost,
      lang,
      onClose: () => {
        setShowServicePostModal(false);
        setSelectedServicePost(null);
      }
    }),
    e(ReportPostModal, {
      open: showReportPostModal,
      item: selectedReportPost,
      lang,
      onClose: () => {
        setShowReportPostModal(false);
        setSelectedReportPost(null);
      }
    }),
    e(EventPostModal, {
      open: showEventPostModal,
      item: selectedEventPost,
      lang,
      onClose: () => {
        setShowEventPostModal(false);
        setSelectedEventPost(null);
      }
    }),
    e(PollPostModal, {
      open: showPollPostModal,
      item: selectedPollPost,
      lang,
      onClose: () => {
        setShowPollPostModal(false);
        setSelectedPollPost(null);
      }
    }),
    e(AddMemberModal, {
      open: showAddMemberModal,
      creating: creatingMember,
      lang,
      onSubmit: async ({ email, role: roleForNew }) => {
        const emailTrimmed = (email || "").trim();
        if (!emailTrimmed) {
          alert(t(lang, "error_member_email_missing"));
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
              (errData && errData.error) || t(lang, "error_member_create")
            );
          }
          const created = await res.json();
          setMembers((prev) => [...(prev || []), created]);
          setShowAddMemberModal(false);
        } catch (e) {
          console.error(e);
          setMembersError(
            e && e.message ? e.message : t(lang, "error_member_create_generic")
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
      initialValues: editingKind === "polls" ? editingItem : null,
      isEditing: editingKind === "polls",
      lang,
      onClose: () => {
        setShowPollModal(false);
        if (editingKind === "polls") setEditingPost(null);
      }
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

