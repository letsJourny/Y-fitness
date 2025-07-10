import React from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterCard?: string;
  twitterSite?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  schemaType?: string;
  businessName?: string;
  businessType?: string;
  businessDescription?: string;
  businessUrl?: string;
  businessAddress?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  businessPhone?: string;
}

export default function SEO(_props: SEOProps) {
  // Static SEO component - temporarily disabled to avoid context issues
  return null;
}

// Static SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: "Yousef Recharge - Transform Your Fitness Journey",
    description:
      "Join Yousef Recharge for personalized workout plans, nutrition guidance, and expert coaching. Start your fitness transformation today!",
    keywords:
      "fitness, workout, nutrition, personal training, health, exercise",
  },
  registration: {
    title: "Sign Up - Yousef Recharge",
    description:
      "Create your account and start your personalized fitness journey with Yousef Recharge.",
    keywords: "fitness registration, workout signup, personal training account",
  },
  dashboard: {
    title: "Dashboard - Yousef Recharge",
    description:
      "Track your fitness progress, view workout plans, and manage your health journey.",
    keywords: "fitness dashboard, workout tracking, progress monitoring",
  },
};
