import type { Metadata } from "next";

import { ContactForm } from "@/components/page/contact-form";
import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Container,
  Eyebrow,
  Lead,
} from "@/components/ui/primitives";
import { Breadcrumbs, FaqSection, type Faq } from "@/components/page/blocks";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";
import { breadcrumbs, faqPage, graph, ORG_ID } from "@/lib/schema";

const PATH = "/contact/";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo or Talk to the Product Team",
  description:
    "Bring one real process. We will tell you where it would sit, what would have to change, and whether Datanox is the right place to put it at all.",
  path: PATH,
});

const expectations = [
  {
    step: "Before the call",
    body: "Pick one process that currently crosses systems or departments. A real one with real friction beats a general description of your setup.",
  },
  {
    step: "On the call",
    body: "Half an hour at most. We walk your process, show where it would sit and name what would have to change. There is no slide deck about our vision.",
  },
  {
    step: "After the call",
    body: "A written summary of what we discussed and what we think, including the parts that do not fit. If Datanox is the wrong answer we will say so on the call rather than in month three.",
  },
];

const faqs: Faq[] = [
  {
    question: "What happens after I send this?",
    answer:
      "Someone from the product team reads it and replies, usually within one working day. The qualification fields mean the reply comes from a person who knows the product you asked about, rather than a general response asking you to explain again.",
  },
  {
    question: "Do I have to be on Dynamics 365 already?",
    answer:
      "No. The five products are Dataverse native, so those do need a Microsoft tenant, but most of what the practice does is the work of getting an organisation there: implementation, migration off an on premise or legacy system, and consultants placed inside your team. Arriving with nothing Microsoft in place is a completely normal starting point and about half of these conversations begin that way.",
  },
  {
    question: "We want a consultant rather than a project. Is that a different conversation?",
    answer:
      "It is the same form and the same first call. Say so in the message and it routes to the people who handle placements rather than to the delivery leads. Terms from six months to three years are normal and the consultant works your week inside your tenant.",
  },
  {
    question: "Can we start with an assessment rather than a commitment?",
    answer:
      "Yes, and for anything involving an existing system it is usually the right first purchase. A migration assessment produces a classified inventory of your estate and a sequenced roadmap as a document you own, which you can then take to any partner including one that is not us.",
  },
  {
    question: "Is there public pricing?",
    answer:
      "No. Scope varies enough between a fundraising CRM and an insurer product studio that a list price would be misleading. Ask on the call and you will get a range rather than a deferral.",
  },
  {
    question: "Can I look at something before talking to anyone?",
    answer:
      "Yes, and it is the better order. The white papers cover each product at a technical depth a web page cannot carry, and the comparison page sets Intelli Form against the standalone form tools including the cases where they win. The papers ask three fields before the first download and nothing after that.",
  },
  {
    question: "Which time zones do you work across?",
    answer:
      "Delivery runs across Australia, the United Arab Emirates, Saudi Arabia and the United States, with partner firms providing local presence in each. A first call will be arranged in your working hours rather than ours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            {
              "@type": "ContactPage",
              "@id": `${SITE_URL}${PATH}#page`,
              url: `${SITE_URL}${PATH}`,
              name: "Contact Datanox",
              description:
                "Request a demo or talk to the Datanox product team about a specific process.",
              about: { "@id": ORG_ID },
            },
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Contact", path: PATH },
            ]),
          ),
        }}
      />

      <Band tone="canvas" className="overflow-hidden">
        <div
          aria-hidden="true"
          data-orb=""
          className="pointer-events-none absolute right-[-16%] top-[-26%] hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,var(--color-o-50)_46%,transparent_68%)] opacity-75 lg:block"
        />
        <Container wide className="relative">
          <div className="pt-8 lg:pt-10">
            <Breadcrumbs
              trail={[
                { name: "Home", path: "/" },
                { name: "Contact", path: PATH },
              ]}
            />
          </div>

          <div className="grid gap-12 pb-band lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Book a demo</Eyebrow>
              </Reveal>
              <Reveal as="h1" mask delay={90} className="mt-6 text-d1">
                <span>
                  <span>Show us one</span>
                </span>
                <span>
                  <span>real process.</span>
                </span>
              </Reveal>
              <Reveal delay={320} className="mt-6">
                <Lead>
                  One workflow of yours that currently crosses systems or
                  departments, walked through properly. You will get an honest
                  answer about whether Datanox is the right place to put it,
                  and if the answer is no you will get that on the first call
                  rather than in month three.
                </Lead>
              </Reveal>

              <Reveal delay={420} className="mt-10">
                <ol className="flex flex-col gap-6 border-t border-rule pt-8">
                  {expectations.map((item, index) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-o-50 font-mono text-[0.6875rem] text-o-700 ring-1 ring-o-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-display text-[1.0625rem] font-semibold text-ink">
                          {item.step}
                        </span>
                        <span className="mt-1 block max-w-[46ch] text-[0.9375rem] leading-relaxed">
                          {item.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-lift)] ring-1 ring-o-100 sm:p-9">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        items={faqs}
        eyebrow="Before you send it"
        title="Questions worth answering first"
        tone="warm"
      />
    </>
  );
}
