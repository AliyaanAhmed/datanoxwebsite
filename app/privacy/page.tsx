import type { Metadata } from "next";

import { Clause, ProsePage } from "@/components/page/prose";
import { pageMetadata } from "@/lib/seo";

const PATH = "/privacy/";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description:
    "What Datanox collects when you contact us, what it is used for, and what it is not used for. Written to be read rather than to cover us.",
  path: PATH,
});

export default function PrivacyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy notice"
      standfirst="What we collect when you contact us, what we do with it, and what we do not do with it. This is written to be read rather than to cover us, and it is deliberately short."
      updated="21 August 2026"
      trail={[
        { name: "Home", path: "/" },
        { name: "Privacy", path: PATH },
      ]}
    >
      <Clause heading="What we collect when you contact us">
        <p>
          When you send the enquiry form we collect your name, work email,
          organisation, role, the sector and subject you selected, and whatever
          you wrote in the message field. There is nothing hidden in the form.
        </p>
      </Clause>

      <Clause heading="What we collect when you download a white paper">
        <p>
          Three fields, asked once: your name, your work email and your
          industry. Your browser remembers that you have given them, so you are
          not asked again for the other papers on the same browser.
        </p>
      </Clause>

      <Clause heading="What is recorded alongside either of those">
        <p>
          Both forms also send the page you submitted from, the page that
          referred you to this site, any campaign parameters in the address bar,
          your browser language and time zone, and the time of submission. This
          tells us which page or campaign brought somebody to us, which is the
          only thing it is used for.
        </p>
        <p>
          When the submission reaches our systems we also record the network
          address it arrived from, and the country that address indicates. A
          network address is personal data under the General Data Protection
          Regulation and under the Australian Privacy Act, so we are naming it
          here rather than leaving it in a server log nobody mentions. We use it
          to tell a real enquiry from an automated one and to know which market
          an enquiry came from. It is not used to identify individuals, it is
          not combined with anything bought from a third party, and it is not
          shared.
        </p>
        <p>
          The lawful basis for all of this is our legitimate interest in
          answering enquiries, understanding where they come from and keeping
          the forms free of automated abuse. If you would rather we did not hold
          it, ask and we will delete it.
        </p>
      </Clause>

      <Clause heading="Analytics">
        <p>
          Like most sites we collect basic analytics about pages visited,
          through Google Analytics. That data is aggregated and is not used to
          identify you individually.
        </p>
      </Clause>

      <Clause heading="What we use it for">
        <p>
          To reply to you, to prepare for a conversation you asked for, and to
          route your enquiry to the person who knows the subject you asked
          about. For a white paper, to know who is reading and to follow up
          once if it looks useful to. Nothing else.
        </p>
      </Clause>

      <Clause heading="What we do not do">
        <p>
          We do not add you to a mailing list you did not ask to join. We do not
          sell, rent or share your details with anyone outside Datanox and the
          delivery partner working with you, if there is one. We do not enrol
          you in an automated sequence because you downloaded something.
        </p>
      </Clause>

      <Clause heading="Where it is held">
        <p>
          Submissions are received by a Microsoft Power Automate flow and stored
          in our own Microsoft environment, subject to the same access controls
          as the rest of our records. Analytics data is held by Google under
          their terms.
        </p>
      </Clause>

      <Clause heading="How long we keep it">
        <p>
          Enquiries are kept for as long as the conversation is live and for a
          reasonable period afterwards in case it resumes. The network address
          and country recorded with a submission are kept for twelve months and
          then removed, because after that they tell us nothing we still need.
          If you ask us to delete your details sooner we will, and we will
          confirm when it is done.
        </p>
      </Clause>

      <Clause heading="Your rights">
        <p>
          You can ask what we hold about you, ask for it to be corrected, ask
          for a copy of it, or ask for it to be deleted. Send that through the
          contact form and we will action it rather than route you through a
          process. If you are in the European Union or the United Kingdom you
          also have the right to object to processing carried out on the basis
          of legitimate interest, which covers everything described above.
        </p>
      </Clause>

      <Clause heading="Cookies and browser storage">
        <p>
          This site sets analytics cookies only. There are no advertising
          cookies and no cross site tracking. If you block them the site works
          exactly the same.
        </p>
        <p>
          One further thing is stored in your browser rather than on our
          systems: once you have filled in the white paper form, a note that you
          did so is kept in this browser so you are not asked again. It never
          leaves your device and clearing your site data removes it.
        </p>
      </Clause>

      <Clause heading="Changes">
        <p>
          If this notice changes materially, the date at the top changes with
          it. We will not quietly widen what we do with your details.
        </p>
        <p>
          The <a href="/terms/">terms of use</a> cover the rest of your
          relationship with this website, which is a shorter document than this
          one.
        </p>
      </Clause>
    </ProsePage>
  );
}
