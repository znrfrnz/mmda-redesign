"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, ClipboardText, Phone, ShieldCheck, Warning } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const concernTypes = [
  { value: "road-damage", en: "Road damage / potholes", fil: "Sira sa kalsada / potholes" },
  { value: "flooding", en: "Flooding", fil: "Pagbaha" },
  { value: "illegal-structures", en: "Illegal structures on road", fil: "Ilegal na istruktura sa kalsada" },
  { value: "traffic-light", en: "Broken traffic light", fil: "Sirang traffic light" },
  { value: "obstruction", en: "Road obstruction", fil: "Obstruction sa kalsada" },
  { value: "illegal-parking", en: "Illegal parking", fil: "Ilegal na pagpaparada" },
  { value: "others", en: "Others", fil: "Iba pa" },
];

const reportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  concernType: z.string().min(1, "Please select a concern type"),
  location: z.string().min(5, "Please provide a specific location"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type ReportFormData = z.infer<typeof reportSchema>;

const responseSteps = [
  {
    seed: "report-intake",
    enTitle: "Submit complete details",
    filTitle: "Magsumite ng kumpletong detalye",
    enBody: "Provide location, concern type, and a clear incident description for faster triage.",
    filBody: "Ibigay ang lokasyon, concern type, at malinaw na deskripsyon para mas mabilis ang triage.",
  },
  {
    seed: "report-validation",
    enTitle: "Operations review and routing",
    filTitle: "Operations review at routing",
    enBody: "Reports are validated and assigned to the right MMDA unit based on severity and area.",
    filBody: "Vina-validate ang report at itinatakda sa tamang MMDA unit ayon sa severity at lugar.",
  },
  {
    seed: "report-action",
    enTitle: "Field action and updates",
    filTitle: "Field action at updates",
    enBody: "Priority incidents are escalated immediately. You may receive updates through your contact details.",
    filBody: "Ang priority incidents ay agad ini-escalate. Maaari kang makatanggap ng update sa contact details mo.",
  },
] as const;

export default function ReportConcernPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({ mode: "onBlur" });

  function onSubmit(data: ReportFormData) {
    const result = reportSchema.safeParse(data);
    if (result.success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="overflow-x-hidden w-full max-w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-10 text-center shadow-brand-lg">
          <CheckCircle className="mx-auto size-16 text-emerald-500" weight="bold" />
          <h1 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-[-0.03em]">
            {language === "en" ? "Report submitted successfully." : "Matagumpay na naisumite ang ulat."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your concern is now queued for MMDA operations review. For urgent incidents that require immediate escalation, please call Metrobase 136."
              : "Naka-queue na ang concern mo para sa MMDA operations review. Para sa agarang incident na kailangang i-escalate kaagad, tumawag sa Metrobase 136."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setSubmitted(false)} className="rounded-full px-6">
              {language === "en" ? "Submit another report" : "Magsumite ng isa pang ulat"}
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6">
              <a href="tel:136">
                <Phone className="mr-2 size-4" weight="bold" />
                136
              </a>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-22 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://picsum.photos/seed/mmda-reporting-hero/1920/1080')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,16,46,0.2),transparent_45%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-16 mix-blend-luminosity"
            style={{ backgroundImage: "url('https://picsum.photos/seed/report-inline/1280/960')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,16,46,0.18),transparent_42%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0.42))]" />

          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Use this channel to report road hazards, flooding, illegal obstructions, and operational concerns across Metro Manila."
                : "Gamitin ang channel na ito upang mag-ulat ng road hazard, pagbaha, ilegal na obstruction, at iba pang operational concern sa Metro Manila."}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "Escalate public road concerns with the right details for faster action."
                : "I-escalate ang public road concern gamit ang tamang detalye para sa mas mabilis na aksyon."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "The form below routes your report to the correct MMDA operations stream and supports priority triage for urgent incidents."
                : "Ang form sa ibaba ay nagra-route ng report sa tamang MMDA operations stream at sumusuporta sa priority triage para sa agarang insidente."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:136"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-4" weight="bold" />
                {language === "en" ? "Call Metrobase 136" : "Tumawag sa Metrobase 136"}
              </a>
              <Link
                href="/services"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Back to services" : "Bumalik sa services"}
                <ArrowRight className="size-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="hidden h-90 overflow-hidden rounded-[2rem] border border-border lg:flex">
          {responseSteps.map((step, index) => (
            <article
              key={step.seed}
              className={`
                group relative flex-1 overflow-hidden border-l border-white/10 first:border-l-0
                transition-[flex] duration-700 ease-out hover:flex-[1.75]
              `}
            >
              <div
                className="absolute inset-0 opacity-28 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://picsum.photos/seed/${step.seed}/900/1200')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,45,0.2),rgba(6,20,45,0.9))]" />
              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/62">
                  {language === "en" ? `Step ${index + 1}` : `Hakbang ${index + 1}`}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug">
                  {language === "en" ? step.enTitle : step.filTitle}
                </h2>
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-7 text-white/72 opacity-0 transition-all duration-500 group-hover:max-h-48 group-hover:opacity-100">
                  {language === "en" ? step.enBody : step.filBody}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:hidden">
          {responseSteps.map((step, index) => (
            <article key={step.seed} className="rounded-[1.5rem] border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {language === "en" ? `Step ${index + 1}` : `Hakbang ${index + 1}`}
              </p>
              <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                {language === "en" ? step.enTitle : step.filTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {language === "en" ? step.enBody : step.filBody}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="size-4" weight="bold" />
                  {language === "en" ? "Before you submit" : "Bago magsumite"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <ClipboardText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Use a specific landmark or intersection to improve routing accuracy."
                      : "Gumamit ng tiyak na landmark o intersection upang mapabuti ang routing accuracy."}
                  </li>
                  <li className="flex gap-3">
                    <ClipboardText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Describe immediate risk level (blocked lane, active flooding, damaged signal)."
                      : "Ilarawan ang antas ng agarang panganib (blocked lane, aktibong pagbaha, sirang signal)."}
                  </li>
                  <li className="flex gap-3">
                    <ClipboardText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Attach a photo when available to help verification and field deployment."
                      : "Mag-attach ng larawan kung mayroon upang makatulong sa verification at field deployment."}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <Warning className="size-4" weight="bold" />
                  {language === "en" ? "Urgent escalation" : "Agarang escalation"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "For active accidents, severe flooding, or immediate road hazards, call Metrobase 136 directly while also submitting this report."
                    : "Para sa aktibong aksidente, matinding pagbaha, o agarang road hazard, tumawag agad sa Metrobase 136 habang nagsusumite ng report na ito."}
                </p>
                <a
                  href="tel:136"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Phone className="size-4" weight="bold" />
                  136
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Submit report details" : "Isumite ang detalye ng report"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "All required fields help MMDA operations verify and route your concern faster."
                  : "Nakakatulong ang lahat ng required field upang mas mabilis ma-verify at ma-route ng MMDA operations ang concern mo."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Full name" : "Buong pangalan"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={language === "en" ? "Juan dela Cruz" : "Juan dela Cruz"}
                    className="mt-1.5"
                    {...register("name", { required: true, minLength: 2 })}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Name must be at least 2 characters." : "Ang pangalan ay dapat hindi bababa sa 2 karakter."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Email address" : "Email address (e-mail)"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="juan@example.com"
                    className="mt-1.5"
                    {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter a valid email address." : "Mangyaring maglagay ng wastong email address."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Phone number" : "Numero ng telepono"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+63 9XX XXX XXXX"
                    className="mt-1.5"
                    {...register("phone", { required: true, minLength: 7 })}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter a valid phone number." : "Mangyaring maglagay ng wastong numero ng telepono."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="concernType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Type of concern" : "Uri ng problema"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="concernType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("concernType", { required: true })}
                    aria-invalid={!!errors.concernType}
                  >
                    <option value="">
                      {language === "en" ? "Select a concern type..." : "Pumili ng uri ng problema..."}
                    </option>
                    {concernTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.concernType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a concern type." : "Mangyaring pumili ng uri ng problema."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Location" : "Lokasyon"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="location"
                    type="text"
                    autoComplete="street-address"
                    placeholder={language === "en" ? "e.g. EDSA corner Shaw Blvd, Mandaluyong" : "hal. EDSA corner Shaw Blvd, Mandaluyong"}
                    className="mt-1.5"
                    {...register("location", { required: true, minLength: 5 })}
                    aria-invalid={!!errors.location}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en"
                        ? "Please provide a specific location (at least 5 characters)."
                        : "Mangyaring magbigay ng tiyak na lokasyon (hindi bababa sa 5 karakter)."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Description" : "Deskripsyon"} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    className="mt-1.5 flex min-h-32.5 w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={language === "en" ? "Provide details about the concern..." : "Magbigay ng detalye tungkol sa problema..."}
                    {...register("description", { required: true, minLength: 20 })}
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Description must be at least 20 characters." : "Ang deskripsyon ay dapat hindi bababa sa 20 karakter."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="photo" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Photo (optional)" : "Larawan (opsyonal)"}
                  </label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="mt-1.5 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {language === "en"
                      ? "Upload a photo of the concern (max 5MB, JPG or PNG)."
                      : "Mag-upload ng larawan ng problema (max 5MB, JPG o PNG)."}
                  </p>
                </div>

                <div className="pt-1">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full"
                  >
                    {isSubmitting
                      ? language === "en"
                        ? "Submitting..."
                        : "Isinusumite..."
                      : language === "en"
                        ? "Submit report"
                        : "Isumite ang ulat"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
