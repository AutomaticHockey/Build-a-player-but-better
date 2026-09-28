import { LogoMarkIcon } from "../shared/icons";
import { siteBrand } from "./content";
import { PositionPicker } from "./PositionPicker";
import type { PositionId } from "./types";

interface SplashHeaderProps {
  selected: PositionId;
  onSelect: (id: PositionId) => void;
}

export function SplashHeader({ selected, onSelect }: SplashHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-[calc(6vh_-_30px)] z-20 text-center opacity-0 [transform:translateY(-28px)] [transition:opacity_.55s_ease_100ms,transform_.55s_cubic-bezier(.22,1,.36,1)_100ms] group-data-[entered=true]/splash:opacity-100 group-data-[entered=true]/splash:[transform:none] splash:relative splash:inset-x-auto splash:-top-5 splash:-mb-5">
      <LogoMarkIcon className="mx-auto mb-1 block h-[clamp(48px,8.5vw,90px)] w-auto" />
      <h1 className="mt-0.5 font-impact text-[clamp(24px,5vw,42px)] leading-[.88] font-black tracking-[-1.2px] text-white uppercase [text-shadow:0_2px_60px_rgba(149,213,178,.1)]">
        {siteBrand.wordmarkLead}
        <em className="tracking-[-1.6px] text-[#95d5b2] not-italic">
          {siteBrand.wordmarkAccent}
        </em>
      </h1>
      <div className="mx-auto mt-1 flex w-fit [transition:opacity_.4s,transform_.4s] splash:relative splash:-top-2.5 splash:mt-2.5">
        <PositionPicker selected={selected} onSelect={onSelect} />
      </div>
    </header>
  );
}
