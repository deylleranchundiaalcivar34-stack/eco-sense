"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { auth, signInWithEmail, registerWithEmail } from "@/lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("El correo y la contraseña son obligatorios para acceder al panel.");
      return;
    }

    try {
      const user = await signInWithEmail(email, password);
      if (user) navigate("/panel");
    } catch (err) {
      setErrorMsg("Error al iniciar sesión: " + err.message);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setErrorMsg("Debes completar correo y contraseña para registrarte.");
      return;
    }

    try {
      const user = await registerWithEmail(email, password);
      if (user) navigate("/panel");
    } catch (err) {
      setErrorMsg("Error al registrarse: " + err.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-900">
      
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl border border-primary/30 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          Panel de Control EcoSense
        </h2>
        <p className="text-center text-sm text-gray-400">
          Ingresa tu correo y contraseña para gestionar tu Grifo Inteligente ESP32. 
          Aquí podrás controlar el flujo de agua y monitorear el consumo en tiempo real.
        </p>

        {/* Mensaje de error */}
        {errorMsg && (
          <div className="bg-red-700/20 text-red-400 p-2 rounded-md text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* Input Email */}
        <div className="flex items-center gap-3 border border-primary/40 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary bg-gray-700">
          <Mail className="text-primary w-5 h-5" />
          <input
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-400"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input Password */}
        <div className="flex items-center gap-3 border border-primary/40 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary bg-gray-700">
          <Lock className="text-primary w-5 h-5" />
          <input
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-400"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            className="cosmic-button border border-primary bg-primary text-white hover:bg-primary/10 transition-colors"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
          <button
            className="cosmic-button border border-primary bg-primary text-white hover:bg-primary/10 transition-colors"
            onClick={handleRegister}
          >
            Registrarse
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-2">
          Si no tienes cuenta, puedes registrarte. Una vez registrado, podrás ingresar al panel de control para administrar tu ESP32 y monitorear tu grifo inteligente.
        </p>
      </div>

              {/* Botón de retorno */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          ← Volver al inicio
        </button>
    </section>
  );
};

export default Login;
