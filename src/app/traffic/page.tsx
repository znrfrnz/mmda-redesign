"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { NavigationArrow, Clock, Car, Crosshair, MapTrifold } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TrafficRoute } from "@/components/maps/TrafficMap";

const TrafficMap = dynamic(
  () => import("@/components/maps/TrafficMap").then((mod) => mod.TrafficMap),
  { ssr: false, loading: () => <div className="h-[500px] w-full rounded-xl bg-muted animate-pulse" /> }
);

// Real locations to fly to on the map
const routeLocations: (TrafficRoute & { status: "light" | "moderate" | "heavy"; speed: number })[] = [
  { id: "edsa-ortigas", name: "EDSA – Ortigas", center: [14.5880, 121.0565], zoom: 15, status: "heavy", speed: 12 },
  { id: "edsa-cubao", name: "EDSA – Cubao", center: [14.6220, 121.0530], zoom: 15, status: "heavy", speed: 14 },
  { id: "edsa-guadalupe", name: "EDSA – Guadalupe", center: [14.5635, 121.0448], zoom: 15, status: "moderate", speed: 22 },
  { id: "edsa-magallanes", name: "EDSA – Magallanes", center: [14.5420, 121.0072], zoom: 15, status: "moderate", speed: 25 },
  { id: "c5-bgc", name: "C5 – BGC / Taguig", center: [14.5350, 121.0560], zoom: 15, status: "light", speed: 45 },
  { id: "c5-libis", name: "C5 – Libis / Eastwood", center: [14.6100, 121.0740], zoom: 15, status: "moderate", speed: 30 },
  { id: "commonwealth", name: "Commonwealth Ave", center: [14.6760, 121.0700], zoom: 14, status: "heavy", speed: 15 },
  { id: "quezon-ave", name: "Quezon Avenue", center: [14.6350, 121.0280], zoom: 14, status: "light", speed: 40 },
  { id: "espana", name: "España Blvd", center: [14.6030, 120.9935], zoom: 15, status: "moderate", speed: 20 },
  { id: "marcos-highway", name: "Marcos Highway", center: [14.6300, 121.0950], zoom: 14, status: "light", speed: 38 },
];

