# Implementation Plan: Visual Grammar & Storytelling Upgrade

This document tracks the progress of the 5 core visual upgrades recommended by the Design Council.

## 1. The "Red Thread" Consistency (Atmospheric Sync)
- [x] Create a new global theme in `globals.css` (The Dossier Theme).
- [x] Update `src/app/systems-pov/page.tsx` with charcoal/amber palette.
- [x] Update `src/app/macro/page.tsx` & `/micro/page.tsx` with the new theme (No white backgrounds).

## 2. Spatial Hierarchy & The "Mega-Navigation"
- [x] Design a persistent "Systems Scrubber" component.
- [x] Add a "Scrubber" state indicating the current layer (Individual -> Micro -> Macro).
- [x] Style the "Interrogate" button as a "Live System Record" indicator.
- [x] Centralize navigation logic into `src/components/NavigationBar.tsx`.

## 3. Kinetic Formulas (Living Math)
- [x] Add interactive hover states to Macro/Micro formulas.
- [x] Implement visual highlighting when a formula variable or data card is hovered.
- [x] Connect derivation logic using Framer Motion (Slide-and-scale animations).

## 4. The "Aura" Global State (Emotional Responsive UI)
- [x] Setup a simple Global Wellbeing State (Context or LocalStorage).
- [x] Create a `WellbeingVignette` component that adds grain/filter to the whole app based on W.
- [x] Sync the `individual` page battery state to the global vignette.

## 5. Data as Document (The Dossier Aesthetic)
- [x] Replace standard sans fonts for numbers with a high-fidelity Monospace font (JetBrains Mono or similar).
- [x] Add "Stamp" textures to confidence ratings (Sourced, Estimated).
- [x] Add "Analogue" touches: Margin notes, paper textures, and hand-drawn underlines.

---
*Created: March 21, 2026*

# Cinematic Ledger Upgrade: Progress Report

## [DONE] Task 1: Atmospheric Sync
- **Systems POV**: Overhauled to "Dossier Theme" (Dark charcoal, noise filters, monospaced numbers, amber highlights).
- **Macro Lens**: Standardized to Dossier aesthetic with 8xl typography and high-contrast logic.
- **Micro Lens**: Re-skinned as a Project Finance ledger with high-fidelity "Waterfall Net" and cost/revenue breakdowns.
- **Community Lens**: Re-mapped as an attention asymmetry study with Dossier-grade progress management.
- **Individual Lens**: Visual atmosphere synced with the global system while preserving the "Aura view" protocol.

## [IN PROGRESS] Task 2: Mega-Navigation (The Systems Scrubber)
- [x] Modernized fixed NavigationBar implemented across all layers.
- [ ] Implement "The Scrubber" (Expandable global overlay with multi-dimensional stats).

## [NEXT] Task 3: Kinetic Formulas
- Animate math derivations across transitions (Wait for Task 2 completion).

### Design Council Updates (March 2026)

- [x] **Dossier Theme Sync**: Replaced legacy blue/indigo/purple colors with Charcoal/Amber palette across all pages.
- [x] **Individual Ledger Refactor**: Removed "spreadsheet" look; renamed "Thought" to "Performance" in step flow; synced with global `WellbeingContext` for Aura visibility.
- [x] **Global Aura Signs**: Fixed the `setBattery` hook in the Individual ledger to ensure the `WellbeingVignette` (screen corner glows) responds to battery changes.
- [x] **Broken Links & Missing Pages**: 
    - [x] Fixed `/macro` link pointing to `/macro_dhurandhar` (now points to `/macro/dhurandhar_macro_data`).
    - [x] Restored and themed the **FAQ Page** (`/faq`).
    - [x] Restored and themed the **Debate Page** (`/debate`).
    - [x] Fixed **Micro Data Page** scaling and TOC.
- [x] **Cinematic Transitions**: Added `NavigationBar` and `WellbeingVignette` to every route for a seamless "Protocol Active" feel.
- [x] **Aura Signs Testing**: Verified that draining the battery to 0 creates a red vignette, while charging to 1000 creates an amber glow.

### Open Questions

- [ ] **The Scrubber**: What specific multi-dimensional stats should be prioritized in the initial expandable view?
- [ ] **Kinetic Formulas**: Any additional animation preferences or easing functions for the math derivations?
