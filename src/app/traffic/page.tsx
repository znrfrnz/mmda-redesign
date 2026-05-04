"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/useSettingsStore";
import type { TrafficRoute } from "@/components/maps/TrafficMap";
import {
  Car,
  Clock,
  Crosshair,
  Drop,
  MapTrifold,
  NavigationArrow,
  Warning,
} from "@phosphor-icons/react";

const TrafficMap = dynamic(
  () => import("@/components/maps/TrafficMap").then((mod) => mod.TrafficMap),
  { ssr: false, loading: () => <div className="h-[520px] w-full rounded-[1.5rem] bg-muted animate-pulse" /> }
);

const FloodMap = dynamic(
  () => import("@/components/maps/FloodMap").then((mod) => mod.FloodMap),
  { ssr: false, loading: () => <div className="h-[520px] w-full rounded-[1.5rem] bg-muted animate-pulse" /> }
);

import type { FloodZone } from "@/components/maps/FloodMap";

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

const floodZones: FloodZone[] = [
  { id: "espana-lacson", name: "España Blvd / Lacson", level: "high", center: [14.6035, 120.9885], radius: 420 },
  { id: "p-tuazon", name: "P. Tuazon, Cubao", level: "high", center: [14.6215, 121.055], radius: 380 },
  { id: "aurora-blvd", name: "Aurora Blvd, QC", level: "high", center: [14.6165, 121.0325], radius: 350 },
  { id: "guadalupe", name: "Guadalupe, Makati", level: "moderate", center: [14.5635, 121.0448], radius: 320 },
  { id: "libertad-pasay", name: "Libertad, Pasay", level: "moderate", center: [14.5445, 121.0005], radius: 300 },
  { id: "sucat-road", name: "Sucat Road, Parañaque", level: "moderate", center: [14.4828, 121.033], radius: 340 },
  { id: "jones-bridge", name: "Jones Bridge, Manila", level: "low", center: [14.596, 120.978], radius: 280 },
  { id: "c5-libis", name: "C5 – Libis / Eastwood", level: "low", center: [14.61, 121.074], radius: 320 },
  { id: "marikina-riverbanks", name: "Marikina Riverbanks", level: "high", center: [14.6435, 121.1025], radius: 500 },
  { id: "taguig-lower", name: "Lower Taguig / FTI", level: "moderate", center: [14.519, 121.063], radius: 380 },
];

