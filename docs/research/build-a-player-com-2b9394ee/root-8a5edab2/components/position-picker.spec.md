# PositionPicker Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/PositionPicker.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-picker-open.png`, `original-mobile-picker-open.png`
- **Interaction model:** click-driven (toggle popup, select option, vote); outside click closes

## DOM Structure
```
div.picker (relative, inline-block, mt 4px)
├─ button.trigger → AvatarTrio(selected) + span.label + CaretIcon
└─ div.popup (absolute)
   ├─ div.grid → button.option ×5 (QB RB WR TE DB)
   ├─ div.vote-header → rule · "VOTE FOR NEXT MODE" · rule
   └─ div.grid → div.option--disabled ×2 (LB DL) with soon banner + vote button/result
```

## Computed Styles (exact values from getComputedStyle)

### Trigger
- display: flex; align-items: center; gap: 10px; padding: 8px 4px; background: none; border: none; color: #fff; white-space: nowrap
- font: 700 15px system-ui; letter-spacing: .5px; mobile zoom: .82 (154×48 at 390)
- label: Impact, system-ui; 28px/1; weight 900; letter-spacing 1px
- caret: 11×11 chevron, opacity .7; rotates 180° when open (transition transform .2s)

### Avatar trio (trigger and options)
- display: flex; align-items: center; items overlap with margin-left -12.8px (first 0)
- item: 44×44 circle, border 2px solid rgba(10,10,12,.9), box-shadow 0 1px 4px rgba(0,0,0,.5)
- inner: 40×40 circle filled with a team color; **original** helmet glyph in white (the source shows player photos — not reused)

### Popup
- position: absolute; top: 100%; left: 50%; z-index: 200; transform-origin: top center
- width: clamp(340px, 42vw, 520px); padding: 16px; border-radius: 30px
- background: rgba(10,10,14,.94); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,.12)
- box-shadow: 0 24px 64px rgba(0,0,0,.85)
- desktop zoom: 1.08; mobile zoom: .82 and width: min(460px, calc(100vw - 24px))
- closed: opacity 0; transform translate(-50%) scale(.95); pointer-events none
- open: opacity 1; transform translate(-50%) scale(1); pointer-events auto; transition opacity .18s ease, transform .18s ease

### Grid
- display: grid; grid-template-columns: 1fr 1fr; gap: 12px

### Option
- position: relative; display: flex; flex-direction: column; gap: 8px; overflow: hidden; text-align: left
- background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); border-radius: 22px; padding: 16px 17px 15px
- transition: background .14s, border-color .14s
- top row: flex, align center, justify space-between, gap 6px; name: Impact 30px/1, weight 900, letter-spacing 1px, #fff, margin-left auto
- modes row: flex, align center, gap 10px
- mode pill: system-ui 8px/1, weight 800, letter-spacing .08em, uppercase; ::before 5×5 square radius 1px
  - all-time: #d4a017 (dot same) · current: rgba(94,219,216,.85) · all-time soon: rgba(180,140,30,.25) (dot rgba(180,140,30,.15)) · current soon: rgba(74,222,128,.55) (dot rgba(74,222,128,.15))
- NEW tag (DB): absolute top 8px right 7px; padding 1px 5px; Impact 9px; letter-spacing 1.5px; line-height 1.5; color #111; background #f59e0b; radius 3px; z 3

### Vote section
- header: flex, align center, gap 8px, padding 10px 4px 4px; rules flex 1, 1px, rgba(255,255,255,.12); label Impact 9px, letter-spacing 2px, rgba(255,255,255,.35)
- disabled option: padding-bottom 60px; cursor not-allowed; trio opacity .45; modes opacity .8
- soon banner: absolute top/left/right 0, bottom 44px; flex start/center; padding-top 7px; Impact 11px, letter-spacing 2.5px, rgba(255,255,255,.5); background rgba(0,0,0,.5); radius 22px 22px 0 0; z 2
- vote area: absolute bottom 0, left/right 0, height 48px, z 3
- vote button: Impact 11px, letter-spacing 2px, uppercase, #fff on #16a34a, radius 0 0 21px 21px, full size; transition background .15s
- result: background rgba(0,0,0,.35) (own vote rgba(0,0,0,.2)); fill bar rgba(255,255,255,.1) (own vote rgba(22,163,74,.5)), width transition .6s ease; percentage Impact 22px/1, letter-spacing 1px, rgba(255,255,255,.55) (own vote #fff)

## States & Behaviors
### Open / close
- **Trigger:** click trigger (toggle), click an option (select + close), pointerdown outside (close), Escape (close)
- **State A (closed) / State B (open):** see Popup
- **Implementation approach:** React state + document listener

### Hover states
- **Enabled option:** background rgba(255,255,255,.1), border rgba(255,255,255,.2); `:active` scale(.97)
- **Active option:** background rgba(94,219,216,.14), border rgba(94,219,216,.52)
- **Vote button:** #16a34a → #15803d

## Per-State Content
| Option | Team colors (trio) | Pills |
| --- | --- | --- |
| QB | #fb4f14 #00338d #241773 | all-time, current |
| RB | #241773 #a71930 #0076b6 | all-time, current |
| WR | #4f2683 #003594 #69be28 | all-time, current |
| TE | #a5acaf #aa0000 #97233f | all-time soon, current |
| DB (NEW) | #fb4f14 #0c2340 #241773 | all-time soon, current |
| LB (vote) | #aa0000 #241773 #0076b6 | all-time soon, current soon |
| DL (vote) | #003594 #000000 #03202f | all-time soon, current soon |

## Assets
- CaretIcon, HelmetIcon — original SVGs in `shared/icons.tsx`

## Text Content (verbatim)
"VOTE FOR NEXT MODE", "COMING SOON", "VOTE", "NEW", "All‑Time", "Current", position codes

## Responsive Behavior
- **Desktop (1440px):** popup 520px wide × zoom 1.08
- **Mobile (390px):** trigger and popup zoom .82; popup width min(460px, 100vw − 24px)
- **Breakpoint:** 769px
