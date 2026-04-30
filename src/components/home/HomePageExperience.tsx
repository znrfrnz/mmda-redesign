"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Broadcast,
  CalendarBlank,
  CloudRain,
  NavigationArrow,
  Phone,
  ShieldCheck,
  Warning,
} from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockAdvisory, mockNews, mockServices, mockTrafficRoutes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const marqueeItems = [
  { en: "Traffic flow", fil: "Daloy ng trapiko" },
  { en: "Flood advisories", fil: "Mga abiso sa baha" },
  { en: "Citizen services", fil: "Serbisyo sa mamamayan" },
  { en: "Incident reporting", fil: "Pag-uulat ng insidente" },
  { en: "Road safety", fil: "Kaligtasan sa kalsada" },
  { en: "Metrobase 136", fil: "Metrobase 136" },
  { en: "Permit guidance", fil: "Gabay sa permit" },
  { en: "Public notices", fil: "Mga pampublikong abiso" },
];

const journeyCards = [
  {
    href: "/traffic",
    imageSeed: "edsa-rhythm",
    icon: NavigationArrow,
    title: {
      en: "See real-time road conditions before you leave.",
      fil: "Tingnan ang real-time na kondisyon ng kalsada bago bumiyahe.",
    },
    description: {
      en: "Check the live traffic map, review route conditions, and confirm the latest number-coding guidance in one flow.",
      fil: "Suriin ang live traffic map, kondisyon ng mga ruta, at pinakabagong gabay sa number coding sa iisang daloy.",
    },
    action: { en: "Open traffic tools", fil: "Buksan ang traffic tools" },
  },
  {
    href: "/services/report-concern",
    imageSeed: "civic-response",
    icon: Warning,
    title: {
      en: "Report hazards and road concerns without searching around.",
      fil: "Mag-ulat ng panganib at problema sa kalsada nang hindi na naghahanap pa.",
    },
    description: {
      en: "The portal highlights the fastest path for incident reporting so residents can escalate flooding, obstructions, and road hazards quickly.",
      fil: "Itinatampok ng portal ang pinakamabilis na paraan ng pag-uulat para sa baha, obstruction, at iba pang panganib sa kalsada.",
    },
    action: { en: "Report a concern", fil: "Mag-ulat ng problema" },
  },
  {
    href: "/services",
    imageSeed: "public-counter",
    icon: ShieldCheck,
    title: {
      en: "Find services with less duplication and clearer next steps.",
      fil: "Hanapin ang serbisyo nang mas kaunti ang pag-uulit at mas malinaw ang susunod na hakbang.",
    },
    description: {
      en: "Licensing, permits, fines, and assistance are grouped around what people need to do, not around scattered interface patterns.",
      fil: "Pinangkat ang licensing, permits, multa, at assistance ayon sa kailangan ng tao, hindi sa magkakahiwalay na pattern ng interface.",
    },
    action: { en: "Browse services", fil: "Tingnan ang mga serbisyo" },
  },
] as const;

