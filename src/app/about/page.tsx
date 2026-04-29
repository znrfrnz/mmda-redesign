"use client";

import { useState } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Eye,
  Target,
  Scroll,
  TrafficSign,
  Recycle,
  Drop,
  Heartbeat,
  Buildings,
  MapTrifold,
  ShieldCheck,
  Handshake,
  CaretDown,
} from "@phosphor-icons/react";

const mandateColors = [
  "text-primary",
  "text-mmda-red",
  "text-amber-600",
  "text-primary",
  "text-mmda-red",
  "text-amber-600",
  "text-primary",
];

const mandates = [
  { label: "Development Planning", icon: MapTrifold },
  { label: "Transport and Traffic Management", icon: TrafficSign },
  { label: "Solid Waste Disposal and Management", icon: Recycle },
  { label: "Flood Control and Sewerage Management", icon: Drop },
  { label: "Urban Renewal, Zoning and Land Use Planning and Shelter Services", icon: Buildings },
  { label: "Health and Sanitation, Urban Protection and Pollution Control", icon: Heartbeat },
  { label: "Public Safety", icon: ShieldCheck },
];

const frontlineOffices = [
  {
    name: "Traffic Discipline Office",
    mission:
      "To provide better management services resulting from a balanced integration of traffic education, engineering and enforcement services.",
  },
  {
    name: "Solid Waste Management Office",
    mission:
      "To promote door to door garbage collection in all LGUs of Metro Manila as a means to achieve litter-free, garbage-free streets, sidewalks, vacant lots and waterways and as a tool in advancing proper collection of recyclable materials thereby reducing the amount of solid waste that would require land filling to the final disposal facilities that MMDA assures to provide.",
  },
  {
    name: "Flood Control and Sewerage Management Office",
    mission:
      "To prevent flooding in Metro Manila and to make all roads flood-free and passable to all types of vehicles and pedestrians at all times.",
  },
  {
    name: "Health, Public Safety and Environmental Protection Office",
    mission:
      "To safeguard the health and sanitation of the region, enhance ecological balance and prevent, control and abate environmental pollution. To continuously implement programs, policies and procedures to achieve public safety, especially disaster preparedness for preventive or rescue operations during times of calamities and disasters.",
  },
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

function FrontlineOfficeItem({ office }: { office: { name: string; mission: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg border border-border px-5 py-4 text-left transition-colors hover:bg-muted/50">
          <span className="text-sm font-bold">{office.name}</span>
          <CaretDown
            weight="bold"
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-5 pb-4 pt-2">
          <p className="text-sm leading-relaxed text-foreground/80">{office.mission}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function AboutPage() {
  const { language } = useSettingsStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "About MMDA" : "Tungkol sa MMDA"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {language === "en"
            ? "The Metropolitan Manila Development Authority serves Metro Manila's 16 cities and 1 municipality."
            : "Ang Metropolitan Manila Development Authority ay nagsisilbi sa 16 na lungsod at 1 munisipalidad ng Metro Manila."}
        </p>
      </div>

      {/* Tab navigation */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            {language === "en" ? "Overview" : "Pangkalahatang-tanaw"}
          </TabsTrigger>
          <TabsTrigger value="mandates">
            {language === "en" ? "Mandates" : "Mga Mandato"}
          </TabsTrigger>
          <TabsTrigger value="charter">
            {language === "en" ? "Citizen's Charter" : "Citizen's Charter"}
          </TabsTrigger>
          <TabsTrigger value="history">
            {language === "en" ? "History" : "Kasaysayan"}
          </TabsTrigger>
        </TabsList>

        {/* ── Overview Tab ── */}
        <TabsContent value="overview">
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              {/* Vision */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Eye weight="bold" className="size-5 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                    {language === "en" ? "Vision" : "Bisyon"}
                  </h3>
                </div>
                <p className="text-sm font-semibold mb-3">
                  &ldquo;TOWARDS A HUMANE, WORLD-CLASS METROPOLIS&rdquo;
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  As a humane metropolis, Metropolitan Manila will become a livable and workable
                  physical environment for all.
                </p>
              </div>

              {/* Mission */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-3">
                  <Target weight="bold" className="size-5 text-amber-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600">
                    {language === "en" ? "Mission" : "Misyon"}
                  </h3>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
                  <p>
                    As a global-oriented metropolis, Metropolitan Manila will evolve into a major
                    business and transaction center in the Asia-Pacific region.
                  </p>
                  <p>
                    As a center of a growth polygon for Luzon Island, Metropolitan Manila will
                    influence the creation of socio-economic opportunities in the areas beyond its
                    political and administrative boundaries.
                  </p>
                </div>
              </div>
            </div>

            {/* The MMDA's Vision (expanded) */}
            <div className="max-w-5xl rounded-lg border border-primary/10 bg-primary/[0.03] p-6">
              <h3 className="text-sm font-bold mb-3">
                {language === "en" ? "The MMDA's Vision" : "Ang Bisyon ng MMDA"}
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
                <p>
                  With Metro Manila as the seat of the National Government and center of Private
                  Business in the country, the challenge of making it a livable, ecological-friendly
                  and dynamic urban center rests with the MMDA and the 17 political units therein.
                </p>
                <p>
                  Thus, the role of the MMDA is to assist the 17 political units in crafting and
                  implementing an integrated development plan characterized by unity of purpose,
                  innovation, resiliency, sustainability, adaptability and creativity in meeting the
                  challenges of transport decongestion, climate change, waste management, and disaster
                  prevention among others, in order to achieve a decent quality of life for Metro
                  Manilans.
                </p>
              </div>
            </div>

            {/* Statement of Policy */}
            <div className="max-w-5xl">
              <Separator className="mb-6" />
              <h3 className="text-base font-bold tracking-tight mb-4">
                {language === "en" ? "Statement of Policy" : "Pahayag ng Patakaran"}
              </h3>
              <div className="flex gap-3 max-w-[75ch]">
                <Scroll weight="bold" className="size-5 shrink-0 text-primary mt-0.5" />
                <p className="text-sm leading-relaxed text-foreground/90">
                  Metropolitan Manila as a special development and administrative region shall
                  delineate and consider basic services affecting or involving Metropolitan Manila.
                  The Authority shall plan, supervise, regulate, monitor, coordinate or implement
                  policies, programs and projects where appropriate, in conformity with the national
                  government policies without prejudice to the autonomy of metro local government
                  units.
                </p>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* ── Mandates Tab ── */}
        <TabsContent value="mandates">
          <section className="space-y-8">
            {/* Mandates grid */}
            <div>
              <h2 className="text-base font-bold tracking-tight mb-4">
                {language === "en" ? "Seven Mandates" : "Pitong Mandato"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-5xl">
                {mandates.map((m, i) => (
                  <div
                    key={m.label}
                    className="flex items-center gap-3 rounded-lg border border-border px-4 py-3"
                  >
                    <m.icon weight="bold" className={`size-5 shrink-0 ${mandateColors[i]}`} />
                    <span className="text-sm font-medium">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontline Offices */}
            <div>
              <Separator className="mb-6" />
              <h2 className="text-base font-bold tracking-tight mb-4">
                {language === "en" ? "Frontline Offices" : "Mga Frontline na Tanggapan"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl">
                {frontlineOffices.map((office) => (
                  <FrontlineOfficeItem key={office.name} office={office} />
                ))}
              </div>
            </div>
          </section>
        </TabsContent>

        {/* ── Citizen's Charter Tab ── */}
        <TabsContent value="charter">
          <section>
            <div className="max-w-[75ch] rounded-lg border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Handshake weight="bold" className="size-5 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Performance Pledge
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                We, the officers and employees of the Metropolitan Manila Development Authority,
                commit to:
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/90 list-disc pl-5">
                <li>
                  Serve the public efficiently with sincerity and utmost courtesy Mondays to Fridays,
                  8:00 a.m. to 5:00 p.m. and if necessary, shall extend our services beyond office
                  hours to immediately respond to the needs of the public.
                </li>
                <li>
                  Promptly provide and deliver efficient and effective metro-wide services that are
                  responsive to the needs of Metro Manilans pursuant to the mandates of MMDA under RA
                  7924.
                </li>
                <li>
                  Ensure strict compliance with service standards, with written explanation for any
                  delays in frontline services.
                </li>
                <li>
                  Empower the public through 24/7 access to information on policies, activities,
                  programs and projects thru the website (www.mmda.gov.ph) and thru hotline 136.
                </li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-amber-600">
                All these we pledge because YOU deserve the BEST.
              </p>
            </div>
          </section>
        </TabsContent>

        {/* ── History Tab ── */}
        <TabsContent value="history">
          <section>
            <div className="relative max-w-2xl">
              <div
                className="absolute left-[18px] top-2 bottom-2 w-px bg-primary/20"
                aria-hidden="true"
              />
              <div className="space-y-6">
                {history.map((item) => (
                  <div key={item.year} className="relative flex gap-4 pl-1">
                    <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground">
                      <span className="text-[11px] font-bold">{item.year}</span>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
