"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Buildings, ClipboardText, Files } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";

type TabId = "organizational-profile" | "citizen-charter" | "plans-and-reports";

const tabs: { id: TabId; icon: typeof Buildings; label: { en: string; fil: string } }[] = [
  { id: "organizational-profile", icon: Buildings, label: { en: "Organizational Profile", fil: "Organisasyonal na Profile" } },
  { id: "citizen-charter", icon: ClipboardText, label: { en: "Citizen Charter", fil: "Citizen Charter" } },
  { id: "plans-and-reports", icon: Files, label: { en: "Plans and Reports", fil: "Mga Plano at Ulat" } },
];


const organizationalHighlights = [
  { title: { en: "Legal basis", fil: "Legal na batayan" }, description: { en: "Republic Act No. 7924 establishes MMDA as the agency responsible for metro-wide services and coordination in Metro Manila.", fil: "Itinatag ng Republic Act No. 7924 ang MMDA bilang ahensyang may pananagutan sa metro-wide services at koordinasyon sa Metro Manila." } },
  { title: { en: "Vision", fil: "Bisyon" }, description: { en: "A safe, resilient, and mobility-ready Metro Manila for all residents.", fil: "Isang ligtas, matatag, at mobility-ready na Metro Manila para sa lahat ng residente." } },
  { title: { en: "Mission", fil: "Misyon" }, description: { en: "Deliver coordinated traffic, flood control, public safety, and urban management services through data-driven operations.", fil: "Maghatid ng koordinadong traffic, flood control, public safety, at urban management services gamit ang data-driven operations." } },
  { title: { en: "Operational scope", fil: "Saklaw ng operasyon" }, description: { en: "MMDA coordinates with 17 LGUs and partner national agencies for transport, disaster response, and road operations.", fil: "Nakikipag-ugnayan ang MMDA sa 17 LGU at partner national agencies para sa transport, disaster response, at road operations." } },
] as const;

const officeDirectory = [
  { office: { en: "Traffic Discipline Office", fil: "Traffic Discipline Office" }, function: { en: "Traffic management, enforcement operations, and corridor discipline support.", fil: "Pamamahala ng trapiko, enforcement operations, at corridor discipline support." }, contact: "traffic@mmda.gov.ph", hours: { en: "Mon-Fri, 8:00 AM to 5:00 PM", fil: "Lun-Biy, 8:00 AM hanggang 5:00 PM" } },
  { office: { en: "Flood Control and Sewerage Management", fil: "Flood Control and Sewerage Management" }, function: { en: "Flood mitigation, pumping station monitoring, and drainage response coordination.", fil: "Flood mitigation, pumping station monitoring, at drainage response coordination." }, contact: "floodcontrol@mmda.gov.ph", hours: { en: "24/7 monitoring operations", fil: "24/7 monitoring operations" } },
  { office: { en: "Public Safety Division", fil: "Public Safety Division" }, function: { en: "Incident reporting validation, rapid response coordination, and field deployment support.", fil: "Incident reporting validation, rapid response coordination, at field deployment support." }, contact: "safety@mmda.gov.ph", hours: { en: "Mon-Sat, 7:00 AM to 7:00 PM", fil: "Lun-Sab, 7:00 AM hanggang 7:00 PM" } },
] as const;

const charterCommitments = [
  { en: "No hidden fees", fil: "Walang hidden fees" },
  { en: "No fixers", fil: "Walang fixer" },
  { en: "Clear timelines", fil: "Malinaw na timeline" },
  { en: "Trackable requests", fil: "Nasusubaybayang request" },
] as const;

const charterServices = [
  { name: { en: "Report a road concern", fil: "Mag-ulat ng concern sa kalsada" }, requirements: { en: ["Location", "Concern type", "Photo (optional)", "Contact details"], fil: ["Lokasyon", "Uri ng concern", "Litrato (opsyonal)", "Contact details"] }, processing: { en: "24 to 48 hours initial validation", fil: "24 hanggang 48 oras na initial validation" }, fees: { en: "None", fil: "Wala" }, office: { en: "Public Safety and Operations Coordination", fil: "Public Safety at Operations Coordination" } },
  { name: { en: "Towing and impound inquiry", fil: "Towing at impound inquiry" }, requirements: { en: ["Plate number", "Valid ID", "Authorization letter (if representative)"], fil: ["Plate number", "Valid ID", "Authorization letter (kung kinatawan)"] }, processing: { en: "Same-day verification during service hours", fil: "Same-day verification sa oras ng serbisyo" }, fees: { en: "Based on published towing and storage schedule", fil: "Ayon sa published towing at storage schedule" }, office: { en: "Towing and Impound Management", fil: "Towing at Impound Management" } },
] as const;

const kpiCards = [
  { label: { en: "Average corridor speed", fil: "Average corridor speed" }, value: "26 km/h", note: { en: "on priority corridors", fil: "sa priority corridors" } },
  { label: { en: "Incident response time", fil: "Incident response time" }, value: "18 min", note: { en: "median dispatch-to-arrival", fil: "median dispatch-to-arrival" } },
  { label: { en: "Flood response readiness", fil: "Flood response readiness" }, value: "92%", note: { en: "pumping station uptime", fil: "pumping station uptime" } },
  { label: { en: "Cleared obstructions", fil: "Cleared obstructions" }, value: "1,240", note: { en: "clearing actions this quarter", fil: "clearing actions ngayong quarter" } },
] as const;

