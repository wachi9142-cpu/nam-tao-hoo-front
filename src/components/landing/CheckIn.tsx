"use client";

import Link from "next/link";
import { useState } from "react";
import { seedCheckIns, type CheckIn as CheckInT } from "@/data/site";
import { fmtDateTime, useAuth, useLocalList } from "@/lib/auth";
import { useLoginHref } from "@/components/LoginRequired";

const quick = ["แวะเติมพลังตอนเช้า 🥛🐱", "มาซื้อฝากที่บ้าน 💛", "ทรงเครื่องเต็มแก้ว 🫘", "มาก่อนหมด! 🏃"];

export function CheckIn() {
  const { user } = useAuth();
  const loginHref = useLoginHref();
  const [items, save] = useLocalList<CheckInT>("pm.checkins", seedCheckIns);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const checkIn = () => {
    if (!user) return;
    save([{ id: `c${Date.now()}`, user: user.name, avatar: user.avatar, message: msg.trim() || "ฉันมาถึงร้านแล้ว! 🥛🐱", date: new Date().toISOString(), emoji: "📍" }, ...items]);
    setMsg("");
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <section id="checkin" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid min-w-0 gap-8 md:grid-cols-2">
        <div className="min-w-0 rounded-[2rem] bg-sky p-6 text-center sm:p-8 text-white shadow-xl shadow-sky/30">
          <p className="text-6xl">📍</p>
          <h2 className="font-display mt-3 text-3xl font-bold">เช็กอินที่ Pumpkin&amp;Melone</h2>
          <p className="mt-1 text-white/90">ฉันมาถึงร้านแล้ว! 🥛🐱</p>
          {user ? (
            <>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {quick.map((q) => (
                  <button key={q} type="button" onClick={() => setMsg(q)} className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/60 ${msg === q ? "bg-white text-sky-deep" : "bg-white/15 hover:bg-white/25"}`}>
                    {q}
                  </button>
                ))}
              </div>
              <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="ข้อความสั้น ๆ…" className="mt-3 w-full rounded-full bg-white px-4 py-2 text-sm text-cocoa outline-none" />
              <button type="button" onClick={checkIn} className="font-display mt-4 w-full rounded-full bg-milk py-4 text-xl font-bold text-sky-deep shadow-lg transition hover:scale-[1.02]">
                {done ? "✅ เช็กอินแล้ว!" : "📍 เช็กอินเลย"}
              </button>
            </>
          ) : (
            <Link href={loginHref} className="font-display mt-6 block w-full rounded-full bg-milk py-4 text-xl font-bold text-sky-deep shadow-lg transition hover:scale-[1.02]">
              👤 เข้าสู่ระบบเพื่อเช็กอิน
            </Link>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-pumpkin">🐾 ใครแวะมาบ้างวันนี้</h3>
          <ul className="mt-4 space-y-3">
            {items.slice(0, 5).map((c) => (
              <li key={c.id} className="flex gap-3 rounded-3xl bg-milk p-4 ring-1 ring-bean/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sky/25 text-2xl">{c.avatar}</span>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-semibold text-sky-deep">📍 {c.user} เช็กอินแล้ว</p>
                  <p className="text-xs text-cocoa/60 break-words">Pumpkin&amp;Melone Soy Milk • {fmtDateTime(c.date)}</p>
                  <p className="mt-1 text-cocoa/85">“{c.message}”</p>
                </div>
                <span className="shrink-0 text-2xl">{c.emoji}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
