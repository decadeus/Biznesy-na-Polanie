## App résidence – Ligne 32

Mini‑app locale de démonstration pour une résidence (Mały Kack, Gdynia).  
Elle affiche les horaires de bus, la météo et plusieurs sections de vie de quartier (annonces, événements, sondages, signalements, petits services…).

---

### Démarrage rapide

1. Installer les dépendances :

```bash
npm install
```

2. Créer un fichier `.env` à la racine du projet avec **vos propres valeurs** (clés, URLs, codes d’accès, etc.).  
   Ce fichier n’est **pas** commité et doit rester privé.

3. Lancer le serveur de développement :

```bash
npm start
```

L’application est alors disponible sur `http://localhost:3001`.

---

### Stack technique

- **Backend** : Node.js + Express (API bus/météo/annonces, sessions en mémoire pour le prototype).
- **Frontend** : React sans build (scripts inclus dans `index.html`).
- **Base de données** : intégration possible avec Supabase (authentification et table `residents`) pour un usage local.

Ce dépôt est destiné au **prototypage** et à l’expérimentation en local.  
Avant tout déploiement public, il faudra renforcer la sécurité, la gestion des secrets et la persistance des données.

