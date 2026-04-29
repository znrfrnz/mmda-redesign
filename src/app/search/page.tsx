"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockNews, mockServices } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";

const pages = [
  {
    title: "Traffic & Roads",
    titleFil: "Trapiko at Kalsada",
    href: "/traffic",
    description: "Real-time traffic status, number coding, and route information.",
    descriptionFil: "Real-time na trapiko, number coding, at impormasyon sa ruta.",
  },
  {
    title: "About MMDA",
    titleFil: "Tungkol sa MMDA",
    href: "/about",
    description: "Mandate, charter commitments, frontline offices, and history.",
    descriptionFil: "Mandato, charter commitments, frontline offices, at kasaysayan.",
  },
  {
    title: "Contact",
    titleFil: "Makipag-ugnayan",
    href: "/contact",
    description: "Hotlines, office address, and contact form.",
    descriptionFil: "Mga hotline, address ng opisina, at contact form.",
  },
];

export default function SearchPage() {
  const { language } = useSettingsStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { services: [], news: [], pageResults: [] };

    const services = mockServices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.titleFil.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );

    const news = mockNews.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.titleFil.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q)
    );

    const pageResults = pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.titleFil.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    return { services, news, pageResults };
  }, [query]);

  const hasResults =
    results.services.length > 0 ||
    results.news.length > 0 ||
    results.pageResults.length > 0;

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://picsum.photos/seed/mmda-search-hero/1920/1080')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Search MMDA services, advisories, and information pages from one unified index."
                : "Maghanap ng MMDA services, advisories, at information page sa iisang unified index."}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
              {language === "en" ? "Find what you need with " : "Hanapin ang kailangan mo gamit ang "}
              <span
                className="mx-2 inline-block h-12 w-24 rounded-full border border-white/20 align-middle opacity-95 md:h-16 md:w-32"
                style={{
                  backgroundImage: "url('https://picsum.photos/seed/search-inline/640/320')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              {language === "en"
                ? "fewer steps and clearer outcomes."
                : "mas kaunting hakbang at mas malinaw na resulta."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Search across service transactions, latest advisories, and key public pages with one query."
                : "Maghanap sa service transaction, pinakabagong advisory, at mahahalagang public page gamit ang iisang query."}
            </p>

            <div className="mx-auto mt-10 max-w-3xl rounded-[1.6rem] border border-white/15 bg-white/8 p-3 backdrop-blur">
              <div className="relative">
                <MagnifyingGlass
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/65"
                  weight="bold"
                />
                <Input
                  type="search"
                  placeholder={
                    language === "en"
                      ? "Search services, advisories, coding, permits..."
                      : "Maghanap ng serbisyo, advisory, coding, permit..."
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-13 rounded-xl border-white/20 bg-white/90 pl-12 text-sm text-slate-900 placeholder:text-slate-500"
                  aria-label={language === "en" ? "Search the MMDA website" : "Hanapin sa website ng MMDA"}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        {!query.trim() && (
          <div className="rounded-[1.9rem] border border-border bg-card p-7 text-center md:p-9">
            <MagnifyingGlass className="mx-auto size-10 text-primary/55" weight="bold" />
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {language === "en" ? "Start typing to search." : "Magsimulang mag-type para maghanap."}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
              {language === "en"
                ? "Results will appear across services, news advisories, and key MMDA pages."
                : "Lalabas ang resulta mula sa services, news advisories, at mahahalagang MMDA page."}
            </p>
          </div>
        )}

        {query.trim() && !hasResults && (
          <div className="rounded-[1.9rem] border border-border bg-card p-7 text-center md:p-9">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {language === "en" ? "No matching results yet." : "Wala pang tumutugmang resulta."}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
              {language === "en"
                ? `No results found for "${query}". Try more specific service or location terms.`
                : `Walang nahanap para sa "${query}". Subukang gumamit ng mas tiyak na service o location terms.`}
            </p>
          </div>
        )}

        {query.trim() && hasResults && (
          <div className="space-y-10">
            {results.services.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {language === "en" ? "Services" : "Mga serbisyo"} ({results.services.length})
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-flow-dense">
                  {results.services.map((service, index) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      className={`group relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-5 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        index === 0 ? "lg:col-span-7" : "lg:col-span-5"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {language === "en" ? service.category : service.category}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {language === "en" ? service.title : service.titleFil}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {language === "en" ? service.description : service.descriptionFil}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {language === "en" ? "Open service" : "Buksan ang serbisyo"}
                        <ArrowRight className="size-4" weight="bold" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.news.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {language === "en" ? "News and advisories" : "Balita at advisory"} ({results.news.length})
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {results.news.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group rounded-[1.5rem] border border-border bg-card p-5 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {article.category}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {language === "en" ? article.title : article.titleFil}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {language === "en" ? article.excerpt : article.excerptFil}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString(
                          language === "en" ? "en-US" : "fil-PH",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.pageResults.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {language === "en" ? "Pages" : "Mga pahina"} ({results.pageResults.length})
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {results.pageResults.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group rounded-[1.5rem] border border-border bg-card p-5 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {language === "en" ? page.title : page.titleFil}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {language === "en" ? page.description : page.descriptionFil}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
