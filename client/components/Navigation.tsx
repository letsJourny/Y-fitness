import React from "react";
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
import { Link } from "react-router-dom";

interface NavigationProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export default function Navigation({
  isAuthenticated = false,
  isAdmin = false,
}: NavigationProps) {
  // Static navigation without useState to avoid React hook issues
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleTheme = () => {
    console.log("Theme toggle temporarily disabled");
  };

  const handleToggleLanguage = () => {
    console.log("Language toggle temporarily disabled");
  };

  const navItems = isAuthenticated
    ? [
        { href: "/dashboard", icon: User, label: "Dashboard" },
        { href: "/plans", icon: Calendar, label: "Plans" },
        { href: "/progress", icon: BarChart3, label: "Progress" },
        { href: "/subscription", icon: CreditCard, label: "Subscription" },
        ...(isAdmin ? [{ href: "/admin", icon: Shield, label: "Admin" }] : []),
      ]
    : [
        { href: "/#features", label: "Features" },
        { href: "/#pricing", label: "Pricing" },
        { href: "/#about", label: "About" },
        { href: "/#contact", label: "Contact" },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center space-x-2"
            >
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Yousef Recharge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2 inline" />}
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle - Static */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleTheme}
              title="Theme toggle (temporarily disabled)"
            >
              <Sun className="h-5 w-5" />
            </Button>

            {/* Language Toggle - Static */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleLanguage}
              title="Language toggle (temporarily disabled)"
            >
              <Globe className="h-5 w-5" />
            </Button>

            {!isAuthenticated && (
              <>
                <Link to="/registration">
                  <Button variant="outline">Sign Up</Button>
                </Link>
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu - Simplified without state */}
          <div className="md:hidden flex items-center">
            <details className="relative">
              <summary className="list-none cursor-pointer">
                <Button variant="ghost" size="icon" aria-label="Toggle menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </summary>

              <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg py-2 z-50">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2 inline" />}
                    {item.label}
                  </Link>
                ))}

                {!isAuthenticated && (
                  <div className="border-t mt-2 pt-2 space-y-1">
                    <Link
                      to="/registration"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
