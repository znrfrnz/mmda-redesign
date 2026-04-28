"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockServices, type ServiceItem } from "@/lib/mock-data";
import {
  IdentificationCard,
  Warning,
  ChatCircleDots,
  Truck,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "@phosphor-icons/react";

const iconMap: Record<string, React.ElementType> = {
  IdentificationCard,
  Warning,
  ChatCircleDots,
  Truck,
};

const categoryBadges = {
  licensing: { en: "Licensing", fil: "Licensing", variant: "secondary" as const },
  violations: { en: "Violations & Fines", fil: "Violations & Fines", variant: "destructive" as const },
  assistance: { en: "Assistance & Supports", fil: "Assistance & Supports", variant: "outline" as const },
  permits: { en: "Permits & Authorizations", fil: "Permits & Authorizations", variant: "secondary" as const },
} as const;

export function ServiceCards() {
  const { language } = useSettingsStore();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {language === "en" ? "Popular Services" : "Mga Sikat na Serbisyo"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {language === "en"
              ? "Quick access to the most-used MMDA services"
              : "Mabilis na access sa mga pinaka-ginagamit na serbisyo ng MMDA"}
          </p>
        </div>
        <Link
          href="/services"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {language === "en" ? "View all" : "Tingnan lahat"}
          <ArrowRight className="size-4" weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockServices.map((service) => {
          const Icon = iconMap[service.icon] || IdentificationCard;
          const group = categoryBadges[service.category];
          return (
            <Link key={service.id} href={service.href} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/20 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" weight="bold" />
                    </div>
                    <Badge variant={group.variant} className="text-[10px] px-1.5 py-0">
                      {language === "en" ? group.en : group.fil}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {language === "en" ? service.title : service.titleFil}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {language === "en" ? service.description : service.descriptionFil}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {language === "en" ? "View all services" : "Tingnan lahat ng serbisyo"}
          <ArrowRight className="size-4" weight="bold" />
        </Link>
      </div>
    </section>
  );
}
