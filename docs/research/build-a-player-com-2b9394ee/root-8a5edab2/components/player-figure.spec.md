# PlayerFigure Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/PlayerFigure.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`
- **Interaction model:** time-driven entrance; figure swaps instantly with the selected position

## DOM Structure
```
div.figure-wrap (3:4 box)
├─ svg.figure ×4 (QB, RB, WR, DB poses) — only the active one is visible
└─ div.figure-glow
```

## Computed Styles (exact values from getComputedStyle)

### Wrap
- position: relative; z-index: 2; aspect-ratio: 3/4; overflow: visible; pointer-events: none
- width: clamp(153px, 27.1vw, 287px) desktop (287×383 at 1440); mobile clamp(160px, 44vw, 260px)
- desktop: margin-top 8px; margin-bottom 8px; top: -7px — mobile: margin-top 65px; margin-bottom 0
- transition: opacity .65s ease, transform .65s cubic-bezier(.22,1,.36,1); delay 400ms

### Figure
- position: absolute; inset 0; width/height 100%; anchored bottom-center
- rendered as white at 13% opacity (source: `filter: brightness(0) invert(1) opacity(.13)`)
- the source scales its WR/TE image by 1.18 and DB by 1.05 to even out its artwork; the original poses here are drawn to fill the 3:4 box, so no per-position scale is applied
- swap: opacity 0 ↔ 1 with no transition

### Ground glow
- position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 70%; height: 40px
- background: radial-gradient(ellipse, rgba(116,198,157,.5) 0%, transparent 80%); filter: blur(8px)

## States & Behaviors
### Entrance
- **State A:** opacity 0; transform translateY(40px) scale(.92)
- **State B:** opacity 1; transform none
- **Implementation approach:** named-group data variant

## Per-State Content
QB → throwing pose · RB → running with ball · WR/TE → leaping catch · DB → backpedal

## Assets
- Figures are **original** SVG poses drawn for this project (the source ships its own silhouette images — not reused)

## Text Content (verbatim)
N/A

## Responsive Behavior
- **Desktop (1440px):** 287×383
- **Mobile (390px):** ~172×229, 65px top margin
- **Breakpoint:** 769px