function formatDate(date: string, language: "en" | "fil") {
  return new Date(date).toLocaleDateString(language === "en" ? "en-US" : "fil-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function HomePageExperience() {
  const { language } = useSettingsStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const pinTitleRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);

  const featuredNews = mockNews[0];
  const featuredServices = mockServices.slice(0, 4);
  const trafficHighlights = mockTrafficRoutes.slice(0, 3);
  const activeAdvisoryIcon = mockAdvisory.type === "weather" ? CloudRain : Warning;
  const ActiveAdvisoryIcon = activeAdvisoryIcon;

  const revealSentence =
    language === "en"
      ? "MMDA coordinates traffic management, flood control, road safety enforcement, and emergency response across 17 cities and municipalities in Metro Manila."
      : "Kinokoordina ng MMDA ang pamamahala ng trapiko, pagkontrol sa baha, pagpapatupad ng kaligtasan sa kalsada, at emergency response sa 17 lungsod at munisipalidad sa Metro Manila.";

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        if (pinSectionRef.current && pinTitleRef.current) {
          ScrollTrigger.create({
            trigger: pinSectionRef.current,
            start: "top top+=128",
            end: "bottom bottom-=96",
            pin: pinTitleRef.current,
            anticipatePin: 1,
          });
        }
      });

      const journeyItems = gsap.utils.toArray<HTMLElement>(".js-journey-card");
      gsap.fromTo(
        journeyItems,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const mediaPanels = gsap.utils.toArray<HTMLElement>(".js-scale-media");
      mediaPanels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 20, scale: 0.96, opacity: 0.6 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const words = gsap.utils.toArray<HTMLElement>(".js-reveal-word");
      gsap.fromTo(
        words,
        { opacity: 0.12, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power1.out",
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      return () => media.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://picsum.photos/seed/manila-civic-axis/1920/1080')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.38),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.08),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
              <p className="mx-auto max-w-3xl text-sm font-medium leading-7 text-white/72">
                {language === "en"
                  ? "Metropolitan Manila Development Authority — Official Public Service Portal"
                  : "Metropolitan Manila Development Authority — Opisyal na Portal ng Serbisyo Publiko"}
              </p>

              <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,6vw,5.35rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">
                {language === "en"
                  ? "Real-time traffic updates, public advisories, and citizen services for Metro Manila."
                  : "Real-time na traffic updates, pampublikong abiso, at serbisyo sa mamamayan para sa Metro Manila."}
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                {language === "en"
                  ? "Check live road conditions, verify number coding, report road concerns, and access MMDA services — all in one place."
                  : "Suriin ang live na kondisyon ng kalsada, i-verify ang number coding, mag-ulat ng problema sa kalsada, at ma-access ang mga serbisyo ng MMDA — lahat sa iisang lugar."}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {language === "en" ? "Explore services" : "Tingnan ang mga serbisyo"}
                  <ArrowRight className="size-4" weight="bold" />
                </Link>
                <Link
                  href="/traffic"
                  className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {language === "en" ? "View traffic map" : "Tingnan ang traffic map"}
                  <NavigationArrow className="size-4" weight="bold" />
                </Link>
              </div>
            </div>
          </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h2 className="max-w-3xl text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-foreground">
            {language === "en"
              ? "Traffic updates, citizen services, and public advisories — at a glance."
              : "Traffic updates, serbisyo sa mamamayan, at pampublikong abiso — sa isang tingin."}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {language === "en"
              ? "Access the most-used MMDA services quickly: live traffic conditions, number coding verification, incident reporting, and the latest flood and road advisories."
              : "Mabilis na ma-access ang pinaka-ginagamit na serbisyo ng MMDA: live na kondisyon ng trapiko, number coding verification, pag-uulat ng insidente, at pinakabagong abiso sa baha at kalsada."}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(11rem,1fr)] lg:grid-flow-dense">
          <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card lg:col-span-7 lg:row-span-2">
            <div
              className="js-scale-media absolute inset-0 opacity-20 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: "url('https://picsum.photos/seed/mmda-service-hub/1200/900')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,250,252,0.82))] dark:bg-[linear-gradient(135deg,rgba(6,20,45,0.9),rgba(10,30,66,0.84))]" />
            <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="size-4" weight="fill" />
                  {language === "en" ? "Citizen service pathways" : "Mga daan sa citizen services"}
                </div>
                <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                  {language === "en"
                    ? "Licensing, violations, permits, and citizen assistance — organized for faster action."
                    : "Lisensya, paglabag, permit, at tulong sa mamamayan — inayos para sa mas mabilis na aksyon."}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                  {language === "en"
                    ? "Start with the service you need and go directly to the requirements, forms, and steps for completion."
                    : "Magsimula sa serbisyong kailangan mo at dumiretso sa mga requirements, forms, at hakbang para matapos."}
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {featuredServices.map((service) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    className="group/service rounded-[1.5rem] border border-border/70 bg-background/84 p-4 transition-colors hover:border-primary/30 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-sm font-semibold text-foreground transition-colors group-hover/service:text-primary">
                      {language === "en" ? service.title : service.titleFil}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {language === "en" ? service.description : service.descriptionFil}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {language === "en" ? "Open full service directory" : "Buksan ang buong service directory"}
                  <ArrowRight className="size-4" weight="bold" />
                </Link>
              </div>
            </div>
          </div>

          {featuredNews && (
            <Link
              href={`/news/${featuredNews.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-[#06142d] text-white lg:col-span-5"
            >
              <div
                className="js-scale-media absolute inset-0 opacity-25 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://picsum.photos/seed/mmda-newswire/1200/720')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,45,0.2),rgba(6,20,45,0.92))]" />
              <div className="relative flex h-full flex-col justify-between p-7">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                    <span>{language === "en" ? "Latest public advisory" : "Pinakabagong public advisory"}</span>
                    <span className="inline-flex items-center gap-1 normal-case tracking-normal text-white/72">
                      <CalendarBlank className="size-4" weight="bold" />
                      {formatDate(featuredNews.date, language)}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em]">
                    {language === "en" ? featuredNews.title : featuredNews.titleFil}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
                    {language === "en" ? featuredNews.excerpt : featuredNews.excerptFil}
                  </p>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {language === "en" ? "Read advisory" : "Basahin ang advisory"}
                  <ArrowRight className="size-4" weight="bold" />
                </span>
              </div>
            </Link>
          )}

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card lg:col-span-3">
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Broadcast className="size-4 text-primary" weight="bold" />
                {language === "en" ? "Road flow snapshot" : "Snapshot ng daloy ng kalsada"}
              </div>
              <div className="mt-5 space-y-3">
                {trafficHighlights.map((route) => (
                  <div
                    key={route.id}
                    className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-background/75 px-4 py-3"
                  >
                    <div
                      className={cn(
                        "size-2 rounded-full",
                        route.status === "light"
                          ? "bg-emerald-500"
                          : route.status === "moderate"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{route.name}</p>
                      <p className="text-xs text-muted-foreground">{route.updatedAt}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{route.speed} km/h</span>
                  </div>
                ))}
              </div>
              <Link
                href="/traffic"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {language === "en" ? "Go to traffic view" : "Pumunta sa traffic view"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ActiveAdvisoryIcon className="size-4 text-primary" weight="bold" />
                {language === "en" ? "Current alert" : "Kasalukuyang alerto"}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {language === "en" ? mockAdvisory.title : mockAdvisory.titleFil}
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/services/report-concern"
                  className="inline-flex w-full items-center justify-between rounded-[1.15rem] border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {language === "en" ? "Report a concern" : "Mag-ulat ng problema"}
                  <Warning className="size-4" weight="bold" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-between rounded-[1.15rem] border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {language === "en" ? "Call Metrobase 136" : "Tumawag sa Metrobase 136"}
                  <Phone className="size-4" weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-[#08162f] py-6 text-white">
        <div className="marquee-track">
          <div className="marquee-row">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item.en}-${index}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72"
              >
                <span className="size-1.5 rounded-full bg-white/45" />
                {language === "en" ? item.en : item.fil}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={pinSectionRef}
        className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-8 lg:py-32"
      >
        <div ref={pinTitleRef} className="lg:pr-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {language === "en" ? "How it works" : "Paano ito gumagana"}
          </p>
          <h2 className="mt-5 max-w-xl text-[clamp(2.35rem,4vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
            {language === "en"
              ? "From checking traffic to reporting incidents — in just a few steps."
              : "Mula sa pagsuri ng trapiko hanggang pag-uulat ng insidente — sa ilang hakbang lamang."}
          </h2>
          <p ref={revealRef} className="mt-8 max-w-lg text-lg leading-8 text-muted-foreground">
            {revealSentence.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="js-reveal-word mr-[0.35em] inline-block opacity-10">
                {word}
              </span>
            ))}
          </p>
        </div>

        <div className="space-y-6">
          {journeyCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="js-journey-card group block overflow-hidden rounded-[2rem] border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
                  <div className="overflow-hidden">
                    <div
                      className="js-scale-media h-full min-h-72 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage: `url('https://picsum.photos/seed/${card.imageSeed}/960/1080')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between p-8 md:p-9">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                        <Icon className="size-4" weight="bold" />
                        {language === "en" ? "Operational pathway" : "Daan ng operasyon"}
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                        {language === "en" ? card.title.en : card.title.fil}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                        {language === "en" ? card.description.en : card.description.fil}
                      </p>
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {language === "en" ? card.action.en : card.action.fil}
                      <ArrowRight className="size-4" weight="bold" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#06142d] text-white shadow-[0_30px_100px_-50px_rgba(7,20,40,1)]">
          <div className="grid gap-12 px-6 py-8 md:px-10 md:py-12 lg:grid-cols-[1fr_1fr] lg:px-14 lg:py-16">
            <div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/56">
                  {language === "en" ? "Operational commitments" : "Mga pangako sa operasyon"}
                </p>
                <h2 className="mt-5 max-w-xl text-[clamp(2.25rem,3.8vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                  {language === "en"
                    ? "24/7 public service through verified reporting channels."
                    : "24/7 serbisyo publiko sa pamamagitan ng mga verified reporting channel."}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 md:text-base">
                  {language === "en"
                    ? "Report road incidents, flooding, or hazards directly to MMDA operations. Call hotline 136 for immediate assistance or submit a report online for follow-up."
                    : "Mag-ulat ng insidente sa kalsada, baha, o panganib nang direkta sa MMDA operations. Tumawag sa hotline 136 para sa agarang tulong o magsumite ng ulat online para sa follow-up."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                  {language === "en" ? "Critical hotline" : "Mahalagang hotline"}
                </p>
                <p className="mt-3 text-3xl font-semibold leading-none text-white">136</p>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  {language === "en"
                    ? "Metrobase support for incidents, hazards, and emergency roadside response."
                    : "Metrobase support para sa insidente, panganib, at emergency roadside response."}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                  {language === "en" ? "Service review window" : "Panahon ng pagsusuri ng serbisyo"}
                </p>
                <p className="mt-3 text-2xl font-semibold leading-none text-white">
                  {language === "en"
                    ? "Initial review in 24 to 48 hours"
                    : "Unang review sa loob ng 24 hanggang 48 oras"}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  {language === "en"
                    ? "Reports are queued by severity and location to help operations teams prioritize field action."
                    : "Inaayos ang report ayon sa severity at lokasyon upang mauna ang mahalagang field action."}
                </p>
              </div>

              <Link
                href="/services/report-concern"
                className="inline-flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Submit an operational report" : "Magsumite ng operational report"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Open contact channels" : "Buksan ang contact channels"}
                <Phone className="size-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