const reports = [
  { title: { en: "2026 Q1 Traffic Operations Performance Report", fil: "2026 Q1 Traffic Operations Performance Report" }, period: { en: "January to March 2026", fil: "Enero hanggang Marso 2026" }, owner: { en: "Traffic Discipline Office", fil: "Traffic Discipline Office" }, date: "Apr 15, 2026", status: { en: "Published", fil: "Published" }, file: "PDF, 2.4 MB", href: "/reports/transparency/2026-q1-traffic-operations-performance-report.pdf", downloadName: "2026-q1-traffic-operations-performance-report.pdf" },
  { title: { en: "2026 Flood Mitigation Preparedness Brief", fil: "2026 Flood Mitigation Preparedness Brief" }, period: { en: "Pre-monsoon 2026", fil: "Pre-monsoon 2026" }, owner: { en: "Flood Control and Sewerage Management", fil: "Flood Control and Sewerage Management" }, date: "May 02, 2026", status: { en: "Published", fil: "Published" }, file: "PDF, 1.8 MB", href: "/reports/transparency/2026-flood-mitigation-preparedness-brief.pdf", downloadName: "2026-flood-mitigation-preparedness-brief.pdf" },
  { title: { en: "2026 Mid-Year Budget Utilization Summary", fil: "2026 Mid-Year Budget Utilization Summary" }, period: { en: "January to June 2026", fil: "Enero hanggang Hunyo 2026" }, owner: { en: "Finance and Planning", fil: "Finance and Planning" }, date: "Jun 30, 2026", status: { en: "Published", fil: "Published" }, file: "PDF, 1.2 MB", href: "/reports/transparency/2026-mid-year-budget-utilization-summary.pdf", downloadName: "2026-mid-year-budget-utilization-summary.pdf" },
] as const;

const projectTracker = [
  { project: { en: "EDSA signal timing optimization", fil: "EDSA signal timing optimization" }, status: { en: "Ongoing", fil: "Ongoing" }, progress: 68 },
  { project: { en: "Flood pump station modernization phase 2", fil: "Flood pump station modernization phase 2" }, status: { en: "Ongoing", fil: "Ongoing" }, progress: 54 },
  { project: { en: "Incident reporting dashboard revamp", fil: "Incident reporting dashboard revamp" }, status: { en: "Completed", fil: "Completed" }, progress: 100 },
] as const;

