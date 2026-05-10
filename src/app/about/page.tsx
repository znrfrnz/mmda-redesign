"use client";

import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  Drop,
  Eye,
  Handshake,
  Heartbeat,
  MapTrifold,
  Recycle,
  Scroll,
  ShieldCheck,
  Target,
  TrafficSign,
} from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";

const mandates = [
  { label: "Development Planning", icon: MapTrifold },
  { label: "Transport and Traffic Management", icon: TrafficSign },
  { label: "Solid Waste Disposal and Management", icon: Recycle },
  { label: "Flood Control and Sewerage Management", icon: Drop },
  { label: "Urban Renewal, Zoning and Land Use Planning and Shelter Services", icon: Buildings },
  { label: "Health and Sanitation, Urban Protection and Pollution Control", icon: Heartbeat },
  { label: "Public Safety", icon: ShieldCheck },
];

const officesImages = [
  "/images/about/offices/offices-1.jpg",
  "/images/about/offices/offices-2.jpg",
  "/images/about/offices/offices-3.jpg",
  "/images/about/offices/offices-4.jpg",
] as const;

const frontlineOffices = [
  {
    name: "Traffic Discipline Office",
    mission:
      "To provide better management services resulting from a balanced integration of traffic education, engineering and enforcement services.",
  },
  {
    name: "Solid Waste Management Office",
    mission:
      "To promote proper garbage collection and cleaner streets while advancing recyclable recovery and reducing landfill dependency across Metro Manila.",
  },
  {
    name: "Flood Control and Sewerage Management Office",
    mission:
      "To prevent flooding in Metro Manila and make major roads passable for vehicles and pedestrians through continuous drainage and pumping operations.",
  },
  {
    name: "Health, Public Safety and Environmental Protection Office",
    mission:
      "To safeguard sanitation and environmental quality while implementing disaster preparedness and emergency response operations.",
  },
];

const history = [
  {
    year: "1975",
    event: "Metro Manila Commission (MMC) established under Presidential Decree No. 824.",
    eventFil: "Itinatag ang Metro Manila Commission (MMC) sa ilalim ng Presidential Decree No. 824.",
  },
  {
    year: "1990",
    event: "MMC reorganized into the Metropolitan Manila Authority (MMA) under Executive Order No. 392.",
    eventFil: "Iniorganisa muli ang MMC bilang Metropolitan Manila Authority (MMA) sa ilalim ng Executive Order No. 392.",
  },
  {
    year: "1995",
    event: "MMDA created by Republic Act No. 7924, replacing the MMA with expanded mandate.",
    eventFil: "Itinatag ang MMDA sa pamamagitan ng Republic Act No. 7924, kapalit ng MMA na may pinalawak na mandato.",
  },
  {
    year: "2003",
    event: "MMDA implements the Unified Vehicular Volume Reduction Program (Number Coding).",
    eventFil: "Ipinatupad ng MMDA ang Unified Vehicular Volume Reduction Program (Number Coding).",
  },
  {
    year: "2014",
    event: "Flood control master plan adopted and pumping stations modernized.",
    eventFil: "Pinagtibay ang flood control master plan at in-upgrade ang pumping stations.",
  },
  {
    year: "2020",
    event: "EDSA Bus Carousel launched as emergency public transport response.",
    eventFil: "Inilunsad ang EDSA Bus Carousel bilang emergency public transport response.",
  },
  {
    year: "2026",
    event: "Digital transformation initiative launched for integrated public service delivery.",
    eventFil: "Inilunsad ang digital transformation initiative para sa integrated public service delivery.",
  },
];

