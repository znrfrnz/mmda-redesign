"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockTrafficRoutes } from "@/lib/mock-data";
import {
  MagnifyingGlass,
  ArrowRight,
  NavigationArrow,
  Clock,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
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

export function HeroSection() {
  const { language } = useSettingsStore();

  return (
    <section className="relative border-b border-border bg-muted/20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8 lg:py-16">
        {/* Left — Headline, search, CTAs */}
        <div className="flex flex-col justify-center lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {language === "en"
              ? "Metropolitan Manila Development Authority"
              : "Metropolitan Manila Development Authority"}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {language === "en"
              ? "Your direct line to Metro Manila public services"
              : "Ang direktang linya mo sa pampublikong serbisyo ng Metro Manila"}
          </h1>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted-foreground">
            {language === "en"
              ? "Check real-time traffic, report road concerns, access government services, and stay updated on advisories — all from one portal."
              : "Tingnan ang real-time na trapiko, mag-ulat ng problema sa kalsada, i-access ang mga serbisyo ng gobyerno, at manatiling updated — lahat sa isang portal."}
          </p>

          {/* Search bar */}
          <div className="mt-8">
            <Link
              href="/search"
              className="group flex h-12 w-full max-w-md items-center gap-3 rounded-lg border border-input bg-background px-4 text-muted-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MagnifyingGlass
                className="size-5 shrink-0 transition-colors group-hover:text-primary"
                weight="bold"
              />
              <span className="text-sm">
                {language === "en"
                  ? "Search services, news, traffic..."
                  : "Maghanap ng serbisyo, balita, trapiko..."}
              </span>
            </Link>
          </div>

          {/* CTAs */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="lg" className="active:scale-[0.98] transition-transform" asChild>
              <Link href="/services">
                {language === "en" ? "Browse Services" : "Tingnan ang Serbisyo"}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="active:scale-[0.98] transition-transform"
              asChild
            >
              <Link href="/services/report-concern">
                {language === "en" ? "Report a Concern" : "Mag-ulat ng Problema"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Right — Live Traffic widget */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-background p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
            {/* Widget header */}
            <div className="flex items-center justify-between mb-4">
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
            <div className="space-y-2">
              {mockTrafficRoutes.slice(0, 5).map((route) => {
                const config = statusConfig[route.status];
                return (
                  <div
                    key={route.id}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      config.bg
                    )}
                  >
                    <NavigationArrow
                      className="size-4 shrink-0 text-muted-foreground"
                      weight="bold"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {route.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={cn("size-1.5 rounded-full", config.dot)}
                      />
                      <span
                        className={cn("text-[11px] font-semibold tabular-nums", config.text)}
                      >
                        {route.speed} km/h
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timestamp */}
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock className="size-3" weight="bold" />
              {language === "en" ? "Updated moments ago" : "Na-update kamakailan lang"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
