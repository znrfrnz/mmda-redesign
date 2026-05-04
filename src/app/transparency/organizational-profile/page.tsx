"use client";

import Link from "next/link";
import { ArrowRight, Buildings, ClipboardText, Files, Info } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";

const tabLinks = [
  { href: "/transparency", label: { en: "Overview", fil: "Overview" }, icon: Info },
  { href: "/transparency/organizational-profile", label: { en: "Organizational Profile", fil: "Organisasyonal na Profile" }, icon: Buildings },
  { href: "/transparency/citizen-charter", label: { en: "Citizen Charter", fil: "Citizen Charter" }, icon: ClipboardText },
  { href: "/transparency/plans-and-reports", label: { en: "Plans and Reports", fil: "Mga Plano at Ulat" }, icon: Files },
] as const;

const organizationalHighlights = [
  {
    title: { en: "Legal basis", fil: "Legal na batayan" },
    description: {
      en: "Republic Act No. 7924 establishes MMDA as the agency responsible for metro-wide services and coordination in Metro Manila.",
      fil: "Itinatag ng Republic Act No. 7924 ang MMDA bilang ahensyang may pananagutan sa metro-wide services at koordinasyon sa Metro Manila.",
    },
  },
  {
    title: { en: "Vision", fil: "Bisyon" },
    description: {
      en: "A safe, resilient, and mobility-ready Metro Manila for all residents.",
      fil: "Isang ligtas, matatag, at mobility-ready na Metro Manila para sa lahat ng residente.",
    },
  },
  {
    title: { en: "Mission", fil: "Misyon" },
    description: {
      en: "Deliver coordinated traffic, flood control, public safety, and urban management services through data-driven operations.",
      fil: "Maghatid ng koordinadong traffic, flood control, public safety, at urban management services gamit ang data-driven operations.",
    },
  },
  {
    title: { en: "Operational scope", fil: "Saklaw ng operasyon" },
    description: {
      en: "MMDA coordinates with 17 LGUs and partner national agencies for transport, disaster response, and road operations.",
      fil: "Nakikipag-ugnayan ang MMDA sa 17 LGU at partner national agencies para sa transport, disaster response, at road operations.",
    },
  },
] as const;

const officeDirectory = [
  {
    office: { en: "Traffic Discipline Office", fil: "Traffic Discipline Office" },
    function: {
      en: "Traffic management, enforcement operations, and corridor discipline support.",
      fil: "Pamamahala ng trapiko, enforcement operations, at corridor discipline support.",
    },
    contact: "traffic@mmda.gov.ph",
    hours: { en: "Mon-Fri, 8:00 AM to 5:00 PM", fil: "Lun-Biy, 8:00 AM hanggang 5:00 PM" },
  },
  {
    office: { en: "Flood Control and Sewerage Management", fil: "Flood Control and Sewerage Management" },
    function: {
      en: "Flood mitigation, pumping station monitoring, and drainage response coordination.",
      fil: "Flood mitigation, pumping station monitoring, at drainage response coordination.",
    },
    contact: "floodcontrol@mmda.gov.ph",
    hours: { en: "24/7 monitoring operations", fil: "24/7 monitoring operations" },
  },
  {
    office: { en: "Public Safety Division", fil: "Public Safety Division" },
    function: {
      en: "Incident reporting validation, rapid response coordination, and field deployment support.",
      fil: "Incident reporting validation, rapid response coordination, at field deployment support.",
    },
    contact: "safety@mmda.gov.ph",
    hours: { en: "Mon-Sat, 7:00 AM to 7:00 PM", fil: "Lun-Sab, 7:00 AM hanggang 7:00 PM" },
  },
] as const;

export default function OrganizationalProfilePage() {
  const { language } = useSettingsStore();

  return (
    <section className="w-full max-w-full overflow-x-hidden">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/transparency/transparency.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Institutional transparency for MMDA structure, mandate scope, and office accountability."
                : "Institutional transparency para sa istruktura ng MMDA, saklaw ng mandato, at accountability ng mga opisina."}
            </p>
            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en" ? "Organizational Profile" : "Organisasyonal na Profile"}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "View legal basis, organizational responsibilities, and office-level functions across metro-wide operations."
                : "Tingnan ang legal basis, responsibilidad ng organisasyon, at office-level functions sa metro-wide operations."}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row">
              <Link
                href="/transparency/about"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open About MMDA" : "Buksan ang Tungkol sa MMDA"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <Link
                href="/transparency/citizen-charter"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open citizen charter" : "Buksan ang citizen charter"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 rounded-[1.25rem] border border-border bg-card p-3">
          {tabLinks.map((tab) => {
            const Icon = tab.icon;
            const active = tab.href === "/transparency/organizational-profile";

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={active
                  ? "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                }
              >
                <Icon className="size-4" weight="bold" />
                {language === "en" ? tab.label.en : tab.label.fil}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <article className="rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
            <Buildings className="size-4" weight="bold" />
            {language === "en" ? "Organizational profile" : "Organisasyonal na profile"}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "This section explains MMDA's legal mandate, organizational structure, and office-level responsibilities for metro-wide operations."
              : "Ipinapaliwanag ng seksyong ito ang legal na mandato ng MMDA, istrukturang organisasyonal, at responsibilidad ng bawat opisina para sa metro-wide operations."}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {organizationalHighlights.map((item) => (
              <div key={item.title.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5 shadow-[0_2px_16px_-10px_rgba(0,0,0,0.08)]">
                <h3 className="text-base font-semibold text-foreground">
                  {language === "en" ? item.title.en : item.title.fil}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {language === "en" ? item.description.en : item.description.fil}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto rounded-[1.2rem] border border-border">
            <div className="min-w-220">
              <div className="grid grid-cols-[minmax(11rem,1.3fr)_minmax(0,2.2fr)_minmax(10rem,1.2fr)_minmax(10rem,1fr)] items-center gap-x-6 border-b border-border bg-muted/40 px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <p>{language === "en" ? "Office" : "Opisina"}</p>
                <p>{language === "en" ? "Core function" : "Pangunahing tungkulin"}</p>
                <p>{language === "en" ? "Public contact" : "Public contact"}</p>
                <p>{language === "en" ? "Hours" : "Oras"}</p>
              </div>
              {officeDirectory.map((office) => (
                <div
                  key={office.office.en}
                  className="grid grid-cols-[minmax(11rem,1.3fr)_minmax(0,2.2fr)_minmax(10rem,1.2fr)_minmax(10rem,1fr)] items-start gap-x-6 border-b border-border/70 px-5 py-4 text-sm last:border-b-0"
                >
                  <p className="font-medium leading-6 text-foreground">{language === "en" ? office.office.en : office.office.fil}</p>
                  <p className="leading-6 text-muted-foreground">{language === "en" ? office.function.en : office.function.fil}</p>
                  <p className="leading-6 text-muted-foreground">{office.contact}</p>
                  <p className="leading-6 text-muted-foreground">{language === "en" ? office.hours.en : office.hours.fil}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/transparency/about"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {language === "en" ? "Go to About MMDA" : "Pumunta sa Tungkol sa MMDA"}
            <ArrowRight className="size-4" weight="bold" />
          </Link>
        </article>
      </section>
    </section>
  );
}
