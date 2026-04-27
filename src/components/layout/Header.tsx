"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { MagnifyingGlass, List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "nav.services" as const, href: "/services" },
  { key: "nav.traffic" as const, href: "/traffic" },
  { key: "nav.news" as const, href: "/news" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.contact" as const, href: "/contact" },
] as const;

export function Header() {
  const { language } = useSettingsStore();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight tracking-tight">
              MMDA
            </p>
            <p className="text-[10px] leading-tight text-muted-foreground">
              Metropolitan Manila
              <br />
              Development Authority
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 ml-6"
          aria-label={t("a11y.mainNav", language)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search Bar (desktop) */}
        <div className="hidden md:flex items-center">
          <Link
            href="/search"
            className={cn(
              "flex h-9 w-64 items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 text-sm text-muted-foreground transition-colors",
              "hover:bg-muted hover:border-border",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label={t("search.label", language)}
          >
            <MagnifyingGlass className="size-4 shrink-0" weight="bold" />
            <span className="truncate">{t("search.placeholder", language)}</span>
          </Link>
        </div>

        {/* Mobile: Search + Hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="size-9 p-0 md:hidden"
            asChild
          >
            <Link href="/search" aria-label={t("util.search", language)}>
              <MagnifyingGlass className="size-5" weight="bold" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-9 p-0"
            onClick={() => setMobileOpen(true)}
            aria-label={t("nav.menu", language)}
          >
            <List className="size-5" weight="bold" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        items={NAV_ITEMS}
        pathname={pathname}
      />
    </header>
  );
}
