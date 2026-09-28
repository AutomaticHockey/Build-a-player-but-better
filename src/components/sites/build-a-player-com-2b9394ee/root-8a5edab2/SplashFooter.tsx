import { BasketballIcon } from "../shared/icons";
import { siteBrand } from "./content";
import { ModeCards } from "./ModeCards";
import type { PositionOption } from "./types";

export function SplashFooter({ position }: { position: PositionOption }) {
  return (
    <footer className="relative z-[3] mb-[83px] flex w-full flex-col items-center gap-1.5 px-5 text-center opacity-0 [transform:translateY(16px)] [transition:opacity_.55s_ease_800ms,transform_.55s_cubic-bezier(.22,1,.36,1)_800ms] group-data-[entered=true]/splash:opacity-100 group-data-[entered=true]/splash:[transform:none] splash:-top-[15px] splash:mt-[5px] splash:mb-0 splash:w-[clamp(340px,42vw,520px)] splash:items-stretch splash:px-0">
      <p className="relative top-[5px] mb-px inline-flex items-center gap-1.5 self-center font-bebas text-base font-extrabold tracking-[2.5px] whitespace-nowrap text-[#95d5b2] uppercase opacity-95 splash:text-2xl">
        <span className="size-1.5 shrink-0 rounded-full bg-[#22c55e]" />
        {siteBrand.tagline}
      </p>

      <ModeCards position={position} />

      <button
        type="button"
        className="flex w-full cursor-pointer flex-col items-center justify-center gap-px rounded-[10px] border border-[rgba(249,115,22,.55)] bg-[rgba(13,8,3,.7)] bg-[image:linear-gradient(145deg,rgba(249,115,22,.28),rgba(245,158,11,.2))] px-3.5 py-[3px] [transition:background_.18s,border-color_.18s] hover:border-[rgba(249,115,22,.9)] hover:bg-[image:linear-gradient(145deg,rgba(249,115,22,.38),rgba(245,158,11,.28))]"
      >
        <span className="flex items-center gap-[.2em] font-impact text-[clamp(20px,3.5vw,28px)] leading-none font-black tracking-[1px] text-white uppercase">
          <BasketballIcon className="h-[.8em] w-auto" />
          {siteBrand.crossLink.lead}
          <em className="text-[#f97316] not-italic">{siteBrand.crossLink.accent}</em>
        </span>
        <span className="font-[Arial] text-[8px] font-bold tracking-[1.2px] text-[#fb923c] uppercase">
          {siteBrand.crossLink.sub}
        </span>
      </button>

      <p className="hidden text-[10px] font-medium tracking-[1.8px] text-[#2d6a4f] uppercase opacity-80 splash:block">
        {siteBrand.disclaimer}
      </p>
    </footer>
  );
}
