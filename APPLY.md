# Batch 5: already applied

The 119 changed files were extracted into this folder on 21 August 2026.
There is nothing to unpack. The earlier version of this note told you to
extract an archive; that is done, and the archive has been moved into
`_to_delete/batch5-archive/`.

The changes are **not committed**, so `git status` shows the whole batch and
you can read the diff in VS Code before deciding.

## To see it

```
npm install
npm run dev
```

Then open http://localhost:3000

## To check it

```
npm run build
npm run verify
```

`npm run build` now **fails** on repetition rather than warning. It currently
reports zero, so a failure means something a later edit introduced. Use
`GUARDS_SOFT=1 npm run build` to drop back to warnings during a large content
change, and take it off before committing.

## To publish

`out/` after a build is the entire site. Follow `CUTOVER.md`, which covers the
27 redirects, the security headers and the Search Console steps.

Two things are worth having in place first, both in `LEAD-CAPTURE.md`:

1. The Power Automate flow, and its URL in `NEXT_PUBLIC_LEAD_ENDPOINT`.
2. A contact email in `content/site.ts` under `unconfirmed.contactEmail`.

Neither blocks a deploy. Without them both forms tell a visitor the
submission failed, which is honest but is not what you want live.
