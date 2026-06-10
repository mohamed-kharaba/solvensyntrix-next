import { cn } from "@/lib/utils";

interface SectionProps {
  /** Anchor id for in-page navigation (e.g. "about", "vision"). */
  id?: string;
  /** Extra classes applied to the outer <section> (e.g. overflow-hidden). */
  className?: string;
  /** Extra classes applied to the inner max-width container. */
  containerClassName?: string;
  /**
   * Content rendered before the centered container — used for full-bleed
   * decorations like background glows that must escape the max-width.
   */
  decoration?: React.ReactNode;
  /**
   * Render children directly inside <section> without the centered container.
   * Use when a section manages its own layout (e.g. the partners grid).
   */
  bare?: boolean;
  children: React.ReactNode;
}

/**
 * Standard page section wrapper. Centralizes the horizontal/vertical padding
 * and the centered max-width container so individual sections don't hardcode
 * spacing. Change the rhythm here once and every section follows.
 */
export function Section({
  id,
  className,
  containerClassName,
  decoration,
  bare = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative bg-canvas px-6 py-20 lg:px-8", className)}
    >
      {decoration}
      {bare ? (
        children
      ) : (
        <div className={cn("relative mx-auto max-w-300", containerClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}
