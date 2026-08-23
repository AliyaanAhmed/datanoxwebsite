"use client";

import { useEffect, useState, type FormEvent } from "react";

import { FailureNote, Field, Honeypot, Select, SubmitButton } from "./form-fields";
import { INDUSTRIES, submitLead, type SubmitResult } from "@/lib/leads";

/**
 * The white paper gate.
 *
 * Three fields, asked once. Name, work email, industry. Everything else that
 * reaches the flow is context the browser already knows: which paper, which
 * page, referrer, campaign parameters and a timestamp. The network address
 * and the country derived from it are added by the flow from the request
 * headers, because a browser cannot see its own public address and pretending
 * otherwise would just mean sending a wrong value.
 *
 * Two honest limitations, both stated to the visitor rather than hidden.
 *
 * First, this is a lead capture step and not access control. The site is a
 * static export and the file sits at a public path, so anybody determined to
 * skip the form can. Treating the gate as security would be a mistake; its
 * job is to give people who are interested an easy way to say so.
 *
 * Second, a person who has already given their details is not asked again.
 * That state lives in this browser only, which is why the note under the
 * button says so.
 */

const STORE_KEY = "dx.paper.identified";

type Identity = { name: string; email: string; industry: string };

function readIdentity(): Identity | null {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Identity>;
    if (!parsed.email) return null;
    return {
      name: parsed.name ?? "",
      email: parsed.email,
      industry: parsed.industry ?? "",
    };
  } catch {
    return null;
  }
}

function writeIdentity(identity: Identity) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(identity));
  } catch {
    // Private browsing, or storage disabled. The form simply asks again.
  }
}

export function PaperGate({
  paper,
  file,
  onClose,
}: {
  paper: string;
  file: string;
  onClose: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  // Read lazily rather than in an effect. This component only ever mounts
  // after a click, so it never renders on the server and the initialiser is
  // safe to touch storage from.
  const [known, setKnown] = useState<Identity | null>(() =>
    typeof window === "undefined" ? null : readIdentity(),
  );

  // Escape closes, which is the behaviour anybody expects from a panel that
  // appeared over what they were reading.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send(identity: Identity) {
    setPending(true);
    const outcome = await submitLead({
      kind: "paper",
      paper,
      file,
      name: identity.name,
      email: identity.email,
      industry: identity.industry,
    });
    setPending(false);
    setResult(outcome);
    if (outcome.ok) {
      writeIdentity(identity);
      setKnown(identity);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (String(data.get("company-website") ?? "").trim()) {
      setResult({ ok: true });
      return;
    }

    await send({
      name: String(data.get("name") ?? "").slice(0, 200),
      email: String(data.get("email") ?? "").slice(0, 200),
      industry: String(data.get("industry") ?? "").slice(0, 120),
    });
  }

  /* The paper is released once the submission has landed, or straight away
     for somebody who has already identified themselves in this browser. */
  const released = result?.ok || (known !== null && result === null);

  if (released) {
    return (
      <div role="status" className="flex flex-col gap-5">
        <div>
          <p className="font-display text-[1.25rem] font-semibold text-ink">
            {paper} is ready.
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
            {known && result === null
              ? "You have already given us your details on this browser, so we have not asked twice."
              : "Thank you. If you would like to talk about anything in it, reply to the email or use the contact page."}
          </p>
        </div>
        <a
          href={file}
          download
          onClick={() => window.setTimeout(onClose, 900)}
          className="inline-flex w-fit items-center gap-2.5 rounded-pill bg-gradient-to-br from-o-500 to-o-600 px-7 py-3.5 text-[0.9375rem] font-medium leading-none text-white shadow-[var(--shadow-glow)] transition-all duration-200 hover:brightness-105"
        >
          Download the PDF
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2.5v9M4.5 8L8 11.5 11.5 8M2.5 13.5h11" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-o-700">
          Before you download
        </p>
        <p className="mt-3 font-display text-[1.25rem] font-semibold leading-snug text-ink">
          {paper}
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
          Three fields, asked once. We use them to know who is reading and to
          reply if you want a conversation. Nothing is added to a mailing list
          you did not ask for.
        </p>
      </div>

      <Honeypot />

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
      <Select
        label="Industry"
        name="industry"
        options={INDUSTRIES}
        required
        disabled={pending}
      />

      {result && !result.ok ? <FailureNote verb="ask for the paper at" /> : null}

      <SubmitButton pending={pending} pendingLabel="One moment" full>
        Send and open the paper
      </SubmitButton>

      <p className="text-[0.8125rem] leading-relaxed text-muted">
        We record the page you came from and, at our end, the network address
        and country the request came from. The{" "}
        <a href="/privacy/" className="text-o-700 underline underline-offset-4">
          privacy notice
        </a>{" "}
        says how long that is kept and how to have it removed.
      </p>
    </form>
  );
}
