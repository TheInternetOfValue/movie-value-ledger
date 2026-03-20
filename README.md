# Movie-Dhurandhar-TimeValue

A simple Next.js (App Router) app that renders the `IndividualLedgerStandaloneV2` UI.

## Run locally

```zsh
npm install
npm run dev
```

Then open http://localhost:3000

## Secret-scan note

If GitHub reports an `openai_api_key` alert for this repo, check generated Next.js output under `.next/` first. The repo now ignores `.next` and `.env*` files so build artifacts and local secrets stay out of git.

## Where things are

- `src/app/page.tsx` renders the main UI.
- `src/components/individual-ledger.tsx` contains the main UI.
- `src/components/ui/*` contains the shadcn-style UI primitives used by the ledger.

- by Moses Sam Paul