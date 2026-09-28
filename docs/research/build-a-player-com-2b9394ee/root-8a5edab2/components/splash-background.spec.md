# SplashBackground Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/SplashBackground.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`
- **Interaction model:** static after a time-driven fade-in

## DOM Structure
Two sibling layers rendered into the screen: a center glow and a field-lines container with 7 rules.

## Computed Styles (exact values from getComputedStyle)

### Glow
- position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1; pointer-events: none
- width/height: 500px (mobile 300px)
- background: `radial-gradient(circle, rgba(116,198,157,.22) 0%, transparent 68%)`
- transition: opacity .8s ease (0 → 1 on entrance, starts ~400ms)

### Field lines container
- position: absolute; inset: 0; z-index: 0; pointer-events: none
- display: flex; flex-direction: column; justify-content: space-evenly

### Each yard line (×7)
- width: 100%; height: 1px; background: rgba(149,213,178,.05)
- transition: opacity .5s ease; delay .6s + i × .06s (i = 0…6)
- At 1440×900 they land at y = 112, 224, 337, 450, 562, 675, 787

## States & Behaviors
### Entrance
- **Trigger:** screen `entered`
- **State A:** opacity 0; **State B:** opacity 1
- **Transition:** as above
- **Implementation approach:** named-group data variant + inline transition-delay per line

## Per-State Content
N/A

## Assets
None.

## Text Content (verbatim)
N/A

## Responsive Behavior
- **Desktop (1440px):** glow 500px
- **Mobile (390px):** glow 300px; lines unchanged
- **Breakpoint:** 769px
