// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcutZ9LTBjZvTr5dXdkBRTziY_Sw1PHJE",
  authDomain: "cdp-agentkit.firebaseapp.com",
  projectId: "cdp-agentkit",
  storageBucket: "cdp-agentkit.firebasestorage.app",
  messagingSenderId: "745061486460",
  appId: "1:745061486460:web:b3f098755f4d0375aedef9",
  measurementId: "G-PZS4BND027",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics = null;
let auth = null;
let functions = null;
let db = null;

// Check if we're in a browser environment and analytics is supported
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
    auth = getAuth(app);
    functions = getFunctions(app);
    db = getFirestore(app);

    // Set persistence to local storage
    if (auth) {
      setPersistence(auth, browserLocalPersistence);
    }

    // Connect to emulator if running locally
    if (window.location.hostname === "localhost") {
      // connectFunctionsEmulator(functions, "localhost", 5001);
    }
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
}

// Authentication Helper Functions
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (!auth) throw new Error("Auth not initialized");

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error };
  }
};

export const signInWithEmail = async (email, password) => {
  if (!auth) throw new Error("Auth not initialized");

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error };
  }
};

export const signUpWithEmail = async (email, password) => {
  if (!auth) throw new Error("Auth not initialized");

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error };
  }
};

export const logout = async () => {
  if (!auth) throw new Error("Auth not initialized");

  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error };
  }
};

export const getCurrentUser = () => {
  return auth?.currentUser || null;
};

export const onAuthChange = (callback) => {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
};

export { analytics, auth };
export default app;
