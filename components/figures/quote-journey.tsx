import { Reveal } from "@/components/ui/reveal";

/**
 * Figure 07. The journey of a quote.
 *
 * Seven steps, in order, from an insurer publishing a product to a policy
 * that can still be reproduced years later. Order genuinely carries meaning
 * here, so the steps are numbered. Everywhere else on the site they are not.
 *
 * Built in HTML rather than SVG because the step copy has to wrap and stay
 * readable at every width, and because a crawler should be able to read the
 * seven steps as text.
 */

type Step = {
  n: string;
  system: "InsureOS" | "BrokerOS";
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    n: "01",
    system: "InsureOS",
    title: "Insurer publishes a product",
    body: "The product team configures and publishes a product. It goes live as a governed API rather than as a PDF and a phone number.",
  },
  {
    n: "02",
    system: "BrokerOS",
    title: "Broker finds and offers it",
    body: "The broker selects the product and offers it to clients. There is no waiting for a custom integration to be built first.",
  },
  {
    n: "03",
    system: "BrokerOS",
    title: "Customer details captured once",
    body: "Information entered by the broker flows straight to the insurer. Nobody rekeys it and no spreadsheet sits in between.",
  },
  {
    n: "04",
    system: "InsureOS",
    title: "Underwriting and rating run",
    body: "Rules, risk scoring and the rating engine run automatically and return a quote with the reasoning behind it attached.",
  },
  {
    n: "05",
    system: "InsureOS",
    title: "Approvals handled in system",
    body: "Clear cases pass straight through. Referrals route to an underwriter, and every decision is recorded where it happened.",
  },
  {
    n: "06",
    system: "InsureOS",
    title: "Bind and payment link issued",
    body: "The quote is bound and a payment link is returned, so premium flows directly as the regulation now requires.",
  },
  {
    n: "07",
    system: "InsureOS",
    title: "Policy issued and reproducible",
    body: "The policy is issued with every step pinned to the exact terms that were in force, so it is still auditable years later.",
  },
];

export function FigQuoteJourney({ className = "" }: { className?: string }) {
  return (
    <ol className={`relative flex flex-col ${className}`}>
      {/* The spine the steps hang off */}
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-[1.375rem] top-8 w-px bg-o-200 sm:left-[1.625rem]"
      />

      {steps.map((step, index) => {
        const handoff = index > 0 && steps[index - 1].system !== step.system;
        return (
          <Reveal
            as="li"
            key={step.n}
            delay={index * 70}
            className="relative pl-14 sm:pl-20"
          >
            {handoff ? (
              <p className="relative mb-4 ml-1 inline-flex items-center gap-2 rounded-pill bg-o-600 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white">
                <svg
                  viewBox="0 0 14 10"
                  aria-hidden="true"
                  className="h-2.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 5h11M8.5 1.5 12 5l-3.5 3.5" />
                </svg>
                Handoff to {step.system}, with no inbox in between
              </p>
            ) : null}

            <span
              aria-hidden="true"
              className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full bg-surface font-mono text-[0.75rem] font-medium text-o-700 shadow-[var(--shadow-soft)] ring-1 ring-o-200 sm:h-13 sm:w-13"
            >
              {step.n}
            </span>

            <div className="pb-9">
              <span className="inline-flex items-center rounded-pill bg-o-50 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-o-700 ring-1 ring-o-100">
                {step.system}
              </span>
              <h3 className="mt-3 text-d4">
                <span className="sr-only">Step {step.n}. </span>
                {step.title}
              </h3>
              <p className="mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed">
                {step.body}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
