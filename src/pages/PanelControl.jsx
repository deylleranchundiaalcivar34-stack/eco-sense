"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Zap, Globe, Cpu, Activity } from "lucide-react";

const PanelControl = () => {
  const [isGrifoOn, setIsGrifoOn] = useState(false);
  const [waterUsed, setWaterUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar login y obtener datos
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        setLoading(false);
        return navigate("/"); // no logueado → inicio
      }

      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          setIsGrifoOn(data.grifoState ?? false);
          setWaterUsed(data.waterUsed ?? 0);
        } else {
          set(ref(db, `users/${user.uid}`), { grifoState: false, waterUsed: 0 });
        }
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, [navigate]);

  const sendCommandToESP32 = async (turnOn) => {
    try {
      await fetch(`https://TU_ESP32_IP/comando`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grifoOn: turnOn }),
      });
    } catch (err) {
      console.error("Error enviando comando al ESP32:", err);
    }
  };

  const toggleGrifo = () => {
    const newState = !isGrifoOn;
    setIsGrifoOn(newState);
    sendCommandToESP32(newState);
    const user = auth.currentUser;
    if (user) set(ref(db, `users/${user.uid}/grifoState`), newState);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Cargando Panel de Control...</p>
      </div>
    );
  }

  return (
    <section className="dark min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-gray-900 text-white">
      <div className="max-w-5xl w-full flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-primary">Panel de Control</h1>
        <p className="text-lg mb-6">Grifo Inteligente EcoSense</p>

        {/* Estado del grifo */}
        <div className="w-full p-6 rounded-xl bg-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-semibold">Estado del grifo:</span>
            <span className={`ml-2 font-bold ${isGrifoOn ? "text-green-400" : "text-red-400"}`}>
              {isGrifoOn ? "ENCENDIDO" : "APAGADO"}
            </span>
          </div>
          <button
            onClick={toggleGrifo}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${isGrifoOn ? "bg-red-600" : "bg-green-600"}`}
          >
            {isGrifoOn ? "APAGAR GRIFO" : "ENCENDER GRIFO"}
          </button>
        </div>

        {/* Consumo de agua */}
        <div className="w-full p-6 rounded-xl bg-gray-800 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Consumo de Agua</h2>
          <p>Has usado <strong>{waterUsed.toFixed(1)}</strong> litros</p>
          <div className="w-full h-4 rounded-full bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min((waterUsed / 10) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="p-6 rounded-xl flex items-center gap-4 bg-gray-800 border border-gray-700">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-semibold text-lg">Monitoreo en Tiempo Real</h4>
              <p className="text-sm text-gray-300">Observa el flujo y consumo de agua desde cualquier lugar.</p>
            </div>
          </div>
          <div className="p-6 rounded-xl flex items-center gap-4 bg-gray-800 border border-gray-700">
            <Globe className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-semibold text-lg">Conectividad Global</h4>
              <p className="text-sm text-gray-300">Controla tu grifo desde la web o tu celular.</p>
            </div>
          </div>
          <div className="p-6 rounded-xl flex items-center gap-4 bg-gray-800 border border-gray-700">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-semibold text-lg">Control Manual</h4>
              <p className="text-sm text-gray-300">Activa o desactiva manualmente cuando necesites.</p>
            </div>
          </div>
          <div className="p-6 rounded-xl flex items-center gap-4 bg-gray-800 border border-gray-700">
            <Cpu className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-semibold text-lg">Actualizaciones</h4>
              <p className="text-sm text-gray-300">El grifo se mantiene actualizado con nuevas funciones.</p>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          ← Volver al inicio
        </button>
      </div>
    </section>
  );
};

export default PanelControl;
