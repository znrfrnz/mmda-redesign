"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CalendarBlank, CheckCircle, MagnifyingGlass, Phone } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const eventTypes = [
  { value: "public-gathering", en: "Public gathering/rally", fil: "Public gathering/rally" },
  { value: "road-race", en: "Road race/marathon", fil: "Road race/marathon" },
  { value: "street-parade", en: "Street parade", fil: "Street parade" },
  { value: "community-event", en: "Community event", fil: "Community event" },
  { value: "construction-closure", en: "Construction-related closure", fil: "Construction-related closure" },
  { value: "film-production", en: "Film/media production", fil: "Film/media production" },
];

const attendanceOptions = [
  { value: "under-100", label: "Under 100" },
  { value: "100-500", label: "100–500" },
  { value: "500-1000", label: "500–1,000" },
  { value: "1000-5000", label: "1,000–5,000" },
  { value: "over-5000", label: "Over 5,000" },
];

const closureOptions = [
  { value: "none", en: "No road closure", fil: "Walang road closure" },
  { value: "partial", en: "Partial lane closure", fil: "Partial lane closure" },
  { value: "full", en: "Full road closure", fil: "Full road closure" },
];

const eventSchema = z.object({
  organizer: z.string().min(2, "Organizer name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  eventName: z.string().min(2, "Event name is required"),
  eventType: z.string().min(1, "Please select an event type"),
  location: z.string().min(5, "Please provide an event location"),
  startDate: z.string().min(1, "Please select a start date"),
  endDate: z.string().min(1, "Please select an end date"),
  attendance: z.string().min(1, "Please select estimated attendance"),
  roadClosure: z.string().min(1, "Please select road closure requirement"),
  additionalDetails: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EventPermitsPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({ mode: "onBlur" });

  function onSubmit(data: EventFormData) {
    const result = eventSchema.safeParse(data);
    if (result.success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="overflow-x-hidden w-full max-w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-10 text-center shadow-brand-lg">
          <CheckCircle className="mx-auto size-16 text-emerald-500" weight="bold" />
          <h1 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-[-0.03em]">
            {language === "en"
              ? "Event permit application submitted successfully."
              : "Matagumpay na naisumite ang aplikasyon sa event permit."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your event permit application is now queued for MMDA operations review. You will be contacted regarding your application status."
              : "Naka-queue na ang iyong event permit application para sa MMDA operations review. Kokontakin ka tungkol sa status ng iyong aplikasyon."}
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

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en" ? "Permits" : "Permits"}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "Apply for event and road closure permits with MMDA."
                : "Mag-apply para sa event at road closure permits sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "All events that affect Metro Manila traffic flow require an MMDA clearance. Submit your event details for operations review."
                : "Lahat ng event na nakakaapekto sa daloy ng trapiko sa Metro Manila ay nangangailangan ng MMDA clearance. Isumite ang mga detalye ng event para sa operations review."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:136"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-4" weight="bold" />
                {language === "en" ? "Call 136 for coordination" : "Tumawag sa 136 para sa koordinasyon"}
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
                  <CalendarBlank className="size-4" weight="bold" />
                  {language === "en" ? "Lead time required" : "Kinakailangang lead time"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "Event permit applications must be submitted at least 15 business days before the event date. Large-scale events (1,000+ attendees) require 30 days advance notice."
                    : "Ang event permit applications ay dapat isumite nang hindi bababa sa 15 business days bago ang event date. Ang large-scale events (1,000+ attendees) ay nangangailangan ng 30 days advance notice."}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <MagnifyingGlass className="size-4" weight="bold" />
                  {language === "en" ? "What MMDA reviews" : "Ano ang rini-review ng MMDA"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <MagnifyingGlass className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Traffic impact assessment" : "Traffic impact assessment"}
                  </li>
                  <li className="flex gap-3">
                    <MagnifyingGlass className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Required road closures and rerouting" : "Kinakailangang road closures at rerouting"}
                  </li>
                  <li className="flex gap-3">
                    <MagnifyingGlass className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Emergency vehicle access" : "Emergency vehicle access"}
                  </li>
                  <li className="flex gap-3">
                    <MagnifyingGlass className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Public safety coordination" : "Public safety coordination"}
                  </li>
                  <li className="flex gap-3">
                    <MagnifyingGlass className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Post-event road restoration plan" : "Post-event road restoration plan"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Event permit application" : "Aplikasyon sa event permit"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Provide complete event details so MMDA can assess traffic impact and coordination requirements."
                  : "Magbigay ng kumpletong event details para ma-assess ng MMDA ang traffic impact at coordination requirements."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
                <div>
                  <label htmlFor="organizer" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Organizer name" : "Pangalan ng organizer"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="organizer"
                    type="text"
                    autoComplete="name"
                    className="mt-1.5"
                    {...register("organizer", { required: true, minLength: 2 })}
                    aria-invalid={!!errors.organizer}
                  />
                  {errors.organizer && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Organizer name is required." : "Kinakailangan ang pangalan ng organizer."}
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
                    placeholder="organizer@example.com"
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
                  <label htmlFor="eventName" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Event name" : "Pangalan ng event"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="eventName"
                    type="text"
                    className="mt-1.5"
                    {...register("eventName", { required: true, minLength: 2 })}
                    aria-invalid={!!errors.eventName}
                  />
                  {errors.eventName && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Event name is required." : "Kinakailangan ang pangalan ng event."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Event type" : "Uri ng event"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="eventType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("eventType", { required: true })}
                    aria-invalid={!!errors.eventType}
                  >
                    <option value="">
                      {language === "en" ? "Select event type..." : "Pumili ng uri ng event..."}
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select an event type." : "Mangyaring pumili ng uri ng event."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Event location" : "Lokasyon ng event"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="location"
                    type="text"
                    placeholder={language === "en" ? "e.g. Rizal Park to Quirino Grandstand, Manila" : "hal. Rizal Park to Quirino Grandstand, Manila"}
                    className="mt-1.5"
                    {...register("location", { required: true, minLength: 5 })}
                    aria-invalid={!!errors.location}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please provide an event location." : "Mangyaring magbigay ng lokasyon ng event."}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-foreground">
                      {language === "en" ? "Event start date" : "Petsa ng simula ng event"}{" "}
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
                    <label htmlFor="endDate" className="block text-sm font-medium text-foreground">
                      {language === "en" ? "Event end date" : "Petsa ng wakas ng event"}{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      className="mt-1.5"
                      {...register("endDate", { required: true })}
                      aria-invalid={!!errors.endDate}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-xs text-destructive">
                        {language === "en" ? "Please select an end date." : "Mangyaring pumili ng petsa ng wakas."}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="attendance" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Estimated attendance" : "Tinatayang bilang ng dadalo"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="attendance"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("attendance", { required: true })}
                    aria-invalid={!!errors.attendance}
                  >
                    <option value="">
                      {language === "en" ? "Select estimated attendance..." : "Pumili ng tinatayang bilang..."}
                    </option>
                    {attendanceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.attendance && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select estimated attendance." : "Mangyaring pumili ng tinatayang bilang ng dadalo."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="roadClosure" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Road closure needed" : "Kailangan ba ng road closure"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="roadClosure"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("roadClosure", { required: true })}
                    aria-invalid={!!errors.roadClosure}
                  >
                    <option value="">
                      {language === "en" ? "Select road closure requirement..." : "Pumili ng road closure requirement..."}
                    </option>
                    {closureOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {language === "en" ? opt.en : opt.fil}
                      </option>
                    ))}
                  </select>
                  {errors.roadClosure && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select road closure requirement." : "Mangyaring pumili ng road closure requirement."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Additional details" : "Karagdagang detalye"}
                  </label>
                  <textarea
                    id="additionalDetails"
                    rows={4}
                    placeholder={language === "en" ? "Any additional information about your event..." : "Anumang karagdagang impormasyon tungkol sa iyong event..."}
                    className="mt-1.5 flex min-h-32.5 w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("additionalDetails")}
                  />
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
