"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockTrafficRoutes } from "@/lib/mock-data";
import {
  Car,
  Warning,
  NavigationArrow,
  Receipt,
  CloudRain,
  Phone,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const statusConfig = {
  light: {
    label: "Light",
    labelFil: "Magaan",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  moderate: {
    label: "Moderate",
    labelFil: "Katamtaman",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  heavy: {
    label: "Heavy",
    labelFil: "Mabigat",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
};

const quickActions = [
  {
    href: "/traffic#number-coding",
    icon: Car,
    label: { en: "Check Number Coding", fil: "Tingnan ang Number Coding" },
    desc: { en: "Today's coding schedule", fil: "Iskedyul ng coding ngayon" },
    bg: "bg-primary/5 hover:bg-primary/10 border-primary/10",
    iconColor: "text-primary",
    size: "large" as const,
  },
  {
    href: "/services/report-concern",
    icon: Warning,
    label: { en: "Report a Concern", fil: "Mag-ulat ng Problema" },
    desc: { en: "Roads, flooding, hazards", fil: "Kalsada, baha, panganib" },
    bg: "bg-red-50 hover:bg-red-100/80 dark:bg-red-950/20 dark:hover:bg-red-950/30 border-mmda-red/15",
    iconColor: "text-mmda-red",
    size: "large" as const,
  },
  {
    href: "/traffic",
    icon: NavigationArrow,
    label: { en: "Live Traffic Map", fil: "Live na Mapa ng Trapiko" },
    desc: { en: "Real-time routes", fil: "Real-time na ruta" },
    bg: "bg-emerald-50/80 hover:bg-emerald-100/60 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30 border-emerald-200/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    size: "small" as const,
  },
  {
    href: "/services/traffic-violations",
    icon: Receipt,
    label: { en: "Pay a Violation", fil: "Magbayad ng Multa" },
    desc: { en: "Fines & penalties", fil: "Multa at parusa" },
    bg: "bg-amber-50/80 hover:bg-amber-100/60 dark:bg-amber-950/20 dark:hover:bg-amber-950/30 border-amber-200/40",
    iconColor: "text-amber-600 dark:text-amber-400",
    size: "small" as const,
  },
  {
    href: "/news?category=advisories",
    icon: CloudRain,
    label: { en: "Flood Updates", fil: "Update sa Baha" },
    desc: { en: "Alerts & advisories", fil: "Mga alerto at abiso" },
    bg: "bg-sky-50/80 hover:bg-sky-100/60 dark:bg-sky-950/20 dark:hover:bg-sky-950/30 border-sky-200/40",
    iconColor: "text-sky-600 dark:text-sky-400",
    size: "small" as const,
  },
  {
    href: "/contact",
    icon: Phone,
    label: { en: "Contact Us", fil: "Makipag-ugnayan" },
    desc: { en: "Hotline 136", fil: "Hotline 136" },
    bg: "bg-muted/50 hover:bg-muted border-border",
    iconColor: "text-muted-foreground",
    size: "small" as const,
  },
];

export function HeroSection() {
  const { language } = useSettingsStore();

  const largeActions = quickActions.filter((a) => a.size === "large");
  const smallActions = quickActions.filter((a) => a.size === "small");

  return (
    <section className="relative border-b border-border bg-muted/20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:gap-10 lg:px-8 lg:py-14">
        {/* Left — Kicker, headline, quick actions */}
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            MMDA
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {language === "en"
              ? "What do you need today?"
              : "Ano ang kailangan mo ngayon?"}
          </h1>

          {/* Quick Actions — 2 large + 4 small */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {largeActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    "group flex flex-col gap-3 rounded-xl border p-5 transition-colors",
                    action.bg
                  )}
                >
                  <Icon className={cn("size-6", action.iconColor)} weight="bold" />
                  <div>
                    <p className="text-sm font-semibold">
                      {language === "en" ? action.label.en : action.label.fil}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {language === "en" ? action.desc.en : action.desc.fil}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {smallActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-center transition-colors",
                    action.bg
                  )}
                >
                  <Icon className={cn("size-5", action.iconColor)} weight="bold" />
                  <div>
                    <p className="text-xs font-semibold leading-tight">
                      {language === "en" ? action.label.en : action.label.fil}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {language === "en" ? action.desc.en : action.desc.fil}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right — Live Traffic widget */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-background p-5 shadow-[0_2px_8px_-2px_rgba(0,84,166,0.06)]">
            {/* Widget header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <h2 className="text-sm font-semibold">
                  {language === "en" ? "Live Traffic" : "Live na Trapiko"}
                </h2>
              </div>
              <Link
                href="/traffic"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {language === "en" ? "Full map" : "Buong mapa"}
                <ArrowRight className="size-3" weight="bold" />
              </Link>
            </div>

            {/* Route list */}
            <div className="space-y-1.5">
              {mockTrafficRoutes.slice(0, 5).map((route) => {
                const config = statusConfig[route.status];
                return (
                  <div
                    key={route.id}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                      config.bg
                    )}
                  >
                    <NavigationArrow
                      className="size-3.5 shrink-0 text-muted-foreground"
                      weight="bold"
                    />
                    <p className="flex-1 min-w-0 text-xs font-medium truncate">
                      {route.name}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={cn("size-1.5 rounded-full", config.dot)} />
                      <span className={cn("text-[11px] font-semibold tabular-nums", config.text)}>
                        {route.speed} km/h
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
