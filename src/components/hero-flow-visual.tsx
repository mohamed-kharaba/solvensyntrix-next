"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/* ── Icons ── */
function IconProblems() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/></svg>;
}
function IconIdeas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 4 12.9V17H8v-2.1A7 7 0 0 1 12 2z"/></svg>;
}
function IconReports() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>;
}
function IconIssues() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>;
}
function IconOpportunities() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}
function IconData() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
}
function IconRequests() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function IconSolution() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30"><polyline points="20 6 9 17 4 12"/></svg>;
}

/* ── Types & data ── */
interface InputNode {
  labelEn: string;
  labelAr: string;
  dark: string;  // neon — for dark mode
  light: string; // muted/deep — for light mode
  Icon: React.FC;
  y: number;
  xOff: number;
}

const INPUTS: InputNode[] = [
  { labelEn: "Problems",      labelAr: "مشاكل",    dark: "#ff2047", light: "#c8002e", Icon: IconProblems,      y:  6, xOff:  0 },
  { labelEn: "Ideas",         labelAr: "أفكار",     dark: "#3b9eff", light: "#0070e0", Icon: IconIdeas,         y: 19, xOff: 55 },
  { labelEn: "Reports",       labelAr: "تقارير",    dark: "#ffc53d", light: "#b07800", Icon: IconReports,       y: 32, xOff: 20 },
  { labelEn: "Issues",        labelAr: "قضايا",     dark: "#ff801f", light: "#c05000", Icon: IconIssues,        y: 50, xOff: 70 },
  { labelEn: "Opportunities", labelAr: "فرص",       dark: "#a855f7", light: "#7c22d4", Icon: IconOpportunities, y: 67, xOff: 15 },
  { labelEn: "Data",          labelAr: "بيانات",    dark: "#11ff99", light: "#008a4e", Icon: IconData,          y: 81, xOff: 60 },
  { labelEn: "Requests",      labelAr: "طلبات",     dark: "#38bdf8", light: "#0088c8", Icon: IconRequests,      y: 94, xOff:  0 },
];

const OUTPUT_DARK  = "#11ff99";
const OUTPUT_LIGHT = "#008a4e";
const OUTPUT = { labelEn: "Best Solution", labelAr: "أفضل حل", Icon: IconSolution };

