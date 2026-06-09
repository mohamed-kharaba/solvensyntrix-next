"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "fade";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimVariant;
  delay?: number;
  threshold?: number;
  as?: React.ElementType;
}

export function AnimatedSection({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  threshold = 0.12,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref}
      className={cn(`anim-${variant}`, inView && "in-view", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
