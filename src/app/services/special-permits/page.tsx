"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, Clock, ListChecks, Phone } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const permitTypes = [
  { value: "oversized", en: "Oversized cargo transport", fil: "Oversized cargo transport" },
  { value: "hazardous", en: "Hazardous materials transport", fil: "Hazardous materials transport" },
  { value: "heavy-equipment", en: "Heavy equipment transport", fil: "Heavy equipment transport" },
];

const permitSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  permitType: z.string().min(1, "Please select a permit type"),
  route: z.string().min(5, "Please provide a proposed route"),
  schedule: z.string().min(1, "Please select a preferred schedule"),
  cargoDescription: z.string().min(10, "Cargo description must be at least 10 characters"),
});

type PermitFormData = z.infer<typeof permitSchema>;

export default function SpecialPermitsPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PermitFormData>({ mode: "onBlur" });

  function onSubmit(data: PermitFormData) {
    const result = permitSchema.safeParse(data);
    if (result.success) {
      setSubmitted(true);
      window.scrollTo({ top: 0 });
    }
  }

  if (submitted) {
    return (
      <main className="overflow-x-hidden w-full max-w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-10 text-center shadow-brand-lg">
          <CheckCircle className="mx-auto size-16 text-emerald-500" weight="bold" />
          <h1 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-[-0.03em]">
            {language === "en"
              ? "Special permit application submitted successfully."
              : "Matagumpay na naisumite ang aplikasyon sa special permit."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your application is now queued for MMDA operations review. Standard processing takes 5-7 business days. For urgent permits, call 136."
              : "Naka-queue na ang iyong aplikasyon para sa MMDA operations review. Ang standard processing ay tumatagal ng 5-7 business days. Para sa urgent permits, tumawag sa 136."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setSubmitted(false)} className="rounded-full px-6">
              {language === "en" ? "Submit another application" : "Magsumite ng isa pang aplikasyon"}
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/services">
                {language === "en" ? "Back to services" : "Bumalik sa services"}
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-22 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/mmda_building.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en" ? "Permits" : "Permits"}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "Apply for special transport permits through MMDA."
                : "Mag-apply para sa special transport permits sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Special permits are required for oversized, heavy, or hazardous cargo transport on Metro Manila roads. Submit your application for review."
                : "Kailangan ng special permits para sa oversized, mabigat, o hazardous cargo transport sa mga kalsada ng Metro Manila. Isumite ang iyong aplikasyon para sa review."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:136"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-4" weight="bold" />
                {language === "en" ? "Call 136 for urgent permits" : "Tumawag sa 136 para sa urgent permits"}
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

      {/* Form section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <ListChecks className="size-4" weight="bold" />
                  {language === "en" ? "Requirements" : "Mga kinakailangan"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Business/company registration" : "Business/company registration"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Vehicle specifications document" : "Vehicle specifications document"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Cargo manifest with dimensions/weight" : "Cargo manifest na may dimensions/weight"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Route plan with time schedule" : "Route plan na may time schedule"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Insurance certificate" : "Insurance certificate"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <Clock className="size-4" weight="bold" />
                  {language === "en" ? "Processing timeline" : "Timeline ng pagproseso"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "Standard applications are processed within 5-7 business days. Expedited processing is available for time-sensitive cargo movements — call MMDA Operations at 136."
                    : "Ang standard applications ay pinoproseso sa loob ng 5-7 business days. Available ang expedited processing para sa time-sensitive cargo movements — tumawag sa MMDA Operations sa 136."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Permit application" : "Aplikasyon sa permit"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Provide complete details for faster processing of your special permit request."
                  : "Magbigay ng kumpletong detalye para sa mas mabilis na pagproseso ng iyong special permit request."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Company / Organization name" : "Pangalan ng kumpanya / organisasyon"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    className="mt-1.5"
                    {...register("company", { required: true, minLength: 2 })}
                    aria-invalid={!!errors.company}
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Company name is required." : "Kinakailangan ang pangalan ng kumpanya."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Contact person" : "Contact person"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="contactPerson"
                    type="text"
                    autoComplete="name"
                    className="mt-1.5"
                    {...register("contactPerson", { required: true, minLength: 2 })}
                    aria-invalid={!!errors.contactPerson}
                  />
                  {errors.contactPerson && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Contact person is required." : "Kinakailangan ang contact person."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Email address" : "Email address"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="company@example.com"
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
                    {language === "en" ? "Phone number" : "Numero ng telepono"}{" "}
                    <span className="text-destructive">*</span>
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
                  <label htmlFor="permitType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Permit type" : "Uri ng permit"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="permitType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("permitType", { required: true })}
                    aria-invalid={!!errors.permitType}
                  >
                    <option value="">
                      {language === "en" ? "Select permit type..." : "Pumili ng uri ng permit..."}
                    </option>
                    {permitTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.permitType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a permit type." : "Mangyaring pumili ng uri ng permit."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="route" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Proposed route" : "Proposed route"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="route"
                    type="text"
                    placeholder={language === "en" ? "e.g. Port of Manila → NLEX via Roxas Blvd, España" : "hal. Port of Manila → NLEX via Roxas Blvd, España"}
                    className="mt-1.5"
                    {...register("route", { required: true, minLength: 5 })}
                    aria-invalid={!!errors.route}
                  />
                  {errors.route && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please provide a proposed route." : "Mangyaring magbigay ng proposed route."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Preferred schedule" : "Preferred na iskedyul"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="schedule"
                    type="date"
                    className="mt-1.5"
                    {...register("schedule", { required: true })}
                    aria-invalid={!!errors.schedule}
                  />
                  {errors.schedule && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a preferred schedule." : "Mangyaring pumili ng preferred na iskedyul."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cargoDescription" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Cargo description" : "Deskripsyon ng kargamento"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="cargoDescription"
                    rows={4}
                    placeholder={language === "en" ? "Describe the cargo type, dimensions, weight, and any special handling requirements..." : "Ilarawan ang uri ng kargamento, dimensyon, timbang, at anumang espesyal na handling requirements..."}
                    className="mt-1.5 flex min-h-32.5 w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("cargoDescription", { required: true, minLength: 10 })}
                    aria-invalid={!!errors.cargoDescription}
                  />
                  {errors.cargoDescription && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en"
                        ? "Cargo description must be at least 10 characters."
                        : "Ang deskripsyon ng kargamento ay dapat hindi bababa sa 10 karakter."}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full">
                  {isSubmitting
                    ? (language === "en" ? "Submitting..." : "Isinusumite...")
                    : (language === "en" ? "Submit application" : "Isumite ang aplikasyon")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
