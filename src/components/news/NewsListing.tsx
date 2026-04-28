"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { mockNews, type NewsArticle } from "@/lib/mock-data";
import { CalendarBlank } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | NewsArticle["category"];

const ITEMS_PER_PAGE = 6;

const categoryConfig: Record<
  NewsArticle["category"],
  { label: string; labelFil: string; variant: "destructive" | "secondary" | "outline" }
> = {
  advisory: { label: "Advisory", labelFil: "Abiso", variant: "destructive" },
  press: { label: "Press Release", labelFil: "Pahayag sa Press", variant: "secondary" },
  notice: { label: "Public Notice", labelFil: "Pampublikong Abiso", variant: "outline" },
};

const FILTER_TABS: { key: CategoryFilter; translationKey: string }[] = [
  { key: "all", translationKey: "news.filterAll" },
  { key: "advisory", translationKey: "news.filterAdvisories" },
  { key: "press", translationKey: "news.filterPress" },
  { key: "notice", translationKey: "news.filterNotices" },
];

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

  function handleFilterChange(filter: CategoryFilter) {
    setActiveFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("news.title" as never, language)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          {t("news.description" as never, language)}
        </p>
      </div>

      {/* Filter tabs */}
      <nav
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("news.title" as never, language)}
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeFilter === tab.key}
            onClick={() => handleFilterChange(tab.key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activeFilter === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {t(tab.translationKey as never, language)}
          </button>
        ))}
      </nav>

      {/* Article grid */}
      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {t("news.noResults" as never, language)}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => {
              const cat = categoryConfig[article.category];
              return (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/20 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                    {article.imageUrl && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={article.imageUrl}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardContent className="flex flex-col gap-3 p-5">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={cat.variant}
                          className="text-[10px] px-1.5 py-0"
                        >
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
                      <h2 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {language === "en" ? article.title : article.titleFil}
                      </h2>
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {language === "en"
                          ? article.excerpt
                          : article.excerptFil}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Pagination footer */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">
              {(t("news.showing" as never, language) as string)
                .replace("{count}", String(visible.length))
                .replace("{total}", String(filtered.length))}
            </p>
            {hasMore && (
              <Button
                variant="outline"
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="active:scale-[0.98] transition-transform"
              >
                {t("news.loadMore" as never, language)}
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
