# AttributeChips Specification

## Overview
- **Target file:** `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/AttributeChips.tsx`
- **Screenshot:** `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/original-desktop-1440.png`, `original-desktop-rb-selected.png`
- **Interaction model:** time-driven entrance; content switches with the selected position (state-driven, instant)

## DOM Structure
Up to 9 absolutely positioned pills; each = dot span + uppercase label.

## Computed Styles (exact values from getComputedStyle)

### Chip
- position: absolute; z-index: 4; pointer-events: none; white-space: nowrap
- left/top: slot position (percent of the screen); transform: translate(-50%, -50%) scale(1)
- display: flex; align-items: center; gap: 5px; padding: 5px 11px; height: 22px
- border: 1px solid <chip color>; border-radius: 100px; background: rgba(8,11,9,.96)
- font-family: "SF Mono", ui-monospace, "Cascadia Code", monospace; font-size: 9px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: <chip color>
- hidden: display none at ≤768px

### Dot
- 5×5px, border-radius: 50%, background: <chip color>, flex-shrink: 0

### Slot positions (percent of screen; measured at 1440×900)
| Slot | left | top | delay |
| --- | --- | --- | --- |
| 1 | 79.41% | 29.83% | .335s |
| 2 | 75.84% (QB) / 70.28% (others) | 73.56% | .355s |
| 3 | 83.63% | 55.95% | .315s |
| 4 | 19.14% | 32.28% | .51s |
| 5 | 27.27% | 24.10% | .43s |
| 6 | 71.72% | 15.57% | .37s |
| 7 | 23.63% (QB) / 29.18% (others) | 79.20% | .40s |
| 8 | 17.28% | 59.72% | .46s |
| 9 | 74.94% | 78.96% | .38s |

### Palette
red #f87171, blue #60a5fa, orange #fb923c, violet #a78bfa, emerald #34d399, fuchsia #e879f9, amber #fbbf24, teal #2dd4bf, sky #38bdf8

## States & Behaviors
### Entrance
- **Trigger:** screen `entered`
- **State A:** opacity 0; transform translate(-50%,-50%) scale(.6)
- **State B:** opacity 1; transform translate(-50%,-50%) scale(1)
- **Transition:** opacity .5s ease, transform .55s cubic-bezier(.22,1,.36,1); delay 600ms + slot delay
- **Implementation approach:** named-group data variant, per-chip CSS variables for color/position/delay

## Per-State Content
| Position | Slot 1…9 (label/color) |
| --- | --- |
| QB | Arm/red, Legs/blue, Build/orange, Processing/violet, Accuracy/Touch/emerald, Leadership/fuchsia, Playmaking/Creativity/amber, Pocket Presence/teal, Vision/sky |
| RB | Long Speed/red, Burst/blue, Strength/amber, Size/orange, Contact Balance/teal, Hands/emerald, Vision/sky, Elusiveness/violet |
| WR | Speed/red, Body Control/blue, Vertical/emerald, Size/orange, Route Running/teal, Release/fuchsia, Hands/amber, Awareness/violet, After Catch/sky |
| TE | Speed/red, Blocking/blue, Vertical/emerald, Size/orange, Route Running/teal, Strength/fuchsia, Hands/amber, Awareness/violet, After Catch/sky |
| DB | Speed/red, Size/orange, Fluidity/blue, Press/teal, Ball Skills/emerald, Zone IQ/fuchsia, Man Coverage/violet, Play Recognition/sky, Run Support/amber |

## Assets
None.

## Text Content (verbatim)
See Per-State Content (rendered uppercase via CSS).

## Responsive Behavior
- **Desktop (1440px):** visible, positions scale with the viewport (percent)
- **Mobile (390px):** hidden
- **Breakpoint:** 769px
