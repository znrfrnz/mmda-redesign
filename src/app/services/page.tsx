"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockServices, type ServiceItem } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const categoryBadges = {
  licensing: { en: "Licensing", fil: "Licensing", variant: "secondary" as const },
  violations: { en: "Violations & Fines", fil: "Violations & Fines", variant: "destructive" as const },
  assistance: { en: "Assistance & Supports", fil: "Assistance & Supports", variant: "outline" as const },
  permits: { en: "Permits & Authorizations", fil: "Permits & Authorizations", variant: "secondary" as const },
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => {
            const group = categoryBadges[service.category];

            return (
              <Link key={service.id} href={service.href} className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/20 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <Badge variant={group.variant} className="text-[11px] px-1.5 py-0">
                        {language === "en" ? group.en : group.fil}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {language === "en" ? "Service" : "Serbisyo"}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                      {language === "en" ? service.title : service.titleFil}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {language === "en" ? service.description : service.descriptionFil}
                    </p>
                    <span className="mt-auto text-xs font-medium text-primary">
                      {language === "en"
                        ? service.category === "licensing" ? "Apply now" : service.category === "violations" ? "Check status" : service.category === "assistance" ? "Get help" : "Start application"
                        : service.category === "licensing" ? "Mag-apply" : service.category === "violations" ? "Tingnan ang status" : service.category === "assistance" ? "Humingi ng tulong" : "Magsimula"}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
