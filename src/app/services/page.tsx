"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockServices, type ServiceItem } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServiceFilter = "all" | ServiceItem["category"];

const ITEMS_PER_PAGE = 6;

const tabLabels = {
  en: {
    all: "All",
    licensing: "Licensing",
    violations: "Violations & Fines",
    assistance: "Assistance & Supports",
    permits: "Permits & Authorizations",
  },
  fil: {
    all: "Lahat",
    licensing: "Licensing",
    violations: "Violations & Fines",
    assistance: "Assistance & Supports",
    permits: "Permits & Authorizations",
  },
} as const;

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

  const filterTabs: { key: ServiceFilter }[] = [
    { key: "all" },
    { key: "licensing" },
    { key: "violations" },
    { key: "assistance" },
    { key: "permits" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "Citizen Services" : "Serbisyo para sa Mamamayan"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {language === "en"
            ? "Access MMDA services online, from licensing to permit applications."
            : "Palakasin ang access sa MMDA services online, mula licensing hanggang permit applications."}
        </p>
      </div>

      <nav className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Service categories">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => {
            const label = tabLabels[language as "en" | "fil"][tab.key];

            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeFilter === tab.key}
                aria-label={label}
                onClick={() => {
                  setActiveFilter(tab.key);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeFilter === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {visibleServices.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {language === "en" ? "No services found." : "Walang serbisyong nahanap."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {visibleServices.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group flex items-center gap-4 bg-background px-5 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {language === "en" ? service.title : service.titleFil}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {language === "en" ? service.description : service.descriptionFil}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary">
                  {language === "en"
                    ? service.category === "licensing" ? "Apply now" : service.category === "violations" ? "Check status" : service.category === "assistance" ? "Get help" : "Start application"
                    : service.category === "licensing" ? "Mag-apply" : service.category === "violations" ? "Tingnan ang status" : service.category === "assistance" ? "Humingi ng tulong" : "Magsimula"}
                </span>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground">
                {language === "en"
                  ? `Showing ${visibleServices.length} of ${filteredServices.length} services`
                  : `Nagpapakita ng ${visibleServices.length} sa ${filteredServices.length} na serbisyo`}
              </p>
              <Button
                variant="outline"
                onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
                className=""
              >
                {language === "en" ? "Load more" : "Mag-load pa"}
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
