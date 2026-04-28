"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { t } from "@/lib/translations";
import type { NewsArticle } from "@/lib/mock-data";
import {
  ArrowLeft,
  CaretRight,
  CalendarBlank,
  Link as LinkIcon,
  XLogo,
  FacebookLogo,
  Check,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categoryConfig: Record<
  NewsArticle["category"],
  { label: string; labelFil: string; variant: "destructive" | "secondary" | "outline" }
> = {
  advisory: { label: "Advisory", labelFil: "Abiso", variant: "destructive" },
  press: { label: "Press Release", labelFil: "Pahayag sa Press", variant: "secondary" },
  notice: { label: "Public Notice", labelFil: "Pampublikong Abiso", variant: "outline" },
};

export function NewsArticleDetail({ article }: { article: NewsArticle }) {
  const { language } = useSettingsStore();
  const [copied, setCopied] = useState(false);
  const cat = categoryConfig[article.category];

  const title = language === "en" ? article.title : article.titleFil;
  const body = language === "en" ? article.body : article.bodyFil;

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 text-justify">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {t("news.breadcrumbHome" as never, language)}
        </Link>
        <CaretRight className="size-3 shrink-0" weight="bold" />
        <Link
          href="/news"
          className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {t("news.breadcrumbNews" as never, language)}
        </Link>
        <CaretRight className="size-3 shrink-0" weight="bold" />
        <span className="text-foreground font-medium truncate max-w-50 sm:max-w-sm" aria-current="page">
          {title}
        </span>
      </nav>

      {/* Article content */}
      <div className="max-w-[65ch]">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={cat.variant} className="text-xs px-2 py-0.5">
            {language === "en" ? cat.label : cat.labelFil}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarBlank className="size-3.5" weight="bold" />
            {new Date(article.date).toLocaleDateString(
              language === "en" ? "en-US" : "fil-PH",
              { weekday: "long", month: "long", day: "numeric", year: "numeric" }
            )}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-6">
          {title}
        </h1>

        {/* Hero image */}
        {article.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8">
            <Image
              src={article.imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 65ch"
              priority
            />
          </div>
        )}

        {/* Body paragraphs */}
        <div className="space-y-5 text-sm leading-relaxed text-foreground/90">
          {body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Share buttons */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            {t("news.shareArticle" as never, language)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="gap-2 active:scale-[0.98] transition-transform"
            >
              {copied ? (
                <Check className="size-4" weight="bold" />
              ) : (
                <LinkIcon className="size-4" weight="bold" />
              )}
              {copied
                ? t("news.linkCopied" as never, language)
                : t("news.copyLink" as never, language)}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareX}
              className="gap-2 active:scale-[0.98] transition-transform"
            >
              <XLogo className="size-4" weight="bold" />
              {t("news.shareX" as never, language)}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareFacebook}
              className="gap-2 active:scale-[0.98] transition-transform"
            >
              <FacebookLogo className="size-4" weight="bold" />
              {t("news.shareFacebook" as never, language)}
            </Button>
          </div>
        </div>

        {/* Back to News */}
        <div className="mt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <ArrowLeft className="size-4" weight="bold" />
            {t("news.backToNews" as never, language)}
          </Link>
        </div>
      </div>
    </article>
  );
}
