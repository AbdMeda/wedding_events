"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Use a valid email address."),
  phone: z.string().min(7, "Share a reachable phone number."),
  eventType: z.string().min(1, "Choose an event type."),
  date: z.string().min(1, "Choose an estimated date."),
  guests: z.string().min(1, "Choose a guest range."),
  budget: z.string().min(1, "Choose a budget range."),
  source: z.string().min(1, "Tell us how you heard about us."),
  notes: z.string().optional(),
  consent: z.literal(true, { error: "Consent is required." }),
});

type ConsultationForm = z.infer<typeof schema>;

const faqs = [
  ["How early should we begin?", "For destination or private estate weddings, 12 to 18 months gives you the strongest venue and vendor options. We can also support shorter timelines with a focused scope."],
  ["Do you work internationally?", "Yes. The platform and concierge practice are designed for multi-destination planning, guest travel, and local vendor collaboration."],
  ["Can we bring our own vendors?", "Of course. We can blend your existing creative partners with our vetted network and manage the full production rhythm."],
  ["Is this a real booking request?", "This prototype does not send data to a backend. It demonstrates the full frontend flow and success state."],
];

export function ContactExperience() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ConsultationForm>({
    resolver: zodResolver(schema),
    defaultValues: { consent: true },
  });

  async function onSubmit(values: ConsultationForm) {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    setSubmittedName(values.firstName);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <AnimatePresence mode="wait">
          {submittedName ? (
            <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="editorial-card flex min-h-[620px] flex-col items-center justify-center p-10 text-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-champagne-400">
                <span className="absolute inset-0 rounded-full border border-champagne-400" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
                <CheckCircle2 className="text-champagne-600" size={42} />
              </div>
              <h2 className="mt-8 font-display text-6xl font-semibold">Thank You, {submittedName}.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-warm-gray">
                Our concierge team will review your vision and respond within 24 hours with next steps, suggested planning scope, and a private consultation window.
              </p>
              <Link href="/" className="luxury-button mt-8">Return to Home</Link>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="editorial-card p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne-700">Consultation Form</p>
              <h2 className="mt-3 font-display text-5xl font-semibold">Begin Your Journey</h2>
              <p className="mt-4 text-sm leading-7 text-warm-gray">Our concierge team will reach out within 24 hours to discuss your vision.</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="First Name" error={errors.firstName?.message}><input {...register("firstName")} className="field" /></Field>
                <Field label="Last Name" error={errors.lastName?.message}><input {...register("lastName")} className="field" /></Field>
                <Field label="Email Address" error={errors.email?.message}><input {...register("email")} className="field" /></Field>
                <Field label="Phone Number" error={errors.phone?.message}><input {...register("phone")} className="field" /></Field>
                <Field label="Event Type" error={errors.eventType?.message}>
                  <select {...register("eventType")} className="field"><option value="">Select</option><option>Wedding</option><option>Engagement</option><option>Corporate Event</option><option>Private Party</option><option>Anniversary</option></select>
                </Field>
                <Field label="Event Date" error={errors.date?.message}><input {...register("date")} type="date" className="field" /></Field>
                <Field label="Estimated Guest Count" error={errors.guests?.message}>
                  <select {...register("guests")} className="field"><option value="">Select</option><option>1-50</option><option>51-100</option><option>101-200</option><option>201-500</option><option>500+</option></select>
                </Field>
                <Field label="Budget Range" error={errors.budget?.message}>
                  <select {...register("budget")} className="field"><option value="">Select</option><option>{"<$10K"}</option><option>$10K-$25K</option><option>$25K-$50K</option><option>$50K-$100K</option><option>$100K+</option></select>
                </Field>
                <Field label="How did you hear about us?" error={errors.source?.message}>
                  <select {...register("source")} className="field"><option value="">Select</option><option>Venue referral</option><option>Planner referral</option><option>Instagram</option><option>Publication</option><option>Friend</option></select>
                </Field>
                <div className="md:col-span-2">
                  <Field label="Additional Notes" error={errors.notes?.message}><textarea {...register("notes")} rows={5} className="field resize-none" /></Field>
                </div>
              </div>
              <label className="mt-6 flex gap-3 text-sm text-warm-gray">
                <input {...register("consent")} type="checkbox" className="mt-1 h-5 w-5 accent-champagne-600" />
                I agree to receive information about Maison Eternel&apos;s services.
              </label>
              {errors.consent?.message ? <p className="mt-2 text-sm text-error">{errors.consent.message}</p> : null}
              <button type="submit" disabled={isSubmitting} className="luxury-button mt-8 w-full disabled:opacity-60">
                <Send size={16} /> {isSubmitting ? "Sending" : "Send Consultation Request"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <aside className="space-y-6">
          {[
            [Phone, "Phone", "+1 (212) 555-0188"],
            [Mail, "Email", "hello@maison-eternel.com"],
            [MapPin, "Location", "New York · Paris · Dubai"],
          ].map(([Icon, label, value]) => (
            <div key={String(label)} className="editorial-card p-6">
              {typeof Icon !== "string" ? <Icon className="text-champagne-600" /> : null}
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-stone">{label}</p>
              <p className="mt-2 font-display text-3xl">{value}</p>
            </div>
          ))}
          <a href="https://wa.me/12125550188" className="flex items-center justify-center rounded-xl bg-[#2F7D5B] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-warm">
            WhatsApp us now
          </a>
          <div className="editorial-card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-stone">Operating Hours</p>
            <p className="mt-3 text-sm leading-7 text-warm-gray">Monday-Friday, 9:00 AM-7:00 PM. Weekend event support is active for booked clients.</p>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-5xl font-semibold">Questions couples ask first.</h2>
        <div className="mt-8 grid gap-4">
          {faqs.map(([question, answer], index) => (
            <button key={question} type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="editorial-card p-6 text-left">
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-2xl font-semibold">{question}</span>
                <ChevronDown className={cn("transition", openFaq === index && "rotate-180")} />
              </div>
              {openFaq === index ? <p className="mt-4 text-sm leading-7 text-warm-gray">{answer}</p> : null}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-2 block text-xs text-error">{error}</span> : null}
    </label>
  );
}
