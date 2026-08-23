# Lead capture setup

Two forms on this site send data: the enquiry form on `/contact/` (and the
partner variant), and the three field gate in front of each white paper on
`/resources/`.

The site is a static export. There is no server on this domain and there are no
API routes, so nothing here can receive a POST. Both forms send to a Power
Automate flow instead. That was the chosen option on 21 August 2026 and it is
the right one for this business: the flow can write the lead to Dataverse, send
the notification email and apply a retention policy, inside the platform the
company already runs.

Until the flow exists and its URL is configured, both forms show an honest
failure message rather than a false confirmation. Nothing is silently lost.

---

## 1. Build the flow

In Power Automate, create an **instant cloud flow** with the trigger **When an
HTTP request is received**.

### Trigger

Set **Who can trigger the flow** to `Anyone`.

Paste this as the request body JSON schema:

```json
{
  "type": "object",
  "properties": {
    "kind": { "type": "string" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "organisation": { "type": "string" },
    "role": { "type": "string" },
    "sector": { "type": "string" },
    "product": { "type": "string" },
    "industry": { "type": "string" },
    "message": { "type": "string" },
    "paper": { "type": "string" },
    "file": { "type": "string" },
    "intent": { "type": "string" },
    "page_path": { "type": "string" },
    "page_url": { "type": "string" },
    "referrer": { "type": "string" },
    "submitted_at": { "type": "string" },
    "timezone": { "type": "string" },
    "language": { "type": "string" },
    "utm_source": { "type": "string" },
    "utm_medium": { "type": "string" },
    "utm_campaign": { "type": "string" },
    "utm_term": { "type": "string" },
    "utm_content": { "type": "string" },
    "gclid": { "type": "string" },
    "msclkid": { "type": "string" }
  },
  "required": ["kind"]
}
```

`kind` is one of `contact`, `partner` or `paper`. Everything else is optional,
because the two forms send different fields.

### The network address and the country

Neither can be read in a browser. Any site claiming to capture a visitor's IP
address in client side code is either wrong or is calling a third party lookup
service, which means telling that service about every visitor. So the browser
sends nothing of the sort, and the flow reads it from the request headers
instead:

```
triggerOutputs()?['headers']?['X-Forwarded-For']
```

Take the first address in that list; the rest are proxies. For the country,
either use the header your gateway adds if you front the flow with one, or call
a geolocation lookup **inside the flow** rather than in the browser.

This is personal data. `/privacy/` on this site already names it, states the
lawful basis as legitimate interest, and commits to a twelve month retention
period. If you change that period, change the privacy notice in the same
release.

### Actions

A minimal working flow is four steps:

1. **Condition** on `kind` to separate a white paper download from an enquiry.
2. **Add a new row** into a Dataverse table (suggested below), or **Create item**
   in a SharePoint list if you would rather not model a table yet.
3. **Send an email (V2)** to the delivery team, subject line carrying `kind`,
   `organisation` and `page_path` so it is triageable from the inbox list.
4. **Response** — see the next section, this one is not optional.

### The Response action, which the forms depend on

The browser calls the flow from `https://datanox.io`, so the response must
carry a cross origin header or the browser will refuse to read it and the
visitor will be told the submission failed even though it succeeded.

Add a **Response** action as the last step:

- Status code: `200`
- Headers:
  - `Access-Control-Allow-Origin`: `https://datanox.io`
  - `Content-Type`: `application/json`
- Body: `{ "ok": true }`

Use the exact origin rather than `*`. If you run a staging domain, either add a
second flow or return the origin conditionally.

The site posts with `Content-Type: text/plain;charset=UTF-8` on purpose. That
keeps the request inside the set browsers treat as simple, so no preflight
`OPTIONS` is sent and the flow does not have to answer one. The body is still
JSON and the trigger parses it normally.

---

## 2. Suggested Dataverse table

| Column | Type | Note |
| --- | --- | --- |
| Name | Text | |
| Email | Text | |
| Organisation | Text | Empty for a white paper download |
| Role | Choice | |
| Sector | Choice | |
| Subject | Text | The `product` field |
| Industry | Choice | White paper downloads only |
| Message | Multiline text | |
| Paper | Text | Which paper, empty for an enquiry |
| Kind | Choice | contact, partner, paper |
| Page path | Text | |
| Referrer | Text | |
| Campaign | Text | Concatenate the utm fields |
| Network address | Text | From the flow, not from the browser |
| Country | Text | Derived in the flow |
| Submitted at | Date and time | |

Put a retention job on **Network address** and **Country** at twelve months, so
the commitment in the privacy notice is enforced by the system rather than by
somebody remembering.

---

## 3. Configure the site

Copy the HTTP POST URL from the trigger after saving the flow. It contains a
signature, so treat it as a credential: do not commit it.

Create `.env.local` in the project root:

```
NEXT_PUBLIC_LEAD_ENDPOINT=https://prod-00.australiasoutheast.logic.azure.com:443/workflows/...
```

On Vercel or whichever host you use, add the same key as an environment
variable and redeploy.

**Understand what this is not.** Anything shipped to a browser is visible to
anybody who opens the network tab, so this URL is public in practice. Treat the
flow as a public endpoint: validate what arrives, cap the size of every field,
and add a rate limit or a daily cap so a discovered URL cannot be used to fill
a table overnight. The honeypot field in the form catches ordinary bots, and
the flow should discard any submission where `company-website` arrives with a
value, but neither is a substitute for the flow defending itself.

---

## 4. Confirm the contact email

`content/site.ts` has `unconfirmed.contactEmail` set to `null`, because no email
address is published anywhere on the current datanox.io and guessing one would
put a possibly dead address in front of somebody whose message has just failed
to send.

Fill it in and every failure message, confirmation and no JavaScript fallback
across both forms gains a working link. That is the only change needed.

---

## 5. Test before going live

1. Submit the enquiry form. Confirm the row lands, the email arrives, and the
   page shows the confirmation rather than the failure note.
2. Submit a white paper gate. Confirm the download starts and the row records
   which paper.
3. Reload `/resources/` and open a different paper. You should not be asked
   again, because the browser remembers.
4. Open the same page in a private window. You should be asked, which confirms
   the memory is per browser and not a cookie following anybody around.
5. Fill the hidden `company-website` field using developer tools and submit.
   The page should show the confirmation and the flow should receive nothing.
6. Temporarily break the endpoint value and submit. You should see the failure
   note, not a false confirmation. This is the case most sites get wrong.

---

## What the gate is, and what it is not

The white paper gate is lead capture, not access control. The PDFs sit at
public paths under `/papers/` and anybody determined to skip the form can. That
is a deliberate trade: a genuinely locked file needs a server to check
permission on every request, and this site does not have one.

It also keeps the papers citable, which matters more than it sounds. A paper
behind an unavoidable wall is a paper no search engine indexes, no analyst
quotes and no AI assistant can find when somebody asks it about governance on
Power Platform.
