## Petite app React – Ligne 32 (Mały Kack Strzelców 01)

Cette mini‑app affiche **les 2 prochains départs** de la **ligne 32** à l'arrêt **Mały Kack Strzelców 01** dans un petit cadre pensé pour ton iPhone.

Elle est écrite en **React** mais ne nécessite **aucun build** ni installation de Node pour simplement l'utiliser.

---

### Comment tester sur ton iPhone

1. Sur ton Mac, ouvre le fichier `index.html` dans un navigateur (Safari par exemple) pour vérifier que tout s'affiche bien.
2. Pour l'avoir sur ton iPhone, tu as plusieurs options :
   - héberger le dossier (par exemple avec un petit serveur local ou un hébergement statique type Netlify / GitHub Pages),
   - ou ouvrir directement le fichier via un partage (AirDrop + ouvrir dans Safari).
3. Sur ton iPhone, ouvre la page dans **Safari**, puis :
   - appuie sur le bouton **Partager**,
   - choisis **« Ajouter à l'écran d'accueil »**.

Tu auras alors une “icône d'app” qui ouvre directement ce petit écran.

---

### Où mettre les vrais horaires

Dans `index.html`, cherche la partie marquée :

```js
const WEEKDAY_DEPARTURES = [
  // Exemple : "05:10", "05:30", "05:50", ...
];

const WEEKEND_DEPARTURES = [
  // ...
];
```

Remplace les valeurs d'exemple par **les vrais horaires de la ligne 32** pour l'arrêt **Mały Kack Strzelców 01** tels qu'ils apparaissent sur la page `https://zkmgdynia.pl/linie/32`.

Format attendu : **"HH:MM" en 24h**, par exemple `"07:05"`, `"13:40"`, etc.

L'app calcule automatiquement, en fonction de l'heure actuelle, **les 2 prochains départs** (et met à jour toutes les 30 secondes).

---

### Limitation importante

La page officielle `https://zkmgdynia.pl/linie/32` ne fournit pas d'API publique simple avec CORS pour récupérer automatiquement les horaires depuis le navigateur.

Pour rester simple (et utilisable uniquement pour toi), cette app :

- **ne scrape pas le site en direct**,
- mais repose sur **une liste d'horaires que tu renseignes une fois** dans le code.

Si tu veux aller plus loin (par exemple un petit backend Node qui va lire automatiquement les données du site et renvoyer juste les 2 prochains départs au frontend React), on peut aussi mettre ça en place ensuite.

