import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  structuredData?: object;
}

export default function SEO({
  title = "Yousef Recharge - Transform Your Fitness Journey",
  description = "Get personalized workout and nutrition plans that adapt to your lifestyle. Track progress, stay motivated, and achieve lasting results with Yousef Recharge fitness platform.",
  keywords = "fitness, workout, nutrition, health, personal trainer, meal planning, fitness tracker, exercise, Kuwait fitness, weight loss, muscle gain",
  image = "/placeholder.svg",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  structuredData,
}: SEOProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Yousef Recharge");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", language);

    // Open Graph meta tags
    updateMetaProperty("og:title", title);
    updateMetaProperty("og:description", description);
    updateMetaProperty("og:image", image);
    updateMetaProperty("og:url", url);
    updateMetaProperty("og:type", type);
    updateMetaProperty("og:site_name", "Yousef Recharge");
    updateMetaProperty("og:locale", language === "ar" ? "ar_KW" : "en_US");

    // Twitter Card meta tags
    updateMetaProperty("twitter:card", "summary_large_image");
    updateMetaProperty("twitter:title", title);
    updateMetaProperty("twitter:description", description);
    updateMetaProperty("twitter:image", image);

    // Mobile and responsive meta tags
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");
    updateMetaTag("format-detection", "telephone=no");

    // Theme color for mobile browsers
    updateMetaTag("theme-color", "#3b82f6");
    updateMetaTag("msapplication-TileColor", "#3b82f6");

    // Structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    } else {
      // Default organization structured data
      const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Yousef Recharge",
        description: description,
        url: url,
        logo: {
          "@type": "ImageObject",
          url: `${window.location.origin}/placeholder.svg`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+965-1234-5678",
          contactType: "customer service",
          availableLanguage: ["English", "Arabic"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "KW",
          addressLocality: "Kuwait City",
        },
        sameAs: [
          "https://facebook.com/yousefrecharge",
          "https://twitter.com/yousefrecharge",
          "https://instagram.com/yousefrecharge",
        ],
      };
      updateStructuredData(defaultStructuredData);
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    language,
    structuredData,
  ]);

  return null; // This component doesn't render anything
}

// Helper functions
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateStructuredData(data: object) {
  // Remove existing structured data
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]',
  );
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title:
      "Yousef Recharge - Transform Your Fitness Journey | Kuwait Fitness Platform",
    description:
      "Get personalized workout and nutrition plans in Kuwait. Track progress, stay motivated, and achieve lasting results with expert guidance. Start your 7-day free trial today!",
    keywords:
      "Kuwait fitness, workout plans, nutrition tracking, personal trainer Kuwait, fitness app, weight loss Kuwait, muscle gain, health tracker",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Yousef Recharge",
      description:
        "Kuwait's leading fitness platform for personalized workout and nutrition plans",
      url: typeof window !== "undefined" ? window.location.origin : "",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://yousefrecharge.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  },

  registration: {
    title: "Sign Up - Yousef Recharge | Start Your Fitness Journey",
    description:
      "Create your account and get personalized fitness plans. Join thousands who transformed their lives with Yousef Recharge. Free 7-day trial, no credit card required.",
    keywords:
      "fitness signup, join fitness app, create account, fitness registration Kuwait",
  },

  dashboard: {
    title: "Dashboard - Yousef Recharge | Your Fitness Progress",
    description:
      "Track your fitness journey with detailed analytics, workout progress, and nutrition insights. Your personalized fitness dashboard.",
    keywords:
      "fitness dashboard, workout tracker, progress analytics, fitness stats",
  },

  pricing: {
    title: "Pricing Plans - Yousef Recharge | Affordable Fitness Solutions",
    description:
      "Choose the perfect plan for your fitness goals. Flexible pricing starting from 8 KWD/month. All plans include personalized workouts and nutrition guidance.",
    keywords:
      "fitness pricing Kuwait, workout plan cost, nutrition plan pricing, fitness subscription",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Yousef Recharge Fitness Plans",
      description: "Personalized fitness and nutrition plans",
      offers: [
        {
          "@type": "Offer",
          name: "Monthly Plan",
          price: "15",
          priceCurrency: "KWD",
          priceValidUntil: "2025-12-31",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Quarterly Plan",
          price: "12",
          priceCurrency: "KWD",
          priceValidUntil: "2025-12-31",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Yearly Plan",
          price: "8",
          priceCurrency: "KWD",
          priceValidUntil: "2025-12-31",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  },
};
