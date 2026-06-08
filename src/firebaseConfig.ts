import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase validates the API key at initialization time.
// Env vars are not available during Next.js build/SSR, so we must guard against
// server-side initialization. All Firebase usage in this app is client-only
// (inside useEffect / event handlers), so the stubs are never actually called.
const isClient = typeof window !== "undefined";

const app: FirebaseApp = isClient
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : ({} as FirebaseApp);

export const auth: Auth = isClient ? getAuth(app) : ({} as Auth);
export const db: Firestore = isClient ? getFirestore(app) : ({} as Firestore);
export default app;
