"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";

/**
 * Syncs Zustand settings (dark mode, font size, high contrast, language)
 * to the DOM so CSS and Tailwind classes react accordingly.
 */
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { darkMode, fontSize, highContrast, language } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;

    // Dark mode
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Font size
    const fontSizeMap = ["100%", "112.5%", "125%"];
    root.style.fontSize = fontSizeMap[fontSize];

    // High contrast
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Language
    root.lang = language === "fil" ? "fil" : "en";
  }, [darkMode, fontSize, highContrast, language]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t("nav.skipToContent", language)}
      </a>
      {children}
    </>
  );
}