const statusConfig = {
  light: {
    label: "Light",
    labelFil: "Magaan",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  moderate: {
    label: "Moderate",
    labelFil: "Katamtaman",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900",
  },
  heavy: {
    label: "Heavy",
    labelFil: "Mabigat",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-900",
  },
};

// Number coding: Mon=1,2 Tue=3,4 Wed=5,6 Thu=7,8 Fri=9,0
const codingMap: Record<number, number[]> = {
  1: [1, 2], // Monday
  2: [3, 4], // Tuesday
  3: [5, 6], // Wednesday
  4: [7, 8], // Thursday
  5: [9, 0], // Friday
};

function getNumberCodingResult(plate: string, language: "en" | "fil") {
  const lastDigit = plate.replace(/\D/g, "").slice(-1);
  if (!lastDigit) return null;

  const digit = parseInt(lastDigit, 10);
  const today = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat

  if (today === 0 || today === 6) {
    return {
      coded: false,
      message: language === "en"
        ? "No number coding on weekends. You can drive freely today."
        : "Walang number coding sa weekends. Maaari kang magmaneho nang malaya ngayon.",
    };
  }

  const todayCoded = codingMap[today] || [];
  const isCoded = todayCoded.includes(digit);

  if (isCoded) {
    return {
      coded: true,
      message: language === "en"
        ? `Plate ending in ${digit} is CODED today. You cannot drive during window hours (7:00 AM–10:00 AM and 4:00 PM–8:00 PM).`
        : `Ang plate na nagtatapos sa ${digit} ay CODED ngayon. Hindi ka maaaring magmaneho sa window hours (7:00 AM–10:00 AM at 4:00 PM–8:00 PM).`,
    };
  }

  return {
    coded: false,
    message: language === "en"
      ? `Plate ending in ${digit} is NOT coded today. Drive safely!`
      : `Ang plate na nagtatapos sa ${digit} ay HINDI coded ngayon. Mag-ingat sa pagmamaneho!`,
  };
}

export default function TrafficPage() {
  const { language } = useSettingsStore();
  const [plateNumber, setPlateNumber] = useState("");
  const [codingResult, setCodingResult] = useState<{ coded: boolean; message: string } | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  function handleCheckCoding() {
    const result = getNumberCodingResult(plateNumber, language);
    setCodingResult(result);
  }

  const dayNames = language === "en"
    ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    : ["Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "Traffic & Roads" : "Trapiko at Kalsada"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {language === "en"
            ? "Real-time traffic conditions, route information, and number coding schedule for Metro Manila."
            : "Real-time na kondisyon ng trapiko, impormasyon sa ruta, at number coding schedule para sa Metro Manila."}
        </p>
      </div>

      {/* Route Status Cards + Map — interactive */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <h2 className="text-lg font-semibold">
              {language === "en" ? "Live Traffic Flow" : "Live na Daloy ng Trapiko"}
            </h2>
          </div>
          {selectedRoute && (
            <button
              onClick={() => setSelectedRoute(null)}
              className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {language === "en" ? "Show all routes" : "Ipakita lahat ng ruta"}
            </button>
          )}
        </div>

        <p className="mb-4 text-xs text-muted-foreground flex items-center gap-1.5">
          <MapTrifold className="size-3.5" weight="bold" />
          {language === "en"
            ? "Real-time traffic data from TomTom. Colors on roads show actual current congestion."
            : "Real-time na traffic data mula sa TomTom. Ang mga kulay sa kalsada ay nagpapakita ng aktwal na kasalukuyang trapiko."}
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Map with real TomTom traffic overlay */}
          <div>
            <TrafficMap
              selectedRoute={selectedRoute ? routeLocations.find((r) => r.id === selectedRoute) : null}
              className="h-[500px] w-full rounded-xl border border-border"
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" weight="bold" />
                {language === "en" ? "Live — powered by TomTom" : "Live — powered by TomTom"}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-emerald-500" /> {language === "en" ? "Free flow" : "Maluwag"}</span>
                <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-amber-500" /> {language === "en" ? "Slow" : "Mabagal"}</span>
                <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-red-500" /> {language === "en" ? "Congested" : "Masikip"}</span>
              </div>
            </div>
          </div>

          {/* Route selector panel */}
          <div className="space-y-2 max-h-[540px] overflow-y-auto">
            <p className="text-xs font-medium text-muted-foreground mb-3 sticky top-0 bg-background pb-2">
              <Crosshair className="inline size-3.5 mr-1 -mt-0.5" weight="bold" />
              {language === "en" ? "Jump to a location" : "Pumunta sa lokasyon"}
            </p>
            {routeLocations.map((route) => {
              const config = statusConfig[route.status];
              const isSelected = selectedRoute === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(isSelected ? null : route.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-all",
                    "hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border"
                  )}
                  aria-pressed={isSelected}
                >
                  <NavigationArrow className="size-4 shrink-0 text-muted-foreground" weight="bold" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{route.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn("size-2 rounded-full", config.dot)} />
                      <span className={cn("text-xs font-medium", config.text)}>
                        {language === "en" ? config.label : config.labelFil}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn("text-base font-bold tabular-nums", config.text)}>
                      {route.speed}
                    </p>
                    <p className="text-[11px] text-muted-foreground">km/h</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Number Coding Widget */}
      <section id="number-coding">
        <h2 className="text-lg font-semibold mb-4">
          <Car className="inline-block size-5 mr-2 -mt-0.5" weight="bold" />
          {language === "en" ? "Number Coding Checker" : "Number Coding Checker"}
        </h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              {language === "en"
                ? "Enter your plate number to check if your vehicle is coded today."
                : "Ilagay ang iyong plate number upang malaman kung coded ang iyong sasakyan ngayon."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                type="text"
                placeholder={language === "en" ? "e.g. ABC 1234" : "hal. ABC 1234"}
                value={plateNumber}
                onChange={(e) => {
                  setPlateNumber(e.target.value.toUpperCase());
                  setCodingResult(null);
                }}
                className="flex-1"
                aria-label={language === "en" ? "Plate number" : "Plate number"}
              />
              <Button
                onClick={handleCheckCoding}
                disabled={!plateNumber.trim()}
                className="active:scale-[0.98] transition-transform"
              >
                {language === "en" ? "Check" : "I-check"}
              </Button>
            </div>

            {codingResult && (
              <div
                className={cn(
                  "mt-4 rounded-lg border px-4 py-3 text-sm",
                  codingResult.coded
                    ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                )}
              >
                {codingResult.message}
              </div>
            )}

            {/* Schedule reference */}
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                {language === "en" ? "Number Coding Schedule" : "Iskedyul ng Number Coding"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                {dayNames.map((day, i) => {
                  const digits = codingMap[i + 1];
                  return (
                    <div key={day} className="rounded border border-border px-3 py-2 text-center">
                      <p className="font-medium">{day}</p>
                      <p className="mt-0.5 text-muted-foreground">
                        {digits?.join(", ")}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                {language === "en"
                  ? "Window hours: 7:00 AM – 10:00 AM and 4:00 PM – 8:00 PM, weekdays only."
                  : "Window hours: 7:00 AM – 10:00 AM at 4:00 PM – 8:00 PM, weekdays lamang."}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
