import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmail, registerWithEmail } from "@/lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await signInWithEmail(email, password);
      if (user) navigate("/panel");
    } catch (err) {
      alert("Error al iniciar sesión: " + err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const user = await registerWithEmail(email, password);
      if (user) navigate("/panel");
    } catch (err) {
      alert("Error al registrarse: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Iniciar Sesión / Registrarse</h2>
      <input
        className="input-field mb-4"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-field mb-4"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4">
        <button className="cosmic-button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        <button className="cosmic-button" onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;
