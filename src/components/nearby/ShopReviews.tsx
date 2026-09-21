"use client";

import { useRef, useState } from "react";
import type { ShopReview } from "@/data/site";
import { fmtDate, useAuth, useLocalList } from "@/lib/auth";
import { LikeButton, useLikes } from "@/lib/likes";
import { fileToDataUrl } from "@/lib/image";
import { checkinsKey, reviewsKey } from "@/lib/scopes";
import { Avatar, Stars } from "@/components/landing/Reviews";
import { LoginRequired } from "@/components/LoginRequired";
import { OwnerReplyBox, ReportMenu } from "@/components/reviews/ReviewExtras";

type Props = { slug: string; shopName: string; emoji: string; seed: ShopReview[] };
export type ShopCheckIn = { user: string; date: string };

// Per-shop reviews: rating, text, optional photo, likes, check-in badge and report.
// One site-wide account (useAuth) is used for every shop; data is stored per scope
// (see lib/scopes) in localStorage until the backend API exists.
export function ShopReviews({ slug, shopName, emoji, seed }: Props) {
  const { user } = useAuth();
  const [reviews, save] = useLocalList<ShopReview>(reviewsKey(slug), seed);
  const likes = useLikes(slug);
  // who tapped "เช็กอิน" here and when — a review from them gets the 📍 badge
  const [checkins, setCheckins] = useLocalList<ShopCheckIn>(checkinsKey(slug), []);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);

  const count = reviews.length;
  const avg = count ? reviews.reduce((a, r) => a + r.rating, 0) / count : 0;
  const checkedIn = !!user && checkins.some((c) => c.user === user.name);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2500);
  };

  const pick = (f?: File) => {
    if (!f) return;
    fileToDataUrl(f).then(setImage).catch(() => flash("⚠️ เปิดรูปไม่ได้ ลองรูปอื่นนะคะ"));
  };

  const checkIn = () => {
    if (!user) return;
    if (!checkedIn) setCheckins([...checkins, { user: user.name, date: new Date().toISOString() }]);
    flash(`📍 เช็กอินที่${shopName}แล้ว`);
  };

  const submit = () => {
    if (!user || !text.trim()) return;
    save([
      { id: `${slug}-${Date.now()}`, user: user.name, avatar: user.avatar, rating, text: text.trim(), date: new Date().toISOString(), likes: 0, image, checkedIn },
      ...reviews,
    ]);
    setOpen(false);
    setText("");
    setImage(undefined);
    setRating(5);
    flash("✅ ขอบคุณสำหรับรีวิวค่ะ");
  };

  return (
    <section id="reviews" className="mt-8">
      {/* summary + actions */}
      <div className="rounded-3xl bg-milk p-6 ring-1 ring-bean/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-pumpkin">
              {emoji} รีวิว{shopName}
            </h2>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-3xl font-bold text-cocoa">⭐ {count ? avg.toFixed(1) : "–"} / 5</span>
              <span className="text-sm text-cocoa/60">จาก {count} รีวิว</span>
            </p>
          </div>
          {user ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={checkIn}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-bean transition ${checkedIn ? "bg-leaf/20 text-leaf" : "bg-cream text-cocoa hover:bg-white"}`}
              >
                {checkedIn ? "📍 เช็กอินแล้ว" : "📍 เช็กอินร้านนี้"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky/30 hover:bg-sky-deep"
              >
                ✍️ เขียนรีวิว
              </button>
            </div>
          ) : null}
        </div>
        {!user && (
          <div className="mt-4">
            <LoginRequired />
          </div>
        )}
        {toast && <p className="mt-3 rounded-xl bg-leaf/15 px-3 py-2 text-sm font-semibold text-leaf">{toast}</p>}
      </div>

      {/* list */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {reviews.map((r, i) => {
          return (
            <article key={r.id} className="flex flex-col rounded-3xl bg-milk p-5 shadow-sm ring-1 ring-bean/50">
              <div className="flex items-start gap-3">
                <Avatar name={r.user} i={i} />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-cocoa">
                    👤 {r.user}
                    {r.checkedIn && (
                      <span className="ml-2 rounded-full bg-leaf/20 px-2 py-0.5 text-[11px] font-semibold text-leaf">📍 เช็กอินร้านแล้ว</span>
                    )}
                  </p>
                  <Stars n={r.rating} />
                </div>
                <ReportMenu scope={slug} reviewId={r.id} onReported={() => flash("🚩 รายงานแล้ว ขอบคุณค่ะ แอดมินจะตรวจสอบ")} />
              </div>

              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cocoa/85">“{r.text}”</blockquote>

              {r.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.image} alt={`รูปจาก ${r.user}`} className="mt-3 aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-bean/40" />
              )}
              <OwnerReplyBox reply={r.reply} />

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-bean/40 pt-3 text-xs">
                <LikeButton id={r.id} base={r.likes} likes={likes} label="คนถูกใจ" />
                <span className="text-cocoa/55">📅 {fmtDate(r.date)}</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* write dialog */}
      {open && user && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-cocoa/50 p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-milk p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold text-sky-deep">✍️ รีวิว{shopName}</h3>
            <p className="mt-1 text-sm text-cocoa/70">
              {user.avatar} {user.name}
              {checkedIn && <span className="ml-2 rounded-full bg-leaf/20 px-2 py-0.5 text-[11px] font-semibold text-leaf">📍 เช็กอินร้านแล้ว</span>}
            </p>

            <p className="mt-4 text-sm font-semibold text-cocoa">⭐ ให้คะแนน</p>
            <div className="mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className={`text-3xl ${n <= rating ? "text-honey" : "text-bean"}`} aria-label={`${n} ดาว`}>★</button>
              ))}
            </div>

            <label className="mt-4 block text-sm font-semibold text-cocoa">📝 เขียนรีวิว</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="หมูปิ้งเป็นยังไงบ้าง เล่าให้ฟังหน่อย…"
              rows={3}
              className="mt-1 w-full rounded-2xl bg-cream p-3 text-sm outline-none ring-1 ring-bean/50 focus:ring-sky"
            />

            <p className="mt-4 text-sm font-semibold text-cocoa">📷 แนบรูป (หมูปิ้ง / ข้าวเหนียว / หน้าร้าน)</p>
            <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => pick(e.target.files?.[0])} />
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
            <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
              <button type="button" onClick={() => camRef.current?.click()} className="rounded-2xl bg-cream py-3 font-semibold ring-1 ring-bean/60 hover:bg-white">📷 ถ่ายรูป</button>
              <button type="button" onClick={() => fileRef.current?.click()} className="rounded-2xl bg-cream py-3 font-semibold ring-1 ring-bean/60 hover:bg-white">🖼️ เลือกรูป</button>
            </div>
            {image && (
              <div className="relative mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="preview" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <button type="button" onClick={() => setImage(undefined)} className="absolute right-2 top-2 rounded-full bg-milk/90 px-2 py-1 text-xs font-semibold ring-1 ring-bean">✕ เอาออก</button>
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2 text-sm">
              <button type="button" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 font-semibold text-cocoa/70 hover:bg-cream">ยกเลิก</button>
              <button
                type="button"
                onClick={submit}
                disabled={!text.trim()}
                className="rounded-full bg-sky px-5 py-2 font-semibold text-white hover:bg-sky-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                ส่งรีวิว
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
