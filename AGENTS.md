# AGENTS.md - Movie-Dhurandhar-TimeValue Project

## Repository Commandment

This repo implements the Internet of Value (IoV) wellbeing protocol for movie ledger applications. The canonical source for IoV protocol definitions is in the sister repo `the-internet-of-value-spec`.

Do not treat `~WellbeingIdentity` as an isolated object; model it as a state updated by:
- `~ValueCaptureProtocol`
- `~WellbeingProtocol`
- `~SAOcommons`

## Layering Convention

- `~` = Level 1 (Core Protocol)
- `~~` = Level 2 (Implementation)
- `~~~` = Level 3 (Application)

## Terminology Convention

- Protocol term: `Wellbeing Identity`
- UI term: `Aura View`

## Session Memory Protocol (Mandatory)

Use repo files for durable memory. Do not rely on chat history.

## Project Overview

Movie-Dhurandhar-TimeValue is a Next.js application implementing a cinematic, game-like wellbeing ledger for movie experiences. It translates time and money investments into wellbeing-adjusted value using the IoV protocol.

### Key Features
- **Wellbeing Battery**: Visual battery (0-1000) starting at 700 baseline
- **Signed Intensity Sliders**: Left drains, right restores wellbeing
- **Net Value Calculation**: Opportunity cost + real costs vs wellbeing gains
- **Cinematic UI**: Dark, premium, screenshot-worthy design
- **Multi-Perspective**: Individual, Micro, Macro, Community views

## Conversations & Development History

### Initial Design (March 2026)
- **Request**: Redesign `/individual` page to be cinematic and game-like, not spreadsheet-like
- **Goal**: Make it feel polished, premium, with end-of-level victory/defeat screens
- **Alignment**: IoV wellbeing protocol with performance integrated into wellbeing

### UI Refinements
- **Hero Panel**: Battery, score vs 700 baseline, expressive avatar
- **Step Flow**: Physiology → Emotion → Feeling → Thought → Habit → Performance → Final
- **Battery Dynamics**: Responsive to all wellbeing nodes, signed intensity
- **Avatar**: Mood-based face with animations

### Physiology Screen
- **Nodes**: Movement (sat for too long ↔ danced and enjoyed), Senses (under stimulated ↔ over stimulated)
- **Labels**: Simple, specific left/right phrases
- **Sliders**: Centered at 50 (neutral), no % draining text

### Time & Money Investment
- **Time Breakdown**: Pre-release, scrolling, movie, post-discussion, reviews (minutes)
- **Money Breakdown**: Ticket, snacks, travel, parking (₹)
- **Calculations**:
  - Baseline Value = total_hours × hourly_rate × 0.7
  - Actual Value = total_hours × hourly_rate × W
  - Wellbeing Delta = Actual - Baseline
  - Net Value = Wellbeing Delta - total_money
- **Victory**: Net Value ≥ 0

### Final Screen
- **Victory/Defeat**: Based on net value
- **Poster**: Face, time, W, net value
- **Sharing**: X/Twitter, WhatsApp with results

### Technical Implementation
- **Framework**: Next.js App Router
- **Styling**: Tailwind CSS + ShadCN UI
- **Animations**: Framer Motion
- **State**: React hooks with complex wellbeing math
- **Normalization**: W = battery / 1000 (0-1 scale)

## Pages Created

### /individual (Primary Focus)
- **Hero**: Battery, score, avatar, run status
- **Screens**:
  - Intro: 6 wellbeing nodes overview
  - Physiology: Movement & Senses sliders
  - Emotion: Joy, Safety, Connection
  - Feeling: Perspective, Inspiration (renamed from Thought)
  - Thought: Perspective, Inspiration (technical layer)
  - Habit: Awareness, Choice
  - Time & Money: Detailed breakdowns + calculations
  - Performance: Learning, Earning, Skill, Community
  - Final: Victory/defeat poster with sharing

### /macro
- Placeholder for macro-level analysis

### /micro
- Placeholder for micro-level analysis

### /community
- Placeholder for community-level analysis

### /about
- Project information

### /whitepaper
- Links to IoV whitepapers

## Wellbeing Protocol Integration

### Core Nodes
- **Physiology**: Body state, movement, senses
- **Emotion**: Joy, safety, connection
- **Feeling**: Perspective, inspiration (felt experience)
- **Thought**: Perspective, inspiration (mental models)
- **Habit**: Awareness, choice
- **Performance**: Learning, earning, skill, community (wellbeing-integrated)

### Battery Calculation
- Signed weights: Physiology (1.8/1.2), Emotion (1.5/1.1/1.2), etc.
- Baseline: 700/1000 (W=0.7)
- Range: 0-1000

### Value Math
- Hourly Rate: salary / (8h/day × 22 days/month)
- Opportunity Cost: Time spent on movie vs work value
- Net Impact: Wellbeing-adjusted value - real costs

## Development Milestones

1. **Cinematic Redesign**: Dark UI, battery, avatar
2. **Signed Sliders**: Left negative, right positive
3. **Battery Responsiveness**: All nodes affect battery
4. **Physiology Labels**: Specific phrases
5. **Time/Money Breakdowns**: Detailed inputs
6. **Net Value Logic**: Opportunity cost calculation
7. **Victory Conditions**: Net positive = win

## Open Questions
- Macro/Micro/Community page implementations
- Multi-user/community features
- Advanced analytics and trends
- Integration with broader IoV ecosystem

## Next Actions
- Implement remaining perspective pages
- Add data persistence (localStorage/API)
- Enhance sharing and social features
- Performance optimization and testing

## Boundary Rules
- Keep AGENTS.md stable and short (commandments + operating rules)
- Evolve project memory in docs/ or session logs
- Align with IoV spec repo for protocol decisions

## Macro Page Design Rule
- Keep `/macro` and related macro views full-width, single-screen, and no-scroll when possible.
- Match the cinematic landing-page style: dark background, amber highlights, clean typography, and strong visual hierarchy.
- Avoid repeating the same number or claim more than once on the same page.
- On public macro views, show the headline numbers, formulas, and short variable explanations only.
- Move long derivations, dense math, and reference notes into a separate reference page or doc, and link to it when needed.
- Use neutral product language. Do not describe a doc "insisting on" anything; treat it as a reference source.