"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockNews, mockServices } from "@/lib/mock-data";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

const pages = [
  { title: "Traffic & Roads", titleFil: "Trapiko at Kalsada", href: "/traffic", description: "Real-time traffic status, number coding, and route information.", descriptionFil: "Real-time na trapiko, number coding, at impormasyon sa ruta." },
  { title: "About MMDA", titleFil: "Tungkol sa MMDA", href: "/about", description: "Mandate, leadership, organizational structure, and history.", descriptionFil: "Mandato, pamunuan, istraktura ng organisasyon, at kasaysayan." },
  { title: "Contact", titleFil: "Makipag-ugnayan", href: "/contact", description: "Hotlines, office address, and contact form.", descriptionFil: "Mga hotline, address ng opisina, at contact form." },
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "Search" : "Maghanap"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {language === "en"
            ? "Find services, news, and information across the MMDA website."
            : "Maghanap ng serbisyo, balita, at impormasyon sa website ng MMDA."}
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-10 max-w-xl">
        <MagnifyingGlass
          className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          weight="bold"
        />
        <Input
          type="search"
          placeholder={
            language === "en"
              ? "Search services, news, traffic..."
              : "Maghanap ng serbisyo, balita, trapiko..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 pl-10 text-sm"
          aria-label={language === "en" ? "Search the MMDA website" : "Hanapin sa website ng MMDA"}
          autoFocus
        />
      </div>

      {/* Results */}
      {query.trim() && !hasResults && (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "en"
              ? `No results found for "${query}". Try a different search term.`
              : `Walang nahanap para sa "${query}". Subukan ang ibang search term.`}
          </p>
        </div>
      )}

      {query.trim() && hasResults && (
        <div className="space-y-10">
          {/* Services */}
          {results.services.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {language === "en" ? "Services" : "Mga Serbisyo"} ({results.services.length})
              </h2>
              <div className="space-y-3">
                {results.services.map((service) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/20 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-sm font-semibold">
                      {language === "en" ? service.title : service.titleFil}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {language === "en" ? service.description : service.descriptionFil}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* News */}
          {results.news.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {language === "en" ? "News & Advisories" : "Balita at Abiso"} ({results.news.length})
              </h2>
              <div className="space-y-3">
                {results.news.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/20 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-sm font-semibold">
                      {language === "en" ? article.title : article.titleFil}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {language === "en" ? article.excerpt : article.excerptFil}
                    </p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
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

          {/* Pages */}
          {results.pageResults.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {language === "en" ? "Pages" : "Mga Pahina"} ({results.pageResults.length})
              </h2>
              <div className="space-y-3">
                {results.pageResults.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/20 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-sm font-semibold">
                      {language === "en" ? page.title : page.titleFil}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {language === "en" ? page.description : page.descriptionFil}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Initial state — no query */}
      {!query.trim() && (
        <div className="py-16 text-center">
          <MagnifyingGlass className="mx-auto size-10 text-muted-foreground/40" weight="bold" />
          <p className="mt-4 text-sm text-muted-foreground">
            {language === "en"
              ? "Start typing to search across services, news, and pages."
              : "Magsimulang mag-type upang maghanap sa mga serbisyo, balita, at pahina."}
          </p>
        </div>
      )}
    </div>
  );
}
