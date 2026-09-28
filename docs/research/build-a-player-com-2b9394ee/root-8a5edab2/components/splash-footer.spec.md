# SplashFooter Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/SplashFooter.tsx` (+ `ModeCards.tsx`)
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`, `original-desktop-hover-current-card.png`
- **Interaction model:** hover/active on buttons; time-driven entrance

## DOM Structure
```
div.footer
├─ div.tagline → span.dot + text
├─ ModeCards: div.modes (row-reverse) → button.current + button.all-time
├─ button.cross-link → wordmark + sub
└─ div.disclaimer (desktop only)
```

## Computed Styles (exact values from getComputedStyle)

### Footer
- position: relative; z-index: 3; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px
- desktop: margin-top 5px; top -15px; align-items stretch; gap 6px; width clamp(340px, 42vw, 520px)
- mobile: margin 0 0 83px; gap 6px; width 100%; padding 0 20px
- transition: opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1); delay 800ms

### Tagline
- inline-flex; align center; gap 6px; align-self center; position relative; top 5px; margin-bottom 1px; nowrap
- "Bebas Neue", Impact, "Arial Narrow Bold", sans-serif; 16px (desktop 24px); weight 800; letter-spacing 2.5px; uppercase; color #95d5b2; opacity .95
- dot: 6×6 circle #22c55e

### Modes row
- display flex; flex-direction row-reverse; gap 12px; align-items stretch; width 100%

### Card (shared)
- border-radius 18px; text-align left; display flex; flex-direction column; justify-content space-between; gap 6px; cursor pointer
- transition: transform .22s, box-shadow .22s, border-color .22s — cubic-bezier(.25,.46,.45,.94)
- title: "Bebas Neue"; 30px/1 (mobile: current 20px, all-time 18px); letter-spacing 3px; #fff
- badge: inline-block; width fit-content; margin-top 4px; padding 2px 9px; radius 100px; 9px, weight 700, letter-spacing 1.5px, uppercase
- CTA: flex; align center; gap 8px; margin-top auto; padding-top 14px; "Bebas Neue" 16px; letter-spacing 3px; nowrap; arrow icon 15×15

### Current card (right, wider)
- flex 1.3 (mobile 1.4); padding 13px 22px 12px (mobile 6px 14px 7px); 288×122 at 1440
- background: linear-gradient(145deg, rgba(94,219,216,.28), rgba(31,201,138,.2)), rgba(5,13,13,.7); border: 1.5px solid rgba(94,219,216,.5)
- badge: #5edbd8 on rgba(94,219,216,.12), border rgba(94,219,216,.25); CTA #5edbd8

### All-Time card (left)
- flex 1 (mobile 1.1); padding 9px 16px 8px (mobile 9px 14px); position relative; overflow hidden; 220×122 at 1440
- background: linear-gradient(145deg, rgba(212,175,55,.28), rgba(245,200,66,.18)), rgba(13,12,5,.7); border: 1.5px solid rgba(212,175,55,.55)
- badge: 8px, nowrap, #d4af37 on rgba(212,175,55,.12), border rgba(212,175,55,.28); CTA #d4af37, relative left -6px (mobile -10px)

### Cross-link button
- display flex; flex-direction column; align-items center; justify-content center; gap 1px; width 100%; padding 3px 14px; border-radius 10px; 520×46 at 1440
- background: linear-gradient(145deg, rgba(249,115,22,.28), rgba(245,158,11,.2)), rgba(13,8,3,.7); border: 1px solid rgba(249,115,22,.55)
- wordmark: Impact; clamp(20px, 3.5vw, 28px)/1; weight 900; letter-spacing 1px; uppercase; #fff; accent #f97316
- sub: 8px; weight 700; letter-spacing 1.2px; uppercase; #fb923c

### Disclaimer (desktop only)
- 10px; weight 500; letter-spacing 1.8px; uppercase; color #2d6a4f; opacity .8

## States & Behaviors
### Entrance
- **State A:** opacity 0; transform translateY(16px) · **State B:** opacity 1; transform none

### Hover states
- **Current card:** transform translateY(-3px) scale(1.02); box-shadow 0 8px 28px rgba(94,219,216,.14), 0 0 0 1px rgba(94,219,216,.22)
- **All-Time card:** transform translateY(-2px) scale(1.01); box-shadow 0 8px 28px rgba(212,175,55,.16), 0 0 0 1px rgba(212,175,55,.28); border-color rgba(212,175,55,.65)
- **Cards :active:** scale(.98)
- **Cross-link:** gradient alphas → .38 / .28; border-color rgba(249,115,22,.9); transition background .18s, border-color .18s

## Per-State Content
- Current badge follows the selected position: "Current QBs", "Current RBs", "Current WRs", "Current TEs", "Current DBs"

## Assets
- ArrowRightIcon, BasketballIcon — original SVGs in `shared/icons.tsx`

## Text Content (verbatim)
- Cards: "All-Time" / "Draft the Greats" / "Start Drafting"; "Current" / "Current QBs" / "Start Drafting"
- Disclaimer: "Fan-made · Not affiliated with the NFL"
- Tagline and cross-link wordmark come from `siteBrand` (placeholder copy — the source's tagline claim and sister-brand name are not reused)

## Responsive Behavior
- **Desktop (1440px):** 520px column
- **Mobile (390px):** full width minus 20px gutters; cards 102px tall; cross-link 38px tall
- **Breakpoint:** 769px
