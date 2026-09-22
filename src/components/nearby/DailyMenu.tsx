"use client";

import { useEffect, useState } from "react";
import { fmtDate, useAuth } from "@/lib/auth";
import { bangkokDay, readToday, setToday, type TodayMenu } from "@/lib/shopContent";

type Props = { scope: string; title: string; hint: string; phone?: string; phoneDisplay?: string };

// "What's on today" board for shops whose menu changes daily.
// Only the admin posts it; it shows the date it was posted, and is flagged stale
// once that day has passed so customers never see yesterday's list as today's.
export function DailyMenu({ scope, title, hint, phone, phoneDisplay }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [menu, setMenu] = useState<TodayMenu | null>(null);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setMenu(readToday(scope)), 0);
    return () => clearTimeout(id);
  }, [scope]);

  const isToday = !!menu && menu.date === bangkokDay();

  const startEdit = () => {
    setText(menu?.items.join("\n") ?? "");
    setNote(menu?.note ?? "");
    setEditing(true);
  };

  const save = () => {
    if (!user) return;
    const items = text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!items.length) return;
    setMenu(setToday(scope, { date: bangkokDay(), items, note: note.trim() || undefined, by: user.name }));
    setEditing(false);
  };

  const clear = () => {
    if (!confirm("ลบเมนูประจำวัน?")) return;
    setToday(scope, null);
    setMenu(null);
  };

  return (
    <section className="mt-8 rounded-3xl bg-honey/15 p-6 ring-1 ring-honey/50">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl font-bold text-pumpkin">{title}</h2>
        {isAdmin && !editing && (
          <div className="flex gap-2 text-xs">
            <button type="button" onClick={startEdit} className="rounded-full bg-sky px-3 py-1.5 font-semibold text-white hover:bg-sky-deep">
              🛡️ {isToday ? "แก้เมนูวันนี้" : "โพสต์เมนูวันนี้"}
            </button>
            {menu && (
              <button type="button" onClick={clear} className="rounded-full bg-milk px-3 py-1.5 font-semibold text-blush ring-1 ring-blush/60">
                ลบ
              </button>
            )}
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-cocoa/60">📌 {hint}</p>

      {editing ? (
        <div className="mt-3 rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
          <label className="text-sm font-semibold text-cocoa">เมนูวันนี้ (บรรทัดละ 1 เมนู)</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder={"แกงเขียวหวานไก่\nผัดกะเพราหมู\nไข่พะโล้\nขนมครก"}
            className="mt-1 w-full rounded-2xl bg-cream p-3 text-sm outline-none ring-1 ring-bean/50 focus:ring-sky"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="หมายเหตุ (เช่น วันนี้มีชุดใส่บาตร 3 ชุด)"
            className="mt-2 w-full rounded-2xl bg-cream px-3 py-2 text-sm outline-none ring-1 ring-bean/50 focus:ring-sky"
          />
          <div className="mt-3 flex justify-end gap-2 text-sm">
            <button type="button" onClick={() => setEditing(false)} className="rounded-full px-4 py-2 font-semibold text-cocoa/70 hover:bg-cream">
              ยกเลิก
            </button>
            <button type="button" onClick={save} disabled={!text.trim()} className="rounded-full bg-sky px-5 py-2 font-semibold text-white disabled:opacity-50">
              บันทึกเมนูวันนี้
            </button>
          </div>
        </div>
      ) : menu ? (
        <div className="mt-3">
          <p className={`text-sm font-semibold ${isToday ? "text-leaf" : "text-blush"}`}>
            {isToday ? "🟢 เมนูวันนี้" : "⚠️ เมนูล่าสุด"} • อัปเดต {fmtDate(menu.date)} โดย 🛡️ {menu.by}
            {!isToday && <span className="ml-1 font-normal text-cocoa/60">(ยังไม่ได้อัปเดตของวันนี้ — โทรสอบถามก่อนนะคะ)</span>}
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {menu.items.map((it, i) => (
              <li key={i} className="rounded-2xl bg-milk px-4 py-2.5 text-sm font-semibold text-cocoa ring-1 ring-bean/50">
                🍛 {it}
              </li>
            ))}
          </ul>
          {menu.note && <p className="mt-2 text-sm text-cocoa/75">📝 {menu.note}</p>}
        </div>
      ) : (
        <div className="mt-3 rounded-2xl bg-milk p-4 text-sm text-cocoa/75 ring-1 ring-bean/50">
          วันนี้ร้านยังไม่ได้อัปเดตเมนู — เมนูมีหลายอย่างและเปลี่ยนไปในแต่ละวัน
          {phone ? (
            <>
              {" "}
              <a href={`tel:${phone}`} className="font-semibold text-sky-deep underline">
                📞 โทรสอบถาม {phoneDisplay}
              </a>
            </>
          ) : (
            " แวะมาดูที่หน้าร้านได้เลยค่ะ"
          )}
        </div>
      )}
    </section>
  );
}
