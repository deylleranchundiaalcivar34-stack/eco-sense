import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "@/pages/Layout.jsx";           
import PanelLayout from "@/pages/PanelLayout.jsx"; 

// Pages
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Login.jsx";
import PanelControl from "@/pages/PanelControl.jsx";
import NotFound from "@/pages/NotFound.jsx";  // ✅ Importamos tu NotFound.jsx

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas normales con Navbar y Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Página de Login (sin Navbar / Footer) */}
        <Route path="/login" element={<Login />} />

        {/* Panel de Control sin Navbar / Footer */}
        <Route path="/panel" element={<PanelLayout />}>
          <Route index element={<PanelControl />} />
        </Route>

        {/* Fallback / Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
