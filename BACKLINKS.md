# Backlink plan

## Read this first

Backlinks cannot be built in the code. A backlink is a link on somebody else's
website pointing at yours, and the only way to get one is for a person or an
organisation to decide to put it there. Nothing in this repository can create
one, and any agency or tool promising automated link building is selling either
worthless links or actively harmful ones.

What the rebuild can do, and has done, is make the site worth linking to and
make sure that a link, once earned, counts: one canonical URL per page,
redirects preserving every address the old site published, structured data on
every route, an even internal link graph, and content that says something
specific enough to be cited. That work is finished. Everything below is
somebody's job rather than a code change.

The list is ordered by effort against value. Work down it.

---

## Tier 1: the ones you already qualify for

These require no persuasion. Datanox is entitled to them and simply has not
claimed them.

### 1. Microsoft Partner directories

The single highest value link available to this business, because it is
authoritative, relevant and a lead source in its own right.

- **Solution provider listing.** Datanox is a Microsoft Solutions Partner for
  Business Applications. That designation carries a public profile, and the
  profile takes a website URL. Note that the designation is currently held back
  from the site itself on your instruction; publishing the directory profile is
  a separate decision and does not require changing the site.
- **AppSource listings.** Five commercial products built on Power Platform is
  exactly what AppSource exists for. Publishing goes through Partner Center and
  each listing carries a link back to your site. This is worth doing for the
  distribution alone; the link is a side effect.
- **Power Platform partner listing.** A separate directory from the general
  solution provider one, and it reaches a more specific buyer.

**Owner:** whoever holds the Partner Center account.
**Effort:** a day for the profiles, longer per AppSource listing because each
one goes through review.

### 2. Your four partners

OrientMCT, WhizzBridge, Alkemiz and Heartburst all have websites. You link to
them from `/partners/` and `/clients/`. Ask each of them to link back to
`https://datanox.io/partners/` from their own partner page.

This is a two line email and the answer is almost always yes, because it makes
their page better too. Four relevant links from real companies in three
countries is worth more than fifty directory submissions.

**Owner:** whoever manages each relationship.
**Effort:** four emails.

### 3. LinkedIn

`content/site.ts` records `companyLinkedIn` as unconfirmed, which means either
the page does not exist or nobody has told me its address. If it exists, the
website field should point at `https://datanox.io/` and the About section
should carry the same one sentence definition the site uses.

The link itself is nofollowed and passes no ranking signal directly. It matters
anyway, because it is where a person who has heard the name checks whether the
company is real, and because AI answer engines read LinkedIn heavily when
asked about a company.

While you are there: every one of the five people on `/company/` should have
Datanox listed as their current employer with a link. Five profiles is five
more paths to the site.

**Owner:** marketing, plus each individual.
**Effort:** an hour.

---

## Tier 2: directories worth the time

Not all directories are worth anything. The rule is simple: if a real buyer
would use it to shortlist a supplier, list on it. If its only function is to
host links, skip it, because those are the ones search engines discount and
occasionally penalise.

Worth listing on, in rough order:

| Directory | Why it earns its place |
| --- | --- |
| Clutch | The one enterprise buyers in Australia and the Gulf actually check for IT services firms. Verified reviews carry real weight. |
| G2 | Where software products are compared. Relevant for the five products rather than for the services practice. |
| Capterra and GetApp | Same category as G2, same audience, same effort once the copy exists. |
| GoodFirms | Lower authority than Clutch, still a genuine shortlist source in the Gulf market. |
| Australian Business Register and local chambers | Local relevance signals for the Australian market specifically. |
| UAE and Saudi chamber of commerce listings | The same signal for the Gulf, and these are unusually well trusted in that market. |

Use the same one sentence company definition everywhere, the same logo and the
same URL form (`https://datanox.io/`, with the trailing slash). Consistency
across listings is itself a signal, and inconsistency is a mess to unpick later.

Skip anything that asks for payment in exchange for a link with no audience
attached to it.

**Owner:** marketing.
**Effort:** half a day for the first, an hour each afterwards, because most of
the work is writing the description once.

---

## Tier 3: the ones that actually move rankings

Tier 1 and 2 are hygiene. This tier is where the difference is made, and it is
slower because it depends on producing something worth linking to.

### 4. Client and partner announcements

Every implementation is a potential announcement on the client's site, and a
university, a government entity or a national charity linking to you is worth
more than any directory in this document. Ask at the point where the client is
most pleased with the work, which is a fortnight after a successful go live and
not six months later.

Two things make this succeed rather than stall: write the draft for them, and
ask for a link to the specific page rather than the homepage. A case study
about grant assessment should link to `/intelli-assessment/`.

Note that the migration engagements cannot be used this way, since those
clients cannot be named at all.

### 5. The white papers, used properly

Five technical papers now sit behind a three field form. They are the most
linkable assets on the site, and they earn links only if people outside your
sales pipeline can find them.

- Submit them where practitioners look. Power Platform and Dynamics
  communities, relevant subreddits, LinkedIn groups.
- Reference them in answers to real questions on the Microsoft Q and A
  forums and in community discussions, where the paper genuinely answers
  the question asked. Not otherwise.
- The company overview download stays open precisely so it can be linked
  freely.

### 6. Guest articles and speaking

The strongest asset Datanox has for this is a position most competitors will
not state: that in a regulated process, artificial intelligence advises and a
person decides, always. That is an argument, it is defensible, and publications
covering government technology and insurance technology in Australia and the
Gulf will take a well written piece making it.

One article in a genuine trade publication is worth more than the whole of
Tier 2. Aim for two a year rather than a campaign.

Conference and user group appearances produce a speaker profile with a link,
which is a durable one on a domain nobody can take away from you.

### 7. Answer engines, which are not a link problem

Increasingly, buyers ask an assistant rather than a search engine, and being
cited there depends on different things: being unambiguously identifiable as
an entity, stating facts in a form a model can extract, and being described
consistently everywhere you appear.

The site already carries `llms.txt`, complete structured data on every route,
and a frequently asked questions block on almost every page. The remaining
work is the Tier 1 and Tier 3 items above, because consistency across
LinkedIn, the Microsoft directories and the site is what makes a model
confident enough to name you.

---

## What not to do

- **Buying links.** Detectable, penalised, and the penalty outlasts the
  agency that sold them.
- **Reciprocal link schemes** with unrelated businesses. A Power Platform
  consultancy linked from a car hire site in another country is a signal, and
  not a good one.
- **Mass directory submission tools.** Hundreds of listings appearing in a week
  on domains with no traffic is the exact pattern these systems are built to
  catch.
- **Comment and forum links** placed to get a link rather than to answer a
  question. This damages the brand with the audience you most want.

---

## Measuring it

Once Search Console is verified for the new site, `Links` shows every referring
domain it knows about. Check it monthly, not weekly.

The number that matters is **referring domains**, not total backlinks. Fifty
links from one directory is one domain. Ten links from ten real companies in
your sector is ten, and it is worth many times more.

A reasonable target for the first year, from the work above: fifteen to twenty
five referring domains, most of them from Tier 1 and Tier 3. Any agency
promising several hundred in that period is describing the kind of links this
document tells you to avoid.

---

Sources consulted for the directory landscape as it stands in August 2026:
[Microsoft Learn, publishing a Power Platform app on
AppSource](https://learn.microsoft.com/en-us/power-platform/developer/marketplace/publish-app),
[Microsoft Power Platform partner
directory](https://www.microsoft.com/en-us/power-platform/products/power-apps/partners),
[Microsoft Partner
Directories](https://microsoftpartners.microsoft.com/abs/Partner-Directories/).
