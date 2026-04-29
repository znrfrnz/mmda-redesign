"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "@phosphor-icons/react";

const concernTypes = [
  { value: "road-damage", en: "Road Damage / Potholes", fil: "Sira sa Kalsada / Potholes" },
  { value: "flooding", en: "Flooding", fil: "Pagbaha" },
  { value: "illegal-structures", en: "Illegal Structures on Road", fil: "Iligal na Istruktura sa Kalsada" },
  { value: "traffic-light", en: "Broken Traffic Light", fil: "Sirang Traffic Light" },
  { value: "obstruction", en: "Road Obstruction", fil: "Obstruction sa Kalsada" },
  { value: "illegal-parking", en: "Illegal Parking", fil: "Iligal na Pagpaparada" },
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

export default function ReportConcernPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    mode: "onBlur",
  });

  function onSubmit(data: ReportFormData) {
    // Validate with Zod
    const result = reportSchema.safeParse(data);
    if (result.success) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center py-16">
          <CheckCircle className="mx-auto size-16 text-emerald-500" weight="bold" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            {language === "en" ? "Report Submitted" : "Ulat Naisumite Na"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {language === "en"
              ? "Thank you for reporting your concern. Our team will review your submission and take appropriate action. You may receive updates via the email address you provided."
              : "Salamat sa pag-ulat ng iyong problema. Susuriin ng aming team ang iyong submission at gagawa ng naaangkop na aksyon. Maaari kang makatanggap ng mga update sa pamamagitan ng email address na ibinigay mo."}
          </p>
          <Button
            className="mt-6 active:scale-[0.98] transition-transform"
            onClick={() => setSubmitted(false)}
          >
            {language === "en" ? "Submit Another Report" : "Magsumite ng Isa Pang Ulat"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "Report a Concern" : "Mag-ulat ng Problema"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {language === "en"
            ? "Submit reports about road issues, flooding, illegal structures, or other concerns in Metro Manila. All reports are reviewed by the MMDA operations team."
            : "Magsumite ng mga ulat tungkol sa mga problema sa kalsada, pagbaha, iligal na istruktura, o iba pang mga alalahanin sa Metro Manila. Lahat ng ulat ay sinusuri ng MMDA operations team."}
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Full Name" : "Buong Pangalan"} <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={language === "en" ? "Juan dela Cruz" : "Juan dela Cruz"}
                {...register("name", { required: true, minLength: 2 })}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {language === "en" ? "Name must be at least 2 characters." : "Ang pangalan ay dapat hindi bababa sa 2 karakter."}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Email Address" : "Email Address"} <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="juan@example.com"
                {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">
                  {language === "en" ? "Please enter a valid email address." : "Mangyaring maglagay ng wastong email address."}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Phone Number" : "Numero ng Telepono"} <span className="text-destructive">*</span>
              </label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+63 9XX XXX XXXX"
                {...register("phone", { required: true, minLength: 7 })}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">
                  {language === "en" ? "Please enter a valid phone number." : "Mangyaring maglagay ng wastong numero ng telepono."}
                </p>
              )}
            </div>

            {/* Concern Type */}
            <div>
              <label htmlFor="concernType" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Type of Concern" : "Uri ng Problema"} <span className="text-destructive">*</span>
              </label>
              <select
                id="concernType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Location" : "Lokasyon"} <span className="text-destructive">*</span>
              </label>
              <Input
                id="location"
                type="text"
                autoComplete="street-address"
                placeholder={language === "en" ? "e.g. EDSA corner Shaw Blvd, Mandaluyong" : "hal. EDSA corner Shaw Blvd, Mandaluyong"}
                {...register("location", { required: true, minLength: 5 })}
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-destructive">
                  {language === "en" ? "Please provide a specific location (at least 5 characters)." : "Mangyaring magbigay ng tiyak na lokasyon (hindi bababa sa 5 karakter)."}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Description" : "Deskripsyon"} <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                rows={5}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y min-h-[120px]"
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

            {/* Photo upload (mock) */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium mb-1.5">
                {language === "en" ? "Photo (optional)" : "Larawan (opsyonal)"}
              </label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                {language === "en" ? "Upload a photo of the concern (max 5MB, JPG or PNG)." : "Mag-upload ng larawan ng problema (max 5MB, JPG o PNG)."}
              </p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto active:scale-[0.98] transition-transform"
              >
                {isSubmitting
                  ? (language === "en" ? "Submitting..." : "Isinusumite...")
                  : (language === "en" ? "Submit Report" : "Isumite ang Ulat")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