const floodLevelConfig = {
  low: {
    label: "Low risk",
    labelFil: "Mababang panganib",
    dot: "bg-yellow-500",
    text: "text-yellow-700 dark:text-yellow-400",
  },
  moderate: {
    label: "Moderate risk",
    labelFil: "Katamtamang panganib",
    dot: "bg-orange-500",
    text: "text-orange-700 dark:text-orange-400",
  },
  high: {
    label: "High risk",
    labelFil: "Mataas na panganib",
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

const codingHolidays: string[] = [
  "01-01", // New Year's Day
  "02-25", // EDSA People Power Anniversary
  "04-09", // Araw ng Kagitingan
  "05-01", // Labor Day
  "06-12", // Independence Day
  "08-21", // Ninoy Aquino Day
  "08-25", // National Heroes Day
  "11-01", // All Saints' Day
  "11-30", // Bonifacio Day
  "12-25", // Christmas Day
  "12-30", // Rizal Day
];

function isCodingHoliday(date: Date): boolean {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return codingHolidays.includes(mmdd);
}

function getNumberCodingResult(plate: string, language: "en" | "fil") {
  const lastDigit = plate.replace(/\D/g, "").slice(-1);
  if (!lastDigit) return null;

  const digit = parseInt(lastDigit, 10);
  const today = new Date();
  const day = today.getDay();

  if (day === 0 || day === 6) {
    return {
      coded: false,
      message:
        language === "en"
          ? "No number coding on weekends. You can drive freely today."
          : "Walang number coding sa weekends. Maaari kang magmaneho nang malaya ngayon.",
    };
  }

  if (isCodingHoliday(today)) {
    return {
      coded: false,
      message:
        language === "en"
          ? "Number coding is SUSPENDED today (holiday). You can drive freely."
          : "Ang number coding ay SUSPENDIDO ngayon (holiday). Maaari kang magmaneho nang malaya.",
    };
  }

  const todayCoded = codingMap[day] || [];
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
      {/* Hero */}
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
                ? "Switch between traffic flow, number coding, and flood advisories — all in one dashboard."
                : "Lumipat sa pagitan ng traffic flow, number coding, at flood advisories — lahat sa isang dashboard."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

      {/* Tabbed dashboard */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <Tabs defaultValue="traffic" className="gap-0">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
              {language === "en" ? "Roads dashboard" : "Dashboard ng kalsada"}
            </h2>

            <TabsList className="h-auto rounded-2xl border border-border bg-card p-1.5 shadow-sm">
              <TabsTrigger value="traffic" className="gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md">
                <NavigationArrow className="size-4" weight="bold" />
                {language === "en" ? "Traffic" : "Trapiko"}
              </TabsTrigger>
              <TabsTrigger value="coding" className="gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md">
                <Car className="size-4" weight="bold" />
                {language === "en" ? "Number coding" : "Number coding"}
              </TabsTrigger>
              <TabsTrigger value="flood" className="gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md">
                <Drop className="size-4" weight="bold" />
                {language === "en" ? "Flood advisory" : "Flood advisory"}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── Traffic tab ── */}
          <TabsContent value="traffic">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs text-muted-foreground">
                <MapTrifold className="size-3.5" weight="bold" />
                {language === "en"
                  ? "Real-time traffic data from TomTom."
                  : "Real-time na traffic data mula sa TomTom."}
              </p>
              {selectedRoute && (
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {language === "en" ? "Show all routes" : "Ipakita lahat ng ruta"}
                </button>
              )}
            </div>

            <div className="rounded-[2.2rem] border border-primary/20 bg-primary/[0.03] p-3 shadow-[0_0_40px_-12px] shadow-primary/10 dark:border-primary/15 dark:bg-primary/[0.02] md:p-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
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
            </div>
          </TabsContent>

          {/* ── Number coding tab ── */}
          <TabsContent value="coding">
            <div className="rounded-[2.2rem] border border-primary/20 bg-primary/[0.03] p-3 shadow-[0_0_40px_-12px] shadow-primary/10 dark:border-primary/15 dark:bg-primary/[0.02] md:p-4">
              <Card className="rounded-[1.9rem] border-border">
                <CardContent className="p-6 md:p-8">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {language === "en" ? "Number coding checker" : "Tagasuri ng number coding"}
                  </p>
                  <p className="mb-6 text-sm leading-7 text-muted-foreground">
                    {language === "en"
                      ? "Enter your plate number and verify if the vehicle is coded today."
                      : "Ilagay ang plate number at alamin kung coded ang sasakyan ngayon."}
                  </p>

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
                    <p className="mt-1 text-xs text-muted-foreground">
                      {language === "en"
                        ? "Number coding is suspended during regular holidays and special non-working days."
                        : "Ang number coding ay suspendido tuwing regular holidays at special non-working days."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Flood advisory tab ── */}
          <TabsContent value="flood">
            <div className="mb-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs text-muted-foreground">
                <Drop className="size-3.5" weight="bold" />
                {language === "en"
                  ? "Known flood-prone areas in Metro Manila. Stay safe during the rainy season."
                  : "Mga kilalang lugar na madaling bumaha sa Metro Manila. Mag-ingat sa tag-ulan."}
              </p>
            </div>

            <div className="rounded-[2.2rem] border border-primary/20 bg-primary/[0.03] p-3 shadow-[0_0_40px_-12px] shadow-primary/10 dark:border-primary/15 dark:bg-primary/[0.02] md:p-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                <Card className="overflow-hidden rounded-[1.9rem] border-border">
                  <CardContent className="p-0">
                    <FloodMap
                      zones={floodZones}
                      className="h-[520px] w-full rounded-[1.9rem]"
                    />
                    <div className="flex flex-wrap items-center gap-4 px-5 py-3">
                      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Drop className="size-3.5" weight="bold" />
                        {language === "en" ? "Flood-prone zones" : "Mga lugar na madaling bumaha"}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <span className="size-2.5 rounded-full bg-yellow-500" />
                          {language === "en" ? "Low" : "Mababa"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="size-2.5 rounded-full bg-orange-500" />
                          {language === "en" ? "Moderate" : "Katamtaman"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="size-2.5 rounded-full bg-red-500" />
                          {language === "en" ? "High" : "Mataas"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[1.9rem] border-border">
                  <CardContent className="max-h-[580px] space-y-2 overflow-y-auto p-4 md:p-5">
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                      <Warning className="size-3.5" weight="bold" />
                      {language === "en" ? "Flood-prone areas" : "Mga lugar na madaling bumaha"}
                    </p>
                    {floodZones.map((zone) => {
                      const cfg = floodLevelConfig[zone.level];
                      return (
                        <div
                          key={zone.id}
                          className="flex items-center gap-3 rounded-[1.1rem] border border-border/70 bg-background/70 px-3 py-3"
                        >
                          <Drop className="size-4 shrink-0 text-muted-foreground" weight="bold" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{zone.name}</p>
                            <div className="mt-0.5 inline-flex items-center gap-1.5">
                              <span className={cn("size-2 rounded-full", cfg.dot)} />
                              <span className={cn("text-xs font-medium", cfg.text)}>
                                {language === "en" ? cfg.label : cfg.labelFil}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
}
