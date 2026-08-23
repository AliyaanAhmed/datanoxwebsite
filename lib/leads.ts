/**
 * Lead capture.
 *
 * The site is a static export. There is no server here and no API route, so
 * nothing on this domain can receive a POST. Submissions therefore go to a
 * Power Automate flow with a "When an HTTP request is received" trigger,
 * which was the client's choice on 21 August 2026 and is the natural one for
 * a Power Platform company: the flow can write the lead to Dataverse, send
 * the notification email and apply retention, all in the place the rest of
 * the business already runs.
 *
 * The endpoint URL contains a signature and is therefore a secret. It is read
 * from NEXT_PUBLIC_LEAD_ENDPOINT at build time rather than committed. Note
 * the honest limitation: anything shipped to a browser is visible to whoever
 * opens the network tab, so the flow must validate what it receives and must
 * not trust the payload. See CUTOVER.md for the flow definition, including
 * the response headers it has to return.
 */

import { site } from "@/content/site";

export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

/**
 * Where a person can go when the endpoint is not configured or is failing.
 *
 * Null until Datanox confirms a published address. The current datanox.io
 * shows no email anywhere, so inventing one here would put a possibly dead
 * address in front of somebody whose message has just failed to send.
 */
export const FALLBACK_EMAIL: string | null = site.unconfirmed.contactEmail;

export type LeadKind = "contact" | "partner" | "paper";

export type LeadPayload = Record<string, string> & {
  kind: LeadKind;
};

/**
 * The context fields, collected in the browser.
 *
 * These are the ones a browser can actually see. The IP address and the
 * country derived from it cannot be read here by any means, so they are added
 * by the flow from the request headers rather than pretended at on this side.
 */
export function pageContext(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "msclkid",
  ]) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }

  return {
    ...utm,
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: document.referrer || "direct",
    submitted_at: new Date().toISOString(),
    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",
    language: navigator.language || "unknown",
  };
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "network" | "rejected" };

/**
 * Post a lead.
 *
 * Content type is text/plain on purpose. That keeps the request inside the
 * set the browser treats as simple, so there is no preflight and no dependency
 * on the flow answering an OPTIONS request. The body is still JSON and the
 * flow parses it with json(triggerBody()).
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!LEAD_ENDPOINT) return { ok: false, reason: "unconfigured" };

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ ...pageContext(), ...payload }),
    });
    if (!response.ok) return { ok: false, reason: "rejected" };
    return { ok: true };
  } catch {
    // A CORS failure and a dropped connection are indistinguishable here.
    // Both mean the same thing to the person filling the form in.
    return { ok: false, reason: "network" };
  }
}

/** Industries offered on the gated download. Kept short deliberately. */
export const INDUSTRIES = [
  "Government and public sector",
  "Financial services and insurance",
  "Not for profit",
  "Education",
  "Energy and resources",
  "Technology or consulting",
  "Other",
];
