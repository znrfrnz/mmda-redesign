"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { MagnifyingGlass, List } from "@phosphor-icons/react";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const NAV_ITEMS = [
  { key: "nav.home" as const, href: "/" },
  { key: "nav.services" as const, href: "/services" },
  { key: "nav.traffic" as const, href: "/traffic" },
  { key: "nav.news" as const, href: "/news" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.contact" as const, href: "/contact" },
] as const;

const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => item.href !== "/services");
const SERVICES_NAV_ITEM = NAV_ITEMS.find((item) => item.href === "/services")!;

export function Header() {
  const { language } = useSettingsStore();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const servicesLabel = pathname.startsWith("/services/report-concern")
    ? t("nav.report", language)
    : t("nav.services", language);

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-19.5 flex-wrap items-center gap-4 rounded-[1.8rem] border border-white/10 bg-[#06142d]/88 px-4 py-3 shadow-[0_24px_80px_-42px_rgba(7,20,40,0.95)] backdrop-blur sm:px-6 xl:grid xl:min-h-19.5 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-4 xl:py-0">
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
            className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:flex"
            aria-label={t("a11y.mainNav", language)}
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    pathname === "/services" || pathname.startsWith("/services/")
                      ? "bg-white text-slate-950"
                      : "text-white/72 hover:bg-white/10 hover:text-white"
                  )}
                  aria-haspopup="menu"
                >
                  {servicesLabel}
                  <ChevronDownIcon className="ml-1 size-4 opacity-80" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={SERVICES_NAV_ITEM.href}>{t("nav.services", language)}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/report-concern">
                    {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex xl:ml-0 xl:justify-self-end">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("search.label", language)}
            >
              <MagnifyingGlass className="size-4" weight="bold" />
              <span className="hidden lg:inline">{t("util.search", language)}</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden xl:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center min-w-11 min-h-11 p-2.5 rounded-full border border-white/10 bg-white/6 text-white/78 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("util.search", language)}
            >
              <MagnifyingGlass className="size-5" weight="bold" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center min-w-11 min-h-11 p-2.5 rounded-full border border-white/10 bg-white/6 text-white/78 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
