"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HelmetIcon } from "../shared/icons";
import { positions, voteOptions } from "./content";
import type { PositionId, TeamColorTrio, VotePositionId } from "./types";

function AvatarTrio({ colors, className }: { colors: TeamColorTrio; className?: string }) {
  return (
    <span className={cn("flex items-center", className)}>
      {colors.map((color, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full border-2 border-[rgba(10,10,12,.9)] leading-none shadow-[0_1px_4px_rgba(0,0,0,.5)]",
            i > 0 && "-ml-[12.8px]",
          )}
        >
          <span
            style={{ "--team-color": color } as CSSProperties}
            className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-(--team-color)"
          >
            <HelmetIcon className="size-6 text-white/85" />
          </span>
        </span>
      ))}
    </span>
  );
}

type PillKind = "alltime" | "current" | "alltime-soon" | "current-soon";

const pillStyles: Record<PillKind, string> = {
  alltime: "text-[#d4a017] before:bg-[#d4a017]",
  current: "text-[rgba(94,219,216,.85)] before:bg-[rgba(94,219,216,.85)]",
  "alltime-soon": "text-[rgba(180,140,30,.25)] before:bg-[rgba(180,140,30,.15)]",
  "current-soon": "text-[rgba(74,222,128,.55)] before:bg-[rgba(74,222,128,.15)]",
};

function ModePill({ kind, children }: { kind: PillKind; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-ui text-[8px] leading-none font-extrabold tracking-[.08em] uppercase before:block before:size-[5px] before:shrink-0 before:rounded-[1px] before:content-['']",
        pillStyles[kind],
      )}
    >
      {children}
    </span>
  );
}

function PositionName({ children }: { children: ReactNode }) {
  return (
    <span className="ml-auto font-impact-ui text-[30px] leading-none font-black tracking-[1px] text-white">
      {children}
    </span>
  );
}

function VoteResult({ pct, mine }: { pct: number; mine: boolean }) {
  // Start the fill at zero so the width transition plays on reveal.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={cn(
        "relative flex size-full items-center justify-center overflow-hidden rounded-b-[21px]",
        mine ? "bg-black/20" : "bg-black/35",
      )}
    >
      <span
        style={{ width: shown ? `${pct}%` : 0 }}
        className={cn(
          "absolute inset-y-0 left-0 [transition:width_.6s_ease]",
          mine ? "bg-[rgba(22,163,74,.5)]" : "bg-white/10",
        )}
      />
      <span
        className={cn(
          "relative z-[1] font-impact text-[22px] leading-none tracking-[1px]",
          mine ? "text-white" : "text-white/55",
        )}
      >
        {pct}%
      </span>
    </div>
  );
}

interface PositionPickerProps {
  selected: PositionId;
  onSelect: (id: PositionId) => void;
}

export function PositionPicker({ selected, onSelect }: PositionPickerProps) {
  const [open, setOpen] = useState(false);
  const [myVote, setMyVote] = useState<VotePositionId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption = positions.find((p) => p.id === selected) ?? positions[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const totalVotes = voteOptions.reduce(
    (sum, v) => sum + v.mockVotes + (myVote === v.id ? 1 : 0),
    0,
  );

  return (
    <div ref={rootRef} className="relative mt-1 inline-block">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2.5 border-none bg-transparent px-1 py-2 font-ui text-[15px] font-bold tracking-[.5px] whitespace-nowrap text-white outline-none [zoom:.82] splash:[zoom:1]"
      >
        <AvatarTrio colors={selectedOption.teamColors} className="shrink-0" />
        <span className="font-impact-ui text-[28px] leading-none font-black tracking-[1px]">
          {selected}
        </span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={3}
          className={cn(
            "size-[11px] shrink-0 opacity-70 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        role="dialog"
        aria-label="Choose a position"
        className={cn(
          "absolute top-full left-1/2 z-[200] w-[min(460px,calc(100vw_-_24px))] origin-top rounded-[30px] border border-white/12 bg-[rgba(10,10,14,.94)] p-4 text-left shadow-[0_24px_64px_rgba(0,0,0,.85)] backdrop-blur-[24px] [transition:opacity_.18s_ease,transform_.18s_ease] [zoom:.82] splash:w-[clamp(340px,42vw,520px)] splash:[zoom:1.08]",
          open
            ? "pointer-events-auto opacity-100 [transform:translate(-50%)_scale(1)]"
            : "pointer-events-none opacity-0 [transform:translate(-50%)_scale(.95)]",
        )}
      >
        <div className="grid grid-cols-2 gap-3">
          {positions.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === selected}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onSelect(p.id);
                setOpen(false);
              }}
              className={cn(
                "relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-[22px] border px-[17px] pt-4 pb-[15px] text-left outline-none [transition:background_.14s,border-color_.14s] hover:border-white/20 hover:bg-white/10 active:scale-[.97]",
                p.id === selected
                  ? "border-[rgba(94,219,216,.52)] bg-[rgba(94,219,216,.14)]"
                  : "border-white/8 bg-white/5",
              )}
            >
              {p.isNew && (
                <span className="absolute top-2 right-[7px] z-[3] rounded-[3px] bg-[#f59e0b] px-[5px] py-px font-impact text-[9px] leading-[1.5] tracking-[1.5px] text-[#111]">
                  NEW
                </span>
              )}
              <span className="flex items-center justify-between gap-1.5">
                <AvatarTrio colors={p.teamColors} />
                <PositionName>{p.id}</PositionName>
              </span>
              <span className="flex items-center gap-2.5">
                <ModePill kind={p.allTimeAvailable ? "alltime" : "alltime-soon"}>All‑Time</ModePill>
                <ModePill kind="current">Current</ModePill>
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-1 pt-2.5 pb-1">
          <span className="h-px flex-1 bg-white/12" />
          <span className="font-impact text-[9px] tracking-[2px] whitespace-nowrap text-white/35">
            VOTE FOR NEXT MODE
          </span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {voteOptions.map((v) => {
            const votes = v.mockVotes + (myVote === v.id ? 1 : 0);
            return (
              <div
                key={v.id}
                className="relative flex cursor-not-allowed flex-col gap-2 overflow-hidden rounded-[22px] border border-white/8 bg-white/5 px-[17px] pt-4 pb-[60px]"
              >
                <span className="absolute inset-x-0 top-0 bottom-11 z-[2] flex items-start justify-center rounded-t-[22px] bg-black/50 pt-[7px] font-impact text-[11px] tracking-[2.5px] text-white/50">
                  COMING SOON
                </span>
                <span className="flex items-center justify-between gap-1.5">
                  <AvatarTrio colors={v.teamColors} className="opacity-45" />
                  <PositionName>{v.id}</PositionName>
                </span>
                <span className="flex items-center gap-2.5 opacity-80">
                  <ModePill kind="alltime-soon">All‑Time</ModePill>
                  <ModePill kind="current-soon">Current</ModePill>
                </span>
                <div className="absolute inset-x-0 bottom-0 z-[3] h-12">
                  {myVote ? (
                    <VoteResult
                      pct={Math.round((votes / totalVotes) * 100)}
                      mine={myVote === v.id}
                    />
                  ) : (
                    <button
                      type="button"
                      tabIndex={open ? 0 : -1}
                      onClick={() => setMyVote(v.id)}
                      className="size-full cursor-pointer rounded-b-[21px] bg-[#16a34a] font-impact text-[11px] tracking-[2px] text-white uppercase transition-colors duration-150 hover:bg-[#15803d]"
                    >
                      Vote
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
