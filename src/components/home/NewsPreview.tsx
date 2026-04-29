"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockNews } from "@/lib/mock-data";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

const categoryConfig = {
  advisory: {
    label: "Advisory",
    labelFil: "Abiso",
    variant: "destructive" as const,
  },
  press: {
    label: "Press Release",
    labelFil: "Pahayag sa Press",
    variant: "secondary" as const,
  },
  notice: {
    label: "Public Notice",
    labelFil: "Pampublikong Abiso",
    variant: "outline" as const,
  },
};

function formatDate(date: string, language: string) {
  return new Date(date).toLocaleDateString(
    language === "en" ? "en-US" : "fil-PH",
    { month: "short", day: "numeric", year: "numeric" }
  );
}

export function NewsPreview() {
  const { language } = useSettingsStore();
  const articles = mockNews.slice(0, 3);
  const featured = articles[0];
  const rest = articles.slice(1);

  if (!featured) return null;

  const featuredCat = categoryConfig[featured.category];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {language === "en" ? "Latest News & Advisories" : "Pinakabagong Balita at Abiso"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {language === "en"
              ? "Stay informed with the latest updates from MMDA"
              : "Manatiling updated sa mga pinakabagong balita mula sa MMDA"}
          </p>
        </div>
        <Link
          href="/news"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {language === "en" ? "All news" : "Lahat ng balita"}
          <ArrowRight className="size-4" weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Featured article — large */}
        <div className="md:col-span-3">
          <Link
            href={`/news/${featured.slug}`}
            className="group block border-b border-border pb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <div className="flex items-center gap-2">
              <Badge variant={featuredCat.variant} className="text-[11px] px-1.5 py-0">
                {language === "en" ? featuredCat.label : featuredCat.labelFil}
              </Badge>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <CalendarBlank className="size-3" weight="bold" />
                {formatDate(featured.date, language)}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
              {language === "en" ? featured.title : featured.titleFil}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3 max-w-[65ch]">
              {language === "en" ? featured.excerpt : featured.excerptFil}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              {language === "en" ? "Read more" : "Basahin pa"}
              <ArrowRight className="size-3" weight="bold" />
            </span>
          </Link>
        </div>

        {/* Remaining articles — compact stacked list */}
        <div className="md:col-span-2">
          <div className="divide-y divide-border">
            {rest.map((article) => {
              const cat = categoryConfig[article.category];
              return (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group block py-4 first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={cat.variant} className="text-[11px] px-1.5 py-0">
                      {language === "en" ? cat.label : cat.labelFil}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <CalendarBlank className="size-3" weight="bold" />
                      {formatDate(article.date, language)}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {language === "en" ? article.title : article.titleFil}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {language === "en" ? "View all news" : "Tingnan lahat ng balita"}
          <ArrowRight className="size-4" weight="bold" />
        </Link>
      </div>
    </section>
  );
}
