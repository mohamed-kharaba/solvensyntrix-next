"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DATA = [
  { label: "2019\nQ1", value: 2100 },
  { label: "2019\nQ2", value: 2380 },
  { label: "2019\nQ3", value: 3050 },
  { label: "2019\nQ4", value: 2900 },
  { label: "2020\nQ1", value: 3200 },
  { label: "2020\nQ2", value: 3050 },
  { label: "2020\nQ3", value: 3500 },
  { label: "2021\nQ1", value: 3800 },
  { label: "2021\nQ3", value: 4100 },
  { label: "2022\nQ1", value: 3950 },
  { label: "2023\nQ1", value: 4300 },
  { label: "2024\nQ1", value: 4554 },
];

const W = 900;
const H = 300;
const PAD = { top: 40, right: 48, bottom: 56, left: 72 };
const Y_TICKS = [2000, 3000, 4000, 5000];
const GREEN = "#ff801f";
const GREEN_DIM = "rgba(255,128,31,";

// Catmull-Rom → smooth cubic bezier path
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function GrowthChart() {
  const lineRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [length, setLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  // theme-aware colors
  const bg        = isLight ? "#f5f7fa" : "#0a0a0c";
  const borderClr = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)";
  const gridH     = isLight ? "rgba(0,0,0,0.06)"  : "rgba(255,255,255,0.06)";
  const gridV     = isLight ? "rgba(0,0,0,0.04)"  : "rgba(255,255,255,0.05)";
  const labelClr  = isLight ? "rgba(0,0,0,0.4)"   : "rgba(255,255,255,0.28)";
  const subLabel  = isLight ? "rgba(0,0,0,0.28)"  : "rgba(255,255,255,0.2)";
  const headClr   = isLight ? "#111"               : "#fff";
  const subClr    = isLight ? "rgba(0,0,0,0.45)"  : "rgba(255,255,255,0.4)";
  const dotBg     = isLight ? "#e8ecf2"            : "#0a0a0c";

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const minVal = 1600;
  const maxVal = 5200;

  const xOf = (i: number) => PAD.left + (i / (DATA.length - 1)) * innerW;
  const yOf = (v: number) => PAD.top + (1 - (v - minVal) / (maxVal - minVal)) * innerH;

  const points: [number, number][] = DATA.map((d, i) => [xOf(i), yOf(d.value)]);
  const bottomY = H - PAD.bottom;
  const linePath = smoothPath(points);
  const areaPath = linePath + ` L ${points[points.length - 1][0]} ${bottomY} L ${points[0][0]} ${bottomY} Z`;

  // Measure path
  useEffect(() => {
    if (lineRef.current) setLength(lineRef.current.getTotalLength());
  }, []);

  // Start on scroll into view
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.25 }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [started]);

  // Draw animation (ease-out cubic, 2.4s)
  useEffect(() => {
    if (!started || !length) return;
    let raf: number;
    let t0: number | null = null;
    const dur = 2400;
    function tick(ts: number) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, length]);

  const drawn = length * progress;
  const lastVal = DATA[DATA.length - 1].value;
  const displayVal = Math.round(progress * lastVal);
  const last = points[points.length - 1];

  return (
    <div
      ref={wrapRef}
      className="mt-10 rounded-2xl overflow-hidden"
      style={{ background: bg, border: `1px solid ${borderClr}` }}
    >
      {/* Value callout — top left like the reference */}
      <div className="px-6 pt-6 pb-0" style={{ opacity: progress > 0.7 ? 1 : 0, transition: "opacity 0.4s" }}>
        <p className="font-display leading-none tracking-tight" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: headClr }}>
          <span className="text-base font-sans mr-0.5" style={{ color: subClr }}>$</span>
          {displayVal.toLocaleString()}
          <span className="text-base font-sans ml-1.5" style={{ color: subClr }}>M</span>
        </p>
        <p className="mt-1 font-sans text-xs uppercase tracking-widest" style={{ color: subClr }}>
          Market volume · 2024
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: "auto", maxHeight: 300 }}
        aria-hidden
      >
        <defs>
          {/* Green area gradient */}
          <linearGradient id="cgAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={GREEN} stopOpacity={isLight ? 0.3 : 0.45} />
            <stop offset="55%"  stopColor={GREEN} stopOpacity={isLight ? 0.1 : 0.18} />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>

          {/* Line glow */}
          <filter id="cgLineGlow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dot glow */}
          <filter id="cgDotGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Draw clip — track x position of the line tip */}
          <clipPath id="cgClip">
            <rect x="0" y="0" width={PAD.left + progress * (W - PAD.left - PAD.right)} height={H} />
          </clipPath>
        </defs>

        {/* Vertical dashed grid */}
        {points.map(([x], i) => (
          <line key={`vg-${i}`} x1={x} y1={PAD.top} x2={x} y2={bottomY}
            stroke={gridV} strokeWidth="1" strokeDasharray="4 4" />
        ))}

        {/* Horizontal grid + Y labels */}
        {Y_TICKS.map((tick) => {
          const y = yOf(tick);
          return (
            <g key={`yt-${tick}`}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke={gridH} strokeWidth="1" />
              <text x={PAD.left - 10} y={y + 4} textAnchor="end" fontSize="11"
                fill={labelClr} fontFamily="system-ui, sans-serif">
                {`${tick / 1000}K`}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaPath} fill="url(#cgAreaGrad)" clipPath="url(#cgClip)" />

        {/* Line */}
        <path
          ref={lineRef}
          d={linePath}
          fill="none"
          stroke={GREEN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length || 99999}
          strokeDashoffset={length ? length - drawn : 99999}
          filter="url(#cgLineGlow)"
        />

        {/* X-axis labels */}
        {DATA.map((d, i) => {
          const [l1, l2] = d.label.split("\n");
          return (
            <g key={`xl-${i}`}>
              <text x={xOf(i)} y={bottomY + 16} textAnchor="middle" fontSize="10"
                fill={labelClr} fontFamily="system-ui, sans-serif">{l1}</text>
              {l2 && (
                <text x={xOf(i)} y={bottomY + 28} textAnchor="middle" fontSize="10"
                  fill={subLabel} fontFamily="system-ui, sans-serif">{l2}</text>
              )}
            </g>
          );
        })}

        {/* Live pulsing final dot */}
        {progress > 0.88 && (
          <g
            style={{ opacity: Math.min((progress - 0.88) / 0.12, 1) }}
            filter="url(#cgDotGlow)"
          >
            <circle cx={last[0]} cy={last[1]} r={16} fill={`${GREEN_DIM}0.08)`} />
            <circle cx={last[0]} cy={last[1]} r={10} fill={`${GREEN_DIM}0.18)`} />
            <circle cx={last[0]} cy={last[1]} r={6}  fill={dotBg} stroke={GREEN} strokeWidth="2.5" />
            <circle cx={last[0]} cy={last[1]} r={2.5} fill="white" />
          </g>
        )}

        {/* Small indicator dot under last x-label */}
        {progress > 0.94 && (
          <circle
            cx={last[0]} cy={bottomY + 42} r={3}
            fill={GREEN}
            style={{ opacity: Math.min((progress - 0.94) / 0.06, 1) }}
          />
        )}
      </svg>
    </div>
  );
}
