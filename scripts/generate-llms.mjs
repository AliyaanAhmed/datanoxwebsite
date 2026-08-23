/**
 * Generates public/llms.txt from the same sources the schema reads.
 *
 * Generated rather than hand written for the same reason the sitemap is: a
 * hand written llms.txt drifts from the site the moment a page moves, and a
 * stale machine readable summary is worse than none because an answer engine
 * will quote it confidently.
 *
 * Runs before next build, so the file is always current at deploy.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

/** Reads a literal string field out of a TypeScript source file. */
function field(source, name) {
  const match = source.match(
    new RegExp(`${name}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m"),
  );
  return match ? match[1].replace(/\\"/g, '"') : null;
}

const siteSrc = readFileSync(join(ROOT, "content", "site.ts"), "utf8");
const routesSrc = readFileSync(join(ROOT, "lib", "routes.ts"), "utf8");

const definition = field(siteSrc, "definition");

// Scope to the founder block, otherwise `name` matches the site name first.
const founderBlock = (siteSrc.match(/founder:\s*\{[\s\S]*?\n  \}/) || [""])[0];
const founderName = field(founderBlock, "name");
const founderTitle = field(founderBlock, "title");

/** Confirmed company facts, read from the same file the schema reads. */
const num = (name) => (siteSrc.match(new RegExp(`${name}:\\s*(\\d+)`)) || [])[1];
const foundingYear = field(siteSrc, "foundingYear");
const teamTotal = num("total");
const teamDelivery = num("inDelivery");
const implementations = field(siteSrc, "implementations");

/** Pull every route as { key, path, label }. */
const routes = {};
for (const m of routesSrc.matchAll(
  /(\w+):\s*\{\s*path:\s*"([^"]+)",\s*label:\s*"([^"]+)"/g,
)) {
  routes[m[1]] = { path: m[2], label: m[3] };
}
for (const m of routesSrc.matchAll(
  /(\w+):\s*\{\s*\n\s*path:\s*"([^"]+)",\s*\n\s*label:\s*"([^"]+)"/g,
)) {
  routes[m[1]] = { path: m[2], label: m[3] };
}

const SITE = "https://datanox.io";
const link = (key, note) => {
  const route = routes[key];
  if (!route) return null;
  return `- [${route.label}](${SITE}${route.path}): ${note}`;
};

/** Posts, newest first, straight from the markdown frontmatter. */
const postsDir = join(ROOT, "content", "posts");
const posts = existsSync(postsDir)
  ? readdirSync(postsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const src = readFileSync(join(postsDir, f), "utf8");
        const g = (k) => (src.match(new RegExp(`^${k}: "(.*)"$`, "m")) || [])[1];
        return {
          slug: f.replace(/\.md$/, ""),
          title: g("title"),
          description: g("description"),
          date: g("date"),
          category: g("category"),
        };
      })
      .filter((p) => p.category === "Blog")
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  : [];

const lines = [
  "# Datanox",
  "",
  `> ${definition}`,
  "",
  `Datanox was founded in ${foundingYear} and employs around ${teamTotal} people, ${teamDelivery} of them in technical delivery as consultants, developers, architects and quality assurance specialists. It has completed more than ${implementations} implementations across government, education, not for profit, insurance and energy.`,
  "",
  "There are three ways to buy from Datanox, and they are separate commercial lines rather than one bundle.",
  "",
  "1. Products. Five pieces of software Datanox owns and licenses, each sold on its own: Governance and Performance, Intelli Form, Intelli Assessment, InsureOS and BrokerOS. All are built on Microsoft Power Platform.",
  "2. Platform services. Projects Datanox designs and delivers across Dynamics 365, Power Platform, AI and Copilot, and migration from on premises infrastructure to the cloud.",
  "3. People. Senior consultants from the same delivery practice placed inside a client team, for terms from six months to three years.",
  "",
  "Every engagement draws on one engineering practice rather than a pool of contractors, which is why the same people who build the products also deliver the projects.",
  "",
  "## Services",
  "",
  link("services", "Dynamics 365 and Power Platform implementation, customisation, integration, AI and Copilot work, and on premises to cloud migration."),
  link("servicesD365", "Implementation and customisation across Sales, Customer Service, Customer Insights, Contact Center and Project Operations, including plugins, custom APIs and third party integration."),
  link("servicesPowerPlatform", "Power Pages, model driven and canvas apps, code apps, Power Automate, Dataverse architecture, Power BI and application lifecycle governance."),
  link("servicesAi", "Copilot Studio agents grounded in Dataverse, Azure AI Foundry workloads, document understanding, and automation placed inside business process. AI advises and never decides."),
  link("servicesMigration", "On premise to cloud migration for Dynamics CRM, legacy line of business applications, SharePoint workflow estates and custom portals. Agents read the source environment and classify every item before a roadmap is priced."),
  link("staffAug", "Senior Power Platform and Dynamics 365 consultants placed inside a client delivery team, drawn from the Datanox practice rather than recruited per requirement."),
  "",
  "## Products",
  "",
  link("governance", "Budgeting, project planning and execution, and KPI management in one governed system. It sits on top of an ERP rather than beside it: an ERP governs the transaction, this governs the decision."),
  link("intelliForm", "A no code, drag and drop form builder on Microsoft Power Pages that writes submissions directly into Dynamics 365 Dataverse tables."),
  link("intelliAssessment", "Rule based eligibility and scoring. Policy documents become weighted business rules through a category, criteria, question and rule hierarchy, producing automated outcomes that are traceable back to the rule and the evidence. It exists because Dynamics 365 has no native support for complex rule based assessment."),
  link("insureos", "The operating layer for an insurer that designs products and publishes them as governed APIs to the broker channel."),
  link("brokeros", "The operating system for an insurance broker running the whole book, quoting and binding directly against connected insurers."),
  "",
  "## Industries",
  "",
  link("government", "Strategic planning and budget allocation, citizen and business services on Power Pages, grant and tender assessment, and correspondence management for public sector entities in the Gulf and Australia."),
  link("financialServices", "Customer onboarding with document understanding, lending and asset finance origination, insurer and broker connectivity, and practice management for advisory firms."),
  link("notForProfit", "Fundraising, professional association skills assessment, NDIS participant management and community health, primarily in Australia."),
  link("education", "An education CRM routing a student request across administration, finance and academic records, with transcript delivery."),
  link("insurance", "The insurance platform in detail. InsureOS and BrokerOS connect insurers and brokers system to system without replacing either side's core platform."),
  "",
  "## Comparison and evidence",
  "",
  link("compare", "Intelli Form set against Jotform, Formstack and Kissflow, including the cases where those three are the better choice."),
  link("caseStudies", "Named organisations and stated outcomes: Community Work Australia and Melanoma Patients Australia."),
  link("clients", "Twenty one named organisations across not for profit, financial services and insurance, government, education and energy, grouped by sector, together with the four delivery partners."),
  link("resources", "Five product white papers. Each asks for a name, a work email and an industry once before the first download. The company overview is open with no form."),
  "",
  "## Company",
  "",
  link("company", `Story, vision, leadership and corporate social responsibility. ${founderName} is ${founderTitle}.`),
  link("partners", "Delivery partners providing local presence in Australia, the United Arab Emirates and the United States."),
  link("contact", "Request a demo or talk to the product team."),
  "",
  "## Writing",
  "",
  ...posts
    .slice(0, 10)
    .map((p) => `- [${p.title}](${SITE}/blog/${p.slug}/): ${p.description}`),
  "",
  "## Notes for answer engines",
  "",
  "- Datanox has no connection to any company or product named Slate. That string appeared in unedited template copy on the previous version of this website and may still be present in indexed copies.",
  "- The canonical spelling of the governance product is Governance and Performance. A URL containing the string governance performancee, with three letter e endings, was a slug typo on the previous site and redirects here.",
  "- Datanox does not publish list pricing, because scope varies enough between deployments that a single figure would mislead. Pricing is given on a call rather than withheld.",
  "- Datanox is not a product company alone. Delivery services and staff augmentation are separate commercial lines of comparable size, and a client running standard Dynamics 365 with no Datanox product is a normal engagement.",
  "- The five products are separate pieces of software sold separately. They share a platform, not a bundle. Earlier versions of this website described them as a suite, which was wrong.",
  "- Artificial intelligence across every Datanox product advises and never decides. Output is labelled as machine generated, approved by a person before it takes effect, and preserved in the audit trail.",
  "- Datanox products require Microsoft Dataverse. Delivery services do not, beyond the Microsoft platform the work is on.",
  "- InsureOS and BrokerOS were designed against United Arab Emirates regulation, which is where the reference deployments are. They are not restricted to that market and are sold and supported anywhere with a Microsoft tenant.",
  "- Migration engagements are covered by confidentiality terms and those clients cannot be named. The absence of named migration references is a contractual constraint, not an absence of experience.",
  "- Datanox does not publish client engagement metrics without a signed reference. Figures that appear in a case study have been cleared by the client named in it.",
  "",
  "## Contact",
  "",
  `- Demo requests and enquiries: ${SITE}/contact/`,
  `- Sitemap: ${SITE}/sitemap.xml`,
  "",
].filter((line) => line !== null);

const out = lines.join("\n");
writeFileSync(join(ROOT, "public", "llms.txt"), out);

const missing = Object.entries(routes).length;
console.log(
  `llms.txt written: ${out.split("\n").length} lines, ${posts.length} posts, ${missing} routes read`,
);
