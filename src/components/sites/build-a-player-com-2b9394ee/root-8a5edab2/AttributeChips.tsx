import type { CSSProperties } from "react";
import { chipSlots } from "./content";
import type { PositionOption } from "./types";

const ENTRANCE_DELAY_MS = 600;

export function AttributeChips({ position }: { position: PositionOption }) {
  return position.chips.map((chip, i) => {
    const slot = chipSlots[i];
    const style = {
      "--chip-color": chip.color,
      "--chip-left": position.slotLeftOverrides?.[i] ?? slot.left,
      "--chip-top": slot.top,
      "--chip-delay": `${ENTRANCE_DELAY_MS + slot.delayMs}ms`,
    } as CSSProperties;

    return (
      <div
        key={i}
        style={style}
        className="pointer-events-none absolute top-(--chip-top) left-(--chip-left) z-[4] hidden h-[22px] items-center gap-[5px] rounded-full border border-solid border-(--chip-color) bg-[rgba(8,11,9,.96)] px-[11px] py-[5px] font-chip text-[9px] font-bold tracking-[1.4px] whitespace-nowrap text-(--chip-color) uppercase opacity-0 [transform:translate(-50%,-50%)_scale(.6)] [transition:opacity_.5s_ease_var(--chip-delay),transform_.55s_cubic-bezier(.22,1,.36,1)_var(--chip-delay)] group-data-[entered=true]/splash:opacity-100 group-data-[entered=true]/splash:[transform:translate(-50%,-50%)_scale(1)] splash:flex"
      >
        <span className="size-[5px] shrink-0 rounded-full bg-(--chip-color)" />
        {chip.label}
      </div>
    );
  });
}
