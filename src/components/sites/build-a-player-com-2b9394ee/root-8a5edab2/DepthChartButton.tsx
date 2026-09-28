export function DepthChartButton() {
  return (
    <button
      type="button"
      className="absolute top-[calc(50%_-_85px)] right-2.5 z-10 flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[10px] border border-[rgba(229,57,53,.55)] bg-[rgba(229,57,53,.18)] px-[11px] py-2 opacity-0 [transform:translateY(calc(-50%_+_10px))_scale(.8)] [transition:background_.18s,border-color_.18s,opacity_.4s_900ms,transform_.4s_900ms] hover:border-[rgba(229,57,53,.8)] hover:bg-[rgba(229,57,53,.28)] group-data-[entered=true]/splash:opacity-100 group-data-[entered=true]/splash:[transform:translateY(-50%)_scale(1)] splash:right-[500px] splash:px-3.5 splash:py-2.5"
    >
      <span className="font-impact text-xs leading-none font-black tracking-[1px] whitespace-nowrap text-white uppercase splash:text-sm">
        The Depth Chart
      </span>
      <span className="font-[Arial] text-[8px] font-bold tracking-[2px] whitespace-nowrap text-[#fbbf24] uppercase splash:text-[9px]">
        Mini Game
      </span>
    </button>
  );
}
