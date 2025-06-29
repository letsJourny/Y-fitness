import "./global.css";

import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { initializePWA } from "@/utils/pwa";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Progress from "./pages/Progress";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Initialize PWA features after React has mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        initializePWA();
      } catch (error) {
        console.warn("PWA initialization failed:", error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

// Ensure React is available before mounting
if (typeof React !== "undefined" && React.version) {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
} else {
  console.error("React is not properly loaded");
}
