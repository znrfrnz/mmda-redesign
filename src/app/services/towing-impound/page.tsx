"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, FileText, MapPin, Phone } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const inquiryTypes = [
  { value: "locate", en: "Locate my vehicle", fil: "Hanapin ang aking sasakyan" },
  { value: "release", en: "Request vehicle release", fil: "Humiling ng vehicle release" },
  { value: "status", en: "Check impound status", fil: "Suriin ang impound status" },
];

const impoundSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  plateNumber: z.string().min(1, "Please enter a plate number"),
  towDate: z.string().min(1, "Please select a date"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  details: z.string().optional(),
});

type ImpoundFormData = z.infer<typeof impoundSchema>;

export default function TowingImpoundPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ImpoundFormData>({ mode: "onBlur" });

  function onSubmit(data: ImpoundFormData) {
    const result = impoundSchema.safeParse(data);
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
              ? "Impound inquiry submitted successfully."
              : "Matagumpay na naisumite ang impound inquiry."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your inquiry has been received. MMDA staff will process your request and may contact you for additional details."
              : "Natanggap na ang iyong inquiry. Ipo-process ng MMDA staff ang iyong request at maaaring makipag-ugnayan para sa karagdagang detalye."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setSubmitted(false)} className="rounded-full px-6">
              {language === "en" ? "Submit another inquiry" : "Magsumite ng isa pang inquiry"}
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
                ? "Locate towed vehicles and process impound release with MMDA."
                : "Hanapin ang na-tow na sasakyan at i-process ang impound release sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Submit your vehicle details below to locate a towed vehicle, check impound status, or begin the release process."
                : "Isumite ang mga detalye ng iyong sasakyan sa ibaba para hanapin ang na-tow na sasakyan, suriin ang impound status, o simulan ang release process."}
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

      <section className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <MapPin className="size-4" weight="bold" />
                  {language === "en" ? "Impound locations" : "Mga lokasyon ng impound"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "MMDA Impound Lot, EDSA-Reliance"
                      : "MMDA Impound Lot, EDSA-Reliance"}
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "MMDA Impound Lot, Pasig Blvd"
                      : "MMDA Impound Lot, Pasig Blvd"}
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Satellite impound areas (varies)"
                      : "Satellite impound areas (nag-iiba)"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <FileText className="size-4" weight="bold" />
                  {language === "en" ? "Release requirements" : "Mga requirements sa release"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Original OR/CR" : "Original na OR/CR"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en" ? "Valid government ID" : "Valid na government ID"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Proof of settlement (violation receipt)"
                      : "Patunay ng bayad (violation receipt)"}
                  </li>
                  <li className="flex gap-3">
                    <FileText className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    {language === "en"
                      ? "Authorization letter (if representative)"
                      : "Authorization letter (kung kinatawan)"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Submit impound inquiry" : "Isumite ang impound inquiry"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Provide your vehicle details so MMDA can locate and process your request."
                  : "Ibigay ang detalye ng iyong sasakyan para ma-locate at ma-process ng MMDA ang iyong request."}
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
                  <label htmlFor="plateNumber" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Plate number" : "Plate number"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="plateNumber"
                    type="text"
                    placeholder={language === "en" ? "e.g. ABC 1234" : "hal. ABC 1234"}
                    className="mt-1.5"
                    {...register("plateNumber", { required: true })}
                    aria-invalid={!!errors.plateNumber}
                  />
                  {errors.plateNumber && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please enter a plate number." : "Mangyaring maglagay ng plate number."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="towDate" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Approximate tow date" : "Tinatayang petsa ng pag-tow"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="towDate"
                    type="date"
                    className="mt-1.5"
                    {...register("towDate", { required: true })}
                    aria-invalid={!!errors.towDate}
                  />
                  {errors.towDate && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a date." : "Mangyaring pumili ng petsa."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Inquiry type" : "Uri ng inquiry"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("inquiryType", { required: true })}
                    aria-invalid={!!errors.inquiryType}
                  >
                    <option value="">
                      {language === "en" ? "Select inquiry type..." : "Pumili ng uri ng inquiry..."}
                    </option>
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === "en" ? type.en : type.fil}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryType && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select an inquiry type." : "Mangyaring pumili ng uri ng inquiry."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Additional details" : "Karagdagang detalye"}
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    className="mt-1.5 flex min-h-24 w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={language === "en" ? "Any other details about your vehicle or situation..." : "Iba pang detalye tungkol sa iyong sasakyan o sitwasyon..."}
                    {...register("details")}
                  />
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
                        ? "Submit inquiry"
                        : "Isumite ang inquiry"}
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
