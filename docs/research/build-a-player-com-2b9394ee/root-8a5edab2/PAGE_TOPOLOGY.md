# Page topology — build-a-player.com `/`

Output plan:

| Item | Value |
| --- | --- |
| Source URL | `https://build-a-player.com/` |
| App root | `.` |
| Site key | `build-a-player-com-2b9394ee` |
| Page key | `root-8a5edab2` |
| Route | `src/app/page.tsx` (replaces the untouched template scaffold) |
| Components | `src/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/` |
| Shared icons | `src/components/sites/build-a-player-com-2b9394ee/shared/icons.tsx` |
| Screenshots | `docs/design-references/build-a-player-com-2b9394ee/root-8a5edab2/` (`original-*` stay local, gitignored) |
| Assets | none downloaded — every graphic is an original inline SVG (see ANALYSIS.md) |
| Shared foundation changes | `src/app/layout.tsx` (fonts, metadata, dark body), `src/app/globals.css` (tokens + `splash` breakpoint at 769px) |

## Layout

A single, non-scrolling full-viewport screen (`position: fixed; inset: 0; overflow: hidden`). Desktop document
height equals the viewport (900px at 1440×900). There is no scroll container, no smooth-scroll library and no
scroll-driven behavior.

Z-order (back to front):

| z | Layer | Type |
| --- | --- | --- |
| 0 | Field lines — 7 horizontal 1px rules spread with `justify-content: space-evenly` | absolute overlay, static |
| 1 | Center glow — 500×500 radial gradient centered in the viewport | absolute overlay, static |
| 2 | Player figure (3:4 box) with a blurred ground glow | flow content |
| 3 | Footer: tagline, mode cards, basketball cross-link, disclaimer | flow content |
| 4 | Attribute chips — 8–9 pills scattered around the figure (hidden ≤768px) | absolute overlay |
| 10 | "The Depth Chart" floating button | absolute overlay |
| 10 | Mobile disclaimer bar (≤768px only) | absolute overlay |
| 20 | Header: logo mark, wordmark, position picker (its popup is z 200 inside it) | flow content |

## Sections, top to bottom

1. **Header** — logo mark (90px tall desktop), two-tone wordmark, position-picker trigger (avatar trio + position
   label + caret). Interaction: click-driven (picker popup).
2. **Player figure** — silhouette for the selected position, cross-fades on change. Interaction: state-driven by the
   picker.
3. **Attribute chips** — labels and colors depend on the selected position. Interaction: state-driven by the picker;
   entrance animation on load.
4. **Depth Chart button** — floats right of the figure. Interaction: hover.
5. **Footer** — tagline, two mode cards (row-reverse: "Current" on the right, wider), basketball cross-link button,
   disclaimer. Interaction: hover/active on every button.

## Desktop vs mobile

- Desktop (≥769px): content stacks from the top (`justify-content: flex-start; padding-top: 4vh`), chips visible.
- Mobile (≤768px): header is absolutely positioned near the top, the screen uses `justify-content: space-between`,
  chips hide, the disclaimer moves to a small bar at the very top, cards and type shrink, the picker trigger and
  popup render at `zoom: .82`.
