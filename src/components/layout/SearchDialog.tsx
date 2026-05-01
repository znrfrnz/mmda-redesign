"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
// removed unused Link import
import { useRouter } from "next/navigation";
import { MagnifyingGlass, ArrowRight, X } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockNews, mockServices } from "@/lib/mock-data";
// removed unused `cn`

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
  {
    title: "Services",
    titleFil: "Mga Serbisyo",
    href: "/services",
    description: "Licensing, violations, permits, and citizen assistance.",
    descriptionFil: "Lisensya, paglabag, permit, at tulong sa mamamayan.",
  },
  {
    title: "News & Advisories",
    titleFil: "Balita at Abiso",
    href: "/news",
    description: "Traffic advisories, press releases, and public notices.",
    descriptionFil: "Mga advisory sa trapiko, press release, at pampublikong paunawa.",
  },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { language } = useSettingsStore();
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setQuery(""), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { services: [], news: [], pageResults: [] };

    const services = mockServices
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.titleFil.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const news = mockNews
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.titleFil.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q)
      )
      .slice(0, 3);

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

  const handleNavigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Search">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-2xl animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4">
            <MagnifyingGlass className="size-5 shrink-0 text-muted-foreground" weight="bold" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === "en"
                  ? "Search services, news, pages..."
                  : "Maghanap ng serbisyo, balita, pahina..."
              }
              className="h-14 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <button
              onClick={() => onOpenChange(false)}
              className="flex size-7 items-center justify-center rounded-md border border-border text-xs text-muted-foreground hover:bg-muted"
            >
              <X className="size-3.5" weight="bold" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!query.trim() && (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {language === "en"
                  ? "Start typing to search across services, news, and pages."
                  : "Magsimulang mag-type para maghanap sa services, news, at pages."}
              </div>
            )}

            {query.trim() && !hasResults && (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {language === "en"
                  ? `No results found for "${query}".`
                  : `Walang nahanap para sa "${query}".`}
              </div>
            )}

            {query.trim() && hasResults && (
              <div className="space-y-1">
                {results.pageResults.length > 0 && (
                  <div>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {language === "en" ? "Pages" : "Mga pahina"}
                    </p>
                    {results.pageResults.map((page) => (
                      <button
                        key={page.href}
                        onClick={() => handleNavigate(page.href)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {language === "en" ? page.title : page.titleFil}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {language === "en" ? page.description : page.descriptionFil}
                          </p>
                        </div>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" weight="bold" />
                      </button>
                    ))}
                  </div>
                )}

                {results.services.length > 0 && (
                  <div>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {language === "en" ? "Services" : "Mga serbisyo"}
                    </p>
                    {results.services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleNavigate(service.href)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {language === "en" ? service.title : service.titleFil}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {language === "en" ? service.description : service.descriptionFil}
                          </p>
                        </div>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" weight="bold" />
                      </button>
                    ))}
                  </div>
                )}

                {results.news.length > 0 && (
                  <div>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {language === "en" ? "News" : "Balita"}
                    </p>
                    {results.news.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => handleNavigate(`/news/${article.slug}`)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {language === "en" ? article.title : article.titleFil}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {language === "en" ? article.excerpt : article.excerptFil}
                          </p>
                        </div>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" weight="bold" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border px-4 py-2.5">
            <p className="text-center text-[11px] text-muted-foreground">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd>
              {" "}{language === "en" ? "to close" : "para isara"}
              {" · "}
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
              {" "}{language === "en" ? "to toggle" : "para i-toggle"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