export function HeroFlowVisual({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const [on, setOn] = useState(false);
  const [hovered, setHovered] = useState<number | "output" | "core" | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const W = 920;
  const H = 420;
  const IB = 46;
  const BASE_X = 52;
  const coreX = W / 2;
  const coreY = H / 2;
  const outputX = isRtl ? BASE_X : W - BASE_X;

  function nodeX(xOff: number) {
    return isRtl ? W - BASE_X - xOff : BASE_X + xOff;
  }

  function inputPath(nx: number, ny: number) {
    const spread = Math.abs(nx - coreX) * 0.45;
    const cp1x = isRtl ? nx - spread : nx + spread;
    const cp2x = isRtl ? coreX + spread * 0.6 : coreX - spread * 0.6;
    return `M${nx} ${ny} C${cp1x} ${ny},${cp2x} ${coreY},${coreX} ${coreY}`;
  }

  function outputPath() {
    const cp1x = isRtl ? coreX - 90 : coreX + 90;
    const cp2x = isRtl ? outputX + 90 : outputX - 90;
    return `M${coreX} ${coreY} C${cp1x} ${coreY},${cp2x} ${coreY},${outputX} ${coreY}`;
  }

  const c = (node: InputNode) => isDark ? node.dark : node.light;
  const outColor = isDark ? OUTPUT_DARK : OUTPUT_LIGHT;

  const nodeBg = isDark ? "rgba(8,8,10,0.98)" : "rgba(255,255,255,0.97)";
  const coreBg = isDark ? "rgba(8,8,10,0.98)" : "rgba(255,255,255,0.97)";
  const coreStroke = isDark ? "rgba(59,158,255,0.5)" : "rgba(0,112,224,0.5)";
  const coreRing1  = isDark ? "rgba(59,158,255,0.22)" : "rgba(0,112,224,0.2)";
  const coreRing2  = isDark ? "rgba(59,158,255,0.15)" : "rgba(0,112,224,0.12)";
  const corePulse  = isDark ? "rgba(59,158,255,0.14)" : "rgba(0,112,224,0.12)";
  const coreGlowStop = isDark ? "rgba(59,158,255,0.14)" : "rgba(0,112,224,0.1)";
  const outD = outputPath();
  const fontFamily = "var(--font-sans), var(--font-body), system-ui, sans-serif";

  return (
    <div className="relative w-full max-w-230 mx-auto" style={{ aspectRatio: `${W}/${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {INPUTS.map((_, i) => (
            <filter key={`fl${i}`} id={`fl${i}`} x="-50%" y="-400%" width="200%" height="900%">
              <feGaussianBlur stdDeviation="3.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
          <filter id="flo" x="-30%" y="-400%" width="160%" height="900%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {INPUTS.map((n, i) => (
            <filter key={`fn${i}`} id={`fn${i}`} x="-100%" y="-100%" width="400%" height="400%">
              <feFlood floodColor={c(n)} floodOpacity={isDark ? "0.55" : "0.35"} result="c"/>
              <feComposite in="c" in2="SourceGraphic" operator="in" result="cc"/>
              <feGaussianBlur in="cc" stdDeviation={isDark ? "9" : "6"} result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
          <filter id="fno" x="-100%" y="-100%" width="400%" height="400%">
            <feFlood floodColor={outColor} floodOpacity={isDark ? "0.6" : "0.35"} result="c"/>
            <feComposite in="c" in2="SourceGraphic" operator="in" result="cc"/>
            <feGaussianBlur in="cc" stdDeviation={isDark ? "11" : "7"} result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fcore" x="-70%" y="-70%" width="340%" height="340%">
            <feGaussianBlur stdDeviation={isDark ? "16" : "10"} result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={coreGlowStop}/>
            <stop offset="100%" stopColor="rgba(59,158,255,0)"/>
          </radialGradient>
          {INPUTS.map((n, i) => (
            <linearGradient key={`lg${i}`} id={`lg${i}`}
              x1={isRtl ? "100%" : "0%"} y1="0%"
              x2={isRtl ? "0%" : "100%"} y2="0%">
              <stop offset="0%"   stopColor={c(n)} stopOpacity={isDark ? "0.9" : "0.75"}/>
              <stop offset="85%"  stopColor={c(n)} stopOpacity={isDark ? "0.3" : "0.2"}/>
              <stop offset="100%" stopColor={c(n)} stopOpacity="0.02"/>
            </linearGradient>
          ))}
          <linearGradient id="lgo"
            x1={isRtl ? "100%" : "0%"} y1="0%"
            x2={isRtl ? "0%" : "100%"} y2="0%">
            <stop offset="0%"   stopColor={outColor} stopOpacity="0.02"/>
            <stop offset="15%"  stopColor={outColor} stopOpacity={isDark ? "0.3" : "0.2"}/>
            <stop offset="100%" stopColor={outColor} stopOpacity={isDark ? "0.95" : "0.8"}/>
          </linearGradient>
        </defs>

        {/* ── Input lines ── */}
        {INPUTS.map((node, i) => {
          const nx = nodeX(node.xOff);
          const ny = (node.y / 100) * H;
          const d = inputPath(nx, ny);
          return (
            <g key={`il${i}`}>
              <path d={d} fill="none" stroke={c(node)} strokeWidth="8"
                opacity={on ? (isDark ? 0.07 : 0.05) : 0}
                style={{ transition: `opacity 1s ease ${i * 0.08}s` }}/>
              <path d={d} fill="none" stroke={`url(#lg${i})`} strokeWidth="1.6"
                strokeLinecap="round" filter={`url(#fl${i})`}
                opacity={on ? 1 : 0}
                style={{ transition: `opacity 0.7s ease ${i * 0.08}s` }}/>
              {on && (
                <circle r="2.8" fill={c(node)} opacity={isDark ? "0.95" : "0.85"} filter={`url(#fl${i})`}>
                  <animateMotion dur={`${1.5 + i * 0.22}s`} repeatCount="indefinite" begin={`${i * 0.32}s`} path={d}/>
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Output line ── */}
        <g>
          <path d={outD} fill="none" stroke={outColor} strokeWidth="8"
            opacity={on ? (isDark ? 0.07 : 0.05) : 0}
            style={{ transition: "opacity 1s ease 0.4s" }}/>
          <path d={outD} fill="none" stroke="url(#lgo)" strokeWidth="2"
            strokeLinecap="round" filter="url(#flo)"
            opacity={on ? 1 : 0}
            style={{ transition: "opacity 0.7s ease 0.4s" }}/>
          {on && (
            <circle r="3.5" fill={outColor} opacity={isDark ? "0.95" : "0.85"} filter="url(#flo)">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.2s" path={outD}/>
            </circle>
          )}
        </g>

        {/* ── Input nodes ── */}
        {INPUTS.map((node, i) => {
          const nx = nodeX(node.xOff);
          const ny = (node.y / 100) * H;
          const isHov = hovered === i;
          const R = 24;
          const label = isRtl ? node.labelAr : node.labelEn;
          // tooltip: always on the outer side of the node
          const tipPad = 10;
          const tipH = 28;
          const charW = isRtl ? 12 : 7.5;
          const tipW = label.length * charW + 20;
          const tipX = isRtl ? nx + R + tipPad : nx - R - tipPad - tipW;
          const tipY = ny - tipH / 2;
          return (
            <g key={`in${i}`}
              opacity={on ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${i * 0.08}s`, cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              {/* outer halo */}
              <circle cx={nx} cy={ny} r={isHov ? R + 14 : R + 9}
                fill={c(node)} opacity={isHov ? (isDark ? 0.22 : 0.15) : (isDark ? 0.12 : 0.08)}
                filter={`url(#fn${i})`}
                style={{ transition: "all 0.25s ease" }}/>
              {/* mid ring */}
              <circle cx={nx} cy={ny} r={R + 4}
                fill="none" stroke={c(node)} strokeWidth="0.8"
                opacity={isHov ? (isDark ? 0.45 : 0.5) : (isDark ? 0.2 : 0.35)}
                style={{ transition: "all 0.25s ease" }}/>
              {/* body */}
              <circle cx={nx} cy={ny} r={R}
                fill={nodeBg} stroke={c(node)}
                strokeWidth={isHov ? 2 : 1.4}
                filter={`url(#fn${i})`}
                style={{ transition: "all 0.25s ease" }}/>
              {/* icon */}
              <foreignObject x={nx - IB/2} y={ny - IB/2} width={IB} height={IB}>
                <div style={{
                  width: IB, height: IB,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c(node),
                  filter: isDark ? `drop-shadow(0 0 ${isHov ? 11 : 6}px ${c(node)})` : "none",
                  transition: "filter 0.25s ease",
                }}>
                  <node.Icon/>
                </div>
              </foreignObject>
              {/* hover tooltip */}
              {isHov && (
                <g>
                  <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="7"
                    fill={isDark ? "rgba(12,12,15,0.96)" : "rgba(255,255,255,0.97)"}
                    stroke={c(node)} strokeWidth="1.2" opacity="0.97"/>
                  <text
                    x={tipX + tipW / 2} y={tipY + tipH / 2 + 4.5}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontFamily={fontFamily}
                    fontWeight="500"
                    fill={isDark ? "#fcfdff" : "#0a0a0c"}>
                    {label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ── Output node ── */}
        {(() => {
          const isHov = hovered === "output";
          const R = 34; // bigger than inputs
          const label = isRtl ? OUTPUT.labelAr : OUTPUT.labelEn;
          const tipPad = 12;
          const tipH = 28;
          const charW = isRtl ? 12 : 7.5;
          const tipW = label.length * charW + 20;
          const tipX = isRtl ? outputX - R - tipPad - tipW : outputX + R + tipPad;
          const tipY = coreY - tipH / 2;
          return (
            <g opacity={on ? 1 : 0}
              style={{ transition: "opacity 0.5s ease 0.4s", cursor: "pointer" }}
              onMouseEnter={() => setHovered("output")}
              onMouseLeave={() => setHovered(null)}>
              <circle cx={outputX} cy={coreY} r={isHov ? R + 18 : R + 12}
                fill={outColor} opacity={isHov ? (isDark ? 0.22 : 0.15) : (isDark ? 0.12 : 0.08)}
                filter="url(#fno)" style={{ transition: "all 0.25s ease" }}/>
              <circle cx={outputX} cy={coreY} r={R + 6}
                fill="none" stroke={outColor} strokeWidth="0.8"
                opacity={isHov ? (isDark ? 0.5 : 0.55) : (isDark ? 0.25 : 0.4)}
                style={{ transition: "all 0.25s ease" }}/>
              <circle cx={outputX} cy={coreY} r={R}
                fill={nodeBg} stroke={outColor}
                strokeWidth={isHov ? 2.4 : 1.8}
                filter="url(#fno)" style={{ transition: "all 0.25s ease" }}/>
              <foreignObject x={outputX - IB/2} y={coreY - IB/2} width={IB} height={IB}>
                <div style={{
                  width: IB, height: IB,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: outColor,
                  filter: isDark ? `drop-shadow(0 0 ${isHov ? 14 : 9}px ${outColor})` : "none",
                  transition: "filter 0.25s ease",
                }}>
                  <OUTPUT.Icon/>
                </div>
              </foreignObject>
              {isHov && (
                <g>
                  <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="7"
                    fill={isDark ? "rgba(12,12,15,0.96)" : "rgba(255,255,255,0.97)"}
                    stroke={outColor} strokeWidth="1.2" opacity="0.97"/>
                  <text
                    x={tipX + tipW / 2} y={tipY + tipH / 2 + 4.5}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontFamily={fontFamily}
                    fontWeight="500"
                    fill={isDark ? "#fcfdff" : "#0a0a0c"}>
                    {label}
                  </text>
                </g>
              )}
            </g>
          );
        })()}

        {/* ── Core hub ── */}
        <g style={{ cursor: "pointer" }}
          onMouseEnter={() => setHovered("core")}
          onMouseLeave={() => setHovered(null)}>
          <g filter="url(#fcore)">
            {/* pulse ring */}
            <circle cx={coreX} cy={coreY} r="72" fill="none"
              stroke={corePulse} strokeWidth="12">
              <animate attributeName="r" values="68;84;68" dur="3.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.14;0;0.14" dur="3.2s" repeatCount="indefinite"/>
            </circle>
            {/* outer ring */}
            <circle cx={coreX} cy={coreY} r="65"
              fill="none" stroke={coreRing1} strokeWidth="1"/>
            {/* mid ring */}
            <circle cx={coreX} cy={coreY} r="56"
              fill="none" stroke={coreRing2} strokeWidth="1"/>
            {/* subtle fill */}
            <circle cx={coreX} cy={coreY} r="65" fill="url(#coreGlow)"/>
            {/* body */}
            <circle cx={coreX} cy={coreY} r="50"
              fill={coreBg}
              stroke={coreStroke}
              strokeWidth={hovered === "core" ? 2.8 : 1.8}
              style={{ transition: "stroke-width 0.25s ease" }}/>
          </g>
          {/* Icon mark only — two polygons from the brand SVG, viewBox 0 0 92 97 */}
          <g transform={`translate(${coreX - 19}, ${coreY - 20}) scale(${38 / 92})`}>
            <polygon points="72.98 31.64 68.76 35.84 46.32 58.19 4.88 58.19 31.54 31.64 4.88 5.09 46.33 5.09 72.98 31.64"
              fill={isDark ? "#fcfdff" : "#0a0a0c"}/>
            <polygon points="60.03 65.39 86.68 91.93 45.24 91.93 18.58 65.39 22.8 61.18 49.33 61.18 71.77 38.83 86.69 38.83 60.03 65.39"
              fill={isDark ? "#fcfdff" : "#0a0a0c"}/>
          </g>
        </g>
      </svg>
    </div>
  );
}
