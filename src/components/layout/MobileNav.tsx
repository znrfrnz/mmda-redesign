"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t, type TranslationKey } from "@/lib/translations";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-left text-base font-bold">
            MMDA
          </SheetTitle>
        </SheetHeader>
        <nav
          className="flex flex-col gap-1 px-3 py-4"
          aria-label={t("a11y.mainNav", language)}
        >
          <Link
            href="/"
            onClick={() => onOpenChange(false)}
            className={cn(
              "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              pathname === "/"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            {t("nav.home", language)}
          </Link>
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.key, language)}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
