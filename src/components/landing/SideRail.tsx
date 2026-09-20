import Link from "next/link";

const links = [
  { href: "/#location", icon: "📍", label: "ร้านอยู่ที่ไหน" },
  { href: "/#reviews", icon: "⭐", label: "รีวิว" },
  { href: "/#photos", icon: "📸", label: "รูปลูกค้า" },
  { href: "/#nearby", icon: "🗺️", label: "ร้านใกล้ ๆ" },
];

// Floating quick-nav pinned to the right edge (desktop) / bottom (mobile)
export function SideRail() {
  return (
    <nav
      aria-label="ทางลัด"
      className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 gap-1 rounded-full bg-milk/95 p-1.5 shadow-lg ring-1 ring-bean/60 backdrop-blur sm:gap-2 sm:p-2 md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:max-w-none md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:rounded-3xl"
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group flex flex-col items-center gap-0.5 whitespace-nowrap rounded-2xl px-2.5 py-1.5 text-[10px] font-semibold text-cocoa transition hover:bg-sky hover:text-white sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-3 sm:py-2 sm:text-sm md:flex-col md:gap-0.5 md:rounded-2xl md:px-2 md:py-2 md:text-[10px]"
        >
          <span className="text-xl">{l.icon}</span>
          <span>{l.label}</span>
        </Link>
      ))}
    </nav>
  );
}
