import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmFAdqIvJUPB0K-4Ez6L9J_VDIRbo4gmc",
  authDomain: "piwo-pwr-lab4.firebaseapp.com",
  projectId: "piwo-pwr-lab4",
  storageBucket: "piwo-pwr-lab4.firebasestorage.app",
  messagingSenderId: "464651649048",
  appId: "1:464651649048:web:9fa518bee1a7315f87836d"
};


// Initialize Firebase tylko raz (Next.js potrafi wywoływać to wielokrotnie w dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
