import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "@/pages/Layout.jsx";           
import PanelLayout from "@/pages/PanelLayout.jsx"; 

// Pages
import Home from "@/pages/Home.jsx";
import PanelControl from "@/pages/PanelControl.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas normales con Navbar y Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Panel de Control sin Navbar / Footer */}
        <Route path="/panel" element={<PanelLayout />}>
          <Route index element={<PanelControl />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-3xl font-bold">
              Página no encontrada
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
