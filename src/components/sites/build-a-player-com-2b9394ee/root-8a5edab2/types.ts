export type PositionId = "QB" | "RB" | "WR" | "TE" | "DB";
export type VotePositionId = "LB" | "DL";
export type FigurePose = "qb" | "rb" | "wr" | "db";
export type TeamColorTrio = readonly [string, string, string];

export interface SiteBrand {
  name: string;
  description: string;
  wordmarkLead: string;
  wordmarkAccent: string;
  tagline: string;
  disclaimer: string;
  crossLink: {
    lead: string;
    accent: string;
    sub: string;
  };
}

export interface AttributeChip {
  label: string;
  color: string;
}

export interface ChipSlot {
  left: string;
  top: string;
  delayMs: number;
}

export interface PositionOption {
  id: PositionId;
  teamColors: TeamColorTrio;
  pose: FigurePose;
  allTimeAvailable: boolean;
  isNew?: boolean;
  chips: AttributeChip[];
  /** Horizontal overrides for chip slots, keyed by slot index. */
  slotLeftOverrides?: Partial<Record<number, string>>;
}

export interface VoteOption {
  id: VotePositionId;
  teamColors: TeamColorTrio;
  mockVotes: number;
}
