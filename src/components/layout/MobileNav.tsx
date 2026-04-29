"use client";

import Link from "next/link";
import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Phone, Warning } from "@phosphor-icons/react";
import { t, type TranslationKey } from "@/lib/translations";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ReadonlyArray<{ key: TranslationKey; href: string }>;
  pathname: string;
}

export function MobileNav({ open, onOpenChange, items, pathname }: MobileNavProps) {
  const { language } = useSettingsStore();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[340px] border-l border-white/10 bg-[#06142d] p-0 text-white">
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
          {items.map((item) => {
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
                  "rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-colors",
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

        <div className="border-t border-white/10 px-4 py-5">
          <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <a
              href="tel:136"
              className="inline-flex w-full items-center justify-between rounded-[1.15rem] border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {language === "en" ? "Call Metrobase 136" : "Tumawag sa Metrobase 136"}
              <Phone className="size-4" weight="bold" />
            </a>
            <Link
              href="/services/report-concern"
              onClick={() => onOpenChange(false)}
              className="inline-flex w-full items-center justify-between rounded-[1.15rem] border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
              <Warning className="size-4" weight="bold" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
