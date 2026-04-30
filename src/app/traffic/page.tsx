"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/useSettingsStore";
import type { TrafficRoute } from "@/components/maps/TrafficMap";
import {
  Car,
  Clock,
  Crosshair,
  MapTrifold,
  NavigationArrow,
  Warning,
} from "@phosphor-icons/react";

const TrafficMap = dynamic(
  () => import("@/components/maps/TrafficMap").then((mod) => mod.TrafficMap),
  { ssr: false, loading: () => <div className="h-[520px] w-full rounded-[1.8rem] bg-muted animate-pulse" /> }
);

const routeLocations: (TrafficRoute & { status: "light" | "moderate" | "heavy"; speed: number })[] = [
  { id: "edsa-ortigas", name: "EDSA – Ortigas", center: [14.588, 121.0565], zoom: 15, status: "heavy", speed: 12 },
  { id: "edsa-cubao", name: "EDSA – Cubao", center: [14.622, 121.053], zoom: 15, status: "heavy", speed: 14 },
  { id: "edsa-guadalupe", name: "EDSA – Guadalupe", center: [14.5635, 121.0448], zoom: 15, status: "moderate", speed: 22 },
  { id: "edsa-magallanes", name: "EDSA – Magallanes", center: [14.542, 121.0072], zoom: 15, status: "moderate", speed: 25 },
  { id: "c5-bgc", name: "C5 – BGC / Taguig", center: [14.535, 121.056], zoom: 15, status: "light", speed: 45 },
  { id: "c5-libis", name: "C5 – Libis / Eastwood", center: [14.61, 121.074], zoom: 15, status: "moderate", speed: 30 },
  { id: "commonwealth", name: "Commonwealth Ave", center: [14.676, 121.07], zoom: 14, status: "heavy", speed: 15 },
  { id: "quezon-ave", name: "Quezon Avenue", center: [14.635, 121.028], zoom: 14, status: "light", speed: 40 },
  { id: "espana", name: "España Blvd", center: [14.603, 120.9935], zoom: 15, status: "moderate", speed: 20 },
  { id: "marcos-highway", name: "Marcos Highway", center: [14.63, 121.095], zoom: 14, status: "light", speed: 38 },
];

const statusConfig = {
  light: {
    label: "Light",
    labelFil: "Magaan",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  moderate: {
    label: "Moderate",
    labelFil: "Katamtaman",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
  heavy: {
    label: "Heavy",
    labelFil: "Mabigat",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
  },
};

const codingMap: Record<number, number[]> = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8],
  5: [9, 0],
};

function getNumberCodingResult(plate: string, language: "en" | "fil") {
  const lastDigit = plate.replace(/\D/g, "").slice(-1);
  if (!lastDigit) return null;

  const digit = parseInt(lastDigit, 10);
  const today = new Date().getDay();

  if (today === 0 || today === 6) {
    return {
      coded: false,
      message:
        language === "en"
          ? "No number coding on weekends. You can drive freely today."
          : "Walang number coding sa weekends. Maaari kang magmaneho nang malaya ngayon.",
    };
  }

  const todayCoded = codingMap[today] || [];
  const isCoded = todayCoded.includes(digit);

  if (isCoded) {
    return {
      coded: true,
      message:
        language === "en"
          ? `Plate ending in ${digit} is CODED today. You cannot drive during window hours (7:00 AM–10:00 AM and 4:00 PM–8:00 PM).`
          : `Ang plate na nagtatapos sa ${digit} ay CODED ngayon. Hindi ka maaaring magmaneho sa window hours (7:00 AM–10:00 AM at 4:00 PM–8:00 PM).`,
    };
  }

  return {
    coded: false,
    message:
      language === "en"
        ? `Plate ending in ${digit} is NOT coded today. Drive safely.`
        : `Ang plate na nagtatapos sa ${digit} ay HINDI coded ngayon. Mag-ingat sa pagmamaneho.`,
  };
}

