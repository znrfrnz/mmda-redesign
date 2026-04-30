"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Envelope,
  MapPin,
  Phone,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LeafletMap = dynamic(
  () => import("@/components/maps/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <div className="h-[300px] w-full rounded-2xl bg-muted animate-pulse" /> }
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
  } = useForm<ContactFormData>({ mode: "onBlur" });

  function onSubmit(data: ContactFormData) {
    const result = contactSchema.safeParse(data);
    if (result.success) setSubmitted(true);
  }

  return (
    <section className="overflow-x-hidden w-full max-w-full">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/contacts/contact.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,92,182,0.36),transparent_48%),linear-gradient(180deg,rgba(2,8,23,0.12),rgba(2,8,23,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/14 bg-[#071428]/88 px-6 py-14 text-white shadow-[0_32px_120px_-48px_rgba(7,20,40,0.9)] backdrop-blur xl:px-12 xl:py-18">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-medium leading-7 text-white/72">
              {language === "en"
                ? "Connect directly with MMDA contact channels for inquiries, operational concerns, and public service assistance."
                : "Direktang kumonekta sa MMDA contact channels para sa inquiry, operational concern, at public service assistance."}
            </p>

                        <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
              {language === "en"
                ? "Contact MMDA for inquiries, assistance, and public service support."
                : "Makipag-ugnayan sa MMDA para sa katanungan, tulong, at suporta sa serbisyo publiko."}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {language === "en"
                ? "Call hotline 136 for immediate concerns, or send a message for formal follow-up and office coordination."
                : "Tumawag sa hotline 136 para sa agarang concern, o magpadala ng mensahe para sa pormal na follow-up at office coordination."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:136"
                className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-4" weight="bold" />
                {language === "en" ? "Call Metrobase 136" : "Tumawag sa Metrobase 136"}
              </a>
              <a
                href="#contact-form"
                className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === "en" ? "Send a message" : "Magpadala ng mensahe"}
                <ArrowRight className="size-4" weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="size-4" weight="bold" />
                  {language === "en" ? "Official contact channels" : "Mga opisyal na channel ng pakikipag-ugnayan"}
                </div>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    <div>
                      <p className="font-semibold text-foreground">136</p>
                      <p>{language === "en" ? "MMDA Hotline (24/7)" : "MMDA Hotline (24/7, bukas araw-araw)"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    <div>
                      <p className="font-semibold text-foreground">(02) 882-4150 to 77</p>
                      <p>{language === "en" ? "Main trunkline" : "Pangunahing trunkline"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Envelope className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    <div>
                      <p className="font-semibold text-foreground">info@mmda.gov.ph</p>
                      <p>{language === "en" ? "General inquiries" : "Pangkalahatang inquiry"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 size-4 shrink-0 text-primary" weight="bold" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {language === "en" ? "Office hours" : "Oras ng opisina"}
                      </p>
                      <p>{language === "en" ? "Monday to Friday, 8:00 AM to 5:00 PM" : "Lunes hanggang Biyernes, 8:00 AM hanggang 5:00 PM"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" weight="bold" />
                  <div className="text-sm leading-7 text-muted-foreground md:text-base">
                    <p className="font-semibold text-foreground">MMDA Building</p>
                    <p>EDSA corner Orense Street</p>
                    <p>Guadalupe Nuevo, Makati City</p>
                    <p>Metro Manila, Philippines</p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-border/70">
                  <LeafletMap
                    center={[14.5636, 121.0455]}
                    zoom={15}
                    markerPosition={[14.5636, 121.0455]}
                    markerLabel="MMDA Main Office"
                    className="h-[300px] w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card id="contact-form" className="rounded-[1.75rem] border-border">
            <CardContent className="p-6 md:p-8">
              {submitted ? (
                <div className="py-14 text-center">
                  <CheckCircle className="mx-auto size-14 text-emerald-500" weight="bold" />
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-foreground">
                    {language === "en" ? "Message sent." : "Naipadala ang mensahe."}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    {language === "en"
                      ? "Thank you for contacting MMDA. Your message is queued for response."
                      : "Salamat sa pakikipag-ugnayan sa MMDA. Naka-queue na ang mensahe mo para sa tugon."}
                  </p>
                  <Button className="mt-6 rounded-full px-6" onClick={() => setSubmitted(false)}>
                    {language === "en" ? "Send another message" : "Magpadala ng isa pang mensahe"}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    {language === "en" ? "Send us a message" : "Magpadala ng mensahe"}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {language === "en"
                      ? "Fill out the form below for non-emergency concerns and formal inquiries."
                      : "Punan ang form sa ibaba para sa non-emergency concern at pormal na inquiry."}
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-foreground">
                        {language === "en" ? "Full name" : "Buong pangalan"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder={language === "en" ? "Juan dela Cruz" : "Juan dela Cruz"}
                        className="mt-1.5"
                        {...register("name", { required: true, minLength: 2 })}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-destructive">
                          {language === "en" ? "Name is required (at least 2 characters)." : "Kinakailangan ang pangalan (hindi bababa sa 2 karakter)."}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
                        {language === "en" ? "Email address" : "Email address (e-mail)"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-email"
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
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground">
                        {language === "en" ? "Subject" : "Paksa"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder={language === "en" ? "What is your inquiry about?" : "Ano ang iyong katanungan?"}
                        className="mt-1.5"
                        {...register("subject", { required: true, minLength: 3 })}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-destructive">
                          {language === "en" ? "Subject is required (at least 3 characters)." : "Kinakailangan ang paksa (hindi bababa sa 3 karakter)."}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
                        {language === "en" ? "Message" : "Mensahe"} <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        className="mt-1.5 flex min-h-[130px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full">
                      {isSubmitting
                        ? language === "en"
                          ? "Sending..."
                          : "Ipinapadala..."
                        : language === "en"
                          ? "Send message"
                          : "Ipadala ang mensahe"}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
}
