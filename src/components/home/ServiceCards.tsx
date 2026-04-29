"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockServices, type ServiceItem } from "@/lib/mock-data";
import {
  IdentificationCard,
  Warning,
  ChatCircleDots,
  Truck,
  File,
  CreditCard,
  Phone,
  Hammer,
  Calendar,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  IdentificationCard,
  Warning,
  ChatCircleDots,
  Truck,
  File,
  CreditCard,
  Phone,
  Hammer,
  Calendar,
  CheckCircle,
  FileCheck: CheckCircle,
};

const categoryBadges = {
  licensing: { en: "Licensing", fil: "Licensing", variant: "secondary" as const },
  violations: { en: "Violations & Fines", fil: "Violations & Fines", variant: "destructive" as const },
  assistance: { en: "Assistance", fil: "Tulong", variant: "outline" as const },
  permits: { en: "Permits", fil: "Permits", variant: "secondary" as const },
} as const;

const actionLabels: Record<ServiceItem["category"], { en: string; fil: string }> = {
  licensing: { en: "Apply now", fil: "Mag-apply" },
  violations: { en: "Check status", fil: "Tingnan ang status" },
  assistance: { en: "Get help", fil: "Humingi ng tulong" },
  permits: { en: "Start application", fil: "Magsimula" },
};

export function ServiceCards() {
  const { language } = useSettingsStore();

  const reportConcern = mockServices.find((s) => s.href === "/services/report-concern");
  const otherServices = mockServices.filter((s) => s.href !== "/services/report-concern");

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

      {/* Featured: Report a Concern — full-width banner */}
      {reportConcern && (
        <Link href={reportConcern.href} className="group mb-4 block">
          <Card className="border-mmda-red/20 bg-red-50 dark:bg-red-950/20 transition-colors hover:border-mmda-red/30 group-focus-visible:ring-2 group-focus-visible:ring-ring">
            <CardContent className="flex items-center gap-5 p-5 sm:p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mmda-red/10 text-mmda-red">
                <ChatCircleDots className="size-6" weight="bold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold group-hover:text-mmda-red transition-colors">
                    {language === "en" ? reportConcern.title : reportConcern.titleFil}
                  </h3>
                  <Badge variant="destructive" className="text-[11px] px-1.5 py-0">
                    {language === "en" ? "Assistance" : "Tulong"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {language === "en" ? reportConcern.description : reportConcern.descriptionFil}
                </p>
              </div>
              <Button variant="destructive" size="sm" className="hidden shrink-0 sm:inline-flex">
                {language === "en" ? "Get help" : "Humingi ng tulong"}
              </Button>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Remaining services — 3-column grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherServices.map((service) => {
          const Icon = iconMap[service.icon] || IdentificationCard;
          const group = categoryBadges[service.category];
          const action = actionLabels[service.category];
          return (
            <Link key={service.id} href={service.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/20 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" weight="bold" />
                    </div>
                    <Badge variant={group.variant} className="text-[11px] px-1.5 py-0">
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
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {language === "en" ? action.en : action.fil}
                    <ArrowRight className="size-3" weight="bold" />
                  </span>
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
