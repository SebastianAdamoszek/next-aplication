import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Twoja konfiguracja Firebase z Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAHTtVwXcmT2aDo9tI_sn3Xek3v2R7q_S8",
  authDomain: "addfirebasetonextjs.firebaseapp.com",
  projectId: "addfirebasetonextjs",
  storageBucket: "addfirebasetonextjs.appspot.com",
  messagingSenderId: "366009107390",
  appId: "1:366009107390:web:75e08da771e23347ddefef",
  measurementId: "G-950CM3QF9L"
};

// const firebaseConfig = {
//  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Inicjalizacja Firebase Analytics (tylko po stronie klienta)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.log("Firebase Analytics nie jest wspierany w tym środowisku.");
    }
  });
}

// Inicjalizacja Firebase Authentication i Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
