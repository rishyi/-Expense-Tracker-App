// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKlNWUlPVNG7Co__VqAJOLLQ-WDKmcRLM",
  authDomain: "expenses-tracker-9e168.firebaseapp.com",
  projectId: "expenses-tracker-9e168",
  storageBucket: "expenses-tracker-9e168.firebasestorage.app",
  messagingSenderId: "635868366535",
  appId: "1:635868366535:web:515b333c2a385134f1a0e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);


export const db = getFirestore(app);