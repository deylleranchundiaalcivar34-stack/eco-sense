"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Zap, Globe, Cpu, Activity } from "lucide-react";

const PanelControl = () => {
  const [isGrifoOn, setIsGrifoOn] = useState(false);
  const [waterUsed, setWaterUsed] = useState(0);
  const [lastWaterUsed, setLastWaterUsed] = useState(0); // último registro
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar login y obtener datos
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        setLoading(false);
        return navigate("/login"); // si no está logueado → login
      }

      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, snapshot => {
        const data = snapshot.val();

        const now = Date.now();
        const lastUpdate = data?.lastUpdate ?? now;
        const oneDay = 24 * 60 * 60 * 1000; // 24h en ms

        let updatedWaterUsed = data?.waterUsed ?? 0;
        let updatedLastUpdate = lastUpdate;
        let updatedLastWaterUsed = data?.lastWaterUsed ?? 0;

        if (now - lastUpdate >= oneDay) {
          // Guardamos el último registro antes de reiniciar
          updatedLastWaterUsed = updatedWaterUsed;

          // Reinicia consumo diario
          updatedWaterUsed = 0;
          updatedLastUpdate = now;

          set(ref(db, `users/${user.uid}`), {
            ...data,
            waterUsed: 0,
            lastWaterUsed: updatedLastWaterUsed,
            lastUpdate: now,
          });
        }

        setIsGrifoOn(data?.grifoState ?? false);
        setWaterUsed(updatedWaterUsed);
        setLastWaterUsed(updatedLastWaterUsed);
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

  const PanelCard = ({ icon: Icon, title, description, centered }) => (
    <div
      className={`p-6 rounded-xl bg-gray-800 border border-gray-700 flex flex-col gap-4 ${
        centered ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <Icon className="h-8 w-8 text-primary" />
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 py-12 overflow-y-auto overflow-x-hidden bg-gray-900 text-white">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-primary text-center">Panel de Control</h1>
        <p className="text-lg text-gray-300 text-center mb-6">
          Bienvenido al panel de administración del Grifo Inteligente EcoSense.
          Controla el flujo de agua, monitorea consumo y gestiona tu ESP32 desde aquí.
        </p>

        {/* Estado del grifo */}
        <div className="w-full p-6 rounded-xl bg-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 border border-primary/30">
          <div>
            <span className="font-semibold">Estado del grifo:</span>
            <span
              className={`ml-2 font-bold ${
                isGrifoOn ? "text-green-400" : "text-red-400"
              }`}
            >
              {isGrifoOn ? "ENCENDIDO" : "APAGADO"}
            </span>
          </div>
          <button
            onClick={toggleGrifo}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              isGrifoOn
                ? "bg-red-600 hover:bg-red-500"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {isGrifoOn ? "APAGAR GRIFO" : "ENCENDER GRIFO"}
          </button>
        </div>

        {/* Consumo de agua */}
        <div className="w-full p-6 rounded-xl bg-gray-800 flex flex-col gap-4 border border-primary/30">
          <h2 className="text-2xl font-semibold text-center">Consumo de Agua (24h)</h2>
          <p className="text-center">Has usado <strong>{waterUsed.toFixed(1)}</strong> litros</p>
          <div className="w-full h-4 rounded-full bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min((waterUsed / 10) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Último registro: <strong>{lastWaterUsed.toFixed(1)}</strong> litros
          </p>
        </div>

        {/* Estadísticas / Funcionalidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <PanelCard
            icon={Zap}
            title="Monitoreo en Tiempo Real"
            description="Observa el flujo y consumo de agua desde cualquier lugar."
            centered
          />
          <PanelCard
            icon={Globe}
            title="Conectividad Global"
            description="Controla tu grifo desde la web o tu celular."
            centered
          />
          <PanelCard
            icon={Activity}
            title="Control Manual"
            description="Activa o desactiva manualmente cuando necesites."
            centered
          />
          <PanelCard
            icon={Cpu}
            title="Actualizaciones"
            description="El grifo se mantiene actualizado con nuevas funciones."
            centered
          />
        </div>

        {/* Botón de retorno */}
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
