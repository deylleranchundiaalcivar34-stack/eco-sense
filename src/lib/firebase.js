// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEZy5trxa8KWOj46NAvEm9rke8gEhJ4N0",
  authDomain: "esp32-control-01.firebaseapp.com",
  databaseURL: "https://esp32-control-01-default-rtdb.firebaseio.com",
  projectId: "esp32-control-01",
  storageBucket: "esp32-control-01.appspot.com",
  messagingSenderId: "171300655288",
  appId: "1:171300655288:web:b36ffd0c46fc0914aaa44d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Autenticación
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    return null;
  }
};

// Realtime Database
export const db = getDatabase(app);