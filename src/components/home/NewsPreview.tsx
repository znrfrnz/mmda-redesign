"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockNews } from "@/lib/mock-data";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
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

export function NewsPreview() {
  const { language } = useSettingsStore();

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockNews.map((article) => {
          const cat = categoryConfig[article.category];
          return (
            <Link key={article.id} href={`/news/${article.slug}`} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/20 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-2">
                    <Badge variant={cat.variant} className="text-[10px] px-1.5 py-0">
                      {language === "en" ? cat.label : cat.labelFil}
                    </Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <CalendarBlank className="size-3" weight="bold" />
                      {new Date(article.date).toLocaleDateString(
                        language === "en" ? "en-US" : "fil-PH",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {language === "en" ? article.title : article.titleFil}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {language === "en" ? article.excerpt : article.excerptFil}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
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
