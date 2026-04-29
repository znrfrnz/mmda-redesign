"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { MagnifyingGlass, List, Phone, Warning } from "@phosphor-icons/react";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "nav.home" as const, href: "/" },
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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[78px] items-center gap-4 rounded-[1.8rem] border border-white/10 bg-[#06142d]/88 px-4 shadow-[0_24px_80px_-42px_rgba(7,20,40,0.95)] backdrop-blur sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div className="flex items-center gap-2">
              <Image src="/Bagong_Pilipinas.svg" alt="Bagong Pilipinas" width={40} height={40} className="size-10 object-contain" />
              <Image src="/Logo.svg" alt="MMDA Logo" width={40} height={40} className="size-10 object-contain" />
            </div>
            <div className="hidden min-[430px]:block">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                {language === "en" ? "Metropolitan Manila" : "Kalakhang Maynila"}
              </p>
              <p className="mt-1 text-sm font-semibold tracking-[-0.02em] text-white">
                {language === "en"
                  ? "Development Authority"
                  : "Development Authority"}
              </p>
            </div>
          </Link>

          <nav
            className="ml-3 hidden items-center gap-1 xl:flex"
            aria-label={t("a11y.mainNav", language)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t(item.key, language)}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <a
              href="tel:136"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="size-4" weight="bold" />
              136
            </a>

            <Link
              href="/services/report-concern"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Warning className="size-4" weight="bold" />
              {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
            </Link>

            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("search.label", language)}
            >
              <MagnifyingGlass className="size-4" weight="bold" />
              <span className="hidden lg:inline">{t("util.search", language)}</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/78 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("util.search", language)}
            >
              <MagnifyingGlass className="size-5" weight="bold" />
            </button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/78 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setMobileOpen(true)}
              aria-label={t("nav.menu", language)}
            >
              <List className="size-5" weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        items={NAV_ITEMS}
        pathname={pathname}
      />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
