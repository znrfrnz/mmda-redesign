"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, NavigationArrow, Phone, Warning } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const vehicleTypes = [
  { value: "sedan", en: "Sedan", fil: "Sedan" },
  { value: "suv-pickup", en: "SUV/Pickup", fil: "SUV/Pickup" },
  { value: "van", en: "Van", fil: "Van" },
  { value: "motorcycle", en: "Motorcycle", fil: "Motorsiklo" },
  { value: "truck", en: "Truck", fil: "Truck" },
  { value: "bus", en: "Bus", fil: "Bus" },
];

const issueTypes = [
  { value: "breakdown", en: "Vehicle breakdown", fil: "Sira ang sasakyan" },
  { value: "flat-tire", en: "Flat tire", fil: "Flat tire" },
  { value: "overheating", en: "Overheating", fil: "Overheating" },
  { value: "out-of-fuel", en: "Out of fuel", fil: "Walang gasolina" },
  { value: "minor-accident", en: "Minor accident", fil: "Minor na aksidente" },
  { value: "other", en: "Other emergency", fil: "Iba pang emergency" },
];

const assistanceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  location: z.string().min(5, "Please provide a specific location"),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  issueType: z.string().min(1, "Please select an issue type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type AssistanceFormData = z.infer<typeof assistanceSchema>;

export default function RoadsideAssistancePage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssistanceFormData>({ mode: "onBlur" });

  function onSubmit(data: AssistanceFormData) {
    const result = assistanceSchema.safeParse(data);
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
              ? "Roadside assistance request submitted successfully."
              : "Matagumpay na naisumite ang request sa roadside assistance."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your request has been received. MMDA patrol units will be dispatched to your location. For immediate help, call 136."
              : "Natanggap na ang iyong request. Magpapadala ng MMDA patrol units sa iyong lokasyon. Para sa agarang tulong, tumawag sa 136."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setSubmitted(false)} className="rounded-full px-6">
              {language === "en" ? "Submit another request" : "Magsumite ng isa pang request"}
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
          style={{ backgroundImage: "url('/images/mmda_building.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,16,46,0.18),transparent_42%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0.42))]" />

          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en" ? "Assistance" : "Tulong"}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "Request emergency roadside assistance from MMDA."
                : "Humiling ng emergency roadside assistance mula sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "MMDA Metrobase deploys patrol units for roadside emergencies across Metro Manila. For immediate help, call 136."
                : "Nagde-deploy ang MMDA Metrobase ng patrol units para sa mga roadside emergency sa Metro Manila. Para sa agarang tulong, tumawag sa 136."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:136"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-4" weight="bold" />
                {language === "en" ? "Call 136" : "Tumawag sa 136"}
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

      <section className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <NavigationArrow className="size-4" weight="bold" />
                  {language === "en" ? "Coverage area" : "Sakop na lugar"}
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "MMDA roadside assistance covers all major thoroughfares in Metro Manila including EDSA, C5, Commonwealth, Quezon Ave, and connecting roads."
                    : "Sinasaklaw ng MMDA roadside assistance ang lahat ng pangunahing kalsada sa Metro Manila kabilang ang EDSA, C5, Commonwealth, Quezon Ave, at mga connecting roads."}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <Warning className="size-4" weight="bold" />
                  {language === "en" ? "While waiting" : "Habang naghihintay"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <Warning className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Turn on hazard lights"
                      : "I-on ang hazard lights"}
                  </li>
                  <li className="flex gap-3">
                    <Warning className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Move to the shoulder if possible"
                      : "Lumipat sa gilid ng kalsada kung maaari"}
                  </li>
                  <li className="flex gap-3">
                    <Warning className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Stay inside your vehicle if on a major road"
                      : "Manatili sa loob ng sasakyan kung nasa pangunahing kalsada"}
                  </li>
                  <li className="flex gap-3">
                    <Warning className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Do not attempt repairs in active traffic lanes"
                      : "Huwag subukang magkumpuni sa aktibong traffic lanes"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Request assistance" : "Humiling ng tulong"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Provide your location and vehicle details for faster dispatch of MMDA patrol units."
                  : "Ibigay ang iyong lokasyon at detalye ng sasakyan para sa mas mabilis na pag-deploy ng MMDA patrol units."}
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
                  <label htmlFor="location" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Current location" : "Kasalukuyang lokasyon"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="location"
                    type="text"
                    autoComplete="street-address"
                    placeholder={language === "en" ? "e.g. EDSA Northbound, near Ortigas flyover" : "hal. EDSA Northbound, malapit sa Ortigas flyover"}
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
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Vehicle type" : "Uri ng sasakyan"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="vehicleType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("vehicleType", { required: true })}
                    aria-invalid={!!errors.vehicleType}
                  >
                    <option value="">
                      {language === "en" ? "Select vehicle type..." : "Pumili ng uri ng sasakyan..."}
                    </option>
                    {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a vehicle type." : "Mangyaring pumili ng uri ng sasakyan."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="issueType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Issue type" : "Uri ng problema"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="issueType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("issueType", { required: true })}
                    aria-invalid={!!errors.issueType}
                  >
                    <option value="">
                      {language === "en" ? "Select issue type..." : "Pumili ng uri ng problema..."}
                    </option>
                    {issueTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.issueType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select an issue type." : "Mangyaring pumili ng uri ng problema."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Description" : "Deskripsyon"} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="mt-1.5 flex min-h-24 w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={language === "en" ? "Describe your situation and what assistance you need..." : "Ilarawan ang iyong sitwasyon at kung anong tulong ang kailangan mo..."}
                    {...register("description", { required: true, minLength: 10 })}
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Description must be at least 10 characters." : "Ang deskripsyon ay dapat hindi bababa sa 10 karakter."}
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
                        ? "Request assistance"
                        : "Humiling ng tulong"}
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
