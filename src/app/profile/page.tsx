"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { seedCheckIns, seedPhotos, seedReviews, type CheckIn, type Photo, type Review } from "@/data/site";
import { fmtDate, fmtDateTime, useAuth, useLocalList } from "@/lib/auth";

type Tab = "reviews" | "photos" | "checkins" | "settings";

const tabs: { id: Tab; label: string }[] = [
  { id: "reviews", label: "⭐ รีวิวของฉัน" },
  { id: "photos", label: "📸 รูปของฉัน" },
  { id: "checkins", label: "📍 ประวัติการเช็กอิน" },
  { id: "settings", label: "⚙️ ตั้งค่าบัญชี" },
];

function Empty({ text, href }: { text: string; href: string }) {
  return (
    <p className="rounded-2xl bg-cream p-6 text-center text-sm text-cocoa/65">
      {text} — <Link href={href} className="font-semibold text-sky-deep underline">ไปที่หน้าร้าน</Link>
    </p>
  );
}

export default function ProfilePage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("reviews");
  const [reviews] = useLocalList<Review>("pm.reviews", seedReviews);
  const [photos] = useLocalList<Photo>("pm.photos", seedPhotos);
  const [checkins] = useLocalList<CheckIn>("pm.checkins", seedCheckIns);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!user) return null;

  const mine = {
    reviews: reviews.filter((r) => r.user === user.name),
    photos: photos.filter((p) => p.user === user.name),
    checkins: checkins.filter((c) => c.user === user.name),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-4 rounded-[2rem] bg-milk p-6 ring-1 ring-bean/50">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-sky/25 text-5xl">{user.avatar}</span>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-sky-deep">👤 {user.name}</h1>
          <p className="text-sm text-cocoa/65">เข้าสู่ระบบด้วย {user.provider}</p>
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
              <div key={r.id} className="rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
                <p className="text-honey">{"★".repeat(r.rating)}</p>
                <p className="mt-1 text-sm">{r.text}</p>
                <p className="mt-1 text-xs text-cocoa/60">📅 {fmtDate(r.date)} • ❤️ {r.likes}</p>
              </div>
            ))
          ) : (
            <Empty text="ยังไม่มีรีวิว" href="/#reviews" />
          ))}

        {tab === "photos" &&
          (mine.photos.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {mine.photos.map((p) => (
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
            mine.checkins.map((c) => (
              <div key={c.id} className="rounded-2xl bg-milk p-4 text-sm ring-1 ring-bean/50">
                <p className="font-semibold text-sky-deep">📍 Pumpkin&amp;Melone Soy Milk</p>
                <p className="text-xs text-cocoa/60">{fmtDateTime(c.date)}</p>
                <p className="mt-1">“{c.message}”</p>
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
          </div>
        )}
      </div>
    </main>
  );
}
