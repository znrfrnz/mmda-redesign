"use client";

import Link from "next/link";
import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { XLogo, FacebookLogo, Phone } from "@phosphor-icons/react";

export function Footer() {
  const { language } = useSettingsStore();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      {/* MMDA brand stripes */}
      <div className="flex h-[3px]" aria-hidden="true">
        <div className="flex-1 bg-mmda-blue" />
        <div className="flex-1 bg-mmda-red" />
        <div className="flex-1 bg-mmda-gold" />
      </div>

      <div className="bg-muted/30 mx-auto max-w-full">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/Bagong_Pilipinas.svg" alt="Bagong Pilipinas" width={32} height={32} className="size-8 object-contain" />
              <Image src="/Logo.svg" alt="MMDA Logo" width={32} height={32} className="size-8 object-contain" />
              <h3 className="text-sm font-bold">{t("footer.about", language)}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("footer.aboutDesc", language)}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold">
              {t("footer.services", language)}
            </h3>
            <ul className="space-y-2.5" role="list">
              {[
                { label: "footer.driversLicense" as const, href: "/services/drivers-license" },
                { label: "footer.vehicleRegistration" as const, href: "/services/vehicle-registration" },
                { label: "footer.trafficViolations" as const, href: "/services/traffic-violations" },
                { label: "footer.towingImpound" as const, href: "/services/towing-impound" },
                { label: "footer.reportConcern" as const, href: "/services/report-concern" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {t(item.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-bold">
              {t("footer.resources", language)}
            </h3>
            <ul className="space-y-2.5" role="list">
              {[
                { label: "footer.trafficUpdates" as const, href: "/traffic" },
                { label: "footer.floodUpdates" as const, href: "/news?category=advisories" },
                { label: "footer.numberCoding" as const, href: "/traffic#number-coding" },
                { label: "footer.pressReleases" as const, href: "/news?category=press" },
                { label: "footer.careers" as const, href: "/about#careers" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {t(item.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-bold">
              {t("footer.connect", language)}
            </h3>
            <ul className="space-y-2.5" role="list">
              <li>
                <a
                  href="tel:136"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  <Phone className="size-4" weight="bold" />
                  {t("footer.hotline", language)}
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/ABORMMDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  <XLogo className="size-4" weight="bold" />
                  {t("footer.followX", language)}
                  <span className="sr-only">
                    ({t("a11y.opensNewTab", language)})
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/mabormmda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  <FacebookLogo className="size-4" weight="bold" />
                  {t("footer.followFacebook", language)}
                  <span className="sr-only">
                    ({t("a11y.opensNewTab", language)})
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      </div>

      {/* Accessibility / copyright bar */}
      <div className="bg-mmda-blue">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-white/90">
            {t("footer.copyright", language).replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
