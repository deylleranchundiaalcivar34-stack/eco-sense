"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  Code,
  Activity,
  Zap,
  Globe,
  Shield,
  Cpu,
  BarChart,
} from "lucide-react";
import { auth, provider, signInWithGoogle } from "@/lib/firebase";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

const Grifo3D = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  // Detectar cambio de tema (dark / light)
  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsDark(root.classList.contains("dark"));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Cargar Spline Viewer
  useEffect(() => {
    if (document.querySelector("script[data-spline]")) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.12.33/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Función de login universal (PC y móvil)
  const handleLogin = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      let user = null;

      if (isMobile) {
        // Móvil: redirect
        await signInWithRedirect(auth, provider);
        const result = await getRedirectResult(auth);
        user = result?.user || null;
      } else {
        // PC: popup
        user = await signInWithGoogle();
      }

      if (user) navigate("/panel");
      else alert("No se pudo iniciar sesión. Intenta nuevamente.");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión. Revisa la consola.");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Fondo adaptado al theme */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-linear-to-br from-primary/20 via-background to-background"
            : "bg-linear-to-br from-primary/10 via-white to-white"
        }`}
      />

      {/* MODELO 3D */}
      <div className="relative z-10 w-full h-[75vh] sm:h-[85vh] md:h-[95vh] max-w-7xl mx-auto">
        <spline-viewer
          className="w-full h-full"
          loading-anim-type="none"
          url="https://prod.spline.design/L7rCrLTSL7X5KkH9/scene.splinecode"
        />
      </div>

      {/* CARACTERÍSTICAS */}
      <div className="relative z-10 w-full max-w-6xl mt-12">
        <h3 className="text-3xl font-bold mb-8 text-center text-primary">
          Características del Grifo Inteligente EcoSense
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <FeatureCard icon={Code} title="Tecnología Inteligente">
            Sensor de flujo, electroválvula controlada por ESP32 y registro en
            tiempo real.
          </FeatureCard>

          {/* Card 2 */}
          <FeatureCard icon={User} title="Ahorro y Sostenibilidad">
            Optimiza el consumo de agua y evita desperdicios.
          </FeatureCard>

          {/* Card 3 */}
          <FeatureCard icon={Briefcase} title="Diseño Moderno">
            Instalación simple y estética moderna que se adapta a cualquier
            espacio.
          </FeatureCard>

          {/* Card 4 */}
          <FeatureCard icon={Activity} title="Control Manual">
            Posibilidad de activar y desactivar manualmente cuando sea necesario.
          </FeatureCard>

          {/* Card 5 */}
          <FeatureCard icon={Zap} title="Monitoreo en Tiempo Real">
            Observa el flujo y consumo de agua directamente desde la app o web.
          </FeatureCard>

          {/* Card 6 */}
          <FeatureCard icon={Globe} title="Conectividad Global">
            Conexión estable vía internet para controlar el grifo desde cualquier
            lugar.
          </FeatureCard>

          {/* Card 7 */}
          <FeatureCard icon={Shield} title="Seguridad Garantizada">
            Evita accidentes y control de flujo seguro para niños y mascotas.
          </FeatureCard>

          {/* Card 8 */}
          <FeatureCard icon={Cpu} title="Actualizaciones Firmware">
            El grifo se mantiene actualizado con nuevas funciones y mejoras.
          </FeatureCard>

          {/* Card 9 */}
          <FeatureCard icon={BarChart} title="Estadísticas Detalladas">
            Visualiza consumo diario, semanal y mensual para un control eficiente.
          </FeatureCard>
        </div>

        {/* BOTÓN PANEL DE CONTROL */}
        <div className="flex flex-col sm:flex-row gap-4 pt-12 justify-center">
          <button
            className="cosmic-button"
            onClick={async () => {
              try {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                if (isMobile) {
                  // En móviles usamos redirect
                  const { signInWithRedirect } = await import("firebase/auth");
                  await signInWithRedirect(auth, provider); 
                  // Aquí NO hacemos navigate todavía
                  // Firebase manejará la redirección y volverás logeado
                } else {
                  // En PC usamos popup normal
                  const user = await signInWithGoogle();
                  if (user) navigate("/panel");
                  else alert("No se pudo iniciar sesión. Intenta nuevamente.");
                }
              } catch (err) {
                console.error(err);
                alert("Error al iniciar sesión. Revisa la consola.");
              }
            }}
          >
            Panel de Control
          </button>
        </div>
      </div>
    </section>
  );
};

// Componente reutilizable para las cards
const FeatureCard = ({ icon: Icon, title, children }) => (
  <div className="gradient-border p-6 card-hover">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-left">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  </div>
);

export default Grifo3D;
