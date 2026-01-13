import { Outlet } from "react-router-dom";

const PanelLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Aquí no va navbar ni footer */}
      <Outlet />
    </div>
  );
};

export default PanelLayout;
