"use client";

import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockAdvisory } from "@/lib/mock-data";
import { Warning, CloudRain } from "@phosphor-icons/react";

export function AdvisoryStrip() {
  const { language } = useSettingsStore();

  if (!mockAdvisory.active) return null;

  return (
    <div
      className={`border-b ${mockAdvisory.type === "weather" ? "border-mmda-gold/20 bg-mmda-gold-light" : "border-mmda-red/20 bg-red-50 dark:bg-red-950/20"}`}
      role="alert"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {mockAdvisory.type === "weather" ? (
          <CloudRain className="size-5 shrink-0 text-mmda-gold" weight="bold" />
        ) : (
          <Warning className="size-5 shrink-0 text-mmda-red" weight="bold" />
        )}
        <p className="text-sm font-medium text-foreground">
          {language === "en" ? mockAdvisory.title : mockAdvisory.titleFil}
        </p>
      </div>
    </div>
  );
}
