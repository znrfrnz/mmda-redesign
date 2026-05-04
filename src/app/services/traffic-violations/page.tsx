"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, MagnifyingGlass, ShieldCheck, CreditCard, CaretLeft, CheckCircle, Wallet, Bank, Storefront, CurrencyCircleDollar } from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const mockViolations = [
  {
    date: "2026-03-15",
    type: "Illegal parking",
    typeFil: "Ilegal na pagpaparada",
    location: "EDSA corner Shaw Blvd",
    amount: 1000,
    status: "unpaid" as const,
  },
  {
    date: "2026-01-22",
    type: "Beating the red light",
    typeFil: "Pagsuway sa red light",
    location: "Commonwealth Ave / Batasan Rd",
    amount: 1500,
    status: "unpaid" as const,
  },
  {
    date: "2025-11-08",
    type: "Obstruction violation",
    typeFil: "Paglabag sa obstruction",
    location: "C5 Northbound, Taguig",
    amount: 500,
    status: "paid" as const,
  },
];

const lookupSchema = z.object({
  searchBy: z.enum(["plate", "license"]),
  searchValue: z.string().min(3, "Must be at least 3 characters"),
});

const paymentMethodOptions = [
  { id: "gcash", label: "GCash", icon: Wallet },
  { id: "maya", label: "Maya", icon: Wallet },
  { id: "bank", label: "Bank transfer", sublabel: "BDO, BPI, Landbank, UnionBank", icon: Bank },
  { id: "online", label: "Online portal", icon: CurrencyCircleDollar },
  { id: "counter", label: "MMDA cashier office", icon: Storefront },
  { id: "bayad", label: "Bayad Center / 7-Eleven", icon: Storefront },
];

type LookupFormData = z.infer<typeof lookupSchema>;

