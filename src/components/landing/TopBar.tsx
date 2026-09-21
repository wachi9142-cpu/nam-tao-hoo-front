"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useAuth } from "@/lib/auth";
import { SearchBox } from "./SearchBox";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/#menu", label: "🥛 น้ำเต้าหู้" },
  { href: "/grocery", label: "🛒 วิของชำ" },
  { href: "/herbal", label: "🌿 สมุนไพรโฮมเมด" },
  { href: "/#location", label: "📍 ร้านอยู่ที่ไหน" },
  { href: "/#reviews", label: "⭐ รีวิว" },
];

const dayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสฯ", "ศุกร์", "เสาร์"];

type OpenState = { open: boolean; nextOpen: string } | null;

// Open/closed right now (Bangkok time) plus a short "opens again …" hint for when we're closed
function useOpenNow(): OpenState {
  const [state, setState] = useState<OpenState>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
      const [oh, om] = site.open.split(":").map(Number);
      const [ch, cm] = site.close.split(":").map(Number);
      const mins = now.getHours() * 60 + now.getMinutes();
      const day = now.getDay();
      const open = day !== site.closedDay && mins >= oh * 60 + om && mins < ch * 60 + cm;

      // before opening today → "วันนี้"; otherwise the next non-closed day
      let nextOpen = "";
      if (!open) {
        if (day !== site.closedDay && mins < oh * 60 + om) nextOpen = "วันนี้";
        else {
          let d = (day + 1) % 7;
          if (d === site.closedDay) d = (d + 1) % 7;
          nextOpen = d === (day + 1) % 7 ? "พรุ่งนี้" : `วัน${dayNames[d]}`;
        }
      }
      setState({ open, nextOpen });
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return state;
}

export function TopBar() {
  const status = useOpenNow();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const loginLabel = user ? `${user.avatar} ${user.name}` : "👤 เข้าสู่ระบบ";
  // admins go to the dashboard instead of a customer profile
  const loginHref = user ? (user.role === "admin" ? "/admin" : "/profile") : "/login";

  return (
    <header className="sticky top-0 z-50 border-b border-bean/40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/images/logo.webp"
            alt="Pumpkin&Melone Soy Milk"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover shadow-sm ring-2 ring-sky/40"
          />
          <span className="min-w-0 leading-tight">
            <span className="font-display block truncate text-base font-bold text-sky-deep sm:text-lg">
              Pumpkin&amp;Melone<span className="lg:hidden xl:inline"> Soy Milk</span>
            </span>
            <span className="flex flex-wrap items-center gap-x-2 text-xs text-cocoa/75">
              {status === null ? (
                <span>…</span>
              ) : status.open ? (
                <>
                  <span className="font-semibold text-leaf">🟢 เปิดอยู่</span>
                  <span>ถึง {site.close} น.</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-blush">🔴 ปิดอยู่</span>
                  <span>
                    เปิด{status.nextOpen} {site.open} น.
                  </span>
                </>
              )}
              <span className="hidden sm:inline">• ปิดทุกวันอาทิตย์</span>
            </span>
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-2 text-sm font-medium lg:flex xl:gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap transition hover:text-sky-deep">
              {l.label}
            </Link>
          ))}
          <SearchBox />
          <Link
            href={loginHref}
            className="whitespace-nowrap rounded-full bg-sky px-3 py-2 text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep 2xl:px-4"
            title={loginLabel}
          >
            <span className="2xl:hidden">{user ? user.avatar : "👤"}</span>
            <span className="hidden 2xl:inline">{loginLabel}</span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="เมนู"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-milk text-xl ring-1 ring-bean lg:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-bean/40 bg-milk px-4 py-3 lg:hidden">
          <SearchBox onNavigate={() => setMenuOpen(false)} />
          <ul className="mt-2 flex flex-col gap-1 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 hover:bg-cream">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={loginHref}
                onClick={() => setMenuOpen(false)}
                className="mt-1 block rounded-xl bg-sky px-3 py-3 text-center text-white"
              >
                {loginLabel}
              </Link>
            </li>
            <li className="px-3 pt-2 text-xs text-cocoa/60">ปิดทุกวันอาทิตย์</li>
          </ul>
        </nav>
      )}
    </header>
  );
}
