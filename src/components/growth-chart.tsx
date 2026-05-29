"use client";

import { useRef, useEffect, useState } from "react";

const DATA = [22, 28, 26, 18, 52, 38, 35, 48, 62, 58, 72, 88];
const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const W = 1000;
const H = 220;
const PAD = { top: 20, right: 20, bottom: 40, left: 20 };

function buildPath(points: [number, number][]) {
  return points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");
}

function buildArea(points: [number, number][]) {
  const bottom = H - PAD.bottom;
  return (
    buildPath(points) +
    ` L ${points[points.length - 1][0]} ${bottom} L ${points[0][0]} ${bottom} Z`
  );
}

export function GrowthChart() {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [progress, setProgress] = useState(0);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const minVal = Math.min(...DATA);
  const maxVal = Math.max(...DATA);

  const points: [number, number][] = DATA.map((v, i) => [
    PAD.left + (i / (DATA.length - 1)) * innerW,
    PAD.top + (1 - (v - minVal) / (maxVal - minVal)) * innerH,
  ]);

  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength();
      setLength(l);
    }
  }, []);

  useEffect(() => {
    if (!length) return;
    let start: number | null = null;
    const duration = 1800;
    function step(ts: number) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [length]);

  const linePath = buildPath(points);
  const areaPath = buildArea(points);
  const drawn = length * progress;

  return (
    <div className="mt-10 rounded-ds-lg border border-hairline-strong bg-surface-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <p className="font-sans text-xs text-charcoal uppercase tracking-widest">Digital Market Growth</p>
        <span className="font-mono text-xs text-accent-green">+{Math.round(progress * (DATA[DATA.length-1] - DATA[0]))}%</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 220 }}
        aria-hidden
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#11ff99" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#11ff99" stopOpacity="0" />
          </linearGradient>
          <clipPath id="progressClip">
            <rect x="0" y="0" width={length ? drawn : 0} height={H} />
          </clipPath>
        </defs>

        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD.left}
            y1={PAD.top + (1 - f) * innerH}
            x2={W - PAD.right}
            y2={PAD.top + (1 - f) * innerH}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Area fill — clipped to progress */}
        <path
          d={areaPath}
          fill="url(#areaGrad)"
          clipPath="url(#progressClip)"
        />

        {/* Line — drawn via stroke-dashoffset */}
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="#11ff99"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length || 9999}
          strokeDashoffset={length ? length - drawn : 9999}
          style={{ transition: "none" }}
        />

        {/* Dots — fade in as line passes */}
        {points.map(([x, y], i) => {
          const dotProgress = i / (DATA.length - 1);
          const visible = progress >= dotProgress - 0.02;
          return (
            <g key={i} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.2s" }}>
              <circle cx={x} cy={y} r={5} fill="#0a0a0c" stroke="#11ff99" strokeWidth="2" />
              <circle cx={x} cy={y} r={2.5} fill="#11ff99" />
            </g>
          );
        })}

        {/* X-axis labels */}
        {points.map(([x], i) => (
          <text
            key={i}
            x={x}
            y={H - 10}
            textAnchor="middle"
            fontSize="11"
            fill="rgba(136,142,144,0.7)"
            fontFamily="system-ui, sans-serif"
          >
            {LABELS[i]}
          </text>
        ))}
      </svg>
    </div>
  );
}
