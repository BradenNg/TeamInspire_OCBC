import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi-xRRAr2KO8I1Z8-lBTAS3YLxx6JWcII",
  authDomain: "ocbc-ui-ux.firebaseapp.com",
  projectId: "ocbc-ui-ux",
  storageBucket: "ocbc-ui-ux.firebasestorage.app",
  messagingSenderId: "89257416168",
  appId: "1:89257416168:web:9065038e8470d28d88005d",
  measurementId: "G-4ED3PPQ37P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Sign in anonymously so Firestore rules see request.auth != null
try {
  const auth = getAuth(app);
  await signInAnonymously(auth);
} catch (e) {
  console.error('Anonymous sign-in failed', e);
}

try { getAnalytics(app); } catch (_) {}