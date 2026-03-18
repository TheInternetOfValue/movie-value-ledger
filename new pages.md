Build three new Next.js App Router pages for the Movie-Dhurandhar-TimeValue project:

1. /macro
2. /micro
3. /community

Design requirements:
- match the current white, clean, card-based UI style
- use Tailwind + shadcn components already installed
- keep typography clear and educational
- avoid dense tables unless visually enhanced
- use sliders and cards where appropriate
- prioritize visual explanation over raw math

Page 1: /macro
Purpose:
Show how a movie behaves as an economic event at the country level.

Include 3 sections:
- Expenditure approach: GDP = C + I + G + (X - M)
- Income approach: wages, profits, interest, royalties
- Money velocity: simple explanation of how the same rupee moves multiple times

UX requirements:
- Expenditure should use a funnel or bucket visual
- Income should use a stacked bar/card structure
- Velocity should use a loop/flow explanation
- include adjustable sliders for key values
- keep explanations in plain English

Page 2: /micro
Purpose:
Show the movie as a production-house business bet.

Include:
- cost stack: actor, director, music, below-the-line, P&A, financing
- revenue stack: India theatrical, overseas, OTT, satellite/music/other
- clear profit calculation
- risk exposure card
- cash-flow timeline across:
  pre-production, production, post, P&A, aftermarket

UX requirements:
- visually show costs adding up on one side and revenues on the other
- profit should be obvious as the difference
- include sliders and summary cards

Page 3: /community
Purpose:
Show the asymmetry between paid labor and unpaid audience attention.

Include:
- labor hours estimate
- wage pool estimate
- audience attention hours by stage:
  rumors, announcement, teaser/trailer, release, reviews/UGC
- civilizational signal / attention multiplier = audience hours / labor hours

UX requirements:
- make the attention multiplier prominent
- use charts/cards instead of plain tables
- plain-English explanations only

Create pages under:
src/app/macro/page.tsx
src/app/micro/page.tsx
src/app/community/page.tsx

If needed, create reusable components under src/components.

Do not break the existing Individual Ledger page.