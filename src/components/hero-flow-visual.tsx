"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */

function IconProblems() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconIdeas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 1 4 12.9V17H8v-2.1A7 7 0 0 1 12 2z" />
    </svg>
  );
}

function IconReports() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function IconIssues() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconOpportunities() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconData() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function IconRequests() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconSolution() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Logo mark (just the geometric S mark from logo-dark.svg) ─────────────── */
function LogoMark({ size = 32, isDark = true }: { size?: number; isDark?: boolean }) {
  return (
    <svg viewBox="0 0 163 215" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M162.47,54.37l-52.81-.05-.03-52.89-53,.12L3.89,54.37v105.62l52.85.09.09,52.82,53.09-.23,52.57-52.7V54.37ZM56.82,107.07l-52.61-.06,52.58-52.67,52.53.13-52.5,52.6ZM109.74,159.91l-52.64-.07,52.58-52.68,52.55.14-52.48,52.61Z"
        fill={isDark ? "#fcfdff" : "#0a0a0c"}
      />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
interface InputNode {
  labelEn: string;
  labelAr: string;
  color: string;
  Icon: React.FC;
  y: number; // 0–100 % of SVG height
}

const INPUTS: InputNode[] = [
  { labelEn: "Problems",      labelAr: "مشاكل",    color: "#ff2047", Icon: IconProblems,      y:  8 },
  { labelEn: "Ideas",         labelAr: "أفكار",     color: "#3b9eff", Icon: IconIdeas,         y: 22 },
  { labelEn: "Reports",       labelAr: "تقارير",    color: "#ffc53d", Icon: IconReports,       y: 36 },
  { labelEn: "Issues",        labelAr: "قضايا",     color: "#ff801f", Icon: IconIssues,        y: 50 },
  { labelEn: "Opportunities", labelAr: "فرص",       color: "#a855f7", Icon: IconOpportunities, y: 64 },
  { labelEn: "Data",          labelAr: "بيانات",    color: "#11ff99", Icon: IconData,          y: 78 },
  { labelEn: "Requests",      labelAr: "طلبات",     color: "#38bdf8", Icon: IconRequests,      y: 92 },
];

const OUTPUT = { labelEn: "Best Solution", labelAr: "أفضل حل", color: "#11ff99", Icon: IconSolution };

/* ── Component ────────────────────────────────────────────────────────────── */
export function HeroFlowVisual({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const [on, setOn] = useState(false);
  const [hovered, setHovered] = useState<number | "output" | "core" | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const nodeBg = isDark ? "{nodeBg}" : "rgba(255,255,255,0.95)";
  const coreBg = isDark ? "rgba(10,10,12,0.97)" : "rgba(255,255,255,0.97)";
  const coreStroke = isDark ? "rgba(59,158,255,0.45)" : "rgba(59,158,255,0.6)";
  useEffect(() => { const t = setTimeout(() => setOn(true), 400); return () => clearTimeout(t); }, []);

  const W = 860;
  const H = 420;
  const ICON_BOX = 48; // foreign object box size
  const inputX  = isRtl ? W - 56 : 56;
  const coreX   = W / 2;
  const coreY   = H / 2;
  const outputX = isRtl ? 56 : W - 56;

  return (
    <div className="relative w-full max-w-4xl mx-auto" style={{ aspectRatio: `${W}/${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {INPUTS.map((n, i) => (
            <filter key={i} id={`gi${i}`} x="-60%" y="-300%" width="220%" height="700%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
          {/* Per-node circle glow filters */}
          {INPUTS.map((n, i) => (
            <filter key={`ng${i}`} id={`ng${i}`} x="-80%" y="-80%" width="360%" height="360%">
              <feFlood floodColor={n.color} floodOpacity="0.5" result="c" />
              <feComposite in="c" in2="SourceGraphic" operator="in" result="cc" />
              <feGaussianBlur in="cc" stdDeviation="8" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
          <filter id="ngo" x="-80%" y="-80%" width="360%" height="360%">
            <feFlood floodColor={OUTPUT.color} floodOpacity="0.55" result="c" />
            <feComposite in="c" in2="SourceGraphic" operator="in" result="cc" />
            <feGaussianBlur in="cc" stdDeviation="9" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="go" x="-30%" y="-200%" width="160%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="gc" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="12" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {INPUTS.map((n, i) => (
            <linearGradient key={i} id={`lgi${i}`}
              x1={isRtl ? "100%" : "0%"} y1="0%"
              x2={isRtl ? "0%" : "100%"} y2="0%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.2" />
            </linearGradient>
          ))}
          <linearGradient id="lgo"
            x1={isRtl ? "100%" : "0%"} y1="0%"
            x2={isRtl ? "0%" : "100%"} y2="0%">
            <stop offset="0%" stopColor={OUTPUT.color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={OUTPUT.color} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ── Input curves ── */}
        {INPUTS.map((node, i) => {
          const sy = (node.y / 100) * H;
          const cp1x = isRtl ? inputX - 90 : inputX + 90;
          const cp2x = isRtl ? coreX + 70  : coreX - 70;
          const d = `M${inputX} ${sy} C${cp1x} ${sy},${cp2x} ${coreY},${coreX} ${coreY}`;
          return (
            <g key={i}>
              {/* glow halo */}
              <path d={d} fill="none" stroke={node.color} strokeWidth="4"
                opacity={on ? 0.15 : 0}
                style={{ transition: `opacity 0.8s ease ${i * 0.1}s` }} />
              {/* main line */}
              <path d={d} fill="none" stroke={`url(#lgi${i})`} strokeWidth="1.5"
                strokeLinecap="round" filter={`url(#gi${i})`}
                opacity={on ? 1 : 0}
                style={{ transition: `opacity 0.6s ease ${i * 0.1}s` }} />
              {/* travelling dot */}
              {on && (
                <circle r="3" fill={node.color} filter={`url(#gi${i})`}>
                  <animateMotion dur={`${1.6 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} path={d} />
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Output curve ── */}
        {(() => {
          const oy = coreY;
          const cp1x = isRtl ? coreX - 70 : coreX + 70;
          const cp2x = isRtl ? outputX + 90 : outputX - 90;
          const d = `M${coreX} ${coreY} C${cp1x} ${oy},${cp2x} ${oy},${outputX} ${oy}`;
          return (
            <g>
              <path d={d} fill="none" stroke={OUTPUT.color} strokeWidth="4"
                opacity={on ? 0.12 : 0}
                style={{ transition: "opacity 0.8s ease 0.5s" }} />
              <path d={d} fill="none" stroke="url(#lgo)" strokeWidth="2"
                strokeLinecap="round" filter="url(#go)"
                opacity={on ? 1 : 0}
                style={{ transition: "opacity 0.6s ease 0.5s" }} />
              {on && (
                <circle r="3.5" fill={OUTPUT.color} filter="url(#go)">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.3s" path={d} />
                </circle>
              )}
            </g>
          );
        })()}

        {/* ── Input icon nodes ── */}
        {INPUTS.map((node, i) => {
          const cy = (node.y / 100) * H;
          const fo_x = inputX - ICON_BOX / 2;
          const fo_y = cy - ICON_BOX / 2;
          return (
            <g
              key={i}
              opacity={on ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${i * 0.1}s`, cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* glow halo — rendered behind */}
              <circle cx={inputX} cy={cy} r={hovered === i ? 34 : 30} fill={node.color}
                opacity={hovered === i ? 0.28 : 0.18} filter={`url(#ng${i})`}
                style={{ transition: "all 0.2s ease" }} />
              {/* outer soft ring */}
              <circle cx={inputX} cy={cy} r={hovered === i ? 30 : 28} fill="none"
                stroke={node.color} strokeWidth="1"
                opacity={hovered === i ? 0.6 : 0.35}
                style={{ transition: "all 0.2s ease" }} />
              {/* body */}
              <circle cx={inputX} cy={cy} r="26" fill={nodeBg} stroke={node.color}
                strokeWidth={hovered === i ? 2 : 1.5} filter={`url(#ng${i})`}
                style={{ transition: "stroke-width 0.2s ease" }} />
              {/* icon via foreignObject */}
              <foreignObject x={fo_x} y={fo_y} width={ICON_BOX} height={ICON_BOX}
                style={{ overflow: "visible" }}>
                <div
                  style={{
                    width: ICON_BOX, height: ICON_BOX,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: node.color,
                    filter: `drop-shadow(0 0 ${hovered === i ? 10 : 6}px ${node.color})`,
                    transition: "filter 0.2s ease",
                  }}
                >
                  <node.Icon />
                </div>
              </foreignObject>
              {/* Tooltip */}
              {hovered === i && (() => {
                const label = isRtl ? node.labelAr : node.labelEn;
                const tipW = label.length * (isRtl ? 13 : 8) + 24;
                const tipX = isRtl ? inputX + 34 : inputX - 34 - tipW;
                const tipY = cy - 14;
                return (
                  <g>
                    <rect x={tipX} y={tipY} width={tipW} height={26} rx="6"
                      fill={isDark ? "rgba(16,16,18,0.95)" : "rgba(255,255,255,0.95)"}
                      stroke={node.color} strokeWidth="1" opacity="0.95" />
                    <text
                      x={tipX + tipW / 2} y={tipY + 17}
                      textAnchor="middle"
                      fontSize="12"
                      fontFamily="var(--font-sans), system-ui, sans-serif"
                      fill={isDark ? "#fcfdff" : "#0a0a0c"}
                      fontWeight="500"
                    >
                      {label}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* ── Output icon node ── */}
        {(() => {
          const cy = coreY;
          const fo_x = outputX - ICON_BOX / 2;
          const fo_y = cy - ICON_BOX / 2;
          return (
            <g
              opacity={on ? 1 : 0}
              style={{ transition: "opacity 0.5s ease 0.5s", cursor: "pointer" }}
              onMouseEnter={() => setHovered("output")}
              onMouseLeave={() => setHovered(null)}
            >
              <circle cx={outputX} cy={cy} r={hovered === "output" ? 36 : 32}
                fill={OUTPUT.color} opacity={hovered === "output" ? 0.28 : 0.18}
                filter="url(#ngo)" style={{ transition: "all 0.2s ease" }} />
              <circle cx={outputX} cy={cy} r={hovered === "output" ? 32 : 30}
                fill="none" stroke={OUTPUT.color} strokeWidth="1"
                opacity={hovered === "output" ? 0.6 : 0.4}
                style={{ transition: "all 0.2s ease" }} />
              <circle cx={outputX} cy={cy} r="28" fill={nodeBg} stroke={OUTPUT.color}
                strokeWidth={hovered === "output" ? 2.2 : 1.8}
                filter="url(#ngo)" style={{ transition: "stroke-width 0.2s ease" }} />
              <foreignObject x={fo_x} y={fo_y} width={ICON_BOX} height={ICON_BOX}>
                <div style={{
                  width: ICON_BOX, height: ICON_BOX,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: OUTPUT.color,
                  filter: `drop-shadow(0 0 ${hovered === "output" ? 12 : 8}px ${OUTPUT.color})`,
                  transition: "filter 0.2s ease",
                }}>
                  <OUTPUT.Icon />
                </div>
              </foreignObject>
              {/* Tooltip */}
              {hovered === "output" && (() => {
                const label = isRtl ? OUTPUT.labelAr : OUTPUT.labelEn;
                const tipW = label.length * (isRtl ? 13 : 8) + 24;
                const tipX = isRtl ? outputX - 34 - tipW : outputX + 34;
                const tipY = cy - 14;
                return (
                  <g>
                    <rect x={tipX} y={tipY} width={tipW} height={26} rx="6"
                      fill={isDark ? "rgba(16,16,18,0.95)" : "rgba(255,255,255,0.95)"}
                      stroke={OUTPUT.color} strokeWidth="1" opacity="0.95" />
                    <text
                      x={tipX + tipW / 2} y={tipY + 17}
                      textAnchor="middle"
                      fontSize="12"
                      fontFamily="var(--font-sans), system-ui, sans-serif"
                      fill={isDark ? "#fcfdff" : "#0a0a0c"}
                      fontWeight="500"
                    >
                      {label}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })()}

        {/* ── Core node with logo mark ── */}
        <g
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHovered("core")}
          onMouseLeave={() => setHovered(null)}
        >
          <g filter="url(#gc)">
            <circle cx={coreX} cy={coreY} r="52" fill="none" stroke="rgba(59,158,255,0.12)" strokeWidth="10">
              <animate attributeName="r" values="52;66;52" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.12;0;0.12" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={coreX} cy={coreY} r="50" fill="none" stroke="rgba(59,158,255,0.18)" strokeWidth="1" />
            <circle cx={coreX} cy={coreY} r="42" fill={coreBg} stroke={coreStroke}
              strokeWidth={hovered === "core" ? 2.5 : 1.5}
              style={{ transition: "stroke-width 0.2s ease" }} />
          </g>

          {/* Logo mark */}
          <foreignObject x={coreX - 18} y={coreY - 22} width="36" height="44">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 44 }}>
              <LogoMark size={28} isDark={isDark} />
            </div>
          </foreignObject>

          {/* Tooltip */}
          {hovered === "core" && (() => {
            const label = isRtl ? "سولفن سينتريكس" : "Solven Syntrix";
            const tipW = label.length * (isRtl ? 13 : 8) + 24;
            const tipX = coreX - tipW / 2;
            const tipY = coreY - 58;
            return (
              <g>
                <rect x={tipX} y={tipY} width={tipW} height={26} rx="6"
                  fill={isDark ? "rgba(16,16,18,0.95)" : "rgba(255,255,255,0.95)"}
                  stroke="rgba(59,158,255,0.6)" strokeWidth="1" />
                <text
                  x={coreX} y={tipY + 17}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="var(--font-sans), system-ui, sans-serif"
                  fill={isDark ? "#fcfdff" : "#0a0a0c"}
                  fontWeight="500"
                >
                  {label}
                </text>
              </g>
            );
          })()}
        </g>
      </svg>
    </div>
  );
}
