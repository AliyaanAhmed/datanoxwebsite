import type { Metadata } from "next";

import { Clause, ProsePage } from "@/components/page/prose";
import { pageMetadata } from "@/lib/seo";

const PATH = "/terms/";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms covering use of the Datanox website. Terms for the products themselves are set out in the agreement that accompanies them.",
  path: PATH,
});

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms of use"
      standfirst="These terms cover this website. The terms covering the products are set out in the agreement that accompanies them, and nothing here replaces that."
      updated="18 August 2026"
      trail={[
        { name: "Home", path: "/" },
        { name: "Terms", path: PATH },
      ]}
    >
      <Clause heading="Using this site">
        <p>
          You are welcome to read, quote and link to anything here. Please
          attribute quotes to Datanox and link back to the page you took them
          from.
        </p>
      </Clause>

      <Clause heading="What is on it">
        <p>
          We write these pages carefully and correct them when we find an error.
          Even so, product capability changes and comparison information ages.
          Nothing on this site forms part of a contract, and if a page and a
          signed agreement disagree, the agreement is what counts.
        </p>
      </Clause>

      <Clause heading="Comparison content">
        <p>
          Comparisons with other products are compiled from published
          documentation and marketing material at the time of writing, and are
          our reading of them. Other vendors change what they support. If
          something is out of date, tell us and we will correct it.
        </p>
      </Clause>

      <Clause heading="Trade marks">
        <p>
          Microsoft, Dynamics 365, Power Platform, Power Apps, Power Pages,
          Power BI and Dataverse are trade marks of Microsoft. Jotform,
          Formstack and Kissflow are trade marks of their respective owners.
          They are named here for identification and comparison, and their use
          does not imply any endorsement.
        </p>
      </Clause>

      <Clause heading="Our material">
        <p>
          The writing, diagrams and design on this site belong to Datanox.
          Quoting and linking is fine. Republishing a page wholesale is not.
        </p>
      </Clause>

      <Clause heading="Liability">
        <p>
          This site is provided as it is. We are not liable for decisions taken
          solely on the basis of what is written here, which is why every page
          ends with an invitation to talk to us about your specific situation.
        </p>
      </Clause>

      <Clause heading="Contact">
        <p>
          Questions about these terms can go through the same form as anything
          else, and a person will answer them.
        </p>
      </Clause>
    </ProsePage>
  );
}
