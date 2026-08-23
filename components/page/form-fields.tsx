"use client";

import type { ReactNode } from "react";

import { FALLBACK_EMAIL } from "@/lib/leads";

/**
 * Shared form controls.
 *
 * One definition of a label, an input and a select, used by the contact form
 * and by the white paper gate so the two cannot drift apart visually or in
 * their accessibility behaviour.
 */

const controlClass =
  "rounded-md border border-rule-strong bg-white px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-o-400 focus:ring-2 focus:ring-o-200 disabled:opacity-60";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-ink-2">
      {children}
      {required ? (
        <span className="ml-1 text-o-700" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-muted">optional</span>
      )}
    </label>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <p className="flex flex-col gap-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        className={controlClass}
      />
    </p>
  );
}

export function Select({
  label,
  name,
  options,
  required = false,
  disabled,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <p className="flex flex-col gap-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        disabled={disabled}
        className={controlClass}
      >
        {/* Not disabled. A select whose selected option is disabled is
            omitted from FormData entirely, which silently dropped the
            optional Role field from every submission. Required selects are
            still blocked from submitting an empty value by the browser. */}
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </p>
  );
}

export function TextArea({
  label,
  name,
  required = false,
  rows = 5,
  placeholder,
  disabled,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <p className="flex flex-col gap-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`${controlClass} leading-relaxed`}
      />
    </p>
  );
}

/**
 * A honeypot rather than a challenge.
 *
 * Nothing is asked of a real person, nothing depends on a third party script,
 * and nobody is asked to identify a bus.
 */
export function Honeypot() {
  return (
    <p className="absolute left-[-9999px]" aria-hidden="true">
      <label htmlFor="company-website">Leave this field empty</label>
      <input
        id="company-website"
        name="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </p>
  );
}

export function SubmitButton({
  children,
  pending,
  pendingLabel = "Sending",
  full = false,
}: {
  children: ReactNode;
  pending: boolean;
  pendingLabel?: string;
  full?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-pill bg-gradient-to-br from-o-500 to-o-600 px-7 py-3.5 font-sans text-[0.9375rem] font-medium leading-none text-white shadow-[var(--shadow-glow)] transition-all duration-200 hover:brightness-105 active:translate-y-px disabled:cursor-wait disabled:opacity-80 ${
        full ? "w-full" : ""
      }`}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * The alternative channel, offered when a submission fails.
 *
 * Datanox publishes no contact address anywhere today, so until one is
 * confirmed this renders an honest sentence rather than a mailto link to an
 * address nobody has checked. Filling in site.unconfirmed.contactEmail turns
 * every one of these into a working link in one commit.
 */
export function FailureNote({ verb }: { verb: string }) {
  return (
    <p
      role="alert"
      className="rounded-md bg-o-50 px-5 py-4 text-[0.875rem] leading-relaxed text-ink-2 ring-1 ring-o-200"
    >
      That did not send, and nothing was lost on your side.{" "}
      {FALLBACK_EMAIL ? (
        <>
          Try again, or {verb}{" "}
          <a
            href={`mailto:${FALLBACK_EMAIL}`}
            className="text-o-700 underline underline-offset-4"
          >
            {FALLBACK_EMAIL}
          </a>
          , which reaches the same people.
        </>
      ) : (
        <>
          Please try again in a moment. If it keeps failing, the fault is in
          the connection between this page and our systems rather than in
          anything you have entered.
        </>
      )}
    </p>
  );
}
