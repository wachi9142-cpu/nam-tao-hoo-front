"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { seedPhotos, type Photo } from "@/data/site";
import { useMyActivity } from "@/lib/activity";
import { fmtDate, fmtDateTime, useAuth, useLocalList } from "@/lib/auth";
import { reviewScopes } from "@/lib/scopes";

type Tab = "reviews" | "likes" | "photos" | "checkins" | "settings";

const tabs: { id: Tab; label: string }[] = [
  { id: "reviews", label: "⭐ รีวิวของฉัน" },
  { id: "likes", label: "❤️ ที่ฉันถูกใจ" },
  { id: "photos", label: "📸 รูปของฉัน" },
  { id: "checkins", label: "📍 ประวัติการเช็กอิน" },
  { id: "settings", label: "⚙️ ตั้งค่าบัญชี" },
];

const providerLabel: Record<string, string> = { line: "LINE", facebook: "Facebook", instagram: "Instagram", google: "Google" };

function Empty({ text, href }: { text: string; href: string }) {
  return (
    <p className="rounded-2xl bg-cream p-6 text-center text-sm text-cocoa/65">
      {text} — <Link href={href} className="font-semibold text-sky-deep underline">ไปที่หน้าร้าน</Link>
    </p>
  );
}

// Small "which shop" chip used on every activity row
function ShopTag({ emoji, name, href }: { emoji: string; name: string; href: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 rounded-full bg-honey/25 px-2.5 py-0.5 text-xs font-semibold text-cocoa ring-1 ring-honey/50 hover:bg-honey/40">
      {emoji} {name}
    </Link>
  );
}

export default function ProfilePage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("reviews");
  const [photos] = useLocalList<Photo>("pm.photos", seedPhotos);
  // one account → reviews, likes and check-ins from every shop on the site
  const mine = useMyActivity(user);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
    if (ready && user?.role === "admin") router.replace("/admin");
  }, [ready, user, router]);

  if (!user) return null;

  const myPhotos = photos.filter((p) => p.user === user.name);
  const shopsVisited = new Set(mine.checkins.map((c) => c.shop.scope)).size;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-4 rounded-[2rem] bg-milk p-6 ring-1 ring-bean/50">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-sky/25 text-5xl">{user.avatar}</span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-bold text-sky-deep">👤 {user.name}</h1>
          <p className="text-sm text-cocoa/65">เข้าสู่ระบบด้วย {providerLabel[user.provider] ?? user.provider} • บัญชีเดียวใช้ได้ทุกร้านในเว็บ</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-cocoa/75">
            <span>⭐ {mine.reviews.length} รีวิว</span>
            <span>❤️ {mine.likes.length} ถูกใจ</span>
            <span>📍 เช็กอิน {mine.checkins.length} ครั้ง ({shopsVisited} ร้าน)</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="rounded-full bg-cream px-4 py-2 text-sm font-semibold ring-1 ring-bean hover:bg-white"
        >
          🚪 ออกจากระบบ
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === t.id ? "bg-sky text-white" : "bg-milk ring-1 ring-bean/60 hover:bg-white"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {tab === "reviews" &&
          (mine.reviews.length ? (
            mine.reviews.map((r) => (
              <div key={`${r.shop.scope}-${r.id}`} className="rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <ShopTag emoji={r.shop.emoji} name={r.shop.name} href={r.shop.href} />
                  <span className="text-honey">{"★".repeat(r.rating)}</span>
                </div>
                <p className="mt-2 text-sm">“{r.text}”</p>
                {r.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.image} alt="" className="mt-2 h-24 w-32 rounded-xl object-cover ring-1 ring-bean/40" />
                )}
                <p className="mt-2 text-xs text-cocoa/60">
                  📅 {fmtDate(r.date)} • ❤️ {r.likeCount} คนถูกใจ
                  {r.checkedIn && <span className="ml-2 rounded-full bg-leaf/20 px-2 py-0.5 font-semibold text-leaf">📍 เช็กอินร้านแล้ว</span>}
                </p>
              </div>
            ))
          ) : (
            <Empty text="ยังไม่มีรีวิว" href="/#reviews" />
          ))}

        {tab === "likes" &&
          (mine.likes.length ? (
            mine.likes.map(({ shop, review, likeCount }) => (
              <div key={`${shop.scope}-${review.id}`} className="rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <ShopTag emoji={shop.emoji} name={shop.name} href={shop.href} />
                  <span className="text-xs text-cocoa/60">❤️ {likeCount} คนถูกใจ</span>
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-semibold text-cocoa">{review.user}</span> <span className="text-honey">{"★".repeat(review.rating)}</span>
                </p>
                <p className="mt-1 text-sm text-cocoa/85">“{review.text}”</p>
              </div>
            ))
          ) : (
            <Empty text="ยังไม่ได้กดถูกใจรีวิวไหน" href="/#reviews" />
          ))}

        {tab === "photos" &&
          (myPhotos.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {myPhotos.map((p) => (
                <figure key={p.id} className="overflow-hidden rounded-2xl bg-milk ring-1 ring-bean/50">
                  {p.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.src} alt={p.caption} className="aspect-square w-full object-cover" />
                  ) : (
                    <div className="grid aspect-square place-items-center text-5xl">{p.emoji}</div>
                  )}
                  <figcaption className="p-2 text-xs">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <Empty text="ยังไม่มีรูป" href="/#photos" />
          ))}

        {tab === "checkins" &&
          (mine.checkins.length ? (
            mine.checkins.map((c, i) => (
              <div key={`${c.shop.scope}-${c.date}-${i}`} className="rounded-2xl bg-milk p-4 text-sm ring-1 ring-bean/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-sky-deep">📍 {c.shop.emoji} {c.shop.name}</p>
                  <span className="text-xs text-cocoa/60">{fmtDateTime(c.date)}</span>
                </div>
                {c.message && <p className="mt-1">“{c.message}”</p>}
              </div>
            ))
          ) : (
            <Empty text="ยังไม่เคยเช็กอิน" href="/#checkin" />
          ))}

        {tab === "settings" && (
          <div className="rounded-2xl bg-milk p-6 text-sm ring-1 ring-bean/50">
            <label className="block font-semibold">ชื่อที่แสดง</label>
            <input defaultValue={user.name} disabled className="mt-1 w-full rounded-xl bg-cream px-3 py-2 ring-1 ring-bean/50" />
            <p className="mt-2 text-xs text-cocoa/50">การแก้ไขบัญชีจะเปิดใช้เมื่อเชื่อมต่อระบบหลังบ้าน</p>
            <p className="mt-4 font-semibold">ร้านที่ใช้บัญชีนี้ได้</p>
            <ul className="mt-1 flex flex-wrap gap-2">
              {reviewScopes.map((s) => (
                <li key={s.scope}>
                  <ShopTag emoji={s.emoji} name={s.name} href={s.href} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
