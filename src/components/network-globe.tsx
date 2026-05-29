"use client";

import { useEffect, useRef } from "react";

interface Particle {
  theta: number;
  phi: number;
  size: number;
  brightness: number;
  speed: number;
  glowing: boolean;
  twinkleOffset: number;
  twinkleSpeed: number;
}

// Orbiting dot that travels along a great-circle arc
interface Orbiter {
  // The orbit is defined by a tilt axis (axisTheta, axisPhi) and an angular speed
  axisX: number; axisY: number; axisZ: number; // unit vector, orbit normal
  angle: number;   // current position along orbit
  speed: number;   // radians per frame
  size: number;
  tailLength: number; // how many trail points to keep
  trail: { x: number; y: number; z: number }[];
}

export function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const rotRef    = useRef(0);
  const timeRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Static particles ──────────────────────────────────────
    const COUNT = 500;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      theta:         2 * Math.PI * Math.random(),
      phi:           Math.acos(1 - 2 * Math.random()),
      size:          Math.random() < 0.07 ? 2.2 + Math.random() * 1.2 : Math.random() * 1.1 + 0.35,
      brightness:    Math.random() * 0.35 + 0.65,
      speed:         (Math.random() - 0.5) * 0.00045,
      glowing:       Math.random() < 0.12,
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed:  Math.random() * 0.04 + 0.01,
    }));

    // ── Orbiters ──────────────────────────────────────────────
    // Each orbiter has a random tilted orbit plane (axis = orbit normal)
    function makeOrbiter(): Orbiter {
      // Random unit vector as orbit axis
      const u = Math.random() * Math.PI * 2;
      const v = Math.acos(1 - 2 * Math.random());
      return {
        axisX: Math.sin(v) * Math.cos(u),
        axisY: Math.cos(v),
        axisZ: Math.sin(v) * Math.sin(u),
        angle:      Math.random() * Math.PI * 2,
        speed:      (Math.random() < 0.5 ? 1 : -1) * (0.006 + Math.random() * 0.018),
        size:       1.0 + Math.random() * 1.4,
        tailLength: 16 + Math.floor(Math.random() * 32),
        trail:      [],
      };
    }

    const ORBITER_COUNT = 14;
    const orbiters: Orbiter[] = Array.from({ length: ORBITER_COUNT }, makeOrbiter);

    // Rotate a point around an arbitrary axis by angle (Rodrigues)
    function rotateAround(
      px: number, py: number, pz: number,
      ax: number, ay: number, az: number,
      angle: number
    ): [number, number, number] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const dot = px * ax + py * ay + pz * az;
      const rx = cos * px + sin * (ay * pz - az * py) + (1 - cos) * dot * ax;
      const ry = cos * py + sin * (az * px - ax * pz) + (1 - cos) * dot * ay;
      const rz = cos * pz + sin * (ax * py - ay * px) + (1 - cos) * dot * az;
      return [rx, ry, rz];
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.42;

      ctx.clearRect(0, 0, W, H);

      rotRef.current += 0.0014;
      timeRef.current += 1;
      const rot  = rotRef.current;
      const time = timeRef.current;

      // ── Project static particles ───────────────────────────
      const projected = particles.map((p) => {
        p.theta += p.speed;
        const sinPhi = Math.sin(p.phi);
        const x = sinPhi * Math.cos(p.theta + rot);
        const y = Math.cos(p.phi);
        const z = sinPhi * Math.sin(p.theta + rot);
        const depth = (z + 1) / 2;
        const twinkle = 0.82 + 0.18 * Math.sin(time * p.twinkleSpeed + p.twinkleOffset);
        const alpha = p.brightness * (0.2 + depth * 0.8) * twinkle;
        return { p, x, y, z, depth, alpha };
      }).sort((a, b) => a.z - b.z);

      // ── Connections ────────────────────────────────────────
      const front = projected.filter(d => d.z > -0.15);
      for (let i = 0; i < front.length; i++) {
        for (let j = i + 1; j < front.length; j++) {
          const a = front[i], b = front[j];
          const dx = (a.x - b.x) * R;
          const dy = (a.y - b.y) * R;
          const d2 = dx * dx + dy * dy;
          if (d2 > 1600) continue;
          const dist = Math.sqrt(d2);
          const alpha = (1 - dist / 40) * 0.3 * a.depth * b.depth;
          ctx.strokeStyle = `rgba(252,253,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(cx + a.x * R, cy - a.y * R);
          ctx.lineTo(cx + b.x * R, cy - b.y * R);
          ctx.stroke();
        }
      }

      // ── Static particles ───────────────────────────────────
      for (const { p, x, y, alpha } of projected) {
        const px = cx + x * R;
        const py = cy - y * R;
        const sz = p.size;

        if (p.glowing) {
          const bloom = ctx.createRadialGradient(px, py, 0, px, py, sz * 8);
          bloom.addColorStop(0,    `rgba(220,235,255,${(alpha * 0.9).toFixed(3)})`);
          bloom.addColorStop(0.2,  `rgba(200,220,255,${(alpha * 0.55).toFixed(3)})`);
          bloom.addColorStop(0.55, `rgba(180,210,255,${(alpha * 0.12).toFixed(3)})`);
          bloom.addColorStop(1,    "transparent");
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(px, py, sz * 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.globalAlpha = alpha * 0.35;
          ctx.strokeStyle = "rgba(255,255,255,1)";
          ctx.lineWidth = 0.8;
          const spike = sz * 3;
          ctx.beginPath();
          ctx.moveTo(px - spike, py); ctx.lineTo(px + spike, py);
          ctx.moveTo(px, py - spike); ctx.lineTo(px, py + spike);
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, sz * 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const grd = ctx.createRadialGradient(px, py, 0, px, py, sz * 2.5);
          grd.addColorStop(0,   `rgba(252,253,255,${alpha.toFixed(3)})`);
          grd.addColorStop(0.5, `rgba(220,230,255,${(alpha * 0.35).toFixed(3)})`);
          grd.addColorStop(1,   "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(px, py, sz * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(252,253,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, sz * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Orbiters ───────────────────────────────────────────
      for (const orb of orbiters) {
        orb.angle += orb.speed;

        // Start from a reference point on the sphere (1,0,0) rotated by orbit axis
        // Orbit point = rotate (1,0,0) around axis by orb.angle
        const [ox, oy, oz] = rotateAround(1, 0, 0, orb.axisX, orb.axisY, orb.axisZ, orb.angle);

        // Apply globe rotation to orbit point
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        const wx = ox * cosR - oz * sinR;
        const wz = ox * sinR + oz * cosR;
        const wy = oy;

        // Push to trail
        orb.trail.push({ x: wx, y: wy, z: wz });
        if (orb.trail.length > orb.tailLength) orb.trail.shift();

        const depth = (wz + 1) / 2;

        // Draw tail
        for (let t = 1; t < orb.trail.length; t++) {
          const ta = orb.trail[t - 1];
          const tb = orb.trail[t];
          const progress = t / orb.trail.length;
          const tailAlpha = progress * progress * depth * 0.7;
          ctx.strokeStyle = `rgba(252,253,255,${tailAlpha.toFixed(3)})`;
          ctx.lineWidth = orb.size * progress * 0.55;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(cx + ta.x * R, cy - ta.y * R);
          ctx.lineTo(cx + tb.x * R, cy - tb.y * R);
          ctx.stroke();
        }

        // Draw head dot
        const headAlpha = depth * 0.95;
        const hpx = cx + wx * R;
        const hpy = cy - wy * R;

        const halo = ctx.createRadialGradient(hpx, hpy, 0, hpx, hpy, orb.size * 4);
        halo.addColorStop(0,   `rgba(255,255,255,${headAlpha.toFixed(3)})`);
        halo.addColorStop(0.4, `rgba(220,235,255,${(headAlpha * 0.4).toFixed(3)})`);
        halo.addColorStop(1,   "transparent");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(hpx, hpy, orb.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${headAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(hpx, hpy, orb.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      // Clear trails on resize to avoid stale screen-space positions
      for (const orb of orbiters) orb.trail = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-80 select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