export default function AboutPage() {
  const { language } = useSettingsStore();

  return (
    <section className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/about/mmda_logo.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Learn how MMDA coordinates metro-wide transport, safety, flood control, and urban operations for Metro Manila."
                : "Alamin kung paano kino-coordinate ng MMDA ang metro-wide transport, safety, flood control, at urban operations para sa Metro Manila."}
            </p>
            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "About the Metropolitan Manila Development Authority."
                : "Tungkol sa Metropolitan Manila Development Authority."}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Vision, mission, mandates, frontline offices, citizen charter commitments, and institutional milestones of the MMDA."
                : "Bisyon, misyon, mandato, frontline offices, citizen charter commitments, at institutional milestones ng MMDA."}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "View citizen services" : "Tingnan ang citizen services"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Contact MMDA" : "Makipag-ugnayan sa MMDA"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <Eye className="size-4" weight="bold" />
              {language === "en" ? "Vision" : "Bisyon"}
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {language === "en" ? "Towards a humane, world-class metropolis." : "Tungo sa makatao at world-class na kalakhang lungsod."}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en"
                ? "Metro Manila should remain livable, workable, and resilient through integrated governance and sustained metro-wide services."
                : "Dapat manatiling livable, workable, at resilient ang Metro Manila sa pamamagitan ng integrated governance at tuloy-tuloy na metro-wide services."}
            </p>
          </article>

          <article className="rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <Target className="size-4" weight="bold" />
              {language === "en" ? "Mission" : "Misyon"}
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {language === "en"
                ? "Coordinate transport, safety, and urban systems at metro scale."
                : "I-coordinate ang transport, safety, at urban systems sa metro scale."}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en"
                ? "MMDA supports local governments through unified planning, operations, and response frameworks for high-impact public concerns."
                : "Sinusuportahan ng MMDA ang mga lokal na pamahalaan sa pamamagitan ng unified planning, operations, at response framework para sa mahahalagang public concern."}
            </p>
          </article>
        </div>

        <article className="mt-6 rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
            <Scroll className="size-4" weight="bold" />
            {language === "en" ? "Statement of policy" : "Pahayag ng patakaran"}
          </div>
          <p className="mt-5 max-w-[95ch] text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Metropolitan Manila as a special development and administrative region shall delineate and consider basic services affecting or involving Metro Manila. The Authority shall plan, supervise, regulate, monitor, coordinate, or implement metro-wide programs in alignment with national policy while respecting the autonomy of local government units."
              : "Ang Metropolitan Manila bilang isang espesyal na rehiyon ng pagpapaunlad at pangangasiwa ay dapat magtakda at isaalang-alang ang mga pangunahing serbisyong nakakaapekto o may kinalaman sa Metro Manila. Ang Awtoridad ay dapat magplano, mangasiwa, mangasiwa, mag-monitor, mag-coordinate, o magpatupad ng mga metro-wide na programa na naaayon sa patakarang pambansa habang iginagalang ang awtonomiya ng mga lokal na yunit ng pamahalaan."}
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
            {language === "en" ? "The seven MMDA mandates." : "Ang pitong mandato ng MMDA."}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Mandates are presented in a denser service map so each operational domain is easy to identify."
              : "Ipinapakita ang mandato sa mas siksik na service map upang madaling makita ang bawat operational domain."}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-flow-dense">
          {mandates.map((mandate, index) => {
            const Icon = mandate.icon;
            const spanClass =
              index < 2 ? "lg:col-span-6" : index < 5 ? "lg:col-span-4" : "lg:col-span-6";

            return (
              <article
                key={mandate.label}
                className={`group relative overflow-hidden rounded-[1.65rem] border border-border bg-card shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] ${spanClass}`}
              >
                <div
                  className="absolute inset-0 opacity-18 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://picsum.photos/seed/${mandate.label.replace(/\s+/g, "-")}/1200/800')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.94),rgba(248,250,252,0.86))] dark:bg-[linear-gradient(140deg,rgba(6,20,45,0.9),rgba(10,30,66,0.84))]" />
                <div className="relative p-6">
                  <Icon className="size-5 text-primary" weight="bold" />
                  <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground">
                    {mandate.label}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
            {language === "en" ? "Frontline offices and operating focus." : "Mga frontline office at pokus sa operasyon."}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Each office below represents a key operational pillar for metropolitan service delivery."
              : "Bawat office sa ibaba ay kumakatawan sa mahalagang operational pillar para sa metropolitan service delivery."}
          </p>
        </div>

        <div className="mt-10 hidden h-90 overflow-hidden rounded-[2rem] border border-border lg:flex">
          {frontlineOffices.map((office, index) => {
            const officeImage = officesImages[index % officesImages.length];

            return (
            <article
              key={office.name}
              className="group relative flex-1 overflow-hidden border-l border-white/10 first:border-l-0 transition-[flex] duration-700 ease-out hover:flex-[1.75]"
            >
              <div
                className="absolute inset-0 opacity-24 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${officeImage}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,45,0.22),rgba(6,20,45,0.9))]" />
              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold leading-snug">{office.name}</h3>
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-7 text-white/74 opacity-0 transition-all duration-500 group-hover:max-h-56 group-hover:opacity-100">
                  {office.mission}
                </p>
              </div>
            </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 lg:hidden">
          {frontlineOffices.map((office) => (
            <article key={office.name} className="rounded-[1.55rem] border border-border bg-card p-5 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold text-foreground">{office.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{office.mission}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="rounded-[2rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
            <Handshake className="size-4" weight="bold" />
            {language === "en" ? "Citizen charter commitment" : "Pangako sa citizen's charter"}
          </div>
          <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,3.1rem)] font-semibold leading-tight tracking-[-0.03em] text-foreground">
            {language === "en"
              ? "Service standards and public accountability."
              : "Service standards at public accountability."}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground md:text-base">
            <li>
              {language === "en"
                ? "Serve the public efficiently with courtesy during office hours and emergency operations when required."
                : "Maglingkod sa publiko nang mahusay at may paggalang sa oras ng opisina at sa emergency operations kung kinakailangan."}
            </li>
            <li>
              {language === "en"
                ? "Provide responsive metro-wide services aligned with MMDA mandates under RA 7924."
                : "Magbigay ng mga responsive na metro-wide na serbisyo na naaayon sa mandato ng MMDA sa ilalim ng RA 7924."}
            </li>
            <li>
              {language === "en"
                ? "Maintain frontline service standards and provide clear explanation for delays when they occur."
                : "Panatilihin ang mga pamantayan sa frontline service at magbigay ng malinaw na paliwanag para sa mga pagkaantala kung mangyari man."}
            </li>
            <li>
              {language === "en"
                ? "Keep the public informed through official channels including website updates and hotline 136 support."
                : "Panatilihing may kaalaman ang publiko sa pamamagitan ng mga opisyal na channel kabilang ang website updates at hotline 136 support."}
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
            {language === "en" ? "Institutional milestones." : "Mga institutional na milestone."}
          </h2>
        </div>

        <div className="mt-10 rounded-[2rem] border border-border bg-card p-6 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-8">
          <div className="relative">
            <div className="absolute bottom-0 left-4 top-2 w-px bg-primary/20" aria-hidden="true" />
            <div className="space-y-7">
              {history.map((item) => (
                <div key={item.year} className="relative flex gap-4 pl-1">
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary text-[11px] font-bold text-primary-foreground">
                    {item.year}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-muted-foreground md:text-base">
                    {language === "en" ? item.event : item.eventFil}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
