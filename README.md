# Table Taste

This is a Vite + React + TypeScript project with Firebase SDK initialization ready.

## Firebase Setup

1. Create a Firebase project in the Firebase Console.
2. In your project settings, copy the web app config values.
3. Copy `.env.example` to `.env.local` and fill all `VITE_FIREBASE_*` values.

```bash
cp .env.example .env.local
```

4. Start the app:

```bash
npm run dev
```

Firebase is initialized in `src/lib/firebase.ts` and exports:

- `auth` for Firebase Authentication
- `db` for Cloud Firestore
- `storage` for Cloud Storage

## Optional: Initialize Firebase Hosting CLI

If you also want Firebase Hosting for deployment:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

Recommended answers during `firebase init hosting` for this app:

- Public directory: `dist`
- Single-page app rewrite: `Yes`
- Overwrite `index.html`: `No`
