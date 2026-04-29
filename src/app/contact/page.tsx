"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Envelope, Clock, CheckCircle } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";

const LeafletMap = dynamic(
  () => import("@/components/maps/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <div className="h-[300px] w-full rounded-xl bg-muted animate-pulse" /> }
);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { language } = useSettingsStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onBlur",
  });

  function onSubmit(data: ContactFormData) {
    const result = contactSchema.safeParse(data);
    if (result.success) {
      setSubmitted(true);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "en" ? "Contact Us" : "Makipag-ugnayan"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {language === "en"
            ? "Get in touch with the Metropolitan Manila Development Authority. We're here to help."
            : "Makipag-ugnayan sa Metropolitan Manila Development Authority. Nandito kami upang tumulong."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left — Contact information */}
        <div className="space-y-8">
          {/* Hotlines */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "Hotlines" : "Mga Hotline"}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="size-5 shrink-0 text-primary mt-0.5" weight="bold" />
                <div>
                  <p className="text-sm font-semibold">136</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "MMDA Hotline (24/7)" : "MMDA Hotline (24/7)"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 shrink-0 text-primary mt-0.5" weight="bold" />
                <div>
                  <p className="text-sm font-semibold">(02) 882-4150 to 77</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "Trunkline" : "Trunkline"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Address */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "Office Address" : "Address ng Opisina"}
            </h2>
            <div className="flex items-start gap-3">
              <MapPin className="size-5 shrink-0 text-primary mt-0.5" weight="bold" />
              <div>
                <p className="text-sm">MMDA Building</p>
                <p className="text-sm">EDSA corner Orense Street</p>
                <p className="text-sm">Guadalupe Nuevo, Makati City</p>
                <p className="text-sm">Metro Manila, Philippines</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Email */}
          <section>
            <div className="flex items-start gap-3">
              <Envelope className="size-5 shrink-0 text-primary mt-0.5" weight="bold" />
              <div>
                <p className="text-sm font-semibold">info@mmda.gov.ph</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "General inquiries" : "Pangkalahatang katanungan"}
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Office hours */}
          <section>
            <div className="flex items-start gap-3">
              <Clock className="size-5 shrink-0 text-primary mt-0.5" weight="bold" />
              <div>
                <p className="text-sm font-semibold">
                  {language === "en" ? "Office Hours" : "Oras ng Opisina"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "en"
                    ? "Monday – Friday, 8:00 AM – 5:00 PM"
                    : "Lunes – Biyernes, 8:00 AM – 5:00 PM"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "en"
                    ? "Hotline 136 is available 24/7"
                    : "Hotline 136 ay available 24/7"}
                </p>
              </div>
            </div>
          </section>

          {/* Map */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "Location" : "Lokasyon"}
            </h2>
            <LeafletMap
              center={[14.5636, 121.0455]}
              zoom={15}
              markerPosition={[14.5636, 121.0455]}
              markerLabel="MMDA Main Office"
              className="h-[300px] w-full rounded-xl border border-border"
            />
          </section>
        </div>

        {/* Right — Contact form */}
        <div>
          <Card>
            <CardContent className="p-6">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto size-14 text-emerald-500" weight="bold" />
                  <h2 className="mt-4 text-xl font-bold">
                    {language === "en" ? "Message Sent" : "Mensahe Naipadala Na"}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                    {language === "en"
                      ? "Thank you for contacting MMDA. We'll get back to you as soon as possible."
                      : "Salamat sa pakikipag-ugnayan sa MMDA. Babalikan ka namin sa lalong madaling panahon."}
                  </p>
                  <Button
                    className="mt-6 active:scale-[0.98] transition-transform"
                    onClick={() => setSubmitted(false)}
                  >
                    {language === "en" ? "Send Another Message" : "Magpadala ng Isa Pang Mensahe"}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-1">
                    {language === "en" ? "Send us a message" : "Magpadala ng mensahe"}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-6">
                    {language === "en"
                      ? "Fill out the form below and we'll respond within 1-2 business days."
                      : "Punan ang form sa ibaba at tutugon kami sa loob ng 1-2 araw ng negosyo."}
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
                        {language === "en" ? "Full Name" : "Buong Pangalan"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder={language === "en" ? "Juan dela Cruz" : "Juan dela Cruz"}
                        {...register("name", { required: true, minLength: 2 })}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-destructive">
                          {language === "en" ? "Name is required (at least 2 characters)." : "Kinakailangan ang pangalan (hindi bababa sa 2 karakter)."}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
                        {language === "en" ? "Email Address" : "Email Address"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-email"
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

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5">
                        {language === "en" ? "Subject" : "Paksa"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder={language === "en" ? "What is your inquiry about?" : "Ano ang iyong katanungan?"}
                        {...register("subject", { required: true, minLength: 3 })}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-destructive">
                          {language === "en" ? "Subject is required (at least 3 characters)." : "Kinakailangan ang paksa (hindi bababa sa 3 karakter)."}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
                        {language === "en" ? "Message" : "Mensahe"} <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y min-h-[120px]"
                        placeholder={language === "en" ? "Type your message here..." : "I-type ang iyong mensahe dito..."}
                        {...register("message", { required: true, minLength: 10 })}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-destructive">
                          {language === "en" ? "Message must be at least 10 characters." : "Ang mensahe ay dapat hindi bababa sa 10 karakter."}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full active:scale-[0.98] transition-transform"
                    >
                      {isSubmitting
                        ? (language === "en" ? "Sending..." : "Ipinapadala...")
                        : (language === "en" ? "Send Message" : "Ipadala ang Mensahe")}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
