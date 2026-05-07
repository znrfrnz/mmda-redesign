"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { ArrowRight, FacebookLogo, Phone, Warning, XLogo } from "@phosphor-icons/react";

export function Footer() {
  const { language } = useSettingsStore();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  function handleTopOfPageClick(event: React.MouseEvent<HTMLAnchorElement>, targetPath: string) {
    const isSameRoute =
      pathname === targetPath ||
      pathname.startsWith(targetPath + "/") ||
      (targetPath === "/services/report-concern" && pathname.startsWith("/services/report-concern"));

    if (!isSameRoute) return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#06142d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_-42px_rgba(7,20,40,1)] md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/56">
                {language === "en" ? "Need assistance?" : "Kailangan mo ba ng tulong?"}
              </p>
              <h2 className="mt-5 max-w-2xl text-[clamp(2rem,3.8vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                {language === "en"
                  ? "Need help right now, or need the next official update?"
                  : "Kailangan mo ba ng tulong ngayon, o ng susunod na opisyal na update?"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 md:text-base">
                {language === "en"
                  ? "Use the faster reporting path for incidents, or go straight to the live traffic tools for road conditions and coding guidance."
                  : "Gamitin ang mas mabilis na reporting path para sa mga insidente, o dumiretso sa live traffic tools para sa kondisyon ng kalsada at coding guidance."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/services/report-concern"
                onClick={(event) => handleTopOfPageClick(event, "/services/report-concern")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Warning className="size-4" weight="bold" />
                {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
              </Link>
              <Link
                href="/traffic"
                onClick={(event) => handleTopOfPageClick(event, "/traffic")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open traffic tools" : "Buksan ang traffic tools"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/Bagong_Pilipinas.svg" alt="Bagong Pilipinas" width={40} height={40} className="size-10 object-contain" />
              <Image src="/Logo.svg" alt="MMDA Logo" width={40} height={40} className="size-10 object-contain" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                  MMDA
                </h3>
                <p className="mt-1 text-lg font-semibold text-white">
                  {language === "en"
                    ? "Metropolitan Manila Development Authority"
                    : "Metropolitan Manila Development Authority"}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/66">
              {t("footer.aboutDesc", language)}
            </p>
            <p className="mt-5 text-sm text-white/52">
              {language === "en"
                ? "A redesigned public-facing experience focused on clarity, accessibility, and service readiness."
                : "Isang inayos na public-facing experience na nakatuon sa kalinawan, accessibility, at kahandaan sa serbisyo."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              {t("footer.services", language)}
            </h3>
            <ul className="mt-5 space-y-3" role="list">
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
                    className="text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t(item.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              {t("footer.resources", language)}
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              {[
                { label: "footer.trafficUpdates" as const, href: "/traffic" },
                { label: "footer.floodUpdates" as const, href: "/news?category=advisory" },
                { label: "footer.numberCoding" as const, href: "/traffic#number-coding" },
                { label: "footer.pressReleases" as const, href: "/news?category=press" },
                { label: "footer.careers" as const, href: "/transparency/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t(item.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              {t("footer.connect", language)}
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              <li>
                <a
                  href="tel:136"
                  className="inline-flex items-center gap-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Phone className="size-4" weight="bold" />
                  {t("footer.hotline", language)}
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/MMDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <XLogo className="size-4" weight="bold" />
                  {t("footer.followX", language)}
                  <span className="sr-only">({t("a11y.opensNewTab", language)})</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MMDAPH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <FacebookLogo className="size-4" weight="bold" />
                  {t("footer.followFacebook", language)}
                  <span className="sr-only">({t("a11y.opensNewTab", language)})</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/52">
            {t("footer.copyright", language).replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
