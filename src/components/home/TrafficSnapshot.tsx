"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockTrafficRoutes } from "@/lib/mock-data";
import { ArrowRight, NavigationArrow } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const statusConfig = {
  light: {
    label: "Light",
    labelFil: "Magaan",
    color: "bg-emerald-500",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
  moderate: {
    label: "Moderate",
    labelFil: "Katamtaman",
    color: "bg-amber-500",
    textColor: "text-amber-700 dark:text-amber-400",
  },
  heavy: {
    label: "Heavy",
    labelFil: "Mabigat",
    color: "bg-red-500",
    textColor: "text-red-700 dark:text-red-400",
  },
};

export function TrafficSnapshot() {
  const { language } = useSettingsStore();

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "en" ? "Live Traffic" : "Live na Trapiko"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {language === "en"
                ? "Real-time traffic conditions on major routes"
                : "Real-time na kalagayan ng trapiko sa mga pangunahing ruta"}
            </p>
          </div>
          <Link
            href="/traffic"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {language === "en" ? "Full map" : "Buong mapa"}
            <ArrowRight className="size-4" weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockTrafficRoutes.map((route) => {
            const config = statusConfig[route.status];
            return (
              <div
                key={route.id}
                className="flex items-center gap-4 rounded-lg border border-border bg-background p-4"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <NavigationArrow className="size-5 text-muted-foreground" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{route.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("inline-block size-2 rounded-full", config.color)} />
                    <span className={cn("text-xs font-medium", config.textColor)}>
                      {language === "en" ? config.label : config.labelFil}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {route.speed} km/h
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {route.updatedAt}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/traffic"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {language === "en" ? "View full traffic map" : "Tingnan ang buong mapa ng trapiko"}
            <ArrowRight className="size-4" weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
