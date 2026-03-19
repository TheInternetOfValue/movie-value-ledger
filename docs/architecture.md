# Architecture

## Purpose

This repo is a movie-first front end for [the Internet of Value](https://theinternetofvalue.xyz/) story.
It uses the cinema experience to make the underlying value framework feel human, relatable, and fun while keeping the canonical meaning intact underneath.

The front end translates spec-aligned concepts into plain language.
The backend meaning stays grounded in [the Internet of Value](https://theinternetofvalue.xyz/) canonical layers and equations.

## Current App Shape

The current app is built with Next.js App Router and lives in `src/`.

### Routes

- `src/app/page.tsx` — landing page and navigation hub
- `src/app/individual/page.tsx` — individual movie-value experience
- `src/app/micro/page.tsx` — business / film investment lens
- `src/app/macro/page.tsx` — economic / GDP lens
- `src/app/community/page.tsx` — collective attention / identity lens
- `src/app/about/page.tsx` — short project/about page
- `src/app/api/share-card/route.ts` — share-card image endpoint

### Shared UI

- `src/components/ui/*` — design-system style primitives
- `src/lib/*` — shared helpers such as share-card generation

## Product Structure

The live product is organized into four visible perspectives:

1. **Individual**
    - focused on the effect of a movie on body, mood, thought, habit, and performance
    - presented as a fun post-movie reflection flow

2. **Micro**
    - treats the film as a capital allocation event
    - covers cost, revenue, ROI, and release economics

3. **Macro**
    - treats the film as part of the wider economy
    - covers GDP, expenditure, income distribution, and money flow

4. **Community**
    - treats the film as shared attention and identity formation
    - covers buzz, reactions, cultural momentum, and collective feeling

## Front-End Contract

The UI should stay:

- relatable in language
- cinematic in tone
- playful where appropriate
- clear about what each question means
- mapped back to the canonical backend variables

This means the front end can ask questions like:

- Did the theatre noise leave your ears ringing?
- Did your eyes take time to adjust after the dark room?
- Did the film make you want junk food, tea, a cigarette, or a walk?
- Did it shift an old opinion or break a mental model?
- Did it change what you wanted to do next?
- Did it affect your focus or energy for the rest of the day?

The wording can be casual, but the meaning must stay aligned.

## Canonical Alignment

The repo should remain aligned with these IOV truths:

- `~WellbeingProtocol` is the canonical wellbeing layer
- `~WellbeingIdentity` is a living state, not a static profile
- `~ValueCaptureProtocol` and `~SAOcommons` help validate and ground identity state
- `VC = W × Vcom` remains the canonical equation anchor

The app does not change these claims.
It only translates them into a movie-first experience.

## Normalized wellbeing baseline

The live individual and companion experiences should treat `W = 1.0` as the neutral baseline.
Any older `700` references should be treated as legacy presentation copy and removed from active UI where possible.

## Content Strategy

The home page acts as the gateway:

- introduces the movie-value framing
- points users into the four perspectives
- surfaces buzz / social momentum in an editorial, non-technical way
- keeps the tone premium, minimal, and easy to scan

The individual page is the main experience layer:

- it is where the user feels the value model most directly
- it should remain the most interactive and relatable page
- it should avoid technical jargon unless the user explicitly wants depth

## Documentation Set

Current docs in this repo should work together as a single story:

- `docs/whitepaper.md` — the narrative / positioning document
- `docs/architecture.md` — the current repo shape and product logic
- `docs/context/*` — session memory and canonical project context

## Notes

This architecture doc describes the current implementation and product direction.
If the route structure changes, this file should be updated first so the repo stays easy to understand.