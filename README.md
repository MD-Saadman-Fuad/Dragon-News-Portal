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