export default function TransparencyOverviewPage() {
  const { language } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<TabId>("organizational-profile");

  return (
    <section className="w-full max-w-full overflow-x-hidden">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <div className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity" style={{ backgroundImage: "url('/images/transparency/transparency.jpg')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.34),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.16),rgba(2,8,23,0.4))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en" ? "Public access to MMDA institutional information, service standards, and accountability reports." : "Pampublikong akses sa institutional information, service standards, at accountability reports ng MMDA."}
            </p>
            <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(2.6rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en" ? "Transparency Overview" : "Transparency Overview"}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en" ? "Use the tabs below to open Organizational Profile, Citizen Charter, and Plans and Reports." : "Gamitin ang mga tab sa ibaba para buksan ang Organizational Profile, Citizen Charter, at Plans and Reports."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 rounded-[1.25rem] border border-border bg-card p-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={active
                  ? "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                }
              >
                <Icon className="size-4" weight="bold" />
                {language === "en" ? tab.label.en : tab.label.fil}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        {activeTab === "organizational-profile" && (
          <article className="space-y-6 rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <Buildings className="size-4" weight="bold" />
              {language === "en" ? "Organizational profile" : "Organisasyonal na profile"}
            </div>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en" ? "This section explains MMDA's legal mandate, organizational structure, and office-level responsibilities for metro-wide operations." : "Ipinapaliwanag ng seksyong ito ang legal na mandato ng MMDA, istrukturang organisasyonal, at responsibilidad ng bawat opisina para sa metro-wide operations."}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {organizationalHighlights.map((item) => (
                <div key={item.title.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5">
                  <h3 className="text-base font-semibold text-foreground">{language === "en" ? item.title.en : item.title.fil}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{language === "en" ? item.description.en : item.description.fil}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto rounded-[1.2rem] border border-border">
              <div className="min-w-220">
                <div className="grid grid-cols-[minmax(11rem,1.3fr)_minmax(0,2.2fr)_minmax(10rem,1.2fr)_minmax(10rem,1fr)] items-center gap-x-6 border-b border-border bg-muted/40 px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <p>{language === "en" ? "Office" : "Opisina"}</p>
                  <p>{language === "en" ? "Core function" : "Pangunahing tungkulin"}</p>
                  <p>{language === "en" ? "Public contact" : "Public contact"}</p>
                  <p>{language === "en" ? "Hours" : "Oras"}</p>
                </div>
                {officeDirectory.map((office) => (
                  <div key={office.office.en} className="grid grid-cols-[minmax(11rem,1.3fr)_minmax(0,2.2fr)_minmax(10rem,1.2fr)_minmax(10rem,1fr)] items-start gap-x-6 border-b border-border/70 px-5 py-4 text-sm last:border-b-0">
                    <p className="font-medium leading-6 text-foreground">{language === "en" ? office.office.en : office.office.fil}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? office.function.en : office.function.fil}</p>
                    <p className="leading-6 text-muted-foreground">{office.contact}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? office.hours.en : office.hours.fil}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {activeTab === "citizen-charter" && (
          <article className="space-y-6 rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <ClipboardText className="size-4" weight="bold" />
              {language === "en" ? "Citizen charter" : "Citizen charter"}
            </div>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en" ? "The Citizen Charter defines service standards, processing steps, required documents, and expected turnaround times." : "Tinutukoy ng Citizen Charter ang service standards, processing steps, kinakailangang dokumento, at inaasahang turnaround time."}
            </p>
            <div className="flex flex-wrap gap-2">
              {charterCommitments.map((item) => (
                <span key={item.en} className="rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  {language === "en" ? item.en : item.fil}
                </span>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {charterServices.map((service) => (
                <article key={service.name.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5">
                  <h3 className="text-base font-semibold text-foreground">{language === "en" ? service.name.en : service.name.fil}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? "Requirements" : "Requirements"}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {(language === "en" ? service.requirements.en : service.requirements.fil).map((r) => <li key={r}>• {r}</li>)}
                  </ul>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p><span className="font-semibold text-foreground">{language === "en" ? "Processing time:" : "Processing time:"}</span> {language === "en" ? service.processing.en : service.processing.fil}</p>
                    <p><span className="font-semibold text-foreground">{language === "en" ? "Fees:" : "Fees:"}</span> {language === "en" ? service.fees.en : service.fees.fil}</p>
                    <p><span className="font-semibold text-foreground">{language === "en" ? "Responsible office:" : "Responsible office:"}</span> {language === "en" ? service.office.en : service.office.fil}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="rounded-[1.1rem] border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              {language === "en" ? "Need escalation? File service feedback, complaints, or commendations through Hotline 136 and the online feedback form." : "Kailangan ng escalation? Maghain ng service feedback, reklamo, o papuri sa Hotline 136 at online feedback form."}
            </p>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {language === "en" ? "Go to services" : "Pumunta sa mga serbisyo"}
              <ArrowRight className="size-4" weight="bold" />
            </Link>
          </article>
        )}

        {activeTab === "plans-and-reports" && (
          <article className="space-y-6 rounded-[1.9rem] border border-border bg-card p-7 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <Files className="size-4" weight="bold" />
              {language === "en" ? "Plans and reports" : "Mga plano at ulat"}
            </div>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en" ? "This section publishes MMDA plans, targets, accomplishments, and budget-linked performance indicators." : "Inilalathala sa seksyong ito ang mga plano, target, accomplishment, at budget-linked performance indicators ng MMDA."}
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {kpiCards.map((item) => (
                <div key={item.label.en} className="rounded-[1.2rem] border border-border bg-background/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? item.label.en : item.label.fil}</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{language === "en" ? item.note.en : item.note.fil}</p>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? "Recent files" : "Mga kamakailang file"}</h3>
            <div className="overflow-x-auto rounded-[1.2rem] border border-border">
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
                  <div key={item.title.en} className="grid grid-cols-[minmax(0,2.6fr)_minmax(10rem,1.3fr)_minmax(11rem,1.5fr)_minmax(8rem,1fr)_minmax(7rem,0.9fr)_minmax(12rem,1.2fr)] items-start gap-x-6 border-b border-border/70 px-5 py-4 text-sm last:border-b-0">
                    <p className="font-medium leading-6 text-foreground">{language === "en" ? item.title.en : item.title.fil}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? item.period.en : item.period.fil}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? item.owner.en : item.owner.fil}</p>
                    <p className="leading-6 text-muted-foreground">{item.date}</p>
                    <p className="leading-6 text-muted-foreground">{language === "en" ? item.status.en : item.status.fil}</p>
                    <div className="flex items-center gap-2 leading-6 text-muted-foreground">
                      <span>{item.file}</span>
                      <a href={item.href} download={item.downloadName} className="text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {language === "en" ? "Download" : "I-download"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] border border-border bg-background/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{language === "en" ? "Project status tracker" : "Project status tracker"}</p>
              <div className="mt-4 space-y-3">
                {projectTracker.map((item) => (
                  <div key={item.project.en} className="rounded-xl border border-border/70 px-4 py-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-foreground">{language === "en" ? item.project.en : item.project.fil}</p>
                      <p className="shrink-0 text-muted-foreground">{language === "en" ? item.status.en : item.status.fil} • {item.progress}%</p>
                    </div>
                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted/60" aria-hidden="true">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${item.progress}%` }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.progress} aria-label={`${language === "en" ? item.project.en : item.project.fil} progress`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}
      </section>
    </section>
  );
}
