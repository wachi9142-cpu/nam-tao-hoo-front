"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { grocery, herbalDrinks, menu, nearbyShops } from "@/data/site";

type Hit = { label: string; sub: string; href: string; emoji: string };

// Everything searchable on the site, built once from the data file
const index: Hit[] = [
  { label: "หน้าแรก", sub: "หน้าแรกของร้าน", href: "/", emoji: "🏠" },
  { label: "เกี่ยวกับร้าน", sub: "เรื่องราวของแม่", href: "/#about", emoji: "💙" },
  { label: "เวลาเปิด–ปิด", sub: "จันทร์–เสาร์ 05:30–08:00", href: "/#hours", emoji: "🕔" },
  { label: "ติดต่อเรา / แผนที่", sub: "ที่อยู่ โทร แผนที่", href: "/#location", emoji: "📍" },
  { label: "รีวิว", sub: "รีวิวจากลูกค้า", href: "/#reviews", emoji: "⭐" },
  { label: "รูปลูกค้า", sub: "แกลเลอรีจากลูกค้า", href: "/#photos", emoji: "📸" },
  { label: "เช็กอิน", sub: "ฉันมาถึงร้านแล้ว", href: "/#checkin", emoji: "📍" },
  { label: "วิของชำ", sub: "ร้านของชำของครอบครัว", href: "/grocery", emoji: "🛒" },
  { label: "น้ำสมุนไพรโฮมเมด", sub: "แม่ทำเอง มีตามวัน", href: "/herbal", emoji: "🌿" },
  ...menu.flatMap((c) => c.items.map((i) => ({ label: i.name, sub: `${c.title} • ${i.price} บาท`, href: "/#menu", emoji: c.emoji }))),
  ...herbalDrinks.map((d) => ({ label: d.name, sub: `น้ำสมุนไพร • ${d.price} บาท`, href: "/herbal", emoji: d.emoji })),
  { label: "ร้านใกล้ ๆ", sub: "ร้านน่าสนใจใกล้ Pumpkin&Melone", href: "/#nearby", emoji: "🗺️" },
  ...nearbyShops.map((n) => ({ label: n.name, sub: `ร้านใกล้เคียง • ${n.type}`, href: `/nearby/${n.slug}`, emoji: n.emoji })),
  ...grocery.flatMap((c) => c.items.map((i) => ({ label: i, sub: `วิของชำ • ${c.title}`, href: "/grocery", emoji: c.emoji }))),
];

export function SearchBox({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return index.filter((h) => h.label.toLowerCase().includes(s) || h.sub.toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative w-full lg:w-32 xl:w-40 2xl:w-52">
      <label className="flex items-center gap-2 rounded-full bg-milk px-3 py-1.5 ring-1 ring-bean/60 focus-within:ring-sky">
        <span aria-hidden>🔍</span>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="ค้นหา…"
          aria-label="ค้นหา"
          className="w-full bg-transparent text-sm outline-none placeholder:text-cocoa/40"
        />
      </label>
      {open && q.trim() && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-2xl bg-milk p-1 shadow-xl ring-1 ring-bean/60 md:w-72">
          {hits.length === 0 && <li className="px-3 py-3 text-sm text-cocoa/60">ไม่พบ “{q}”</li>}
          {hits.map((h) => (
            <li key={h.href + h.label}>
              <Link
                href={h.href}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                  onNavigate?.();
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-cream"
              >
                <span className="text-xl">{h.emoji}</span>
                <span className="text-sm">
                  <span className="block font-semibold text-cocoa">{h.label}</span>
                  <span className="text-xs text-cocoa/60">{h.sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
