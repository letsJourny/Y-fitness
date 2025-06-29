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
  // Start with simple initialization to avoid complex useState callback
  const [language, setLanguageState] = useState<Language>("en");

  // Initialize language after mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("language") as Language;
        if (saved) {
          setLanguageState(saved);
        }
        document.documentElement.lang = saved || "en";
      }
    } catch (error) {
      console.warn("Failed to load language preference:", error);
    }
  }, []);

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
