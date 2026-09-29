import type { CSSProperties } from "react";

export function CornerMarks({ inset = 12 }: { inset?: number }) {
  const pos = { "--i": `${inset}px` } as CSSProperties;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden style={pos}>
      <span className="corner-bracket top-[var(--i)] left-[var(--i)] border-t border-l" />
      <span className="corner-bracket top-[var(--i)] right-[var(--i)] border-t border-r" />
      <span className="corner-bracket bottom-[var(--i)] left-[var(--i)] border-b border-l" />
      <span className="corner-bracket bottom-[var(--i)] right-[var(--i)] border-b border-r" />
    </div>
  );
}
