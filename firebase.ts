import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDKlNWUlPVNG7Co__VqAJOLLQ-WDKmcRLM",
  authDomain: "expenses-tracker-9e168.firebaseapp.com",
  projectId: "expenses-tracker-9e168",
  storageBucket: "expenses-tracker-9e168.firebasestorage.app",
  messagingSenderId: "635868366535",
  appId: "1:635868366535:web:515b333c2a385134f1a0e2"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
 