export default function TrafficViolationsPage() {
  const { language } = useSettingsStore();
  const [showResults, setShowResults] = useState(false);
  const [selectedFines, setSelectedFines] = useState<number[]>([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LookupFormData>({ mode: "onBlur", defaultValues: { searchBy: "plate" } });

  const searchBy = watch("searchBy");

  function onSubmit(data: LookupFormData) {
    const result = lookupSchema.safeParse(data);
    if (result.success) {
      setShowResults(true);
      window.scrollTo({ top: 0 });
    }
  }

  function handleBackToSearch() {
    setShowResults(false);
    setSelectedFines([]);
    setPaymentConfirmed(false);
    setSelectedPaymentMethod(null);
    reset();
  }

  function toggleFine(index: number) {
    setSelectedFines((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  function handleOpenPaymentModal() {
    setSelectedPaymentMethod(null);
    setPaymentConfirmed(false);
    setPaymentModalOpen(true);
  }

  function handleConfirmPayment() {
    setPaymentConfirmed(true);
  }

  const unpaidViolations = mockViolations.filter((v) => v.status === "unpaid");
  const selectedTotal = selectedFines.reduce((sum, i) => {
    const v = unpaidViolations[i];
    return v ? sum + v.amount : sum;
  }, 0);

  if (showResults) {
    return (
      <main className="overflow-x-hidden w-full max-w-full">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Button
            variant="ghost"
            onClick={handleBackToSearch}
            className="mb-8 gap-2 rounded-full"
          >
            <CaretLeft className="size-4" weight="bold" />
            {language === "en" ? "Back to search" : "Bumalik sa paghahanap"}
          </Button>

          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-tight text-foreground">
            {language === "en" ? "Violation records found" : "Mga nakitang violation record"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {language === "en"
              ? `Showing ${mockViolations.length} record(s) for the provided search criteria.`
              : `Nagpapakita ng ${mockViolations.length} (mga) record para sa ibinigay na pamantayan sa paghahanap.`}
          </p>

          <div className="mt-8 space-y-4">
            {mockViolations.map((v, index) => {
              const isUnpaid = v.status === "unpaid";
              const unpaidIndex = isUnpaid ? unpaidViolations.indexOf(v) : -1;
              const isSelected = isUnpaid && selectedFines.includes(unpaidIndex);

              return (
                <Card
                  key={`${v.date}-${v.type}`}
                  className={`rounded-[1.75rem] border-border transition-colors ${isSelected ? "ring-2 ring-primary" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-base font-semibold text-foreground">
                            {language === "en" ? v.type : v.typeFil}
                          </h3>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              v.status === "paid"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {v.status === "paid"
                              ? language === "en" ? "Paid" : "Bayad na"
                              : language === "en" ? "Unpaid" : "Hindi pa bayad"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{v.location}</p>
                        <p className="text-xs text-muted-foreground">{v.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-semibold text-foreground">
                          ₱{v.amount.toLocaleString()}
                        </p>
                        {isUnpaid && (
                          <button
                            type="button"
                            onClick={() => toggleFine(unpaidIndex)}
                            className={`flex size-6 items-center justify-center rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-input"
                            }`}
                            aria-label={
                              language === "en"
                                ? `Select ${v.type} violation`
                                : `Piliin ang ${v.typeFil} na paglabag`
                            }
                          >
                            {isSelected && <CheckCircle className="size-4" weight="bold" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedFines.length > 0 && (
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-foreground">
                {language === "en"
                  ? `${selectedFines.length} fine(s) selected — Total: ₱${selectedTotal.toLocaleString()}`
                  : `${selectedFines.length} (mga) multa ang napili — Kabuuan: ₱${selectedTotal.toLocaleString()}`}
              </p>
              <Button
                onClick={handleOpenPaymentModal}
                className="gap-2 rounded-full px-6"
              >
                <CreditCard className="size-4" weight="bold" />
                {language === "en" ? "Pay selected fines" : "Bayaran ang napiling multa"}
              </Button>
            </div>
          )}

          {/* Payment modal */}
          <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
            <DialogContent className="sm:max-w-lg rounded-2xl p-0 gap-0">
              {!paymentConfirmed ? (
                <>
                  <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-lg">
                      {language === "en" ? "Choose payment method" : "Pumili ng paraan ng pagbabayad"}
                    </DialogTitle>
                    <DialogDescription>
                      {language === "en"
                        ? `Paying ${selectedFines.length} fine(s) — Total: ₱${selectedTotal.toLocaleString()}`
                        : `Nagbabayad ng ${selectedFines.length} (mga) multa — Kabuuan: ₱${selectedTotal.toLocaleString()}`}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="px-6 pb-2 space-y-2">
                    {paymentMethodOptions.map((method) => {
                      const Icon = method.icon;
                      const isActive = selectedPaymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isActive
                              ? "border-primary bg-primary/8 ring-1 ring-primary/30"
                              : "border-border hover:border-primary/30 hover:bg-muted/50"
                          )}
                        >
                          <div className={cn(
                            "flex size-9 items-center justify-center rounded-lg",
                            isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                          )}>
                            <Icon className="size-5" weight="bold" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{method.label}</p>
                            {method.sublabel && (
                              <p className="text-xs text-muted-foreground">{method.sublabel}</p>
                            )}
                          </div>
                          <div className={cn(
                            "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                            isActive ? "border-primary bg-primary" : "border-input"
                          )}>
                            {isActive && <CheckCircle className="size-3 text-primary-foreground" weight="bold" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <DialogFooter className="mt-2 rounded-b-2xl">
                    <DialogClose asChild>
                      <Button variant="outline" className="rounded-full">
                        {language === "en" ? "Cancel" : "Kanselahin"}
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleConfirmPayment}
                      disabled={!selectedPaymentMethod}
                      className="gap-2 rounded-full"
                    >
                      <CreditCard className="size-4" weight="bold" />
                      {language === "en"
                        ? `Pay ₱${selectedTotal.toLocaleString()}`
                        : `Bayaran ₱${selectedTotal.toLocaleString()}`}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle className="size-10 text-emerald-500" weight="bold" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {language === "en" ? "Payment submitted!" : "Naisumite ang pagbabayad!"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {language === "en"
                      ? `Your ₱${selectedTotal.toLocaleString()} payment via ${paymentMethodOptions.find((m) => m.id === selectedPaymentMethod)?.label} has been received. Allow 3–5 business days for your record to update.`
                      : `Ang iyong ₱${selectedTotal.toLocaleString()} na pagbabayad sa pamamagitan ng ${paymentMethodOptions.find((m) => m.id === selectedPaymentMethod)?.label} ay natanggap na. Maghintay ng 3–5 business days para ma-update ang iyong record.`}
                  </p>
                  <Button
                    onClick={() => {
                      setPaymentModalOpen(false);
                      setSelectedFines([]);
                      setPaymentConfirmed(false);
                      setSelectedPaymentMethod(null);
                    }}
                    className="mt-6 rounded-full px-6"
                  >
                    {language === "en" ? "Done" : "Tapos na"}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </section>
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
                ? "Look up traffic violations and check penalty status."
                : "Hanapin ang mga paglabag sa trapiko at suriin ang status ng multa."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Enter your plate number or license number to view pending violations, payment history, and fine details."
                : "Ilagay ang iyong plate number o license number upang makita ang mga pending violation, payment history, at detalye ng multa."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#lookup-form"
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MagnifyingGlass className="size-4" weight="bold" />
                {language === "en" ? "Search violations" : "Maghanap ng mga paglabag"}
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

      <section id="lookup-form" className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="size-4" weight="bold" />
                  {language === "en" ? "How violations are recorded" : "Paano naitala ang mga paglabag"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {language === "en"
                    ? "MMDA traffic enforcers issue violation tickets on-site. CCTV cameras along major thoroughfares also capture violations automatically. All records are consolidated in the central database accessible through this portal."
                    : "Ang mga MMDA traffic enforcer ay nag-iisyu ng violation ticket sa lugar. Ang mga CCTV camera sa mga pangunahing kalsada ay awtomatikong kumukuha ng mga paglabag. Lahat ng record ay pinagsama sa central database na ma-access sa portal na ito."}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <CreditCard className="size-4" weight="bold" />
                  {language === "en" ? "Payment options" : "Mga paraan ng pagbabayad"}
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? "MMDA cashier offices" : "MMDA cashier offices"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? "GCash" : "GCash"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? "Maya" : "Maya"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en"
                      ? "Bank transfer (BDO, BPI, Landbank, UnionBank)"
                      : "Bank transfer (BDO, BPI, Landbank, UnionBank)"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en" ? "Online payment portal" : "Online payment portal"}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {language === "en"
                      ? "7-Eleven / Bayad Center / Cebuana Lhuillier"
                      : "7-Eleven / Bayad Center / Cebuana Lhuillier"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {language === "en" ? "Search violation records" : "Maghanap ng violation record"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {language === "en"
                  ? "Enter your plate number or license number to retrieve your violation history."
                  : "Ilagay ang iyong plate number o license number upang makuha ang iyong violation history."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
                <div>
                  <label htmlFor="searchBy" className="block text-sm font-medium text-foreground">
                    {language === "en" ? "Search by" : "Maghanap gamit ang"} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="searchBy"
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("searchBy", { required: true })}
                    aria-invalid={!!errors.searchBy}
                  >
                    <option value="plate">
                      {language === "en" ? "Plate Number" : "Plate Number"}
                    </option>
                    <option value="license">
                      {language === "en" ? "License Number" : "License Number"}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="searchValue" className="block text-sm font-medium text-foreground">
                    {searchBy === "plate"
                      ? language === "en" ? "Plate number" : "Plate number"
                      : language === "en" ? "License number" : "License number"}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="searchValue"
                    type="text"
                    placeholder={
                      searchBy === "plate"
                        ? language === "en" ? "e.g. ABC 1234" : "hal. ABC 1234"
                        : language === "en" ? "e.g. N01-12-345678" : "hal. N01-12-345678"
                    }
                    className="mt-1.5"
                    {...register("searchValue", { required: true, minLength: 3 })}
                    aria-invalid={!!errors.searchValue}
                  />
                  {errors.searchValue && (
                    <p className="mt-1 text-xs text-destructive">
                      {language === "en"
                        ? "Please enter a valid plate or license number (at least 3 characters)."
                        : "Mangyaring maglagay ng wastong plate o license number (hindi bababa sa 3 karakter)."}
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
                      ? language === "en" ? "Searching..." : "Naghahanap..."
                      : language === "en" ? "Search violations" : "Maghanap ng mga paglabag"}
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
