# Dragon News

Dragon News is a demo React application built with Vite that illustrates a simple news portal. It includes local news data, client-side routing, authentication via Firebase (email/password + Google/GitHub OAuth), and example pages (Home, Category, News Details, About, Careers).

This README documents how to set up, develop, and deploy the project, plus notes on security, environment variables, and troubleshooting common issues.

--

## Quick commands

- Start dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Build + deploy (Firebase): `npm run deploy` (requires Firebase CLI & login)

--

## Repository overview

Top-level files:

- `public/news.json` — sample news data used by loaders and components
- `src/firebase/firebase.config.js` — Firebase initialization (recommended to source values from env)
- `src/provider/AuthProvider.jsx` — authentication context and helpers (email/password + OAuth)
- `src/routes/router.jsx` — application routes
- `src/pages/` — page components (Home, Login, Register, CategoryNews, NewsDetails, About, Career, Error)
- `src/components/` — UI components (`NewsCard`, `LatestNews`, `Navbar`, `SocialLogin`, `JobApplyModal`, etc.)

--

## Prerequisites

- Node.js 16+ (recommended)
- npm or yarn/pnpm
- Firebase project (for Auth + Hosting)

--

## Local development (Windows PowerShell)

1. Install dependencies:

```powershell
cd 'e:\dragon-news-code\Dragon News'
npm install
```

2. Copy `.env.example` to `.env` (or create `.env.local`) and populate your Firebase values:

```powershell
copy .env.example .env
notepad .env
```

3. Start dev server:

```powershell
npm run dev
```

Open `http://localhost:5173` in your browser.

--

## Environment variables and Firebase config

Use Vite-prefixed variables (`VITE_...`) to provide Firebase configuration at build time. Example variables (see `.env.example`):

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

Recommended `src/firebase/firebase.config.js` (reads from `import.meta.env`):

```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
```

Do NOT commit `.env` or any service account keys. This repo's `.gitignore` already ignores common secret files and `src/firebase/firebase.config.js`.

--

## Firebase: Authentication setup

1. In Firebase Console → Authentication → Sign-in method:
   - Enable **Email/Password**.
   - Enable **Google** provider.
   - Enable **GitHub** provider (create a GitHub OAuth App to get Client ID/Secret and paste into Firebase).
2. Add authorized domains (e.g., `localhost`, your production domain) in Firebase Auth settings.

Notes on OAuth:

- For GitHub, register a new OAuth App on GitHub and set the Authorization callback URL as the Firebase one provided by the console.
- The client-side Firebase config (apiKey etc.) is not a secret — however, service account keys and OAuth Client Secrets must never be committed.

--

## What was implemented in this repo (developer notes)

- Routing: use `react-router-dom` (all imports updated to DOM package)
- AuthProvider: fixed to use `<AuthContext.Provider value={...}>` and export OAuth helpers (`signInWithGoogle`, `signInWithGithub`)
- PrivateRoute: uses `useContext(AuthContext)` and redirects with `state.from`
- Login page: wired `SocialLogin` component and fixed context usage
- LatestNews: fetches `/news.json` (absolute root) to avoid HTML parse errors
- NewsCard, NewsDetails, About, Career pages, and JobApplyModal (apply modal) were added

These notes help when reviewing changed files and debugging auth/routing issues.

--

## Deployment: Firebase Hosting (quick)

This repository already includes `firebase.json` (public set to `dist`) and `.firebaserc` placeholder. To deploy:

1. Install Firebase CLI and login:

```powershell
npm install -g firebase-tools
firebase login
```

Or use `npx firebase login`.

2. Link project / set alias (run once):

```powershell
firebase use --add
# choose your Firebase project, set alias (e.g., 'default' or 'production')
```

3. Build and deploy:

```powershell
npm run deploy
# or manually:
npm run build
firebase deploy --only hosting
```

If you need to customize `firebase.json`, the important part is the SPA rewrite and `public: "dist"`.

--

## CI/CD (GitHub Actions) example

Use a service account key and GitHub secrets. Example workflow (summary):

- Checkout
- Install node, `npm ci`
- Set Vite env vars via `$GITHUB_ENV` from repo secrets
- Build (`npm run build`)
- Deploy with `FirebaseExtended/action-hosting-deploy@v0` using `FIREBASE_SERVICE_ACCOUNT` secret

Ask me and I can add a `.github/workflows/deploy.yml` file with a tested template.

--

## Troubleshooting & common issues

