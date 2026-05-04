"use client";

import Link from "next/link";
import { ArrowRight, Buildings, ClipboardText, Files, Info } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";

const transparencyTabs = [
  {
    href: "/transparency/about",
    icon: Info,
    title: { en: "About MMDA", fil: "Tungkol sa MMDA" },
    description: {
      en: "Institutional background, mandate, and public service profile.",
      fil: "Institutional background, mandato, at public service profile.",
    },
  },
  {
    href: "/transparency/organizational-profile",
    icon: Buildings,
    title: { en: "Organizational Profile", fil: "Organisasyonal na Profile" },
    description: {
      en: "Organizational structure, legal basis, and office responsibilities.",
      fil: "Organizational structure, legal basis, at responsibilidad ng mga opisina.",
    },
  },
  {
    href: "/transparency/citizen-charter",
    icon: ClipboardText,
    title: { en: "Citizen Charter", fil: "Citizen Charter" },
    description: {
      en: "Service standards, requirements, timelines, and accountability commitments.",
      fil: "Service standards, requirements, timeline, at accountability commitments.",
    },
  },
  {
    href: "/transparency/plans-and-reports",
    icon: Files,
    title: { en: "Plans and Reports", fil: "Mga Plano at Ulat" },
    description: {
      en: "KPI snapshots, report archives, and project progress tracker.",
      fil: "KPI snapshots, report archives, at project progress tracker.",
    },
  },
] as const;

export default function TransparencyOverviewPage() {
  const { language } = useSettingsStore();

  return (
    <section className="w-full max-w-full overflow-x-hidden">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/transparency/transparency.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.34),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.16),rgba(2,8,23,0.4))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Public access to MMDA institutional information, service standards, and accountability reports."
                : "Pampublikong akses sa institutional information, service standards, at accountability reports ng MMDA."}
            </p>
            <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(2.6rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en" ? "Transparency Overview" : "Transparency Overview"}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Use the tabs below to open Organizational Profile, Citizen Charter, and Plans and Reports."
                : "Gamitin ang mga tab sa ibaba para buksan ang Organizational Profile, Citizen Charter, at Plans and Reports."}
            </p>

            <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {transparencyTabs.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Icon className="size-4" weight="bold" />
                    {language === "en" ? item.title.en : item.title.fil}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid gap-4 md:grid-cols-2">
          {transparencyTabs.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.5rem] border border-border bg-card p-6 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="size-5 text-primary" weight="bold" />
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  {language === "en" ? item.title.en : item.title.fil}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {language === "en" ? item.description.en : item.description.fil}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {language === "en" ? "Open tab" : "Buksan ang tab"}
                  <ArrowRight className="size-4" weight="bold" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}
