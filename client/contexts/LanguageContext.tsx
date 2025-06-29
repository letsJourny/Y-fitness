import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then default to English (with safety check)
    try {
      const saved =
        typeof window !== "undefined"
          ? (localStorage.getItem("language") as Language)
          : null;
      return saved || "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    // Safely set localStorage and document attributes
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang;
      }
    } catch (error) {
      console.warn("Failed to save language preference:", error);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
  };

  // Set initial language on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && document.documentElement) {
        document.documentElement.lang = language;
      }
    } catch (error) {
      console.warn("Failed to set document language:", error);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
