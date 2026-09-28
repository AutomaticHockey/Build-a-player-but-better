# build-a-player.com — APIs, MCPs and datasets

Captured 2026-09-28 from the live site: static analysis of the shipped HTML/JS/CSS bundles plus a
headless-Chromium network capture of the landing page at 1440px and 390px.

## Summary

| Question | Answer |
| --- | --- |
| Framework | Vite + React single-page app (`<div id="root">` + hashed bundles), served from Cloudflare (Pages) |
| Routes | `/` (NFL builder, "Build-A-Player") and `/bucket` (NBA builder, "Build-A-Bucket") |
| Backend | Supabase (auth + Postgres via PostgREST + Realtime) and a small Railway-hosted API for Stripe billing |
| Player data | Bundled into the JS as static modules — no sports-stats API is called at runtime |
| Player images | Headshots keyed by Sleeper and ESPN player IDs, re-hosted as `.webp` in the author's GitHub repo and served through jsDelivr |
| MCPs | None (see below) |
| Third parties on first load | ~70 hosts, ~40 of them ad-tech; ~40 localStorage keys written by ad/ID vendors |

## First-party backend

### Supabase (`<project>.supabase.co`)

The browser talks to Supabase directly with the public anon key, so row-level security is what protects the data.

- **Auth:** email + password (`signUp`, `signInWithPassword`, `signOut`, `updateUser`, `getSession`, `onAuthStateChange`).
- **Realtime:** a presence channel named `online` (live "players online" count). Opens a websocket on page load.
- **Tables used by the app (PostgREST):**

| Table / RPC | Used for | Operations seen in the bundle |
| --- | --- | --- |
| `simulations` | Season-sim results and the all-time leaderboard (`user_id, username, wins, losses, champion, ovr, ppg`) | select, insert |
| `vs_results` | Head-to-head results, including forfeits | select, insert |
| `accounts` | Per-user flags and counters (`ads_disabled`, `subscription_status`, `classic_mvps`, `alltime_mvps`, `classic_opoys`, `alltime_opoys`) | select, insert, update |
| `salary_cap_grids` | The daily salary-cap puzzle grid | select |
| `salary_cap_plays`, `salary_infinite_plays` | Scores for the salary-cap modes (`picks, overall_score, ppg, apg, rpg, budget_used`) | select, insert |
| `mode_votes` + RPC `increment_mode_vote` | The "Vote for next mode" (LB / DL) poll on the landing page | select, rpc |
| `analytics_events` | First-party event log (`event, app, position, game_mode, user_id, meta`) | insert |

On the landing page itself only two backend requests happen: `GET /rest/v1/mode_votes?select=position,count`
and the Realtime websocket.

### Railway API (`build-a-player-production.up.railway.app`)

- `POST /api/create-checkout` — creates a Stripe Checkout session (ad-free subscription).
- `POST /api/create-portal` — opens the Stripe customer portal.

## Datasets (bundled, static)

All player content ships inside the JS bundle as separate chunks that load up front:

| Chunk | Size | Contents |
| --- | --- | --- |
| `data-qbs` | 35 KB | NFL teams (name, abbreviation, two brand colors, `/logos/XXX.png`), QB list with height/weight, attribute definitions |
| `data-wrs` | 34 KB | WR attribute list, attribute weights and the overall-rating formula |
| `data-dcp` | 167 KB | RB / TE / DB rosters with per-attribute ratings, jersey numbers, starter/captain flags, per-team offense/defense ratings |
| `data-nba` | 143 KB | NBA teams plus current and all-time player pools (height, weight, years, attribute ratings such as jump shot, finishing, rebounding) |
| `data-headshots` | 21 KB | Player name to image ID. Numeric IDs match Sleeper player IDs; `espn_…` IDs are ESPN athlete IDs |

Observations:

- The attribute ratings look hand-curated by the site author (editorial judgments on a small integer scale), not
  pulled from a stats provider. Heights, weights, teams and colors are public facts.
- Headshot photos are owned by the leagues / ESPN / Sleeper. They are served from
  `cdn.jsdelivr.net/gh/<author>/build-a-player@main/public/headshots/<id>.webp`, i.e. a public GitHub repo with no
  license file (all rights reserved by default).
- Team logos are loaded from `/logos/<TEAM>.png` on the site (league trademarks).

## Third parties

- **Ads (Playwire RAMP)**, which fans out to Prebid header bidding, Google Ad Manager, Amazon APS, Criteo, OpenX,
  Yahoo ConnectID, ID5, Lotame, Eyeota, Optable, Audigent/Hadron, LiveRamp, Carbon, Duration Media, RTB House and
  PubCommon ID, plus Google Funding Choices for consent.
- **Analytics:** Google Analytics 4 (the site's property plus Playwire's), Cloudflare Web Analytics, Cloudflare bot
  challenge script, and the first-party `analytics_events` table.
- **Fonts:** Google Fonts stylesheet with Anton, Audiowide, Bebas Neue, Freshman, Inter, Orbitron and Outfit. The
  landing screen only renders Outfit and Bebas Neue; headings use the system `Impact` stack.
- **Other:** Impact affiliate site-verification meta tag; links to X, Discord, share intents (X, Reddit, Facebook) and
  a sister game (32-0game.com).

## MCPs

None. MCP (Model Context Protocol) is how AI agents connect to tools and data sources. A browser-side website has
no reason to use it, and nothing in the bundles or the captured traffic references it.

## What the clone in this repo does with all this

- Runs entirely on local mock data; it never calls the site's Supabase project, Railway/Stripe API, ad stack or
  analytics.
- Does not copy the bundled datasets, JS code, logos or headshot photos. The logo mark, player figures and avatars
  are original placeholders; the layout, spacing, colors and interactions follow the measured values in
  `root-8a5edab2/`.
- If you want real player data for your own version, pick a source and check its terms first: for example nflverse
  (open NFL data), Sleeper's public read-only API (player metadata) or balldontlie (NBA). For headshots, license
  them or keep generated avatars.
