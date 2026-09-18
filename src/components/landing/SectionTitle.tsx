import type { ReactNode } from "react";

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-display text-3xl font-bold text-pumpkin md:text-4xl">{children}</h2>
      <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-sky">
        <span className="h-px w-10 bg-bean" />
        🐾
        <span className="h-px w-10 bg-bean" />
      </div>
      {sub && <p className="mx-auto mt-4 max-w-xl text-cocoa/75">{sub}</p>}
    </div>
  );
}
