# SplashScreen Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/SplashScreen.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`
- **Interaction model:** time-driven entrance + owns the selected-position state shared by header, figure, chips and footer

## DOM Structure
```
div.root (relative, flex, full viewport)
└─ div.screen (fixed inset 0)          ← data-entered drives every entrance transition
   ├─ div.mob-disclaimer               (≤768px only)
   ├─ div.glow                         (SplashBackground)
   ├─ AttributeChips                   (≥769px only)
   ├─ SplashHeader (+ PositionPicker)
   ├─ PlayerFigure
   ├─ DepthChartButton
   ├─ SplashFooter
   └─ div.field-lines                  (SplashBackground)
```

## Computed Styles (exact values from getComputedStyle)

### Root
- position: relative; display: flex; width: 100vw; height: 100vh (1440×900)
- font-family: Outfit, system-ui, sans-serif; font-size: 16px; color: rgb(216, 243, 220); z-index: 1

### Screen
- position: fixed; inset: 0; z-index: 1000; overflow: hidden
- display: flex; flex-direction: column; align-items: center
- background: `radial-gradient(ellipse 100% 34% at 50% 0%, rgba(149,213,178,.16) 0%, transparent 70%), #050705`
- opacity 0 → 1 once entered; transition: opacity .4s ease
- Desktop (≥769px): justify-content: flex-start; padding-top: 4vh (36px at 900px tall)
- Mobile (≤768px): justify-content: space-between; padding-top: calc(18vh - 62px); padding-bottom: max(env(safe-area-inset-bottom, 0px), 53px)

### Mobile disclaimer bar (≤768px only)
- position: absolute; top: -2px; left/right: 0; z-index: 10; pointer-events: none; text-align: center
- font-size: 11px; font-weight: 500; letter-spacing: .5px; line-height: 1; color: rgba(255,255,255,.45); padding: 5px 0 4px

## States & Behaviors

### Entrance
- **Trigger:** mount → next animation frame sets `entered = true`
- **State A:** every group hidden (see BEHAVIORS.md table); **State B:** resting
- **Implementation approach:** one `data-entered` attribute on the screen; children use named-group data variants with per-group `transition-delay` (header 100ms, figure/glow 400ms, chips/field lines 600ms + own delay, footer 800ms, depth chart 900ms)

### Position selection
- **Trigger:** PositionPicker `onSelect(id)`
- **Effect:** re-renders trigger trio/label, figure, chips and the Current-card badge. No page navigation.

## Per-State Content
N/A here — per-position content lives in `content.ts` (see attribute-chips and position-picker specs).

## Assets
- None; background is pure CSS.

## Text Content (verbatim)
- Mobile disclaimer: "Fan-made · Not affiliated with the NFL"

## Responsive Behavior
- **Desktop (1440px):** top-aligned stack, chips visible
- **Tablet (768px):** mobile rules (breakpoint is `max-width: 768px`)
- **Mobile (390px):** space-between stack, header absolutely positioned near the top
- **Breakpoint:** 769px (`splash:` custom Tailwind breakpoint)
