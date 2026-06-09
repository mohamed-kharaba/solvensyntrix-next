"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className, height = 28 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // logo SVG viewBox is 530×214 → aspect ratio ≈ 2.48
  const aspectRatio = 530 / 214;
  const width = Math.round(height * aspectRatio);

  if (!mounted) {
    return <div style={{ width, height }} className={cn("shrink-0", className)} />;
  }

  // logo-dark = black paths (for light bg), logo-light = white paths (for dark bg)
  const src = resolvedTheme === "light" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <Image
      src={src}
      alt="Solven Syntrix"
      width={width}
      height={height}
      className={cn("shrink-0 object-contain", className)}
      priority
    />
  );
}
