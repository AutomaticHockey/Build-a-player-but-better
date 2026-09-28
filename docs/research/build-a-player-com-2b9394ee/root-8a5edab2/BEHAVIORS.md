# Behaviors — build-a-player.com `/`

Measured in headless Chromium by sampling computed styles over time and after each interaction.

## Scroll sweep

No scrolling: the page is a fixed full-viewport screen (`overflow: hidden`). No smooth-scroll library, no
scroll-snap, no sticky elements, no scroll-triggered changes.

## Load (entrance) sequence — time-driven, JS-staged

The screen mounts at `opacity: 0` and gains a `splash-in` class right after mount (`transition: opacity .4s ease`).
Each group starts hidden and transitions to its resting state; the original stages them with timers. Sampled values:

| Element | Hidden state | Resting state | Transition | Observed start |
| --- | --- | --- | --- | --- |
| Header | `opacity 0; translateY(-28px)` | `opacity 1; none` | `.55s cubic-bezier(.22,1,.36,1)` | ~0.1s |
| Figure | `opacity 0; translateY(40px) scale(.92)` | `opacity 1; none` | `.65s cubic-bezier(.22,1,.36,1)` | ~0.4s |
| Center glow | `opacity 0` | `opacity 1` | `.8s ease` | ~0.4s |
| Footer | `opacity 0; translateY(16px)` | `opacity 1; none` | `.55s cubic-bezier(.22,1,.36,1)` | ~0.8s |
| Depth Chart button | `opacity 0; translateY(calc(-50% + 10px)) scale(.8)` | `opacity 1; translateY(-50%) scale(1)` | `opacity .4s, transform .4s` | ~0.9s |
| Attribute chips | `opacity 0; translate(-50%,-50%) scale(.6)` | `opacity 1; translate(-50%,-50%) scale(1)` | `opacity .5s ease, transform .55s cubic-bezier(.22,1,.36,1)` with per-chip delays .315s–.51s | ~0.6s + delay |
| Field lines (7) | `opacity 0` | `opacity 1` | `.5s ease`, delays `.6s + i × .06s` | ~0.6s |

## Click sweep

| Element | Result |
| --- | --- |
| Position trigger | Toggles the picker popup. Caret rotates 180° (`transition: transform .2s`). Popup animates `opacity 0→1`, `scale(.95)→scale(1)` over `.18s ease`, `transform-origin: top center`. |
| Popup option (QB/RB/WR/TE/DB) | Selects the position and closes the popup. Trigger label, avatar trio, figure, chips and the Current card badge ("Current QBs" → "Current RBs") all switch. Active option: `background rgba(94,219,216,.14)`, `border rgba(94,219,216,.52)`. `:active` → `scale(.97)`. |
| Click outside the popup | Closes it. |
| LB / DL "VOTE" buttons | Records a vote; the button is replaced by a result bar (`fill` width animates `.6s ease`, big percentage). Disabled options are not selectable (`cursor: not-allowed`). |
| Mode cards / Depth Chart / basketball button | Navigate into game flows on the original. Out of scope for this clone (no-op buttons). |

## Hover sweep (pointer devices only)

| Element | Change | Transition |
| --- | --- | --- |
| Current card | `translateY(-3px) scale(1.02)`, `box-shadow: 0 8px 28px rgba(94,219,216,.14), 0 0 0 1px rgba(94,219,216,.22)` | `.22s cubic-bezier(.25,.46,.45,.94)` on transform, box-shadow, border-color |
| All-Time card | `translateY(-2px) scale(1.01)`, `box-shadow: 0 8px 28px rgba(212,175,55,.16), 0 0 0 1px rgba(212,175,55,.28)`, `border-color: rgba(212,175,55,.65)` | same |
| Either card `:active` | `scale(.98)` | same |
| Basketball button | gradient alphas .28/.20 → .38/.28, `border-color rgba(249,115,22,.9)` | `.18s` background, border-color |
| Depth Chart button | `background rgba(229,57,53,.28)`, `border-color rgba(229,57,53,.8)` | `.18s` |
| Popup option (enabled) | `background rgba(255,255,255,.1)`, `border-color rgba(255,255,255,.2)` | `.14s` |
| Vote button | `#16a34a → #15803d` | `.15s` |

Touch devices get no hover transforms (the original adds `html.is-touch` overrides; Tailwind v4's `hover:` variant
only applies under `(hover: hover)`, which matches).

## Position → content

| Position | Chips (slot order 1–9) | Figure | All-Time mode |
| --- | --- | --- | --- |
| QB | Arm, Legs, Build, Processing, Accuracy/Touch, Leadership, Playmaking/Creativity, Pocket Presence, Vision | QB | available |
| RB | Long Speed, Burst, Strength, Size, Contact Balance, Hands, Vision, Elusiveness (8) | RB | available |
| WR | Speed, Body Control, Vertical, Size, Route Running, Release, Hands, Awareness, After Catch | WR (scale 1.18) | available |
| TE | Speed, Blocking, Vertical, Size, Route Running, Strength, Hands, Awareness, After Catch | WR (scale 1.18) | coming soon (pill dimmed in popup) |
| DB | Speed, Size, Fluidity, Press, Ball Skills, Zone IQ, Man Coverage, Play Recognition, Run Support | DB (scale 1.05) | coming soon (pill dimmed in popup) |

Chip colors cycle through a fixed 9-color palette (see the chips spec). LB and DL appear only in the popup's vote
section as "Coming soon".

## Responsive sweep

| Width | Behavior |
| --- | --- |
| 1440 | Full layout, chips visible, footer 520px wide (`clamp(340px, 42vw, 520px)`) |
| 768 | Mobile rules apply (`max-width: 768px`): chips hidden, top disclaimer bar, header absolutely positioned, smaller cards |
| 390 | Same as 768 with fluid sizes: logo 48px tall, wordmark 24px, figure `clamp(160px, 44vw, 260px)` wide, footer full width with 20px side padding |

Breakpoint: 768/769px.
