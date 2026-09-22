"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { NearbyPhoto, PhotoSlot } from "@/data/site";
import { useAuth } from "@/lib/auth";
import { fileToDataUrl } from "@/lib/image";
import { readPhotos, setPhoto, type ShopPhoto } from "@/lib/shopContent";

type Props = { scope: string; slots: PhotoSlot[]; seed: NearbyPhoto[]; title?: string };

// Gallery with named slots. Static photos from site data fill the first slots;
// the admin can add/replace/remove a photo in any slot from the page itself.
// Customers just see the photos (and a "รอรูปจริง" placeholder for empty slots).
export function ShopGallery({ scope, slots, seed, title = "🏠 ภาพหน้าร้าน" }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [custom, setCustom] = useState<Record<string, ShopPhoto>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<{ src: string; caption: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const targetSlot = useRef<string>("");

  useEffect(() => {
    const id = setTimeout(() => setCustom(readPhotos(scope)), 0);
    return () => clearTimeout(id);
  }, [scope]);

  const pickFor = (slot: string) => {
    targetSlot.current = slot;
    fileRef.current?.click();
  };

  const onFile = async (f?: File) => {
    if (!f || !user) return;
    const slot = targetSlot.current;
    setBusy(slot);
    try {
      const src = await fileToDataUrl(f, 1400, 0.8);
      const label = slots.find((s) => s.id === slot)?.label ?? "";
      const caption = prompt("คำบรรยายรูป (เว้นว่างได้)", label) ?? label;
      setCustom(setPhoto(scope, slot, { src, caption: caption.trim() || label, by: user.name, date: new Date().toISOString() }));
    } finally {
      setBusy(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = (slot: string) => {
    if (!confirm("ลบรูปในช่องนี้?")) return;
    setCustom(setPhoto(scope, slot, null));
  };

  // resolve what each slot shows: admin upload > static seed (in order) > empty
  const resolved = slots.map((slot, i) => {
    const up = custom[slot.id];
    if (up) return { slot, src: up.src, caption: up.caption, custom: true };
    const st = seed[i];
    if (st) return { slot, src: st.src, caption: st.caption, custom: false };
    return { slot, src: null, caption: "", custom: false };
  });

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl font-bold text-pumpkin">{title}</h2>
        {isAdmin && <span className="rounded-full bg-sky/15 px-3 py-1 text-xs font-semibold text-sky-deep ring-1 ring-sky/40">🛡️ โหมดแอดมิน — แตะช่องเพื่อเพิ่ม/เปลี่ยนรูป</span>}
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {resolved.map(({ slot, src, caption, custom: isCustom }) => (
          <figure key={slot.id} className="relative overflow-hidden rounded-2xl bg-milk ring-1 ring-bean/50">
            {src ? (
              <button type="button" onClick={() => setOpen({ src, caption })} className="block w-full cursor-zoom-in">
                {isCustom ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={caption} className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <Image src={src} alt={caption} width={600} height={450} className="aspect-[4/3] w-full object-cover" />
                )}
              </button>
            ) : isAdmin ? (
              <button
                type="button"
                onClick={() => pickFor(slot.id)}
                disabled={busy === slot.id}
                className="grid aspect-[4/3] w-full place-items-center border-2 border-dashed border-sky/60 bg-sky/5 text-center text-xs text-sky-deep hover:bg-sky/10"
              >
                <span>
                  <span className="block text-2xl">{busy === slot.id ? "⏳" : "＋"}</span>
                  เพิ่มภาพ{slot.label}
                </span>
              </button>
            ) : (
              <div className="grid aspect-[4/3] place-items-center border-2 border-dashed border-bean/60 bg-cream text-center text-xs text-cocoa/50">
                <span>
                  <span className="block text-2xl">{slot.emoji}</span>
                  {slot.label}
                  <br />
                  <span className="text-[10px]">(รอรูปจริงจากร้าน)</span>
                </span>
              </div>
            )}
            <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-cocoa/70">
              <span className="truncate">
                {slot.emoji} {caption || slot.label}
              </span>
              {isAdmin && src && (
                <span className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => pickFor(slot.id)} className="rounded-full bg-cream px-2 py-0.5 font-semibold ring-1 ring-bean/60 hover:bg-white">
                    เปลี่ยน
                  </button>
                  {isCustom && (
                    <button type="button" onClick={() => remove(slot.id)} className="rounded-full bg-cream px-2 py-0.5 font-semibold text-blush ring-1 ring-blush/60 hover:bg-white">
                      ลบ
                    </button>
                  )}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-cocoa/90 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <button type="button" onClick={() => setOpen(null)} aria-label="ปิด" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-milk/90 text-lg text-cocoa shadow ring-1 ring-bean">
            ✕
          </button>
          <div className="relative min-h-0 flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.caption} className="h-full w-full object-contain" />
          </div>
          <p className="bg-milk px-5 py-4 text-center text-sm text-cocoa">{open.caption}</p>
        </div>
      )}
    </section>
  );
}
