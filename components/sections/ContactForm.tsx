"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SubmitButton } from "@/components/ui/Button";
import { services } from "@/lib/content";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiry } from "@/services/sendEnquiry";
import type { FormState } from "@/types";

const field =
  "w-full rounded-none border-0 border-b border-hair bg-transparent px-0.5 py-2.5 text-[1rem] text-bright transition-colors focus:border-champagne focus:outline-none";

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    // validated here because there is no server to validate it again
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      setState({
        status: "error",
        message: "Check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      });
      return;
    }

    // honeypot filled means a bot: pretend it worked, send nothing
    if (parsed.data.website) {
      form.reset();
      setState({ status: "success", message: "Thank you." });
      return;
    }

    setState({ status: "submitting" });
    const result = await sendEnquiry(parsed.data);

    if (result.ok) form.reset();
    setState(result.ok ? { status: "success", message: result.message } : { status: "error", message: result.message });
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-x-6 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" error={errors?.name?.[0]} />
        <Field label="Email" name="email" type="email" autoComplete="email" error={errors?.email?.[0]} />
        <Field label="Company" name="company" autoComplete="organization" error={errors?.company?.[0]} />
        <label className="mb-6 block">
          <span className="mb-2 block text-[0.84rem] text-steel">What do you need?</span>
          <select name="service" defaultValue={services[0].title} className={`${field} cursor-pointer appearance-none`}>
            {services.map((s) => (
              <option key={s.slug} value={s.title} className="bg-[#0d0d0d]">{s.title}</option>
            ))}
            <option className="bg-[#0d0d0d]">A bit of everything</option>
          </select>
        </label>
      </div>

      <label className="mb-6 block">
        <span className="mb-2 block text-[0.84rem] text-steel">About the project</span>
        <textarea name="message" rows={4} className={`${field} min-h-[104px] resize-y leading-relaxed`} />
        {errors?.message?.[0] && <span className="mt-2 block text-[0.82rem] text-champagne">{errors.message[0]}</span>}
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px]" />

      <SubmitButton disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending…" : "Send enquiry"}
      </SubmitButton>

      <AnimatePresence mode="wait">
        {(state.status === "success" || state.status === "error") && (
          <motion.p
            key={state.message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className={`mt-4 text-[0.88rem] ${state.status === "success" ? "text-champagne" : "text-steel"}`}
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label, name, type = "text", autoComplete, error,
}: { label: string; name: string; type?: string; autoComplete?: string; error?: string }) {
  return (
    <label className="mb-6 block">
      <span className="mb-2 block text-[0.84rem] text-steel">{label}</span>
      <input type={type} name={name} autoComplete={autoComplete} className={field} aria-invalid={!!error} />
      {error && <span className="mt-2 block text-[0.82rem] text-champagne">{error}</span>}
    </label>
  );
}
