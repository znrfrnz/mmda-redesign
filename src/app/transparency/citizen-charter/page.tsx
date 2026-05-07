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

const charterCommitments = [
  { en: "No hidden fees", fil: "Walang hidden fees" },
  { en: "No fixers", fil: "Walang fixer" },
  { en: "Clear timelines", fil: "Malinaw na timeline" },
  { en: "Trackable requests", fil: "Nasusubaybayang request" },
] as const;

const charterServices = [
  {
    name: { en: "Report a road concern", fil: "Mag-ulat ng concern sa kalsada" },
    requirements: {
      en: ["Location", "Concern type", "Photo (optional)", "Contact details"],
      fil: ["Lokasyon", "Uri ng concern", "Litrato (opsyonal)", "Contact details"],
    },
    processing: { en: "24 to 48 hours initial validation", fil: "24 hanggang 48 oras na initial validation" },
    fees: { en: "None", fil: "Wala" },
    office: {
      en: "Public Safety and Operations Coordination",
      fil: "Public Safety at Operations Coordination",
    },
  },
  {
    name: { en: "Towing and impound inquiry", fil: "Towing at impound inquiry" },
    requirements: {
      en: ["Plate number", "Valid ID", "Authorization letter (if representative)"],
      fil: ["Plate number", "Valid ID", "Authorization letter (kung kinatawan)"],
    },
    processing: { en: "Same-day verification during service hours", fil: "Same-day verification sa oras ng serbisyo" },
    fees: {
      en: "Based on published towing and storage schedule",
      fil: "Ayon sa published towing at storage schedule",
    },
    office: { en: "Towing and Impound Management", fil: "Towing at Impound Management" },
  },
] as const;

export default function CitizenCharterPage() {
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
                ? "Public service standards, requirements, and turnaround commitments in one accessible charter."
                : "Public service standards, requirements, at turnaround commitments sa iisang accessible charter."}
            </p>
            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en" ? "Citizen Charter" : "Citizen Charter"}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Review service requirements, processing windows, and accountability pathways before filing requests."
                : "Suriin ang service requirements, processing windows, at accountability pathways bago magsumite ng request."}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open services" : "Buksan ang mga serbisyo"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <Link
                href="/transparency/plans-and-reports"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open plans and reports" : "Buksan ang mga plano at ulat"}
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
            const active = tab.href === "/transparency/citizen-charter";

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
            <ClipboardText className="size-4" weight="bold" />
            {language === "en" ? "Citizen charter" : "Citizen charter"}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "The Citizen Charter defines service standards, processing steps, required documents, and expected turnaround times."
              : "Tinutukoy ng Citizen Charter ang service standards, processing steps, kinakailangang dokumento, at inaasahang turnaround time."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {charterCommitments.map((item) => (
              <span
                key={item.en}
                className="rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary"
              >
                {language === "en" ? item.en : item.fil}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {charterServices.map((service) => (
              <article key={service.name.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5 shadow-[0_2px_16px_-10px_rgba(0,0,0,0.08)]">
                <h3 className="text-base font-semibold text-foreground">
                  {language === "en" ? service.name.en : service.name.fil}
                </h3>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {language === "en" ? "Requirements" : "Requirements"}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground" role="list">
                  {(language === "en" ? service.requirements.en : service.requirements.fil).map((requirement) => (
                    <li key={requirement}>• {requirement}</li>
                  ))}
                </ul>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">{language === "en" ? "Processing time:" : "Processing time:"}</span>{" "}
                    {language === "en" ? service.processing.en : service.processing.fil}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">{language === "en" ? "Fees:" : "Fees:"}</span>{" "}
                    {language === "en" ? service.fees.en : service.fees.fil}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">{language === "en" ? "Responsible office:" : "Responsible office:"}</span>{" "}
                    {language === "en" ? service.office.en : service.office.fil}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 rounded-[1.1rem] border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
            {language === "en"
              ? "Need escalation? File service feedback, complaints, or commendations through Hotline 136 and the online feedback form."
              : "Kailangan ng escalation? Maghain ng service feedback, reklamo, o papuri sa Hotline 136 at online feedback form."}
          </p>

          <div className="mt-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {language === "en" ? "Go to services" : "Pumunta sa mga serbisyo"}
              <ArrowRight className="size-4" weight="bold" />
            </Link>
          </div>
        </article>
      </section>
    </section>
  );
}