export default function TrafficPage() {
  const { language } = useSettingsStore();
  const [plateNumber, setPlateNumber] = useState("");
  const [codingResult, setCodingResult] = useState<{ coded: boolean; message: string } | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  function handleCheckCoding() {
    setCodingResult(getNumberCodingResult(plateNumber, language));
  }

  const dayNames =
    language === "en"
      ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      : ["Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes"];

  return (
    <section className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/Traffic/manila_traffic.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Monitor road flow in real time, jump to key locations, and verify current coding restrictions."
                : "Subaybayan ang road flow sa real time, pumunta sa mahahalagang lokasyon, at i-verify ang kasalukuyang coding restrictions."}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
              {language === "en"
                ? "Live traffic conditions and number coding for Metro Manila."
                : "Live na kondisyon ng trapiko at number coding para sa Metro Manila."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Use route cards to jump the map to critical corridors, then check number coding in the same page."
                : "Gamitin ang route cards para tumalon ang mapa sa critical corridor, at i-check ang number coding sa parehong pahina."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#number-coding"
                className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Car className="size-4" weight="bold" />
                {language === "en" ? "Check number coding" : "I-check ang number coding"}
              </a>
              <Link
                href="/services/report-concern"
                className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Warning className="size-4" weight="bold" />
                {language === "en" ? "Report a road concern" : "Mag-ulat ng road concern"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
            {language === "en" ? "Live traffic flow" : "Live na daloy ng trapiko"}
          </h2>
          {selectedRoute && (
            <button
              onClick={() => setSelectedRoute(null)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {language === "en" ? "Show all routes" : "Ipakita lahat ng ruta"}
            </button>
          )}
        </div>

        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs text-muted-foreground">
          <MapTrifold className="size-3.5" weight="bold" />
          {language === "en"
            ? "Real-time traffic data from TomTom."
            : "Real-time na traffic data mula sa TomTom."}
        </p>

        <div className="relative z-0 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px]">
          <Card className="rounded-[1.9rem] border-border">
            <CardContent className="relative z-0 overflow-hidden rounded-[1.9rem] p-4 md:p-5">
              <TrafficMap
                selectedRoute={selectedRoute ? routeLocations.find((r) => r.id === selectedRoute) ?? null : null}
                className="h-[520px] w-full rounded-[1.5rem] border border-border"
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" weight="bold" />
                  {language === "en" ? "Live — powered by TomTom" : "Live — powered by TomTom"}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="size-2.5 rounded-full bg-emerald-500" />
                    {language === "en" ? "Free flow" : "Maluwag"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-2.5 rounded-full bg-amber-500" />
                    {language === "en" ? "Slow" : "Mabagal"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-2.5 rounded-full bg-red-500" />
                    {language === "en" ? "Congested" : "Masikip"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.9rem] border-border">
            <CardContent className="max-h-[595px] space-y-2 overflow-y-auto p-4 md:p-5">
              <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <Crosshair className="size-3.5" weight="bold" />
                {language === "en" ? "Jump to location" : "Pumunta sa lokasyon"}
              </p>
              {routeLocations.map((route) => {
                const config = statusConfig[route.status];
                const isSelected = selectedRoute === route.id;

                return (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(isSelected ? null : route.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[1.1rem] border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/8"
                        : "border-border/70 bg-background/70 hover:border-primary/30"
                    )}
                    aria-pressed={isSelected}
                  >
                    <NavigationArrow className="size-4 shrink-0 text-muted-foreground" weight="bold" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{route.name}</p>
                      <div className="mt-0.5 inline-flex items-center gap-1.5">
                        <span className={cn("size-2 rounded-full", config.dot)} />
                        <span className={cn("text-xs font-medium", config.text)}>
                          {language === "en" ? config.label : config.labelFil}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-semibold tabular-nums", config.text)}>{route.speed}</p>
                      <p className="text-[11px] text-muted-foreground">km/h</p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="number-coding" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <h2 className="text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
          {language === "en" ? "Number coding checker" : "Tagasuri ng number coding"}
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {language === "en"
            ? "Enter your plate number and verify if the vehicle is coded today."
            : "Ilagay ang plate number at alamin kung coded ang sasakyan ngayon."}
        </p>

        <Card className="mt-6 rounded-[1.9rem] border-border">
          <CardContent className="p-6 md:p-8">
            <div className="max-w-xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="text"
                  placeholder={language === "en" ? "e.g. ABC 1234" : "hal. ABC 1234"}
                  value={plateNumber}
                  onChange={(e) => {
                    setPlateNumber(e.target.value.toUpperCase());
                    setCodingResult(null);
                  }}
                  className="h-11"
                  aria-label={language === "en" ? "Plate number" : "Numero ng plaka"}
                />
                <Button onClick={handleCheckCoding} disabled={!plateNumber.trim()} className="rounded-full px-6">
                  {language === "en" ? "Check" : "I-check"}
                </Button>
              </div>

              {codingResult && (
                <div
                  className={cn(
                    "mt-4 rounded-[1rem] border px-4 py-3 text-sm leading-7",
                    codingResult.coded
                      ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                      : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                  )}
                >
                  {codingResult.message}
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-border/70 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {language === "en" ? "Coding schedule" : "Iskedyul ng coding"}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-5">
                {dayNames.map((day, index) => {
                  const digits = codingMap[index + 1];
                  return (
                    <div key={day} className="rounded-[1rem] border border-border/70 bg-background/70 px-3 py-2 text-center">
                      <p className="text-xs font-semibold text-foreground">{day}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{digits?.join(", ")}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {language === "en"
                  ? "Window hours: 7:00 AM – 10:00 AM and 4:00 PM – 8:00 PM, weekdays only."
                  : "Window hours: 7:00 AM – 10:00 AM at 4:00 PM – 8:00 PM, weekdays lamang."}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
