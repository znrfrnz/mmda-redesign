"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, FileText, Phone, ShieldCheck } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projectTypes = [
  { value: "road-construction", en: "Road construction", fil: "Road construction" },
  { value: "road-maintenance", en: "Road maintenance/repair", fil: "Road maintenance/repair" },
  { value: "utility-installation", en: "Utility installation (water, electric, telecom)", fil: "Utility installation (water, electric, telecom)" },
  { value: "drainage-sewerage", en: "Drainage/sewerage work", fil: "Drainage/sewerage work" },
  { value: "bridge-overpass", en: "Bridge/overpass work", fil: "Bridge/overpass work" },
];

const durationOptions = [
  { value: "1-7-days", label: "1–7 days" },
  { value: "1-2-weeks", label: "1–2 weeks" },
  { value: "2-4-weeks", label: "2–4 weeks" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "over-3-months", label: "Over 3 months" },
];

const laneClosure = [
  { value: "none", en: "No lane closure", fil: "Walang lane closure" },
  { value: "one-lane", en: "One lane", fil: "Isang lane" },
  { value: "two-lanes", en: "Two lanes", fil: "Dalawang lane" },
  { value: "full-closure", en: "Full road closure", fil: "Full road closure" },
];

const constructionSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  projectType: z.string().min(1, "Please select a project type"),
  location: z.string().min(5, "Please provide a project location"),
  startDate: z.string().min(1, "Please select a start date"),
  duration: z.string().min(1, "Please select estimated duration"),
  laneClosureRequired: z.string().min(1, "Please select lane closure requirement"),
  description: z.string().min(20, "Project description must be at least 20 characters"),
});

type ConstructionFormData = z.infer<typeof constructionSchema>;

export default function ConstructionPermitsPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConstructionFormData>({ mode: "onBlur" });

  function onSubmit(data: ConstructionFormData) {
    const result = constructionSchema.safeParse(data);
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
              ? "Construction permit application submitted successfully."
              : "Matagumpay na naisumite ang aplikasyon sa construction permit."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your construction permit application is now queued for MMDA operations review. An inspector will be assigned to evaluate your project site."
              : "Naka-queue na ang iyong construction permit application para sa MMDA operations review. Magtatalaga ng inspector para suriin ang iyong project site."}
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
                ? "Request construction and utility work permits from MMDA."
                : "Humiling ng construction at utility work permits mula sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "All construction, maintenance, and utility work affecting Metro Manila roads require MMDA coordination and approval."
                : "Lahat ng construction, maintenance, at utility work na nakakaapekto sa mga kalsada ng Metro Manila ay nangangailangan ng koordinasyon at pag-apruba ng MMDA."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:136"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-4" weight="bold" />
                {language === "en" ? "Call MMDA Operations 136" : "Tumawag sa MMDA Operations 136"}
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
                  <FileText className="size-4" weight="bold" />
                  {language === "en" ? "Required documents" : "Mga kinakailangang dokumento"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Construction plan and timeline" : "Construction plan at timeline"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Traffic management plan" : "Traffic management plan"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Company registration/DTI/SEC" : "Company registration/DTI/SEC"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Contractor's license" : "Contractor's license"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Barangay clearance" : "Barangay clearance"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "LGU endorsement" : "LGU endorsement"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="size-4" weight="bold" />
                  {language === "en" ? "Compliance notes" : "Mga compliance notes"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Work hours restricted to 10PM-5AM on major thoroughfares"
                      : "Oras ng trabaho ay limitado sa 10PM-5AM sa mga pangunahing kalsada"}
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Safety barriers and signage required at all times"
                      : "Kailangan ng safety barriers at signage sa lahat ng oras"}
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "MMDA inspector must approve site before work begins"
                      : "Kailangang aprubahan ng MMDA inspector ang site bago magsimula ang trabaho"}
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Weekly progress reports required for projects over 2 weeks"
                      : "Kailangan ng weekly progress reports para sa mga proyektong higit sa 2 linggo"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Construction permit application" : "Aplikasyon sa construction permit"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Provide complete project details for MMDA coordination and site inspection scheduling."
                  : "Magbigay ng kumpletong project details para sa MMDA coordination at scheduling ng site inspection."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Company name" : "Pangalan ng kumpanya"}{" "}
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
                  <label htmlFor="projectType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Project type" : "Uri ng proyekto"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="projectType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("projectType", { required: true })}
                    aria-invalid={!!errors.projectType}
                  >
                    <option value="">
                      {language === "en" ? "Select project type..." : "Pumili ng uri ng proyekto..."}
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a project type." : "Mangyaring pumili ng uri ng proyekto."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Project location" : "Lokasyon ng proyekto"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="location"
                    type="text"
                    placeholder={language === "en" ? "e.g. Ortigas Ave, between EDSA and C5, Pasig City" : "hal. Ortigas Ave, between EDSA and C5, Pasig City"}
                    className="mt-1.5"
                    {...register("location", { required: true, minLength: 5 })}
                    aria-invalid={!!errors.location}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please provide a project location." : "Mangyaring magbigay ng lokasyon ng proyekto."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Estimated start date" : "Tinatayang petsa ng simula"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    className="mt-1.5"
                    {...register("startDate", { required: true })}
                    aria-invalid={!!errors.startDate}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a start date." : "Mangyaring pumili ng petsa ng simula."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Estimated duration" : "Tinatayang tagal"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="duration"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("duration", { required: true })}
                    aria-invalid={!!errors.duration}
                  >
                    <option value="">
                      {language === "en" ? "Select estimated duration..." : "Pumili ng tinatayang tagal..."}
                    </option>
                    {durationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select estimated duration." : "Mangyaring pumili ng tinatayang tagal."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="laneClosureRequired" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Lane closure required" : "Kailangan ba ng lane closure"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="laneClosureRequired"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("laneClosureRequired", { required: true })}
                    aria-invalid={!!errors.laneClosureRequired}
                  >
                    <option value="">
                      {language === "en" ? "Select lane closure requirement..." : "Pumili ng lane closure requirement..."}
                    </option>
                    {laneClosure.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {language === "en" ? opt.en : opt.fil}
                      </option>
                    ))}
                  </select>
                  {errors.laneClosureRequired && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select lane closure requirement." : "Mangyaring pumili ng lane closure requirement."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Project description" : "Deskripsyon ng proyekto"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder={language === "en" ? "Describe the scope of work, materials, equipment, and any special considerations..." : "Ilarawan ang saklaw ng trabaho, materyales, kagamitan, at anumang espesyal na konsiderasyon..."}
                    className="mt-1.5 flex min-h-32.5 w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("description", { required: true, minLength: 20 })}
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en"
                        ? "Project description must be at least 20 characters."
                        : "Ang deskripsyon ng proyekto ay dapat hindi bababa sa 20 karakter."}
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
