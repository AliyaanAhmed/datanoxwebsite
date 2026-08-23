"use client";

import { useState, type FormEvent } from "react";

import {
  FailureNote,
  Field,
  Honeypot,
  Select,
  SubmitButton,
  TextArea,
} from "./form-fields";
import { FALLBACK_EMAIL, submitLead, type SubmitResult } from "@/lib/leads";

/**
 * The enquiry form.
 *
 * Posts to the Power Automate flow described in lib/leads.ts. The submit is
 * intercepted so the visitor stays on the page and gets a real confirmation,
 * rather than being navigated to whatever JSON the flow returns.
 *
 * The form element keeps its action and method, so it is still a real form:
 * browser validation runs, the fields are labelled, and a submit event fires
 * on enter. What it does not do is silently fail. If the endpoint is not
 * configured or the request does not land, the person is told and given the
 * email address instead of being shown a success message that is not true.
 *
 * The qualification fields exist so a lead arrives already routed: which
 * product, which sector, what role. Before this, every enquiry landed as free
 * text in one inbox and somebody had to ask the basics before it could be
 * prioritised.
 */

const products = [
  "Governance and Performance",
  "Intelli Form",
  "Intelli Assessment",
  "InsureOS",
  "BrokerOS",
  "A services project, not a product",
  "Staff augmentation",
  "Not sure yet",
];

const sectors = [
  "Government and public sector",
  "Financial services and insurance",
  "Not for profit",
  "Education",
  "Energy and resources",
  "Other",
];

const roles = ["Leadership", "Technology", "Operations", "Finance", "Other"];

export function ContactForm({
  intent = "demo",
}: {
  /** Pre selects what the enquiry is about, based on where it was opened from. */
  intent?: "demo" | "partner";
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // A filled honeypot means a bot. Show the same confirmation a person
    // would see and send nothing, because telling a bot it was detected only
    // helps whoever wrote it.
    if (String(data.get("company-website") ?? "").trim()) {
      setResult({ ok: true });
      return;
    }
    data.delete("company-website");

    const payload: Record<string, string> = { kind: intent === "partner" ? "partner" : "contact" };
    data.forEach((value, key) => {
      payload[key] = String(value).slice(0, 4000);
    });

    setPending(true);
    const outcome = await submitLead(
      payload as Parameters<typeof submitLead>[0],
    );
    setPending(false);
    setResult(outcome);
    if (outcome.ok) form.reset();
  }

  if (result?.ok) {
    return (
      <div
        role="status"
        className="rounded-xl bg-o-50 p-8 ring-1 ring-o-200 lg:p-10"
      >
        <p className="font-display text-d4 text-ink">
          {intent === "partner"
            ? "Thank you. Your application is with the partner team."
            : "Thank you. That has reached the delivery team."}
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
          Somebody who can actually answer the question will reply, usually
          within one working day.
          {FALLBACK_EMAIL ? (
            <>
              {" "}
              If it is urgent, or if you would rather not wait, write to{" "}
              <a
                href={`mailto:${FALLBACK_EMAIL}`}
                className="text-o-700 underline underline-offset-4"
              >
                {FALLBACK_EMAIL}
              </a>{" "}
              and it reaches the same place.
            </>
          ) : null}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
      <input type="hidden" name="intent" value={intent} />

      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          disabled={pending}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@organisation.com"
          disabled={pending}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Organisation"
          name="organisation"
          required
          autoComplete="organization"
          placeholder="Where you work"
          disabled={pending}
        />
        <Select label="Your role" name="role" options={roles} disabled={pending} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label={intent === "partner" ? "Practice focus" : "What this is about"}
          name="product"
          options={intent === "partner" ? sectors : products}
          required
          disabled={pending}
        />
        <Select
          label="Sector"
          name="sector"
          options={sectors}
          required
          disabled={pending}
        />
      </div>

      <TextArea
        label="What are you trying to solve"
        name="message"
        required
        placeholder="One real process of yours is more useful than a general description."
        disabled={pending}
      />

      {result && !result.ok ? <FailureNote verb="write to" /> : null}

      <SubmitButton pending={pending}>
        {intent === "partner" ? "Apply to be a partner" : "Send this to the team"}
      </SubmitButton>

      <noscript>
        <p className="rounded-md bg-o-50 px-5 py-4 text-[0.875rem] leading-relaxed text-ink-2 ring-1 ring-o-200">
          Sending this form needs JavaScript, which appears to be switched off.
          {FALLBACK_EMAIL ? (
            <>
              {" "}
              Write to{" "}
              <a
                href={`mailto:${FALLBACK_EMAIL}`}
                className="text-o-700 underline underline-offset-4"
              >
                {FALLBACK_EMAIL}
              </a>{" "}
              instead and you reach exactly the same people.
            </>
          ) : (
            <> Enabling it for this page is the only way to send from here.</>
          )}
        </p>
      </noscript>

      <p className="text-[0.8125rem] leading-relaxed text-muted">
        We use what you send here to answer you and nothing else. No list, no
        sequence you did not ask for. We also record the page you sent it from
        and, at our end, the network address the request came from. The{" "}
        <a href="/privacy/" className="text-o-700 underline underline-offset-4">
          privacy notice
        </a>{" "}
        sets out how long we keep it and how to have it deleted.
      </p>
    </form>
  );
}
