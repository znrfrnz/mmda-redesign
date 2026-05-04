"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, Car, CheckCircle, ListChecks, MagnifyingGlass } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const registrationTypes = [
  { value: "new", en: "New registration", fil: "Bagong registration" },
  { value: "renewal", en: "Renewal", fil: "Renewal" },
  { value: "transfer", en: "Transfer of ownership", fil: "Transfer of ownership" },
];

const vehicleTypes = [
  { value: "sedan", en: "Sedan", fil: "Sedan" },
  { value: "suv", en: "SUV / Pickup", fil: "SUV / Pickup" },
  { value: "van", en: "Van", fil: "Van" },
  { value: "motorcycle", en: "Motorcycle", fil: "Motorcycle" },
  { value: "truck", en: "Truck", fil: "Truck" },
  { value: "bus", en: "Bus", fil: "Bus" },
];

const registrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(7, "Please enter a valid phone number"),
    registrationType: z.string().min(1, "Please select a registration type"),
    plateNumber: z.string().optional(),
    vehicleType: z.string().min(1, "Please select a vehicle type"),
    year: z.string().min(4, "Please enter a valid year"),
    make: z.string().min(1, "Please enter the vehicle make"),
    model: z.string().min(1, "Please enter the vehicle model"),
  })
  .refine(
    (data) => {
      if (data.registrationType === "renewal" || data.registrationType === "transfer") {
        return !!data.plateNumber && data.plateNumber.length >= 1;
      }
      return true;
    },
    { message: "Plate number is required for renewal or transfer", path: ["plateNumber"] }
  );

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function VehicleRegistrationPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({ mode: "onBlur" });

  const registrationType = watch("registrationType");

  function onSubmit(data: RegistrationFormData) {
    const result = registrationSchema.safeParse(data);
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
              ? "Vehicle registration request submitted successfully."
              : "Matagumpay na naisumite ang vehicle registration request."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your registration request is now being processed. You will receive a confirmation at your registered email address."
              : "Pinoproseso na ang iyong registration request. Makakatanggap ka ng confirmation sa iyong registered email address."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setSubmitted(false)} className="rounded-full px-6">
              {language === "en" ? "Submit another request" : "Magsumite ng isa pang request"}
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
                ? "Register your vehicle or renew registration through MMDA."
                : "Irehistro ang iyong sasakyan o mag-renew ng registration sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Complete the form below to submit your vehicle registration request. MMDA coordinates with LTO for registration processing in Metro Manila."
                : "Kumpletuhin ang form sa ibaba para isumite ang iyong vehicle registration request. Nakikipag-ugnayan ang MMDA sa LTO para sa registration processing sa Metro Manila."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#registration-form"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Car className="size-4" weight="bold" />
                {language === "en" ? "Start registration" : "Simulan ang registration"}
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

      <section id="registration-form" className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
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
                    {language === "en" ? "Certificate of registration (if renewal)" : "Certificate of registration (kung renewal)"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Proof of insurance" : "Proof of insurance"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Valid government-issued ID" : "Valid na government-issued ID"}
                  </li>
                  <li className="flex gap-3">
                    <ListChecks className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Official receipt of payment" : "Official receipt ng bayad"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <MagnifyingGlass className="size-4" weight="bold" />
                  {language === "en" ? "Vehicle inspection" : "Inspeksyon ng sasakyan"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "Vehicles must pass inspection at an authorized Private Motor Vehicle Inspection Center (PMVIC) before registration can be processed. Bring your inspection certificate along with other requirements."
                    : "Ang mga sasakyan ay dapat makapasa sa inspeksyon sa isang authorized na Private Motor Vehicle Inspection Center (PMVIC) bago ma-process ang registration. Dalhin ang iyong inspection certificate kasama ang iba pang requirements."}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Vehicle registration details" : "Mga detalye ng vehicle registration"}
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
                  <label htmlFor="registrationType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Registration type" : "Uri ng registration"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="registrationType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("registrationType", { required: true })}
                    aria-invalid={!!errors.registrationType}
                  >
                    <option value="">
                      {language === "en" ? "Select registration type..." : "Pumili ng uri ng registration..."}
                    </option>
                    {registrationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.registrationType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a registration type." : "Mangyaring pumili ng uri ng registration."}
                    </p>
                  )}
                </div>

                {(registrationType === "renewal" || registrationType === "transfer") && (
                  <div>
                    <label htmlFor="plateNumber" className="block text-sm font-medium text-foreground">
                      {language === "en" ? "Plate number" : "Plate number"} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="plateNumber"
                      type="text"
                      placeholder={language === "en" ? "e.g. ABC 1234" : "hal. ABC 1234"}
                      className="mt-1.5"
                      {...register("plateNumber", { required: registrationType === "renewal" || registrationType === "transfer" })}
                      aria-invalid={!!errors.plateNumber}
                    />
                    {errors.plateNumber && (
                      <p className="mt-1 text-xs text-destructive">
                        {language === "en"
                          ? "Plate number is required for renewal or transfer."
                          : "Kinakailangan ang plate number para sa renewal o transfer."}
                      </p>
                    )}
                  </div>
                )}

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
                  <label htmlFor="year" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Year" : "Taon"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="year"
                    type="number"
                    placeholder={language === "en" ? "e.g. 2024" : "hal. 2024"}
                    className="mt-1.5"
                    {...register("year", { required: true, minLength: 4 })}
                    aria-invalid={!!errors.year}
                  />
                  {errors.year && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter a valid year." : "Mangyaring maglagay ng wastong taon."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Make" : "Make (gawa)"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="make"
                    type="text"
                    placeholder={language === "en" ? "e.g. Toyota" : "hal. Toyota"}
                    className="mt-1.5"
                    {...register("make", { required: true, minLength: 1 })}
                    aria-invalid={!!errors.make}
                  />
                  {errors.make && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter the vehicle make." : "Mangyaring ilagay ang make ng sasakyan."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Model" : "Model"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="model"
                    type="text"
                    placeholder={language === "en" ? "e.g. Vios" : "hal. Vios"}
                    className="mt-1.5"
                    {...register("model", { required: true, minLength: 1 })}
                    aria-invalid={!!errors.model}
                  />
                  {errors.model && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter the vehicle model." : "Mangyaring ilagay ang model ng sasakyan."}
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
                        ? "Submit registration"
                        : "Isumite ang registration"}
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
