import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with simple initialization to avoid complex useState callback
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme after mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("theme") as Theme;
        if (saved) {
          setTheme(saved);
        } else {
          // Check system preference
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches;
          setTheme(prefersDark ? "dark" : "light");
        }
      }
    } catch (error) {
      console.warn("Failed to load theme preference:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const root = document.documentElement;

        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
      }
    } catch (error) {
      console.warn("Failed to apply theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
