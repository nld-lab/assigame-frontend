# Assigame — Frontend

Interface web de **Assigame**, une marketplace locale de mise en relation entre acheteurs et vendeurs. Les clients parcourent le catalogue sans compte et contactent les vendeurs directement par **WhatsApp** ou **email**. Seuls les **vendeurs** et **administrateurs** disposent d’un espace connecté.

Ce dépôt contient le frontend React. L’API REST est fournie par le backend Spring Boot du projet [`assigame`](../assigame) (sibling repo).

---

## Fonctionnalités

### Partie publique
- Page d’accueil (hero carousel, catégories, nouveaux produits)
- Catalogue produits avec recherche et filtre par catégorie (`/produits`)
- Fiche produit avec contact vendeur (`/produits/:id`)
- Thème clair / sombre

### Espace vendeur (`/dashboard`)
- Tableau de bord (statistiques, courbe hebdomadaire, aperçu des annonces)
- CRUD de ses produits (publication multipart avec image)
- Gestion du profil

### Espace administrateur (`/admin`)
- Tableau de bord (KPI, évolution des produits, aperçu récent)
- Gestion des utilisateurs (vendeurs / admins)
- Modération de toutes les annonces
- Gestion des catégories (CRUD + image)
- Profil administrateur

### Authentification
- Inscription vendeur (formulaire multi-étapes)
- Connexion JWT avec persistance de session
- Routes protégées par rôle (`VENDEUR`, `ADMIN`)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | React Router 7 |
| UI | Tailwind CSS v4, shadcn/ui, Radix UI |
| Formulaires | React Hook Form + Zod |
| HTTP | Axios |
| Graphiques | Recharts |
| Notifications | Sonner |
| Carrousel | Embla Carousel |

---

## Prérequis

- **Node.js** 20+
- **npm** 10+
- Backend **Assigame** démarré sur `http://localhost:8080` (PostgreSQL configuré)

---

## Installation

```bash
# Cloner le dépôt puis, dans assigame-frontend :
npm install

# Copier les variables d'environnement
cp .env.example .env
```

Contenu de `.env` :

```env
VITE_API_URL=http://localhost:8080/api
```

---

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Vite) |
| `npm run build` | Compilation TypeScript + build production |
| `npm run preview` | Prévisualisation du build |
| `npm run lint` | Analyse ESLint |

L’application de dev est accessible sur [http://localhost:5173](http://localhost:5173) par défaut.

---

## Structure du projet

```
src/
├── api/              # Client Axios + intercepteurs (JWT, FormData)
├── components/       # Composants UI (shadcn) et navigation
├── context/          # AuthProvider, ThemeProvider
├── features/         # Blocs métier (homepage, admin, vendeur, auth, profil)
├── hooks/            # useAuth, multi-step form
├── layout/           # PublicLayout, AuthLayout, DashboardLayout
├── lib/              # Utilitaires (stats, contact, validation)
├── pages/            # Pages routées
├── routes/           # ProtectedRoute, redirections par rôle
├── services/         # Appels API (Auth, Produit, Catégorie, Utilisateur)
└── types/            # Types TypeScript partagés
```

---

## Routes principales

| Route | Accès | Description |
|-------|-------|-------------|
| `/` | Public | Accueil |
| `/produits` | Public | Catalogue |
| `/produits/:id` | Public | Détail produit |
| `/login`, `/register` | Public | Authentification (sans navbar) |
| `/dashboard` | Vendeur | Tableau de bord vendeur |
| `/dashboard/produits` | Vendeur | Mes produits |
| `/dashboard/profil` | Vendeur | Mon profil |
| `/admin` | Admin | Tableau de bord admin |
| `/admin/utilisateurs` | Admin | Gestion utilisateurs |
| `/admin/produits` | Admin | Modération produits |
| `/admin/categories` | Admin | Gestion catégories |
| `/admin/profil` | Admin | Profil admin |

---

## Connexion au backend

Le frontend consomme l’API REST du backend sous le préfixe `/api`. Exemples d’endpoints utilisés :

- `POST /api/auth/login`, `/register`, `GET /api/auth/me`, `PUT /api/auth/me`
- `GET /api/produit`, `/produit/mes-produits`, CRUD produit (multipart)
- `GET /api/categorieproduit/list`, CRUD catégories
- `GET /api/utilisateur` (admin)

Les images produit et catégorie sont servies via des routes dédiées (`/{id}/image`).

En cas d’erreur **401**, la session est invalidée et l’utilisateur est redirigé vers `/login`.

---

## Rôles

Les rôles proviennent du backend (`VENDEUR`, `ADMIN`) et sont exposés dans le JWT / `UtilisateurDto`. L’inscription publique crée toujours un compte **VENDEUR**.

---

## Assets

Les images statiques (hero, favicon) sont dans le dossier `public/`.

---

## Projet associé

- **Backend** : [`assigame`](../assigame) — Spring Boot, JWT, PostgreSQL, JPA

Démarrer le backend avant de tester les fonctionnalités connectées.

---

## Licence

Projet académique — ESGIS 2026.
