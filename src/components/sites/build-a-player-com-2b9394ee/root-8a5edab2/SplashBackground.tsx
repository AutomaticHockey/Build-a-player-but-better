import type { CSSProperties } from "react";

const YARD_LINES = 7;

export function SplashGlow() {
  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-[1] size-[300px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(116,198,157,.22)_0%,transparent_68%)] opacity-0 [transition:opacity_.8s_ease_400ms] group-data-[entered=true]/splash:opacity-100 splash:size-[500px]" />
  );
}

export function FieldLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-evenly">
      {Array.from({ length: YARD_LINES }, (_, i) => (
        <div
          key={i}
          className="h-px w-full bg-[rgba(149,213,178,.05)] opacity-0 [transition:opacity_.5s_ease_var(--line-delay)] group-data-[entered=true]/splash:opacity-100"
          style={{ "--line-delay": `${600 + i * 60}ms` } as CSSProperties}
        />
      ))}
    </div>
  );
}
