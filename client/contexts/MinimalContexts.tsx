import React, { createContext, useContext } from "react";

// Ultra-minimal contexts without useState
type Theme = "light" | "dark";
type Language = "en" | "ar";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = {
    theme: "light" as Theme,
    toggleTheme: () => {
      console.log("Theme toggle disabled temporarily");
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const value = {
    language: "en" as Language,
    toggleLanguage: () => {
      console.log("Language toggle disabled temporarily");
    },
    setLanguage: () => {
      console.log("Set language disabled temporarily");
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useLanguage() {
  return useContext(LanguageContext);
}
