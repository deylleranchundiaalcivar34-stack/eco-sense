import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCEZy5trxa8KWOj46NAvEm9rke8gEhJ4N0",
  authDomain: "esp32-control-01.firebaseapp.com",
  databaseURL: "https://esp32-control-01-default-rtdb.firebaseio.com",
  projectId: "esp32-control-01",
  storageBucket: "esp32-control-01.appspot.com",
  messagingSenderId: "171300655288",
  appId: "1:171300655288:web:b36ffd0c46fc0914aaa44d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
