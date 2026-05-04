"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, Clock, ListChecks, IdentificationCard } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const applicationTypes = [
  { value: "new", en: "New application", fil: "Bagong aplikasyon" },
  { value: "renewal", en: "Renewal", fil: "Renewal" },
  { value: "replacement", en: "Replacement", fil: "Kapalit" },
];

const ltoBranches = [
  { value: "lto-main", label: "LTO Main Office" },
  { value: "lto-qc", label: "LTO Quezon City" },
  { value: "lto-manila", label: "LTO Manila" },
  { value: "lto-makati", label: "LTO Makati" },
  { value: "lto-pasig", label: "LTO Pasig" },
  { value: "lto-caloocan", label: "LTO Caloocan" },
];

const licenseSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(7, "Please enter a valid phone number"),
    applicationType: z.string().min(1, "Please select an application type"),
    licenseNumber: z.string().optional(),
    ltoBranch: z.string().min(1, "Please select an LTO branch"),
    dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  })
  .refine(
    (data) => {
      if (data.applicationType === "renewal" || data.applicationType === "replacement") {
        return !!data.licenseNumber && data.licenseNumber.length >= 1;
      }
      return true;
    },
    { message: "License number is required for renewal or replacement", path: ["licenseNumber"] }
  );

type LicenseFormData = z.infer<typeof licenseSchema>;

export default function DriversLicensePage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LicenseFormData>({ mode: "onBlur" });

  const applicationType = watch("applicationType");

  function onSubmit(data: LicenseFormData) {
    const result = licenseSchema.safeParse(data);
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
              ? "License application submitted successfully."
              : "Matagumpay na naisumite ang aplikasyon sa lisensya."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your application is now being processed. You will receive a confirmation at your registered email address. Processing typically takes 3–5 business days."
              : "Pinoproseso na ang iyong aplikasyon. Makakatanggap ka ng confirmation sa iyong registered email address. Ang processing ay karaniwang tumatagal ng 3–5 business days."}
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
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-22 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/report/report.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,16,46,0.2),transparent_45%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,16,46,0.18),transparent_42%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0.42))]" />

          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "MMDA Licensing Services"
                : "Mga Serbisyo sa Licensing ng MMDA"}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "Apply for a driver\u2019s license or resolve licensing concerns through MMDA."
                : "Mag-apply ng lisensya sa pagmamaneho o resolbahin ang mga usapin sa licensing sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Submit your application details below. MMDA coordinates with LTO to process license requests for Metro Manila residents."
                : "Isumite ang mga detalye ng iyong aplikasyon sa ibaba. Nakikipag-ugnayan ang MMDA sa LTO para i-process ang mga license request para sa mga residente ng Metro Manila."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#license-form"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <IdentificationCard className="size-4" weight="bold" />
                {language === "en" ? "Start application" : "Simulan ang aplikasyon"}
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

      <section id="license-form" className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
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
                    {language === "en" ? "Valid government-issued ID" : "Valid na government-issued ID"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Birth certificate or passport" : "Birth certificate o passport"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Medical certificate" : "Medical certificate"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "TIN or SSS number" : "TIN o SSS number"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <Clock className="size-4" weight="bold" />
                  {language === "en" ? "Processing time" : "Oras ng pagproseso"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "Applications are typically processed within 3–5 business days. Please bring all original documents when visiting the selected LTO branch."
                    : "Ang mga aplikasyon ay karaniwang pinoproseso sa loob ng 3–5 araw ng negosyo. Mangyaring dalhin ang lahat ng orihinal na dokumento kapag bumisita sa napiling LTO branch."}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "License application details" : "Mga detalye ng aplikasyon sa lisensya"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Fill in the required fields below. MMDA will coordinate with LTO for processing."
                  : "Punan ang mga kinakailangang field sa ibaba. Makikipag-ugnayan ang MMDA sa LTO para sa pagproseso."}
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
                    {language === "en" ? "Email address" : "Email address"} <span className="text-destructive">*</span>
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
                  <label htmlFor="applicationType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Application type" : "Uri ng aplikasyon"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="applicationType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("applicationType", { required: true })}
                    aria-invalid={!!errors.applicationType}
                  >
                    <option value="">
                      {language === "en" ? "Select application type..." : "Pumili ng uri ng aplikasyon..."}
                    </option>
                    {applicationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.applicationType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select an application type." : "Mangyaring pumili ng uri ng aplikasyon."}
                    </p>
                  )}
                </div>

                {(applicationType === "renewal" || applicationType === "replacement") && (
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-foreground">
                      {language === "en" ? "Current license number" : "Kasalukuyang numero ng lisensya"} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="licenseNumber"
                      type="text"
                      placeholder={language === "en" ? "e.g. N01-12-345678" : "hal. N01-12-345678"}
                      className="mt-1.5"
                      {...register("licenseNumber", { required: applicationType === "renewal" || applicationType === "replacement" })}
                      aria-invalid={!!errors.licenseNumber}
                    />
                    {errors.licenseNumber && (
                      <p className="mt-1 text-xs text-destructive">
                        {language === "en"
                          ? "License number is required for renewal or replacement."
                          : "Kinakailangan ang numero ng lisensya para sa renewal o replacement."}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="ltoBranch" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Preferred LTO branch" : "Gustong LTO branch"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="ltoBranch"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("ltoBranch", { required: true })}
                    aria-invalid={!!errors.ltoBranch}
                  >
                    <option value="">
                      {language === "en" ? "Select LTO branch..." : "Pumili ng LTO branch..."}
                    </option>
                    {ltoBranches.map((branch) => (
                      <option key={branch.value} value={branch.value}>
                        {branch.label}
                      </option>
                    ))}
                  </select>
                  {errors.ltoBranch && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select an LTO branch." : "Mangyaring pumili ng LTO branch."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Date of birth" : "Petsa ng kapanganakan"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    autoComplete="bday"
                    className="mt-1.5"
                    {...register("dateOfBirth", { required: true })}
                    aria-invalid={!!errors.dateOfBirth}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter your date of birth." : "Mangyaring ilagay ang iyong petsa ng kapanganakan."}
                    </p>
                  )}
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
                        ? "Submit application"
                        : "Isumite ang aplikasyon"}
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
