"use client";

import { useEffect, useState } from "react";
import { User, Briefcase, Code, Activity, Zap, Globe, Shield, Cpu, BarChart } from "lucide-react";
import { signInWithGoogle } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

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
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.33/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <section id="grifo3d" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Fondo adaptado al theme */}
      <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-linear-to-br from-primary/20 via-background to-background" : "bg-linear-to-br from-primary/10 via-white to-white"}`} />

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
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Tecnología Inteligente</h4>
                <p className="text-sm text-muted-foreground">
                  Sensor de flujo, electroválvula controlada por ESP32 y registro en tiempo real.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Ahorro y Sostenibilidad</h4>
                <p className="text-sm text-muted-foreground">
                  Optimiza el consumo de agua y evita desperdicios.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Diseño Moderno</h4>
                <p className="text-sm text-muted-foreground">
                  Instalación simple y estética moderna que se adapta a cualquier espacio.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Control Manual</h4>
                <p className="text-sm text-muted-foreground">
                  Posibilidad de activar y desactivar manualmente cuando sea necesario.
                </p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Monitoreo en Tiempo Real</h4>
                <p className="text-sm text-muted-foreground">
                  Observa el flujo y consumo de agua directamente desde la app o web.
                </p>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Conectividad Global</h4>
                <p className="text-sm text-muted-foreground">
                  Conexión estable vía internet para controlar el grifo desde cualquier lugar.
                </p>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Seguridad Garantizada</h4>
                <p className="text-sm text-muted-foreground">
                  Evita accidentes y control de flujo seguro para niños y mascotas.
                </p>
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Actualizaciones Firmware</h4>
                <p className="text-sm text-muted-foreground">
                  El grifo se mantiene actualizado con nuevas funciones y mejoras.
                </p>
              </div>
            </div>
          </div>

          {/* Card 9 */}
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Estadísticas Detalladas</h4>
                <p className="text-sm text-muted-foreground">
                  Visualiza consumo diario, semanal y mensual para un control eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN PANEL DE CONTROL */}
        <div className="flex flex-col sm:flex-row gap-4 pt-12 justify-center">
          <button
            className="cosmic-button"
            onClick={async () => {
              const user = await signInWithGoogle();
              if (user) navigate("/panel");
              else alert("No se pudo iniciar sesión. Intenta nuevamente.");
            }}
          >
            Panel de Control
          </button>
        </div> 
      </div>
    </section>
  );
};

export default Grifo3D;
