import { ArrowRight } from "lucide-react";
import type { PositionOption } from "./types";

export function ModeCards({ position }: { position: PositionOption }) {
  const allTimeSoon = !position.allTimeAvailable;

  return (
    <div className="flex w-full flex-row-reverse items-stretch gap-3">
      <button
        type="button"
        className="flex min-w-0 flex-[1.4] shrink cursor-pointer flex-col justify-between gap-1.5 overflow-hidden rounded-[18px] border-[1.5px] border-solid border-[rgba(94,219,216,.5)] bg-[rgba(5,13,13,.7)] bg-[image:linear-gradient(145deg,rgba(94,219,216,.28),rgba(31,201,138,.2))] px-3.5 pt-1.5 pb-[7px] text-left [transition:transform_.22s_cubic-bezier(.25,.46,.45,.94),box-shadow_.22s_cubic-bezier(.25,.46,.45,.94),border-color_.22s_cubic-bezier(.25,.46,.45,.94)] hover:[transform:translateY(-3px)_scale(1.02)] hover:shadow-[0_8px_28px_rgba(94,219,216,.14),0_0_0_1px_rgba(94,219,216,.22)] active:[transform:scale(.98)] splash:flex-[1.3] splash:overflow-visible splash:px-[22px] splash:pt-[13px] splash:pb-3"
      >
        <span className="block font-bebas text-xl leading-none tracking-[3px] text-white splash:text-[30px]">
          Current
        </span>
        <span className="mt-1 inline-block w-fit rounded-full border border-[rgba(94,219,216,.25)] bg-[rgba(94,219,216,.12)] px-[9px] py-0.5 font-[Arial] text-[9px] font-bold tracking-[1.5px] text-[#5edbd8] uppercase">
          Current {position.id}s
        </span>
        <span className="mt-auto flex items-center gap-2 pt-3.5 font-bebas text-base tracking-[3px] whitespace-nowrap text-[#5edbd8]">
          START DRAFTING
          <ArrowRight aria-hidden="true" strokeWidth={2.5} className="size-[15px]" />
        </span>
      </button>

      <button
        type="button"
        aria-disabled={allTimeSoon}
        className={
          allTimeSoon
            ? "relative flex min-w-0 flex-[1.1] shrink cursor-default flex-col justify-between gap-1.5 overflow-hidden rounded-[18px] border-[1.5px] border-solid border-[rgba(212,175,55,.55)] bg-[rgba(13,12,5,.7)] bg-[image:linear-gradient(145deg,rgba(212,175,55,.28),rgba(245,200,66,.18))] px-3.5 py-[9px] text-left before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[inherit] before:bg-black/55 before:content-[''] splash:flex-1 splash:px-4 splash:pt-[9px] splash:pb-2"
            : "relative flex min-w-0 flex-[1.1] shrink cursor-pointer flex-col justify-between gap-1.5 overflow-hidden rounded-[18px] border-[1.5px] border-solid border-[rgba(212,175,55,.55)] bg-[rgba(13,12,5,.7)] bg-[image:linear-gradient(145deg,rgba(212,175,55,.28),rgba(245,200,66,.18))] px-3.5 py-[9px] text-left [transition:transform_.22s_cubic-bezier(.25,.46,.45,.94),box-shadow_.22s_cubic-bezier(.25,.46,.45,.94),border-color_.22s_cubic-bezier(.25,.46,.45,.94)] hover:border-[rgba(212,175,55,.65)] hover:[transform:translateY(-2px)_scale(1.01)] hover:shadow-[0_8px_28px_rgba(212,175,55,.16),0_0_0_1px_rgba(212,175,55,.28)] active:[transform:scale(.98)] splash:flex-1 splash:px-4 splash:pt-[9px] splash:pb-2"
        }
      >
        {allTimeSoon && (
          <span className="absolute inset-x-0 top-1/2 z-[2] -translate-y-1/2 bg-[#a8892a] py-1.5 text-center font-impact text-sm tracking-[4px] text-white">
            COMING SOON
          </span>
        )}
        <span className="block font-bebas text-lg leading-none tracking-[3px] text-white splash:text-[30px]">
          All-Time
        </span>
        <span className="mt-1 inline-block w-fit rounded-full border border-[rgba(212,175,55,.28)] bg-[rgba(212,175,55,.12)] px-[9px] py-0.5 font-[Arial] text-[8px] font-bold tracking-[1.5px] whitespace-nowrap text-[#d4af37] uppercase">
          Draft the Greats
        </span>
        <span className="relative -left-2.5 mt-auto flex items-center gap-2 pt-3.5 font-bebas text-base tracking-[3px] whitespace-nowrap text-[#d4af37] splash:-left-1.5">
          START DRAFTING
          <ArrowRight aria-hidden="true" strokeWidth={2.5} className="size-[15px]" />
        </span>
      </button>
    </div>
  );
}
