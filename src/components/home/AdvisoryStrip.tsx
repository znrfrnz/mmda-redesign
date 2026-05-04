"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockAdvisory } from "@/lib/mock-data";
import { Warning, CloudRain, ArrowRight } from "@phosphor-icons/react";

export function AdvisoryStrip() {
  const { language } = useSettingsStore();

  if (!mockAdvisory.active) return null;

  return (
    <div
      className="px-4 pt-4 sm:px-6 lg:px-8"
      role="alert"
      aria-live="polite"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center gap-3 rounded-[1.35rem] border px-4 py-3 shadow-brand sm:px-5 ${
          mockAdvisory.type === "weather"
            ? "border-amber-200/60 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-950/30"
            : "border-red-200/60 bg-red-50 dark:border-red-800/40 dark:bg-red-950/30"
        }`}
      >
        <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
          mockAdvisory.type === "weather"
            ? "bg-amber-100 dark:bg-amber-900/40"
            : "bg-red-100 dark:bg-red-900/40"
        }`}>
          {mockAdvisory.type === "weather" ? (
            <CloudRain className="size-4 text-amber-600 dark:text-amber-400" weight="bold" />
          ) : (
            <Warning className="size-4 text-red-600 dark:text-red-400" weight="bold" />
          )}
        </div>
        <p className="flex-1 text-sm font-medium leading-6 text-foreground">
          {language === "en" ? mockAdvisory.title : mockAdvisory.titleFil}
        </p>
        <Link
          href="/news?category=advisory"
          className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline sm:inline-flex"
        >
          {language === "en" ? "View details" : "Tingnan ang detalye"}
          <ArrowRight className="size-3" weight="bold" />
        </Link>
      </div>
    </div>
  );
}
