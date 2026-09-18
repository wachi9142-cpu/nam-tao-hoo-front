import Link from "next/link";

const links = [
  { href: "/#location", icon: "📍", label: "ร้านอยู่ที่ไหน" },
  { href: "/#reviews", icon: "⭐", label: "รีวิว" },
  { href: "/#photos", icon: "📸", label: "รูปลูกค้า" },
];

// Floating quick-nav pinned to the right edge (desktop) / bottom (mobile)
export function SideRail() {
  return (
    <nav
      aria-label="ทางลัด"
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-full bg-milk/95 p-2 shadow-lg ring-1 ring-bean/60 backdrop-blur md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:rounded-3xl"
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold text-cocoa transition hover:bg-sky hover:text-white sm:text-sm md:flex-col md:gap-0.5 md:rounded-2xl md:px-2 md:py-2"
        >
          <span className="text-xl">{l.icon}</span>
          <span className="md:text-[10px]">{l.label}</span>
        </Link>
      ))}
    </nav>
  );
}
