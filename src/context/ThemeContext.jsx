import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "sf-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Lee el localStorage al inicio; si no hay nada guardado, usa "light"
    return localStorage.getItem(STORAGE_KEY) ?? "light";
  });

  useEffect(() => {
    // Sincroniza la clase en el <body> y guarda en localStorage
    // cada vez que cambia el tema
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}