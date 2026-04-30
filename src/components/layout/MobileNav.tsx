"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { CaretDown, Phone, Warning } from "@phosphor-icons/react";
import { t, type TranslationKey } from "@/lib/translations";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ReadonlyArray<{ key: TranslationKey; href: string }>;
  pathname: string;
}

export function MobileNav({ open, onOpenChange, items, pathname }: MobileNavProps) {
  const { language } = useSettingsStore();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));
  const servicesItem = items.find((item) => item.href === "/services");
  const primaryItems = items.filter((item) => item.href !== "/services");
  const servicesLabel = pathname.startsWith("/services/report-concern")
    ? t("nav.report", language)
    : t("nav.services", language);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-85 border-l border-white/10 bg-[#06142d] p-0 text-white">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Image src="/Bagong_Pilipinas.svg" alt="Bagong Pilipinas" width={36} height={36} className="size-9 object-contain" />
            <Image src="/Logo.svg" alt="MMDA Logo" width={36} height={36} className="size-9 object-contain" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
                MMDA
              </p>
              <p className="text-sm font-semibold text-white">
                {language === "en" ? "Public Service Navigation" : "Nabigasyon ng Serbisyo Publiko"}
              </p>
            </div>
          </div>
        </div>

        <nav
          className="flex flex-col gap-2 px-4 py-5"
          aria-label={t("a11y.mainNav", language)}
        >
          {servicesItem && (
            <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    pathname.startsWith("/services")
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                  aria-haspopup="menu"
                >
                  {servicesLabel}
                  <CaretDown className={cn("size-4 transition-transform", servicesOpen && "rotate-180")} weight="bold" />
                </button>
              </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2 pl-4">
                <Link
                  href={servicesItem.href}
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname === "/services"
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "All services" : "Lahat ng serbisyo"}
                </Link>
                <Link
                  href="/services/report-concern"
                  onClick={() => onOpenChange(false)}
                    className={cn(
                      "block rounded-[1rem] px-5 py-4 text-base font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      pathname.startsWith("/services/report-concern")
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                    )}
                >
                  {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
                </Link>
              </CollapsibleContent>
            </Collapsible>
          )}

          {primaryItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "rounded-[1.2rem] px-5 py-4 text-base font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  isActive
                    ? "bg-white text-slate-950"
                    : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.key, language)}
              </Link>
            );
          })}
        </nav>

        {/* Metrobase 136 removed from mobile navigation per request */}
      </SheetContent>
    </Sheet>
  );
}
