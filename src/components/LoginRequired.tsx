"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Sends the user to /login and back to the page they were on afterwards
export function useLoginHref() {
  const pathname = usePathname();
  return `/login?next=${encodeURIComponent(pathname || "/")}`;
}

// Same prompt everywhere on the site — one account works for every shop
export function LoginRequired({ action = "เขียนรีวิว" }: { action?: string }) {
  const href = useLoginHref();
  return (
    <div className="rounded-2xl bg-cream p-4 text-center ring-1 ring-bean/50">
      <p className="font-display font-bold text-cocoa">✍️ {action}</p>
      <p className="mt-1 text-sm text-cocoa/70">กรุณาเข้าสู่ระบบก่อน{action}</p>
      <Link href={href} className="mt-3 inline-block rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky/30 hover:bg-sky-deep">
        🔐 เข้าสู่ระบบ
      </Link>
      <p className="mt-2 text-[11px] text-cocoa/50">บัญชีเดียวใช้ได้ทุกร้านในเว็บ ไม่ต้องเข้าสู่ระบบซ้ำ</p>
    </div>
  );
}
