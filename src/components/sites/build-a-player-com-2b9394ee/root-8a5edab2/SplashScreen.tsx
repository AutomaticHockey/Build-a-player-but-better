"use client";

import { useEffect, useState } from "react";
import { AttributeChips } from "./AttributeChips";
import { positions, siteBrand } from "./content";
import { DepthChartButton } from "./DepthChartButton";
import { PlayerFigure } from "./PlayerFigure";
import { FieldLines, SplashGlow } from "./SplashBackground";
import { SplashFooter } from "./SplashFooter";
import { SplashHeader } from "./SplashHeader";
import type { PositionId } from "./types";

export function SplashScreen() {
  const [positionId, setPositionId] = useState<PositionId>("QB");
  const [entered, setEntered] = useState(false);
  const position = positions.find((p) => p.id === positionId) ?? positions[0];

  // Flip to the resting state on the first frame so every staged transition runs.
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative z-[1] flex h-dvh w-full font-sans text-base text-[#d8f3dc]">
      <main
        data-entered={entered}
        className="group/splash fixed inset-0 z-[1000] flex flex-col items-center justify-between overflow-hidden bg-[#050705] bg-[image:radial-gradient(ellipse_100%_34%_at_50%_0%,rgba(149,213,178,.16)_0%,transparent_70%)] pt-[calc(18vh_-_62px)] pb-[max(env(safe-area-inset-bottom,0px),53px)] opacity-0 [transition:opacity_.4s_ease] data-[entered=true]:opacity-100 splash:justify-start splash:pt-[4vh] splash:pb-0"
      >
        <p className="pointer-events-none absolute inset-x-0 -top-0.5 z-10 m-0 pt-[5px] pb-1 text-center text-[11px] leading-none font-medium tracking-[.5px] text-white/45 splash:hidden">
          {siteBrand.disclaimer}
        </p>
        <SplashGlow />
        <AttributeChips position={position} />
        <SplashHeader selected={positionId} onSelect={setPositionId} />
        <PlayerFigure pose={position.pose} />
        <DepthChartButton />
        <SplashFooter position={position} />
        <FieldLines />
      </main>
    </div>
  );
}
