// src/components/layout/Layout.jsx
import Navbar from "@/components/layout/Navbar.jsx";
import Footer from "@/components/layout/Footer.jsx";
import ThemeToggle from "@/components/ui/ThemeToggle.jsx";
import StarBackground from "@/components/ui/StarBackground.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <StarBackground />
      <Navbar />
      <main>
        <Outlet /> {/* Aquí se renderiza Home o PanelControl según la ruta */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
