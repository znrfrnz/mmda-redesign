"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle, Info, CreditCard } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const paymentMethods = [
  { value: "gcash", en: "GCash", fil: "GCash" },
  { value: "maya", en: "Maya", fil: "Maya" },
  { value: "bank-transfer", en: "Bank transfer (BDO, BPI, Landbank, UnionBank)", fil: "Bank transfer (BDO, BPI, Landbank, UnionBank)" },
  { value: "online", en: "Online payment portal", fil: "Online payment portal" },
  { value: "counter", en: "Over-the-counter at MMDA", fil: "Over-the-counter sa MMDA" },
  { value: "bayad-center", en: "Bayad Center / 7-Eleven / Cebuana Lhuillier", fil: "Bayad Center / 7-Eleven / Cebuana Lhuillier" },
];

const fineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  plateOrLicense: z.string().min(3, "Must be at least 3 characters"),
  referenceNumber: z.string().optional(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  amount: z.coerce.number().min(100, "Minimum amount is ₱100"),
});

type FineFormData = z.infer<typeof fineSchema>;

export default function UnpaidFinesPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FineFormData>({ mode: "onBlur" });

  function onSubmit(data: FineFormData) {
    const result = fineSchema.safeParse(data);
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
              ? "Fine payment request submitted successfully."
              : "Matagumpay na naisumite ang request sa pagbabayad ng multa."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {language === "en"
              ? "Your payment details have been received. Allow 3–5 business days for your violation clearance record to be updated."
              : "Natanggap na ang mga detalye ng iyong pagbabayad. Maghintay ng 3–5 business days para ma-update ang iyong violation clearance record."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setSubmitted(false)} className="rounded-full px-6">
              {language === "en" ? "Submit another payment" : "Magsumite ng isa pang pagbabayad"}
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/services/traffic-violations">
                {language === "en" ? "Look up violations" : "Maghanap ng mga paglabag"}
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
              {language === "en"
                ? "Violations"
                : "Mga Paglabag"}
            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-tighter">
              {language === "en"
                ? "Settle unpaid traffic fines online with MMDA."
                : "Bayaran ang hindi nabayarang multa sa trapiko online sa MMDA."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Submit your payment details below. MMDA processes fine payments and updates your violation clearance record."
                : "Isumite ang mga detalye ng iyong pagbabayad sa ibaba. Pinoproseso ng MMDA ang pagbabayad ng multa at ina-update ang iyong violation clearance record."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#payment-form"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <CreditCard className="size-4" weight="bold" />
                {language === "en" ? "Pay fines now" : "Magbayad ng multa ngayon"}
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

      <section id="payment-form" className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <Info className="size-4" weight="bold" />
                  {language === "en" ? "Before you pay" : "Bago ka magbayad"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? (
                      <>
                        Verify your violation record first at{" "}
                        <Link href="/services/traffic-violations" className="text-primary underline underline-offset-2 hover:text-primary/80">
                          Traffic Violations
                        </Link>
                      </>
                    ) : (
                      <>
                        I-verify muna ang iyong violation record sa{" "}
                        <Link href="/services/traffic-violations" className="text-primary underline underline-offset-2 hover:text-primary/80">
                          Traffic Violations
                        </Link>
                      </>
                    )}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en"
                      ? "Keep your receipt for clearance processing"
                      : "Itabi ang iyong resibo para sa clearance processing"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en"
                      ? "Allow 3–5 business days for record update"
                      : "Maghintay ng 3–5 business days para sa record update"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <CreditCard className="size-4" weight="bold" />
                  {language === "en" ? "Accepted payment" : "Tinatanggap na pagbabayad"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? "GCash / Maya" : "GCash / Maya"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en"
                      ? "Bank transfer (BDO, BPI, Landbank, UnionBank)"
                      : "Bank transfer (BDO, BPI, Landbank, UnionBank)"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? "Cash at MMDA office" : "Cash sa MMDA office"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en"
                      ? "Bayad Center / 7-Eleven / Cebuana Lhuillier"
                      : "Bayad Center / 7-Eleven / Cebuana Lhuillier"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Payment details" : "Mga detalye ng pagbabayad"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Fill in your details below to submit a fine payment request to MMDA."
                  : "Punan ang mga detalye sa ibaba upang magsumite ng fine payment request sa MMDA."}
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
                  <label htmlFor="plateOrLicense" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Plate number or License number" : "Plate number o License number"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="plateOrLicense"
                    type="text"
                    placeholder={language === "en" ? "e.g. ABC 1234 or N01-12-345678" : "hal. ABC 1234 o N01-12-345678"}
                    className="mt-1.5"
                    {...register("plateOrLicense", { required: true, minLength: 3 })}
                    aria-invalid={!!errors.plateOrLicense}
                  />
                  {errors.plateOrLicense && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en"
                        ? "Please enter a valid plate or license number."
                        : "Mangyaring maglagay ng wastong plate o license number."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="referenceNumber" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Reference number (optional)" : "Reference number (opsyonal)"}
                  </label>
                  <Input
                    id="referenceNumber"
                    type="text"
                    placeholder={language === "en" ? "From a prior violation lookup" : "Mula sa naunang violation lookup"}
                    className="mt-1.5"
                    {...register("referenceNumber")}
                  />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Payment method" : "Paraan ng pagbabayad"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="paymentMethod"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("paymentMethod", { required: true })}
                    aria-invalid={!!errors.paymentMethod}
                  >
                    <option value="">
                      {language === "en" ? "Select a payment method..." : "Pumili ng paraan ng pagbabayad..."}
                    </option>
                    {paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {language === "en" ? method.en : method.fil}
                      </option>
                    ))}
                  </select>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Please select a payment method." : "Mangyaring pumili ng paraan ng pagbabayad."}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Amount to pay (₱)" : "Halaga na babayaran (₱)"} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    min={100}
                    placeholder="1000"
                    className="mt-1.5"
                    {...register("amount", { required: true, min: 100, valueAsNumber: true })}
                    aria-invalid={!!errors.amount}
                  />
                  {errors.amount && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en" ? "Minimum amount is ₱100." : "Ang minimum na halaga ay ₱100."}
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
                      ? language === "en" ? "Submitting..." : "Isinusumite..."
                      : language === "en" ? "Submit payment" : "Isumite ang pagbabayad"}
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
