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
        <Link href={reportConcern.href} className="group mb-6 block">
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

      {/* Service directory — 2-column asymmetric grid with 1px dividers */}
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {otherServices.map((service) => {
            const Icon = iconMap[service.icon] || IdentificationCard;
            const action = actionLabels[service.category];
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group flex items-center gap-4 bg-background px-5 py-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Icon className="size-5" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {language === "en" ? service.title : service.titleFil}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">
                    {language === "en" ? service.description : service.descriptionFil}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === "en" ? action.en : action.fil} →
                </span>
              </Link>
            );
          })}
        </div>
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
