# Keyword map

One primary keyword per page. That is the whole discipline: if two pages chase
the same term they compete with each other and neither wins, and if a page has
no term it is not really targeting anything.

The primary term appears in the title tag, in the meta description, and in the
body in a natural sentence. It does **not** appear in the h1 on most pages, on
purpose. The h1 here is a claim written for a human being, and the title tag is
what a search engine shows. Forcing both to carry the keyword produces a page
that reads like it was written for a machine, which is the thing every buyer in
this market has learned to distrust.

Nothing in this file needs a code change. It is the record of what each page is
for, so that future edits do not accidentally point two pages at one term.

---

## Products

| Route | Primary keyword | Supporting terms |
| --- | --- | --- |
| `/governance-performance/` | budgeting and governance software | KPI reporting software, project performance management, maturity assessment, Power Platform budgeting |
| `/intelli-form/` | no code form builder for Power Pages | Dataverse forms, multi step forms with payment, Power Pages form builder |
| `/intelli-assessment/` | rule based assessment software | eligibility scoring software, weighted scoring rubric, policy to business rules |
| `/insurance-brokers-management-system/insureos/` | insurance product configuration platform | insurer broker API, rating and quoting engine, product studio |
| `/insurance-brokers-management-system/brokeros/` | insurance broker management system | broker aggregator portal, tender management, quote and bind |

## Services

| Route | Primary keyword | Supporting terms |
| --- | --- | --- |
| `/services/` | Microsoft business applications partner | Dynamics 365 implementation, Power Platform consulting, delivery practice |
| `/services/dynamics-365/` | Dynamics 365 implementation partner | Sales and Customer Service implementation, Customer Insights, Project Operations, Dynamics customisation |
| `/services/power-platform/` | Power Platform consulting | Power Pages development, Dataverse architecture, code apps, application lifecycle management |
| `/services/ai-and-copilot/` | Copilot Studio development | Azure AI Foundry, document understanding, AI in Dynamics 365, human oversight |
| `/services/cloud-migration/` | Dynamics 365 on premise to cloud migration | CRM migration assessment, legacy application modernisation, SharePoint workflow migration |
| `/staff-augmentation/` | Power Platform staff augmentation | Dynamics 365 consultants, dedicated development team, IT resource augmentation |

## Industries

| Route | Primary keyword | Supporting terms |
| --- | --- | --- |
| `/government/` | Dynamics 365 for government | public sector performance management, citizen services portal, grant assessment software, government digital transformation |
| `/financial-services/` | Microsoft applications for financial services | customer onboarding automation, lending origination software, know your customer document extraction |
| `/insurance-brokers-management-system/` | insurance broker management system | insurer broker connectivity, UAE insurance technology, quote to bind |
| `/not-for-profit/` | nonprofit CRM on Power Platform | fundraising CRM, NDIS participant management, charity reporting software |
| `/education/` | education CRM | student request routing, university workflow automation, transcript delivery |

Note the deliberate overlap between `/financial-services/` and
`/insurance-brokers-management-system/`. The first targets the sector, the
second targets the product category, and the second is the narrower and more
commercially valuable term. If they ever start competing in the results, the
industry page is the one to soften.

## Evidence and company

| Route | Primary keyword | Supporting terms |
| --- | --- | --- |
| `/clients/` | Datanox clients | Microsoft partner client list, government and university clients |
| `/case-studies/` | Datanox case studies | Power Platform case study, nonprofit assessment case study |
| `/case-studies/community-work-australia/` | skills assessment case study | migration pathway assessment, professional association scoring |
| `/resources/` | Power Platform white papers | governance white paper, assessment white paper |
| `/compare/power-pages-vs-jotform-formstack-kissflow/` | Power Pages vs Jotform | Formstack alternative, Kissflow alternative, enterprise form tool comparison |
| `/company/` | about Datanox | Microsoft partner team, Datanox leadership |
| `/partners/` | Microsoft implementation partners | delivery partner network, Gulf and Australia partners |
| `/contact/` | book a Dynamics 365 demo | talk to a Power Platform consultant |

## Writing

The blog targets informational terms that the commercial pages should not
chase. Each post links to the product page that owns the equivalent commercial
term, which is the whole point of having both.

| Post | Primary keyword | Links to |
| --- | --- | --- |
| No Code Enterprise Forms That Actually Scale | no code enterprise forms | `/intelli-form/` |
| KPI Reporting Software in Power BI | KPI reporting software Power BI | `/governance-performance/` |
| What Maturity Index Tracking Software Should Do | maturity index tracking software | `/governance-performance/` |
| Structured Decisions in Dynamics 365 Case Management | Dynamics 365 case management | `/intelli-assessment/` |
| Choosing an Enterprise Planning App for Microsoft | enterprise planning app Microsoft | `/governance-performance/` |
| Power Platform Budgeting Software That Fits | Power Platform budgeting software | `/governance-performance/` |
| How Dynamics 365, Power Platform and AI Fit Together | Dynamics 365 and Power Platform architecture | `/services/` |
| Businesses don't lack data, they lack decisions | decision structure | `/governance-performance/` |
| Where AI Actually Fits | where AI fits in business process | `/services/ai-and-copilot/` |

Three posts are company news rather than search assets: the Karachi annual
event, the Lahore event and the Ismail documentary. They exist because they are
real and because removing an indexed page loses whatever it has earned. They
are not expected to rank for anything and should not be optimised.

---

## What is deliberately not targeted

- **"Dataverse native apps on Power Platform."** The old tagline. It describes
  a technology, nobody searches for it, and it was retired on instruction.
- **"CRM software" and other head terms.** Datanox will not outrank Microsoft,
  Salesforce or HubSpot for these, and traffic from them would not convert. The
  whole strategy here is the specific end of the long tail, where the searcher
  already knows what they need.
- **Pricing terms.** No list pricing is published, so a page targeting
  "Dynamics 365 pricing" would rank and then disappoint, which costs more than
  it earns.

## Where the gaps are

Three terms with real volume that no page currently owns. Each would be a new
page rather than an edit:

1. **"Power Pages developer"** and its regional variants. High commercial
   intent, and the site has an unusually strong claim to it because Datanox
   ships commercial products on Power Pages.
2. **"Dynamics 365 support"** or managed services. Currently only mentioned in
   passing on the services pages. If support is a real commercial line, it
   deserves a page; if it is not, leave it alone.
3. **"Microsoft partner in the UAE"** and the Australian equivalent. Local
   intent terms that the partners page half addresses. This one depends on the
   Microsoft directory listings in `BACKLINKS.md` more than on a page.
