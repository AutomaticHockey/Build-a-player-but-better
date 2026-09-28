# SplashHeader Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/SplashHeader.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`
- **Interaction model:** time-driven entrance; hosts the click-driven PositionPicker

## DOM Structure
```
div.header
├─ LogoMark (svg)
├─ div.wordmark  "<lead><em>accent</em>"
└─ div.picker-wrap → PositionPicker
```

## Computed Styles (exact values from getComputedStyle)

### Header
- position: relative; z-index: 20; text-align: center
- desktop: top: -20px; margin-bottom: -20px
- mobile: position: absolute; top: calc(6vh - 30px); left: 0; right: 0
- transition: opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1); delay 100ms

### Logo mark
- display: block; height: clamp(48px, 8.5vw, 90px); width: auto; margin: 0 auto 4px
- 90px tall at 1440, 48px at 390

### Wordmark
- font-family: Impact, "Arial Narrow Bold", sans-serif; font-weight: 900; text-transform: uppercase; color: #fff
- font-size: clamp(24px, 5vw, 42px); line-height: .88 (36.96px at 42px); letter-spacing: -1.2px; margin-top: 2px
- text-shadow: 0 2px 60px rgba(149,213,178,.1)
- em: font-style normal; color: #95d5b2; letter-spacing: -1.6px

### Picker wrap
- display: flex; width: fit-content; margin: 10px auto 0 (mobile margin-top 4px); desktop: position relative; top: -10px
- transition: opacity .4s, transform .4s

## States & Behaviors
### Entrance
- **Trigger:** screen `entered`
- **State A:** opacity 0; transform translateY(-28px)
- **State B:** opacity 1; transform none
- **Transition:** see Header
- **Implementation approach:** named-group data variant

## Per-State Content
N/A

## Assets
- LogoMark — **original** inline SVG crest (not the source site's logo artwork), from `shared/icons.tsx`

## Text Content (verbatim)
- Wordmark comes from `siteBrand` in `content.ts` (placeholder brand — the source site's name/logo are not reused)

## Responsive Behavior
- **Desktop (1440px):** 90px mark, 42px wordmark, in flow
- **Mobile (390px):** 48px mark, 24px wordmark, absolutely positioned at top
- **Breakpoint:** 769px
