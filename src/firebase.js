import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe--sLK-5gBKvYnoOPzwHczXgfwxwklbk",
  authDomain: "text-ting.firebaseapp.com",
  projectId: "text-ting",
  storageBucket: "text-ting.appspot.com",
  messagingSenderId: "147319038136",
  appId: "1:147319038136:web:601b03d1e357a574e0d44d",
  measurementId: "G-LSCDPRX141",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
