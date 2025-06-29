import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Dumbbell,
  User,
  BarChart3,
  Calendar,
  CreditCard,
  Shield,
  Moon,
  Sun,
  Globe,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";

interface NavigationProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export default function Navigation({
  isAuthenticated = false,
  isAdmin = false,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1); // Remove the # symbol
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Update URL without page reload
      window.history.pushState(null, "", href);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Navigate to home page
      window.location.href = "/";
    }
  };

  const publicNavItems = [
    { label: t.nav.home, href: "/", isHome: true },
    { label: t.nav.features, href: "#features", isAnchor: true },
    { label: t.nav.about, href: "#about", isAnchor: true },
    { label: t.nav.contact, href: "#contact", isAnchor: true },
  ];

  const userNavItems = [
    { label: t.nav.dashboard, href: "/dashboard", icon: BarChart3 },
    { label: t.nav.plans, href: "/plans", icon: Calendar },
    { label: t.nav.progress, href: "/progress", icon: BarChart3 },
    { label: t.nav.subscription, href: "/subscription", icon: CreditCard },
  ];

  const adminNavItems = [
    { label: t.nav.admin, href: "/admin", icon: Shield },
    { label: "Users", href: "/admin/users", icon: User },
    { label: "Plans", href: "/admin/plans", icon: Calendar },
  ];

  const navItems = isAuthenticated
    ? isAdmin
      ? [...userNavItems, ...adminNavItems]
      : userNavItems
    : publicNavItems;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Yousef Recharge
            </span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = "icon" in item ? item.icon : null;
              const isActive =
                location.pathname === item.href ||
                (item.href.startsWith("/#") &&
                  location.pathname === "/" &&
                  location.hash === item.href.substring(1));

              if ("isAnchor" in item && item.isAnchor) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </a>
                );
              }

              if ("isHome" in item && item.isHome) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleHomeClick}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Language, Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="px-3 h-9"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "en" ? "EN" : "عر"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {!isAuthenticated ? (
              <>
                <Link to="/registration">
                  <Button variant="ghost" size="sm">
                    {t.nav.signIn}
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button size="sm">{t.nav.getStarted}</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {t.nav.profile}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = "icon" in item ? item.icon : null;
                const isActive = location.pathname === item.href;

                if ("isAnchor" in item && item.isAnchor) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        handleAnchorClick(e, item.href);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.label}</span>
                    </a>
                  );
                }

                if ("isHome" in item && item.isHome) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        handleHomeClick(e);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.label}</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "en"
                    ? "Switch to Arabic"
                    : "التبديل إلى الإنجليزية"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  )}
                </Button>

                {!isAuthenticated && (
                  <>
                    <Link
                      to="/registration"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        {t.nav.signIn}
                      </Button>
                    </Link>
                    <Link
                      to="/registration"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button size="sm" className="w-full">
                        {t.nav.getStarted}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
