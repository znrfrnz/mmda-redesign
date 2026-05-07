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

const kpiCards = [
  {
    label: { en: "Average corridor speed", fil: "Average corridor speed" },
    value: "26 km/h",
    note: { en: "on priority corridors", fil: "sa priority corridors" },
  },
  {
    label: { en: "Incident response time", fil: "Incident response time" },
    value: "18 min",
    note: { en: "median dispatch-to-arrival", fil: "median dispatch-to-arrival" },
  },
  {
    label: { en: "Flood response readiness", fil: "Flood response readiness" },
    value: "92%",
    note: { en: "pumping station uptime", fil: "pumping station uptime" },
  },
  {
    label: { en: "Cleared obstructions", fil: "Cleared obstructions" },
    value: "1,240",
    note: { en: "clearing actions this quarter", fil: "clearing actions ngayong quarter" },
  },
] as const;

const reports = [
  {
    title: {
      en: "2026 Q1 Traffic Operations Performance Report",
      fil: "2026 Q1 Traffic Operations Performance Report",
    },
    period: { en: "January to March 2026", fil: "Enero hanggang Marso 2026" },
    owner: { en: "Traffic Discipline Office", fil: "Traffic Discipline Office" },
    date: "Apr 15, 2026",
    status: { en: "Published", fil: "Published" },
    file: "PDF, 2.4 MB",
    href: "/reports/transparency/2026-q1-traffic-operations-performance-report.pdf",
    downloadName: "2026-q1-traffic-operations-performance-report.pdf",
  },
  {
    title: {
      en: "2026 Flood Mitigation Preparedness Brief",
      fil: "2026 Flood Mitigation Preparedness Brief",
    },
    period: { en: "Pre-monsoon 2026", fil: "Pre-monsoon 2026" },
    owner: { en: "Flood Control and Sewerage Management", fil: "Flood Control and Sewerage Management" },
    date: "May 02, 2026",
    status: { en: "Published", fil: "Published" },
    file: "PDF, 1.8 MB",
    href: "/reports/transparency/2026-flood-mitigation-preparedness-brief.pdf",
    downloadName: "2026-flood-mitigation-preparedness-brief.pdf",
  },
  {
    title: {
      en: "2026 Mid-Year Budget Utilization Summary",
      fil: "2026 Mid-Year Budget Utilization Summary",
    },
    period: { en: "January to June 2026", fil: "Enero hanggang Hunyo 2026" },
    owner: { en: "Finance and Planning", fil: "Finance and Planning" },
    date: "Jun 30, 2026",
    status: { en: "Published", fil: "Published" },
    file: "PDF, 1.2 MB",
    href: "/reports/transparency/2026-mid-year-budget-utilization-summary.pdf",
    downloadName: "2026-mid-year-budget-utilization-summary.pdf",
  },
] as const;

const projectTracker = [
  {
    project: { en: "EDSA signal timing optimization", fil: "EDSA signal timing optimization" },
    status: { en: "Ongoing", fil: "Ongoing" },
    progress: 68,
  },
  {
    project: { en: "Flood pump station modernization phase 2", fil: "Flood pump station modernization phase 2" },
    status: { en: "Ongoing", fil: "Ongoing" },
    progress: 54,
  },
  {
    project: { en: "Incident reporting dashboard revamp", fil: "Incident reporting dashboard revamp" },
    status: { en: "Completed", fil: "Completed" },
    progress: 100,
  },
] as const;

export default function PlansAndReportsPage() {
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
                ? "Published plans, operational reports, and accountability indicators for transparent public review."
                : "Mga inilathalang plano, operational report, at accountability indicators para sa transparent na public review."}
            </p>
            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en" ? "Plans and Reports" : "Mga Plano at Ulat"}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Track MMDA priorities, review report archives, and download public transparency files."
                : "Subaybayan ang mga prayoridad ng MMDA, suriin ang report archives, at i-download ang public transparency files."}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row">
              <Link
                href="/transparency/citizen-charter"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open citizen charter" : "Buksan ang citizen charter"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open services" : "Buksan ang mga serbisyo"}
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
            const active = tab.href === "/transparency/plans-and-reports";

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
            <Files className="size-4" weight="bold" />
            {language === "en" ? "Plans and reports" : "Mga plano at ulat"}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "This section publishes MMDA plans, targets, accomplishments, and budget-linked performance indicators."
              : "Inilalathala sa seksyong ito ang mga plano, target, accomplishment, at budget-linked performance indicators ng MMDA."}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpiCards.map((item) => (
              <div key={item.label.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5 shadow-[0_2px_16px_-10px_rgba(0,0,0,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {language === "en" ? item.label.en : item.label.fil}
                </p>
                <p className="mt-3 text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{language === "en" ? item.note.en : item.note.fil}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {language === "en" ? "Recent files" : "Mga kamakailang file"}
          </h3>

          <div className="mt-3 overflow-x-auto rounded-[1.2rem] border border-border">
            <div className="min-w-245">
              <div className="grid grid-cols-[minmax(0,2.6fr)_minmax(10rem,1.3fr)_minmax(11rem,1.5fr)_minmax(8rem,1fr)_minmax(7rem,0.9fr)_minmax(12rem,1.2fr)] items-center gap-x-6 border-b border-border bg-muted/40 px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <p>{language === "en" ? "Title" : "Pamagat"}</p>
                <p>{language === "en" ? "Period" : "Saklaw"}</p>
                <p>{language === "en" ? "Office owner" : "May-ari ng opisina"}</p>
                <p>{language === "en" ? "Publish date" : "Petsa"}</p>
                <p>{language === "en" ? "Status" : "Status"}</p>
                <p>{language === "en" ? "File" : "File"}</p>
              </div>
              {reports.map((item) => (
                <div
                  key={item.title.en}
                  className="grid grid-cols-[minmax(0,2.6fr)_minmax(10rem,1.3fr)_minmax(11rem,1.5fr)_minmax(8rem,1fr)_minmax(7rem,0.9fr)_minmax(12rem,1.2fr)] items-start gap-x-6 border-b border-border/70 px-5 py-4 text-sm last:border-b-0"
                >
                  <p className="font-medium leading-6 text-foreground">{language === "en" ? item.title.en : item.title.fil}</p>
                  <p className="leading-6 text-muted-foreground">{language === "en" ? item.period.en : item.period.fil}</p>
                  <p className="leading-6 text-muted-foreground">{language === "en" ? item.owner.en : item.owner.fil}</p>
                  <p className="leading-6 text-muted-foreground">{item.date}</p>
                  <p className="leading-6 text-muted-foreground">{language === "en" ? item.status.en : item.status.fil}</p>
                  <div className="flex items-center gap-2 leading-6 text-muted-foreground">
                    <span>{item.file}</span>
                    <a
                      href={item.href}
                      download={item.downloadName}
                      className="text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {language === "en" ? "Download" : "I-download"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-border bg-background/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {language === "en" ? "Project status tracker" : "Project status tracker"}
            </p>
            <div className="mt-4 space-y-3">
              {projectTracker.map((item) => (
                <div key={item.project.en} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{language === "en" ? item.project.en : item.project.fil}</p>
                    <p className="shrink-0 text-muted-foreground">
                      {language === "en" ? item.status.en : item.status.fil} • {item.progress}%
                    </p>
                  </div>
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted/60" aria-hidden="true">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.progress}
                      aria-label={`${language === "en" ? item.project.en : item.project.fil} progress`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
