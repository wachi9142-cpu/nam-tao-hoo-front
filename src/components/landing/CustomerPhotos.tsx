"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { seedPhotos, type Photo } from "@/data/site";
import { fmtDate, useAuth, useLocalList } from "@/lib/auth";
import { Avatar, Stars } from "./Reviews";
import { SectionTitle } from "./SectionTitle";

export function CustomerPhotos() {
  const { user } = useAuth();
  const [photos, save] = useLocalList<Photo>("pm.photos", seedPhotos);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | undefined>();
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(5);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);

  const pick = (f?: File) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(String(reader.result));
    reader.readAsDataURL(f);
  };

  const submit = () => {
    if (!user) return;
    save([{ id: `p${Date.now()}`, user: user.name, caption: caption.trim() || "📸", rating, emoji: "📷", src, date: new Date().toISOString() }, ...photos]);
    setOpen(false);
    setSrc(undefined);
    setCaption("");
    setRating(5);
  };

  return (
    <section id="photos" className="bg-milk py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="ช่วงเวลาดี ๆ ที่ลูกค้าเก็บไว้ให้เรา">ลูกค้าของเราฝากรูปไว้ 📸</SectionTitle>

        <div className="mb-6 text-center">
          {user ? (
            <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-sky px-6 py-3 font-semibold text-white shadow-md shadow-sky/30 hover:bg-sky-deep">
              ＋ เพิ่มรูป
            </button>
          ) : (
            <p className="text-sm text-cocoa/75">
              <Link href="/login" className="font-semibold text-sky-deep underline">เข้าสู่ระบบ</Link> เพื่อฝากรูปไว้ที่ร้าน
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((p, i) => (
            <figure key={p.id} className="overflow-hidden rounded-3xl bg-cream shadow-sm ring-1 ring-bean/50">
              <div className="flex items-center gap-2 p-3">
                <Avatar name={p.user} i={i} />
                <div>
                  <p className="font-display text-sm font-bold text-cocoa">{p.user}</p>
                  <Stars n={p.rating} />
                </div>
              </div>
              {p.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.src} alt={p.caption} className="aspect-square w-full object-cover" />
              ) : (
                <div className="grid aspect-square place-items-center text-6xl">{p.emoji}</div>
              )}
              <figcaption className="p-3 text-xs">
                <p className="text-cocoa/85">“{p.caption}”</p>
                <p className="mt-1 text-cocoa/55">📅 {fmtDate(p.date)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-cocoa/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-3xl bg-milk p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold text-sky-deep">📸 เพิ่มรูป</h3>
            <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => pick(e.target.files?.[0])} />
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <button type="button" onClick={() => camRef.current?.click()} className="rounded-2xl bg-cream py-3 font-semibold ring-1 ring-bean/60 hover:bg-white">📷 ถ่ายรูป</button>
              <button type="button" onClick={() => fileRef.current?.click()} className="rounded-2xl bg-cream py-3 font-semibold ring-1 ring-bean/60 hover:bg-white">🖼️ เลือกรูปจากเครื่อง</button>
            </div>
            {src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="preview" className="mt-3 aspect-video w-full rounded-2xl object-cover" />
            )}
            <label className="mt-4 block text-sm font-semibold text-cocoa">✍️ เขียนข้อความ</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="เช่น น้ำเต้าหู้ร้อน ๆ ตอนเช้า" className="mt-1 w-full rounded-2xl bg-cream px-3 py-2 text-sm outline-none ring-1 ring-bean/50 focus:ring-sky" />
            <p className="mt-4 text-sm font-semibold text-cocoa">⭐ ให้คะแนน</p>
            <div className="mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className={`text-2xl ${n <= rating ? "text-honey" : "text-bean"}`} aria-label={`${n} ดาว`}>★</button>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2 text-sm">
              <button type="button" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 font-semibold text-cocoa/70 hover:bg-cream">ยกเลิก</button>
              <button type="button" onClick={submit} className="rounded-full bg-sky px-5 py-2 font-semibold text-white hover:bg-sky-deep">โพสต์</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
