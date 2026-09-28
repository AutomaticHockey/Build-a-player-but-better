import { cn } from "@/lib/utils";
import type { FigurePose } from "./types";

type Point = readonly [number, number];

interface Limb {
  points: readonly Point[];
  /** Stroke width of each segment between consecutive points. */
  widths: readonly number[];
}

interface Pose {
  head: Point;
  /** Facemask bar, drawn on the side the player faces. */
  facemask: readonly [Point, Point];
  torso: string;
  limbs: readonly Limb[];
  ball?: { cx: number; cy: number; rotate: number };
}

const ARM = [22, 18] as const;
const LEG = [32, 26, 14] as const;

// Original mannequin poses on a 300×400 canvas (3:4, feet near the bottom edge).
const poses: Record<FigurePose, Pose> = {
  qb: {
    head: [150, 78],
    facemask: [[126, 84], [124, 98]],
    torso: "M104 118 Q150 98 198 114 L184 214 Q152 222 124 214 Z",
    limbs: [
      { points: [[188, 122], [234, 106], [240, 58]], widths: ARM },
      { points: [[112, 124], [80, 156], [62, 136]], widths: ARM },
      { points: [[136, 212], [108, 290], [86, 366], [62, 376]], widths: LEG },
      { points: [[172, 212], [198, 294], [228, 362], [250, 380]], widths: LEG },
    ],
    ball: { cx: 244, cy: 46, rotate: -35 },
  },
  rb: {
    head: [122, 96],
    facemask: [[98, 102], [96, 116]],
    torso: "M92 130 Q134 108 176 130 L152 226 Q128 232 108 222 Z",
    limbs: [
      { points: [[168, 136], [178, 182], [142, 190]], widths: ARM },
      { points: [[100, 136], [66, 164], [46, 140]], widths: ARM },
      { points: [[118, 222], [76, 258], [92, 318], [70, 330]], widths: LEG },
      { points: [[150, 224], [188, 294], [236, 364], [258, 384]], widths: LEG },
    ],
    ball: { cx: 150, cy: 180, rotate: 15 },
  },
  wr: {
    head: [150, 106],
    facemask: [[138, 128], [162, 128]],
    torso: "M112 140 Q150 122 190 140 L178 238 Q150 246 124 238 Z",
    limbs: [
      { points: [[118, 146], [104, 92], [122, 46]], widths: ARM },
      { points: [[184, 146], [198, 92], [180, 46]], widths: ARM },
      { points: [[134, 236], [104, 292], [126, 340], [108, 352]], widths: LEG },
      { points: [[166, 238], [178, 314], [182, 380], [204, 388]], widths: LEG },
    ],
    ball: { cx: 150, cy: 34, rotate: 0 },
  },
  db: {
    head: [150, 126],
    facemask: [[138, 148], [162, 148]],
    torso: "M106 160 Q150 142 194 160 L182 250 Q150 258 118 250 Z",
    limbs: [
      { points: [[112, 166], [80, 212], [86, 254]], widths: ARM },
      { points: [[188, 166], [220, 212], [214, 254]], widths: ARM },
      { points: [[128, 248], [98, 310], [96, 376], [74, 386]], widths: LEG },
      { points: [[172, 248], [202, 310], [204, 376], [226, 386]], widths: LEG },
    ],
  },
};

const figureOrder: FigurePose[] = ["qb", "rb", "wr", "db"];

function FigureSvg({ pose, active }: { pose: Pose; active: boolean }) {
  const [hx, hy] = pose.head;
  return (
    <svg
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className={cn(
        "absolute inset-0 block size-full",
        active ? "opacity-[.13]" : "opacity-0",
      )}
    >
      <g fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
        {pose.limbs.flatMap((limb, li) =>
          limb.points.slice(1).map(([x2, y2], si) => {
            const [x1, y1] = limb.points[si];
            return (
              <line
                key={`${li}-${si}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={limb.widths[si]}
              />
            );
          }),
        )}
        <path d={pose.torso} strokeWidth="10" />
        <line x1={hx} y1={hy + 18} x2={hx} y2={hy + 34} strokeWidth="18" />
        <circle cx={hx} cy={hy} r="25" stroke="none" />
        <line
          x1={pose.facemask[0][0]}
          y1={pose.facemask[0][1]}
          x2={pose.facemask[1][0]}
          y2={pose.facemask[1][1]}
          strokeWidth="6"
        />
        {pose.ball && (
          <ellipse
            cx={pose.ball.cx}
            cy={pose.ball.cy}
            rx="18"
            ry="11"
            stroke="none"
            transform={`rotate(${pose.ball.rotate} ${pose.ball.cx} ${pose.ball.cy})`}
          />
        )}
      </g>
    </svg>
  );
}

export function PlayerFigure({ pose }: { pose: FigurePose }) {
  return (
    <div className="pointer-events-none relative z-[2] mt-[65px] aspect-[3/4] w-[clamp(160px,44vw,260px)] overflow-visible opacity-0 [transform:translateY(40px)_scale(.92)] [transition:opacity_.65s_ease_400ms,transform_.65s_cubic-bezier(.22,1,.36,1)_400ms] group-data-[entered=true]/splash:opacity-100 group-data-[entered=true]/splash:[transform:none] splash:-top-[7px] splash:my-2 splash:w-[clamp(153px,27.1vw,287px)]">
      {figureOrder.map((key) => (
        <FigureSvg key={key} pose={poses[key]} active={key === pose} />
      ))}
      <div className="absolute -bottom-2 left-1/2 h-10 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(116,198,157,.5)_0%,transparent_80%)] blur-[8px]" />
    </div>
  );
}
