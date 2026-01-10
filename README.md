## Petite app résidence – Ligne 32 (Mały Kack Strzelców 01)

Cette mini‑app affiche les horaires de bus, la météo et différentes sections de vie de résidence (annonces, sondages, signalements…) via une interface React sans build.

---

### Démarrer le backend local

1. Installer les dépendances Node (une seule fois) :

```bash
npm install
```

2. Créer un fichier `.env` à la racine avec par exemple :

```bash
GROUP_ACCESS_CODE=0000
SUPABASE_URL=https://inekvpbycchoflnotgcr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=VOTRE_CLE_SERVICE_ROLE_ICI
```

3. Lancer le serveur Express :

```bash
npm start
```

Le serveur écoute par défaut sur `http://localhost:3001` et sert `index.html` + les APIs (bus, météo, annonces, auth…).

---

### Flux d’authentification Facebook

- L’accueil publique affiche un bouton **« Se connecter avec Facebook »**.
- Clic → redirection vers le **Facebook Login** (`/auth/facebook`), puis retour sur `http://localhost:3001/auth/facebook/callback`.
- Au retour :
  - si l’utilisateur est **nouveau** : un compte local est créé avec `status="pending"` et l’app affiche l’écran **Première connexion** (composant `OnboardingStep`),
  - si l’utilisateur existe déjà :
    - `status="active"` → accès direct à la page connectée,
    - `status="pending"` avec `facebookProfileUrl` renseigné → écran “En attente de validation modérateur”,
    - `status="blocked"` → écran “Compte bloqué”.

La session est stockée sous forme de cookie `sessionToken` géré en mémoire côté serveur (prototype local).

---

### Première connexion / code d’accès groupe

- Lors de la **première connexion** (nouvel utilisateur Facebook), l’app affiche le composant `OnboardingStep` qui demande :
  - le **code d’accès** partagé uniquement dans le groupe Facebook de la résidence,
  - l’**URL du profil Facebook** de la personne.
- Ces informations sont envoyées à `POST /api/onboarding/complete`.
- Si le code = `GROUP_ACCESS_CODE`, le compte reste `status="pending"` mais est marqué avec `facebookProfileUrl`, et l’utilisateur voit un message “En attente de validation modérateur”.

---

### Interface modérateurs – validation des comptes

- Les utilisateurs avec `role="moderator"` ou `role="admin"` voient, dans la navigation admin, l’onglet **« Validations comptes »**.
- Cet onglet affiche le composant `AdminPendingUsers` qui consomme :
  - `GET /api/admin/pending-users` pour la liste des comptes `status="pending"`,
  - `POST /api/admin/users/:id/approve` pour activer un compte,
  - `POST /api/admin/users/:id/reject` pour le bloquer.
- Chaque carte affiche :
  - la photo de profil,
  - le nom,
  - la date de demande,
  - un lien **« Voir le profil Facebook »** (nouvel onglet),
  - deux boutons **Accepter / Refuser** qui mettent à jour la liste sans rechargement.

---

### Intégration avec le reste de l’app

- Le frontend interroge `GET /api/me` au montage de `App` pour savoir si quelqu’un est connecté et dans quel état :
  - `authenticated=false` → page d’accueil publique + bouton “Se connecter avec Facebook”,
  - `status="pending"` + pas de `facebookProfileUrl` → écran de première connexion (code groupe),
  - `status="pending"` + `facebookProfileUrl` renseigné → écran d’attente modérateur,
  - `status="blocked"` → message de compte bloqué,
  - `status="active"` → accès complet à la page connectée existante (widgets, annonces, etc.).
- La barre de profil (`ProfileBar`) utilise par défaut `currentUser.name` et `currentUser.avatarUrl` provenant de Facebook, avec la possibilité de personnaliser ensuite un surnom / avatar local (persisté en `localStorage`).

Les autres endpoints existants (bus, météo, annonces, événements, sondages, signalements…) restent inchangés et continuent de fonctionner comme avant.

