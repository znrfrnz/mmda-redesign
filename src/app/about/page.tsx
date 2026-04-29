"use client";

import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Separator } from "@/components/ui/separator";

const leadership = [
  { name: "Romando Artes", position: "Chairman", positionFil: "Tagapangulo" },
  { name: "Maria Santos", position: "General Manager", positionFil: "General Manager" },
  { name: "Carlos Reyes", position: "Assistant General Manager for Planning", positionFil: "Assistant General Manager para sa Planning" },
  { name: "Jose dela Cruz", position: "Assistant General Manager for Operations", positionFil: "Assistant General Manager para sa Operations" },
  { name: "Ana Villanueva", position: "Director, Traffic Discipline Office", positionFil: "Direktor, Traffic Discipline Office" },
  { name: "Roberto Gonzales", position: "Director, Flood Control & Sewerage Management", positionFil: "Direktor, Flood Control & Sewerage Management" },
];

const history = [
  { year: "1975", event: "Metro Manila Commission (MMC) established under Presidential Decree No. 824.", eventFil: "Itinatag ang Metro Manila Commission (MMC) sa ilalim ng Presidential Decree No. 824." },
  { year: "1990", event: "MMC reorganized into the Metropolitan Manila Authority (MMA) under Executive Order No. 392.", eventFil: "Iniorganisa muli ang MMC bilang Metropolitan Manila Authority (MMA) sa ilalim ng Executive Order No. 392." },
  { year: "1995", event: "MMDA created by Republic Act No. 7924, replacing the MMA with expanded mandate.", eventFil: "Itinatag ang MMDA sa pamamagitan ng Republic Act No. 7924, pumalit sa MMA na may pinalawak na mandato." },
  { year: "2003", event: "MMDA implements the Unified Vehicular Volume Reduction Program (Number Coding).", eventFil: "Ipinatupad ng MMDA ang Unified Vehicular Volume Reduction Program (Number Coding)." },
  { year: "2014", event: "Flood control master plan adopted, 72 pumping stations modernized.", eventFil: "Pinagtibay ang flood control master plan, 72 pumping stations ang na-modernize." },
  { year: "2020", event: "EDSA Bus Carousel launched as emergency public transport response.", eventFil: "Inilunsad ang EDSA Bus Carousel bilang emergency public transport response." },
  { year: "2026", event: "Digital transformation initiative launched — new citizen portal, unified fare system.", eventFil: "Inilunsad ang digital transformation initiative — bagong citizen portal, unified fare system." },
];

export default function AboutPage() {
  const { language } = useSettingsStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "About MMDA" : "Tungkol sa MMDA"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {language === "en"
            ? "The Metropolitan Manila Development Authority serves Metro Manila's 16 cities and 1 municipality."
            : "Ang Metropolitan Manila Development Authority ay nagsisilbi sa 16 na lungsod at 1 munisipalidad ng Metro Manila."}
        </p>
      </div>

      {/* Mandate */}
      <section className="mb-10">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          {language === "en" ? "Mandate" : "Mandato"}
        </h2>
        <Separator className="mb-6" />
        <div className="space-y-4 text-sm leading-relaxed text-foreground/90 max-w-[75ch]">
          <p>
            {language === "en"
              ? "The MMDA is a government agency created by Republic Act No. 7924 in 1995. It is mandated to perform planning, monitoring, and coordinative functions — and in the process, exercise regulatory and supervisory authority over the delivery of metro-wide services in Metro Manila."
              : "Ang MMDA ay isang ahensya ng gobyerno na nilikha ng Republic Act No. 7924 noong 1995. Ito ay mandatong magsagawa ng mga tungkulin sa pagpaplano, pagsubaybay, at koordinasyon — at sa proseso, mag-ehersisyo ng regulatory at supervisory authority sa paghahatid ng mga serbisyong metro-wide sa Metro Manila."}
          </p>
          <p>
            {language === "en"
              ? "These metro-wide services include: transport and traffic management, flood control and sewerage management, solid waste disposal and management, urban renewal and zoning, health and sanitation, urban protection, and public safety."
              : "Kabilang sa mga serbisyong metro-wide na ito ang: transport at traffic management, flood control at sewerage management, solid waste disposal at management, urban renewal at zoning, health at sanitation, urban protection, at public safety."}
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-10">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          {language === "en" ? "Leadership" : "Pamunuan"}
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <div key={person.name} className="flex items-center gap-4">
              <Image
                src={`https://picsum.photos/seed/${person.name.replace(/\s/g, "")}/200/200`}
                alt={person.name}
                width={64}
                height={64}
                className="size-16 rounded-full object-cover border border-border"
              />
              <div>
                <p className="text-sm font-semibold">{person.name}</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? person.position : person.positionFil}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="mb-10">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          {language === "en" ? "Organizational Structure" : "Istraktura ng Organisasyon"}
        </h2>
        <Separator className="mb-6" />
        <div className="max-w-2xl">
          {/* Simple hierarchy */}
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-primary bg-primary/5 px-4 py-3 font-semibold text-primary text-center">
              {language === "en" ? "Chairman" : "Tagapangulo"}
            </div>
            <div className="flex justify-center">
              <div className="h-6 w-px bg-border" />
            </div>
            <div className="rounded-lg border border-border bg-muted/50 px-4 py-3 font-medium text-center">
              {language === "en" ? "General Manager" : "General Manager"}
            </div>
            <div className="flex justify-center">
              <div className="h-6 w-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { en: "Traffic Discipline Office", fil: "Traffic Discipline Office" },
                { en: "Flood Control & Sewerage", fil: "Flood Control & Sewerage" },
                { en: "Road Safety & Traffic Engineering", fil: "Road Safety & Traffic Engineering" },
                { en: "Solid Waste Management", fil: "Solid Waste Management" },
                { en: "Planning Office", fil: "Planning Office" },
                { en: "Public Safety Office", fil: "Public Safety Office" },
              ].map((office) => (
                <div
                  key={office.en}
                  className="rounded-lg border border-border px-3 py-2 text-xs text-center"
                >
                  {language === "en" ? office.en : office.fil}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="text-xl font-bold tracking-tight mb-4">
          {language === "en" ? "History" : "Kasaysayan"}
        </h2>
        <Separator className="mb-6" />
        <div className="relative max-w-2xl">
          {/* Timeline */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
          <div className="space-y-6">
            {history.map((item) => (
              <div key={item.year} className="relative flex gap-4 pl-1">
                <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <span className="text-[10px] font-bold text-primary">{item.year}</span>
                </div>
                <div className="pt-1.5">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {language === "en" ? item.event : item.eventFil}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
