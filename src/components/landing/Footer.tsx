import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-sky text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <Image src="/images/logo.webp" alt="" width={72} height={72} className="mb-3 h-18 w-18 rounded-full object-cover ring-4 ring-white/40" />
          <p className="font-display text-2xl font-bold">Pumpkin&amp;Melone Soy Milk</p>
          <p className="mt-2 text-sm text-white/90">🥛 {site.tagline}</p>
        </div>
        <div className="space-y-1 text-sm">
          <p>📍 {site.address}</p>
          <p>
            📞 <a href={`tel:${site.phone}`} className="font-semibold underline-offset-2 hover:underline">{site.phoneDisplay}</a>
          </p>
        </div>
        <div className="space-y-1 text-sm">
          <p>🕔 เปิด จันทร์–เสาร์ {site.open} – {site.close} น.</p>
          <p>🔴 หยุดวันอาทิตย์</p>
          <p className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">🚫 ไม่มีบริการ Delivery</p>
        </div>
      </div>
      <p className="border-t border-white/20 py-4 text-center text-xs text-white/75">
        © {new Date().getFullYear()} Pumpkin&amp;Melone Soy Milk • ทำด้วยใจ 💛
        <Link href="/admin" className="ml-3 text-white/50 hover:text-white">🛡️ สำหรับแอดมิน</Link>
      </p>
    </footer>
  );
}
