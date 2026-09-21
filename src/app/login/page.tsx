"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAuth, type Provider } from "@/lib/auth";

const providers: { id: Provider; icon: string; label: string; cls: string }[] = [
  { id: "line", icon: "🟢", label: "เข้าสู่ระบบด้วย LINE", cls: "bg-[#06C755] text-white hover:brightness-95" },
  { id: "facebook", icon: "🔵", label: "เข้าสู่ระบบด้วย Facebook", cls: "bg-[#1877F2] text-white hover:brightness-95" },
  { id: "instagram", icon: "📷", label: "เข้าสู่ระบบด้วย Instagram", cls: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:brightness-95" },
  { id: "google", icon: "🔴", label: "เข้าสู่ระบบด้วย Google", cls: "bg-white text-cocoa ring-1 ring-bean hover:bg-cream" },
];

function LoginForm() {
  const { user, ready, login } = useAuth();
  const router = useRouter();
  // where to go after login — only same-site paths, default to the profile
  const raw = useSearchParams().get("next") ?? "";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/profile";

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, router, next]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-16">
      <div className="w-full max-w-sm rounded-[2rem] bg-milk p-8 text-center shadow-xl ring-4 ring-sky/30">
        <div className="text-5xl">🐱</div>
        <h1 className="font-display mt-2 text-2xl font-bold text-sky-deep">เข้าสู่ Pumpkin&amp;Melone</h1>
        <p className="mt-1 text-sm text-cocoa/70">เข้าสู่ระบบเพื่อรีวิว เพิ่มรูป และเช็กอิน</p>
        <div className="mt-6 flex flex-col gap-3">
          {providers.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                // TODO: replace with real OAuth redirect from the backend
                login(p.id);
                router.push(next);
              }}
              className={`grid grid-cols-[2.5rem_1fr_2.5rem] items-center rounded-full py-3 text-base font-semibold shadow-sm transition ${p.cls}`}
            >
              <span className="text-lg leading-none" aria-hidden>{p.icon}</span>
              <span className="text-left">{p.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-[11px] text-cocoa/50">🐾 ตอนนี้เป็นโหมดทดลอง (ยังไม่เชื่อมระบบจริง)</p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