- "Unexpected token '<', "<!doctype ... is not valid JSON": you fetched the wrong path; use `/news.json` (from `public/`) rather than `./news.json` from nested routes.
- Router/Hydration warnings: make sure `RouterProvider` and all hooks/components import from `react-router-dom` (not `react-router`).
- Auth context null/undefined: ensure `AuthProvider` returns `<AuthContext.Provider value={...}>` and that consumers use `useContext(AuthContext)`.
- OAuth popup blocked / not working: check Authorized Domains in Firebase Console and popup blocker settings.

If you hit a problem, paste the exact console error and I will walk through it.

--

## Security & cleanup (if secrets were committed)

1. Stop tracking config file (keeps local copy, removes from index):

```powershell
git rm --cached src/firebase/firebase.config.js
git commit -m "stop tracking firebase config"
git push
```

2. If keys were pushed publicly, rotate Firebase API keys and OAuth client secrets immediately.
3. For complete removal from git history, use a history rewrite tool such as BFG or `git filter-repo` (requires care and force pushes).

--

## Contributing

If you'd like help with any of the following, tell me which and I will implement it:

- Convert `src/firebase/firebase.config.js` to read from `import.meta.env` (I can do that now).
- Add a GitHub Actions workflow to auto-deploy on push to `main`.
- Add an API backend to accept job applications (instead of console logging them) and store applications securely.

--

## Contact

For help or collaboration: `hello@dragonnews.example`.

--

## License

This repository is a demo/sample project. Use and modify freely.

# Dragon News

Dragon News is a lightweight React news aggregator demo built with Vite, React, and Firebase Authentication. It showcases a simple news listing UI, category views, authentication (email/password + Google/GitHub OAuth), and small utilities like a careers page with an apply modal.

This README explains how to set up the project locally, manage secrets safely, and run the app.

## Features

- News listing and categories (local `public/news.json` data)
- Routing via `react-router-dom`
- Authentication: Email/password, Google and GitHub (Firebase Auth)
- Simple careers page with an application modal
- Dev setup using Vite

## Tech Stack

- React
- Vite
- Firebase Auth
- Tailwind / DaisyUI (styles applied in components)

## Repository layout

Key files and folders:

- `public/news.json` — sample news data used by the app
- `src/firebase/firebase.config.js` — (should be ignored/kept out of VCS; move secrets to env)
- `src/provider/AuthProvider.jsx` — Firebase auth helpers and context
- `src/routes/router.jsx` — app route definitions
- `src/pages/*` — page components (`Home`, `Login`, `About`, `Career`, etc.)

## Prerequisites

- Node.js 16+ (recommended) or newer
- npm (or pnpm/yarn)

## Setup (development)

1. Clone and install dependencies:

```powershell
cd 'e:\dragon-news-code\Dragon News'
npm install
```

2. Create a `.env` in the project root (see `.env.example` for the required variables). This project is configured to use Vite environment variables prefixed with `VITE_`.

3. Start the dev server:

```powershell
npm run dev
```

Open `http://localhost:5173` (Vite default) in your browser.

## Environment variables and Firebase configuration

This project reads Firebase config from `src/firebase/firebase.config.js`. To avoid committing secrets, move your values into environment variables and update the code to read from `import.meta.env.VITE_...`.

Create a `.env` file with the following keys (example values in `.env.example`):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:...:web:...
```

If you're using Git, ensure `.gitignore` includes the `.env` file (this repo's `.gitignore` already ignores `.env` and `src/firebase/firebase.config.js`).

### Firebase Console

1. Create a Firebase project.
2. Enable **Authentication** and enable Email/Password provider.
3. Enable **Google** and **GitHub** sign-in providers (for GitHub you must register an OAuth app on GitHub and provide Client ID/Secret to Firebase).
4. Add your development domain (e.g. `localhost`) to Firebase Authorized Domains.

If `src/firebase/firebase.config.js` was already committed to your repo, stop tracking it (so it remains locally but not in repo):

```powershell
git rm --cached src/firebase/firebase.config.js
git commit -m "stop tracking firebase config"
git push
```

If the file was pushed to a public repository, rotate the exposed keys in the Firebase Console immediately.

## Build

```powershell
npm run build
```

This produces a production build in `dist/` (or the folder configured by Vite).

## Helpful commands

- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview production build locally (after build): `npm run preview`

## Contributing

If you'd like me to help harden the project for production, I can:

- Convert `src/firebase/firebase.config.js` to read from `import.meta.env` and add `.env.example` (done in this repo),
- Add a CI/CD pipeline to deploy, or
- Add server endpoints for job application submissions.

Tell me which of these you'd like next.

## License & contact

This repository is a sample/demo. Reach out at `hello@dragonnews.example` for questions or collaboration.

# Task for You

- Show Breaking News Title on Latest News
- Implement Forget Password Feature
- Implement Google Login
- Implement Github Login
- Do Conditional Rendering on Social Icons
