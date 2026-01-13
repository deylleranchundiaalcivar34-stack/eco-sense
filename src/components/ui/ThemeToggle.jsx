import Moon from "../../assets/icons/Moon.jsx";
import Sun from "../../assets/icons/Sun.jsx";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar tema al iniciar
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDarkMode(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-22 left-5 z-50 flex items-center gap-2 p-2 rounded-full",
        "bg-background/80 dark:bg-background/70 backdrop-blur-md",
        "transition-all duration-300 focus:outline-none"
      )}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <>
          <Sun className="h-6 w-6 text-yellow-300" />
          <span className="text-sm font-medium text-foreground">Claro</span>
        </>
      ) : (
        <>
          <Moon className="h-6 w-6 text-blue-900" />
          <span className="text-sm font-medium text-foreground">Oscuro</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
