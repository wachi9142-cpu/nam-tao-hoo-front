import Image from "next/image";
import type { CSSProperties } from "react";

// The photo stays completely still; thin wisps of steam drift up from the rim
// as a CSS overlay (no GIF, no video). Each wisp has its own delay/duration/drift
// so the loop never lines up and looks mechanical.
const wisps: { left: string; delay: string; duration: string; drift: string; width: string; scale: string }[] = [
  { left: "38%", delay: "0s", duration: "7s", drift: "-14px", width: "10px", scale: "1.6" },
  { left: "48%", delay: "1.6s", duration: "8.5s", drift: "12px", width: "13px", scale: "1.9" },
  { left: "58%", delay: "3.1s", duration: "7.8s", drift: "-8px", width: "9px", scale: "1.5" },
  { left: "44%", delay: "4.7s", duration: "9.2s", drift: "18px", width: "11px", scale: "1.7" },
];

type Props = {
  src: string;
  alt: string;
  /** where the rim of the glass sits, as % of image height — steam starts here */
  rimTop?: string;
  className?: string;
  priority?: boolean;
};

export function SteamyGlass({ src, alt, rimTop = "30%", className = "", priority }: Props) {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} alt={alt} width={900} height={1341} priority={priority} className="relative z-10 w-full rounded-[2rem] object-contain" />

      {/* steam sits above the drink, below nothing else — pointer-events none so it never blocks taps */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-20"
        style={{ top: `calc(${rimTop} - 22%)`, height: "30%" }}
      >
        {wisps.map((w, i) => (
          <span
            key={i}
            className="steam-wisp"
            style={
              {
                left: w.left,
                width: w.width,
                animationDelay: w.delay,
                animationDuration: w.duration,
                "--drift": w.drift,
                "--steam-scale": w.scale,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
