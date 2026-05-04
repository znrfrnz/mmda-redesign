"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  Check,
  FacebookLogo,
  Link as LinkIcon,
  XLogo,
} from "@phosphor-icons/react";
import type { NewsArticle } from "@/lib/mock-data";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import { Button } from "@/components/ui/button";

const categoryConfig: Record<NewsArticle["category"], { en: string; fil: string }> = {
  advisory: { en: "Advisory", fil: "Abiso" },
  press: { en: "Press release", fil: "Pahayag sa press" },
  notice: { en: "Public notice", fil: "Pampublikong abiso" },
};

const LOCAL_NEWS_DETAIL_FALLBACK = "/images/newsAdvisories/news.jpg";

export function NewsArticleDetail({ article }: { article: NewsArticle }) {
  const { language } = useSettingsStore();
  const [copied, setCopied] = useState(false);

  const title = language === "en" ? article.title : article.titleFil;
  const excerpt = language === "en" ? article.excerpt : article.excerptFil;
  const body = language === "en" ? article.body : article.bodyFil;
  const categoryLabel = categoryConfig[article.category][language];

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function handleShareX() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener");
  }

  function handleShareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener");
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div className="absolute inset-0">
          <Image
            src={article.imageUrl || LOCAL_NEWS_DETAIL_FALLBACK}
            alt={title}
            fill
            priority
            className="object-cover opacity-28 mix-blend-luminosity"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.16),rgba(2,8,23,0))]" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <nav className="flex items-center gap-2 text-sm text-white/72" aria-label="Breadcrumb">
            <Link
              href="/"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t("news.breadcrumbHome" as never, language)}
            </Link>
            <span>/</span>
            <Link
              href="/news"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t("news.breadcrumbNews" as never, language)}
            </Link>
          </nav>

          <div className="mt-8 max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
              {categoryLabel}
            </p>
            <h1 className="mt-4 max-w-6xl text-[clamp(2.3rem,4.4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/74">
              <CalendarBlank className="size-4" weight="bold" />
              {new Date(article.date).toLocaleDateString(
                language === "en" ? "en-US" : "fil-PH",
                { weekday: "long", month: "long", day: "numeric", year: "numeric" }
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr]">
          <article className="rounded-[1.9rem] border border-border bg-card p-7 md:p-9">
            {article.imageUrl && (
              <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src={article.imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
            )}

            <div className="space-y-6 text-[0.98rem] leading-8 text-foreground/92">
              {body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-border/70 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t("news.shareArticle" as never, language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="rounded-full"
                >
                  {copied ? <Check className="mr-2 size-4" weight="bold" /> : <LinkIcon className="mr-2 size-4" weight="bold" />}
                  {copied ? t("news.linkCopied" as never, language) : t("news.copyLink" as never, language)}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareX} className="rounded-full">
                  <XLogo className="mr-2 size-4" weight="bold" />
                  {t("news.shareX" as never, language)}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareFacebook} className="rounded-full">
                  <FacebookLogo className="mr-2 size-4" weight="bold" />
                  {t("news.shareFacebook" as never, language)}
                </Button>
              </div>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-[1.7rem] border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {language === "en" ? "Need a service next?" : "Kailangan ng serbisyo?"}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "After reading advisories, proceed directly to service requests, report channels, or live traffic tools."
                  : "Pagkatapos basahin ang advisory, dumiretso sa service request, report channel, o live traffic tools."}
              </p>
              <div className="mt-5 space-y-2">
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {language === "en" ? "Open services" : "Buksan ang services"}
                  <ArrowRight className="size-4" weight="bold" />
                </Link>
                <Link
                  href="/traffic"
                  className="inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {language === "en" ? "View traffic tools" : "Tingnan ang traffic tools"}
                  <ArrowRight className="size-4" weight="bold" />
                </Link>
              </div>
            </div>

            <Link
              href="/news"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-4" weight="bold" />
              {t("news.backToNews" as never, language)}
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
