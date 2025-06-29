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

interface NavigationProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export default function Navigation({
  isAuthenticated = false,
  isAdmin = false,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Temporary static values while contexts are disabled
  const theme = "light";
  const language = "en";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

            {/* Theme Toggle - Disabled */}
            <Button variant="ghost" size="icon" disabled>
              <Sun className="h-5 w-5" />
            </Button>

            {/* Language Toggle - Disabled */}
            <Button variant="ghost" size="icon" disabled>
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2 inline" />}
                  {item.label}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/registration">
                    <Button variant="outline" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
