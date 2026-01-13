// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";
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

// Realtime Database
export const db = getDatabase(app);

// Función para detectar móvil
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

// Función para iniciar sesión con Google adaptativa
export const signInWithGoogle = async () => {
  try {
    if (isMobile()) {
      // Si es móvil, usar redirect
      await signInWithRedirect(auth, provider);
      // Luego de la redirección, esto puede obtener el resultado
      const result = await getRedirectResult(auth);
      return result?.user ?? null;
    } else {
      // Si es escritorio, usar popup
      const result = await signInWithPopup(auth, provider);
      return result.user;
    }
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    return null;
  }
};

export { provider }; 
