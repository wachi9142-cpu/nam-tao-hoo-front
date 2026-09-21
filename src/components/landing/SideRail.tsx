import Link from "next/link";

const links = [
  { href: "/#location", icon: "📍", label: "ร้านอยู่ที่ไหน" },
  { href: "/#reviews", icon: "⭐", label: "รีวิว" },
  { href: "/#photos", icon: "📸", label: "รูปลูกค้า" },
  { href: "/#nearby", icon: "🗺️", label: "ร้านใกล้ ๆ" },
];

// Floating quick-nav: bottom pill up to lg, pinned to the right edge from xl (where the page has side margin)
export function SideRail() {
  return (
    <nav
      aria-label="ทางลัด"
      className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 gap-1 rounded-full bg-milk/95 p-1.5 shadow-lg ring-1 ring-bean/60 backdrop-blur sm:gap-2 sm:p-2 xl:bottom-auto xl:left-auto xl:right-4 xl:top-1/2 xl:max-w-none xl:-translate-x-0 xl:-translate-y-1/2 xl:flex-col xl:rounded-3xl"
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group flex flex-col items-center gap-0.5 whitespace-nowrap rounded-2xl px-2.5 py-1.5 text-[10px] font-semibold text-cocoa transition hover:bg-sky hover:text-white sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-3 sm:py-2 sm:text-sm xl:flex-col xl:gap-0.5 xl:rounded-2xl xl:px-2 xl:py-2 xl:text-[10px]"
        >
          <span className="text-xl">{l.icon}</span>
          <span>{l.label}</span>
        </Link>
      ))}
    </nav>
  );
}
