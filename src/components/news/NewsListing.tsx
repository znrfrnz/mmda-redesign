"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockNews, type NewsArticle } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | NewsArticle["category"];

const ITEMS_PER_PAGE = 5;

const categoryLabels = {
  advisory: { en: "Advisory", fil: "Abiso" },
  press: { en: "Press release", fil: "Pahayag sa press" },
  notice: { en: "Public notice", fil: "Pampublikong abiso" },
} as const;

const filterLabels = {
  en: {
    all: "All updates",
    advisory: "Advisories",
    press: "Press releases",
    notice: "Public notices",
  },
  fil: {
    all: "Lahat ng update",
    advisory: "Mga abiso",
    press: "Pahayag sa press",
    notice: "Pampublikong abiso",
  },
} as const;

export function NewsListing() {
  const { language } = useSettingsStore();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return mockNews;
    return mockNews.filter((article) => article.category === activeFilter);
  }, [activeFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://picsum.photos/seed/mmda-news-hero/1920/1080')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Follow MMDA advisories, operational notices, and press releases from one consolidated newsroom."
                : "Subaybayan ang MMDA advisories, operational notice, at press release mula sa iisang consolidated newsroom."}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "News, advisories, and public notices."
                : "Balita, abiso, at pampublikong paunawa."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Use filters below to move quickly between advisories, public notices, and press communications."
                : "Gamitin ang filter sa ibaba para mabilis lumipat sa advisories, public notice, at press communication."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/traffic"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open traffic tools" : "Buksan ang traffic tools"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <Link
                href="/services/report-concern"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <nav className="flex flex-wrap gap-2" role="tablist" aria-label="News categories">
          {(["all", "advisory", "press", "notice"] as CategoryFilter[]).map((tab) => (
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
              {filterLabels[language][tab]}
            </button>
          ))}
        </nav>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            {language === "en" ? "No articles found in this category." : "Walang artikulong nahanap sa kategoryang ito."}
          </p>
        ) : (
          <>
            {featured && (
              <Link
                href={`/news/${featured.slug}`}
                className="group mt-8 block overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-70 overflow-hidden">
                    <Image
                      src={featured.imageUrl || "https://picsum.photos/seed/news-fallback/1200/900"}
                      alt={language === "en" ? featured.title : featured.titleFil}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,45,0.1),rgba(6,20,45,0.75))] lg:hidden" />
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {categoryLabels[featured.category][language]}
                    </p>
                    <h2 className="mt-4 text-[clamp(1.85rem,3vw,2.65rem)] font-semibold leading-tight tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
                      {language === "en" ? featured.title : featured.titleFil}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                      {language === "en" ? featured.excerpt : featured.excerptFil}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarBlank className="size-4" weight="bold" />
                      {new Date(featured.date).toLocaleDateString(language === "en" ? "en-US" : "fil-PH", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {language === "en" ? "Read full update" : "Basahin ang buong update"}
                      <ArrowRight className="size-4" weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-flow-dense">
              {rest.map((article, index) => {
                const spanClass =
                  index === 0
                    ? "lg:col-span-7"
                    : index === rest.length - 1 && rest.length % 2 === 1
                      ? "lg:col-span-12"
                      : "lg:col-span-5";

                return (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className={`group relative overflow-hidden rounded-[1.65rem] border border-border bg-card p-6 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] transition-all hover:border-primary/30 hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${spanClass}`}
                  >
                    <div
                      className="absolute inset-0 opacity-16 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage: `url('https://picsum.photos/seed/${article.slug}-card/1200/800')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.94),rgba(248,250,252,0.88))] dark:bg-[linear-gradient(140deg,rgba(6,20,45,0.9),rgba(10,30,66,0.84))]" />
                    <div className="relative">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {categoryLabels[article.category][language]}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                        {language === "en" ? article.title : article.titleFil}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {language === "en" ? article.excerpt : article.excerptFil}
                      </p>
                      <p className="mt-4 text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString(language === "en" ? "en-US" : "fil-PH", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground">
                {language === "en"
                  ? `Showing ${visible.length} of ${filtered.length} updates`
                  : `Nagpapakita ng ${visible.length} sa ${filtered.length} na update`}
              </p>
              {hasMore && (
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
                  className="rounded-full px-5"
                >
                  {language === "en" ? "Load more updates" : "Mag-load pa ng update"}
                </Button>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
