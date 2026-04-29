"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, NavigationArrow, Phone, Warning } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockServices, type ServiceItem } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServiceFilter = "all" | ServiceItem["category"];

const ITEMS_PER_PAGE = 5;

const tabLabels = {
  en: {
    all: "All services",
    licensing: "Licensing",
    violations: "Violations & fines",
    assistance: "Assistance",
    permits: "Permits",
  },
  fil: {
    all: "Lahat ng serbisyo",
    licensing: "Licensing",
    violations: "Violations at multa",
    assistance: "Assistance",
    permits: "Permits",
  },
} as const;

const serviceStreams = [
  { en: "Licensing guidance", fil: "Gabay sa lisensya" },
  { en: "Violation payments", fil: "Pagbayad ng multa" },
  { en: "Citizen assistance", fil: "Tulong sa mamamayan" },
  { en: "Permit processing", fil: "Pagproseso ng permit" },
  { en: "Roadside support", fil: "Suporta sa kalsada" },
  { en: "Operational reports", fil: "Mga ulat sa operasyon" },
];

const categoryLabels: Record<ServiceItem["category"], { en: string; fil: string }> = {
  licensing: { en: "Licensing", fil: "Paglilisensya" },
  violations: { en: "Violations", fil: "Mga Paglabag" },
  assistance: { en: "Assistance", fil: "Tulong" },
  permits: { en: "Permits", fil: "Mga Permit" },
};

const actionLabels: Record<ServiceItem["category"], { en: string; fil: string }> = {
  licensing: { en: "Start request", fil: "Simulan ang request" },
  violations: { en: "Review status", fil: "Suriin ang status" },
  assistance: { en: "Get support", fil: "Humingi ng tulong" },
  permits: { en: "Open permit flow", fil: "Buksan ang permit flow" },
};

export default function ServicesPage() {
  const { language } = useSettingsStore();
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredServices = useMemo(() => {
    if (activeFilter === "all") return mockServices;
    return mockServices.filter((service) => service.category === activeFilter);
  }, [activeFilter]);

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredServices.length;

  const filterTabs: ServiceFilter[] = [
    "all",
    "licensing",
    "violations",
    "assistance",
    "permits",
  ];

  return (
    <section className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://picsum.photos/seed/mmda-services-hall/1920/1080')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Citizen services are grouped by what residents need to complete, so each task can move from instruction to action with fewer clicks."
                : "Pinangkat ang citizen services ayon sa kailangang gawin ng residente upang mas mabilis makalipat mula instruction tungo sa action."}
            </p>

                        <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
              {language === "en"
                ? "MMDA Citizen Services — Licensing, Violations, Permits, and Assistance."
                : "Mga Serbisyo ng MMDA sa Mamamayan — Lisensya, Paglabag, Permit, at Tulong."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Find requirements, submit applications, check violation status, and request public assistance through MMDA."
                : "Hanapin ang mga requirements, magsumite ng aplikasyon, suriin ang status ng paglabag, at humiling ng tulong publiko sa MMDA."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/services/report-concern"
                className="inline-flex min-w-[240px] items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Warning className="size-4" weight="bold" />
                {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
              </Link>
              <Link
                href="/traffic"
                className="inline-flex min-w-[240px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <NavigationArrow className="size-4" weight="bold" />
                {language === "en" ? "Open traffic tools" : "Buksan ang traffic tools"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-[#08162f] py-6 text-white">
        <div className="marquee-track">
          <div className="marquee-row">
            {[...serviceStreams, ...serviceStreams].map((item, index) => (
              <span
                key={`${item.en}-${index}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72"
              >
                <span className="size-1.5 rounded-full bg-white/45" />
                {language === "en" ? item.en : item.fil}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-4xl text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
              {language === "en"
                ? "Browse MMDA services by category."
                : "Mag-browse ng mga serbisyo ng MMDA ayon sa kategorya."}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {language === "en"
                ? "Select a category below to find requirements, steps, and forms for the MMDA service you need."
                : "Pumili ng kategorya sa ibaba para makita ang mga requirements, hakbang, at forms para sa serbisyo ng MMDA na kailangan mo."}
            </p>
          </div>
          <a
            href="tel:136"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:self-auto"
          >
            <Phone className="size-4" weight="bold" />
            {language === "en" ? "Need help? Call 136" : "Kailangan ng tulong? Tumawag sa 136"}
          </a>
        </div>

        <nav className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Service categories">
          {filterTabs.map((tab) => {
            const label = tabLabels[language][tab];

            return (
              <button
                key={tab}
                role="tab"
                aria-selected={activeFilter === tab}
                onClick={() => {
                  setActiveFilter(tab);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeFilter === tab
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {visibleServices.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            {language === "en" ? "No services found in this category." : "Walang serbisyong nahanap sa kategoryang ito."}
          </p>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {visibleServices.map((service, index) => {
                const isLead = index === 0;

                const action = actionLabels[service.category];

                return (
                  <Link
                    key={service.id}
                    href={service.href}
                    className={cn(
                      "group relative overflow-hidden rounded-[1.9rem] border border-border bg-card shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isLead && visibleServices.length > 1 ? "md:col-span-2" : ""
                    )}
                  >
                    <div
                      className="absolute inset-0 opacity-22 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage: `url('https://picsum.photos/seed/${service.id}-panel/1200/900')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.94),rgba(248,250,252,0.86))] dark:bg-[linear-gradient(140deg,rgba(6,20,45,0.9),rgba(10,30,66,0.84))]" />

                    <div className="relative flex flex-col p-6 md:p-7">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {language === "en" ? (categoryLabels[service.category]?.en ?? service.category) : (categoryLabels[service.category]?.fil ?? service.category)}
                        </p>
                        <h3
                          className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary"
                        >
                          {language === "en" ? service.title : service.titleFil}
                        </h3>
                        <p className="mt-3 max-w-[60ch] text-sm leading-7 text-muted-foreground md:text-base">
                          {language === "en" ? service.description : service.descriptionFil}
                        </p>
                      </div>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {language === "en" ? action.en : action.fil}
                        <ArrowRight className="size-4" weight="bold" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground">
                {language === "en"
                  ? `Showing ${visibleServices.length} of ${filteredServices.length} services`
                  : `Nagpapakita ng ${visibleServices.length} sa ${filteredServices.length} na serbisyo`}
              </p>
              {hasMore && (
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
                  className="rounded-full px-5"
                >
                  {language === "en" ? "Load more services" : "Mag-load pa ng serbisyo"}
                </Button>
              )}
            </div>
          </>
        )}
      </section>

    </section>
  );
}
