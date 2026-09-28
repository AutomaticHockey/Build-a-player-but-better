import type {
  AttributeChip,
  ChipSlot,
  PositionOption,
  SiteBrand,
  VoteOption,
} from "./types";

/**
 * Placeholder brand. The layout mirrors build-a-player.com, but its name, logo and
 * copy belong to that site, so every user-facing brand string lives here to swap.
 */
export const siteBrand: SiteBrand = {
  name: "Player Lab",
  description:
    "Spin the wheel, draft traits and build your own football player.",
  wordmarkLead: "Player",
  wordmarkAccent: "Lab",
  tagline: "Draft Traits · Build Your Player",
  disclaimer: "Fan-made · Not affiliated with the NFL",
  crossLink: {
    lead: "Hoops",
    accent: "Lab",
    sub: "Basketball builder",
  },
};

const chipColors = {
  red: "#f87171",
  blue: "#60a5fa",
  orange: "#fb923c",
  violet: "#a78bfa",
  emerald: "#34d399",
  fuchsia: "#e879f9",
  amber: "#fbbf24",
  teal: "#2dd4bf",
  sky: "#38bdf8",
} as const;

type ChipColorName = keyof typeof chipColors;

function chips(...entries: [string, ChipColorName][]): AttributeChip[] {
  return entries.map(([label, color]) => ({ label, color: chipColors[color] }));
}

/** Chip anchor points as a share of the screen, measured at 1440×900. */
export const chipSlots: ChipSlot[] = [
  { left: "79.41%", top: "29.83%", delayMs: 335 },
  { left: "70.28%", top: "73.56%", delayMs: 355 },
  { left: "83.63%", top: "55.95%", delayMs: 315 },
  { left: "19.14%", top: "32.28%", delayMs: 510 },
  { left: "27.27%", top: "24.1%", delayMs: 430 },
  { left: "71.72%", top: "15.57%", delayMs: 370 },
  { left: "29.18%", top: "79.2%", delayMs: 400 },
  { left: "17.28%", top: "59.72%", delayMs: 460 },
  { left: "74.94%", top: "78.96%", delayMs: 380 },
];

export const positions: PositionOption[] = [
  {
    id: "QB",
    teamColors: ["#fb4f14", "#00338d", "#241773"],
    pose: "qb",
    allTimeAvailable: true,
    slotLeftOverrides: { 1: "75.84%", 6: "23.63%" },
    chips: chips(
      ["Arm", "red"],
      ["Legs", "blue"],
      ["Build", "orange"],
      ["Processing", "violet"],
      ["Accuracy/Touch", "emerald"],
      ["Leadership", "fuchsia"],
      ["Playmaking/Creativity", "amber"],
      ["Pocket Presence", "teal"],
      ["Vision", "sky"],
    ),
  },
  {
    id: "RB",
    teamColors: ["#241773", "#a71930", "#0076b6"],
    pose: "rb",
    allTimeAvailable: true,
    chips: chips(
      ["Long Speed", "red"],
      ["Burst", "blue"],
      ["Strength", "amber"],
      ["Size", "orange"],
      ["Contact Balance", "teal"],
      ["Hands", "emerald"],
      ["Vision", "sky"],
      ["Elusiveness", "violet"],
    ),
  },
  {
    id: "WR",
    teamColors: ["#4f2683", "#003594", "#69be28"],
    pose: "wr",
    allTimeAvailable: true,
    chips: chips(
      ["Speed", "red"],
      ["Body Control", "blue"],
      ["Vertical", "emerald"],
      ["Size", "orange"],
      ["Route Running", "teal"],
      ["Release", "fuchsia"],
      ["Hands", "amber"],
      ["Awareness", "violet"],
      ["After Catch", "sky"],
    ),
  },
  {
    id: "TE",
    teamColors: ["#a5acaf", "#aa0000", "#97233f"],
    pose: "wr",
    allTimeAvailable: false,
    chips: chips(
      ["Speed", "red"],
      ["Blocking", "blue"],
      ["Vertical", "emerald"],
      ["Size", "orange"],
      ["Route Running", "teal"],
      ["Strength", "fuchsia"],
      ["Hands", "amber"],
      ["Awareness", "violet"],
      ["After Catch", "sky"],
    ),
  },
  {
    id: "DB",
    teamColors: ["#fb4f14", "#0c2340", "#241773"],
    pose: "db",
    allTimeAvailable: false,
    isNew: true,
    chips: chips(
      ["Speed", "red"],
      ["Size", "orange"],
      ["Fluidity", "blue"],
      ["Press", "teal"],
      ["Ball Skills", "emerald"],
      ["Zone IQ", "fuchsia"],
      ["Man Coverage", "violet"],
      ["Play Recognition", "sky"],
      ["Run Support", "amber"],
    ),
  },
];

/** Upcoming positions shown in the picker's vote section, with mock tallies. */
export const voteOptions: VoteOption[] = [
  { id: "LB", teamColors: ["#aa0000", "#241773", "#0076b6"], mockVotes: 1240 },
  { id: "DL", teamColors: ["#003594", "#000000", "#03202f"], mockVotes: 910 },
];
