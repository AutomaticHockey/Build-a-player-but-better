# DepthChartButton Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/DepthChartButton.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`
- **Interaction model:** hover; time-driven entrance

## DOM Structure
`button` → `div.main` + `div.sub`

## Computed Styles (exact values from getComputedStyle)

### Button
- position: absolute; right: 500px; top: calc(50% - 85px); z-index: 10; cursor: pointer
- display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px
- padding: 10px 14px (mobile 8px 11px; mobile right: 10px)
- background: rgba(229,57,53,.18); border: 1px solid rgba(229,57,53,.55); border-radius: 10px
- size at 1440: 177×48, left 763, top 341
- transition: background .18s, border-color .18s, opacity .4s, transform .4s; delay (entrance only) 900ms

### Main
- Impact, "Arial Narrow Bold", sans-serif; 14px/1 (mobile 12px); weight 900; letter-spacing 1px; uppercase; #fff; nowrap

### Sub
- 9px (mobile 8px); weight 700; letter-spacing 2px; uppercase; #fbbf24; nowrap

## States & Behaviors
### Entrance
- **State A:** opacity 0; transform translateY(calc(-50% + 10px)) scale(.8)
- **State B:** opacity 1; transform translateY(-50%) scale(1)

### Hover states
- **Button:** background rgba(229,57,53,.18) → rgba(229,57,53,.28); border-color → rgba(229,57,53,.8); .18s

## Per-State Content
N/A

## Assets
None.

## Text Content (verbatim)
"The Depth Chart" / "Mini Game" (uppercased by CSS)

## Responsive Behavior
- **Desktop (1440px):** 500px from the right edge
- **Mobile (390px):** 10px from the right edge, 152×41
- **Breakpoint:** 769px
