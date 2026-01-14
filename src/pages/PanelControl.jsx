import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get, set } from "firebase/database";

const PanelControl = () => {
  const [grifoState, setGrifoState] = useState(false);

  const toggleGrifo = async () => {
    const newState = !grifoState;
    setGrifoState(newState);
    await set(ref(db, "/grifoState"), newState);
  };

  useEffect(() => {
    const fetchState = async () => {
      const snapshot = await get(ref(db, "/grifoState"));
      if (snapshot.exists()) setGrifoState(snapshot.val());
    };
    fetchState();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-6">
      <h2 className="text-3xl font-bold mb-4">Panel de Control</h2>
      <button className="cosmic-button" onClick={toggleGrifo}>
        {grifoState ? "Apagar Grifo" : "Encender Grifo"}
      </button>
      <p>Estado actual: {grifoState ? "ENCENDIDO" : "APAGADO"}</p>
    </div>
  );
};

export default PanelControl;
