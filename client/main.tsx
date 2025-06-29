import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ToastContainer } from "@/components/ui/toast-notification";
import { initializePWA } from "@/utils/pwa";
import { useEffect } from "react";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Progress from "./pages/Progress";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize PWA features after React has mounted
  useEffect(() => {
    initializePWA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
