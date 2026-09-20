import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-16">
      <div className="w-full max-w-md rounded-[2rem] bg-milk p-8 text-center shadow-xl ring-4 ring-sky/30">
        <div className="text-6xl">🐱💤</div>
        <p className="font-display mt-3 text-5xl font-bold text-sky-deep">404</p>
        <h1 className="font-display mt-1 text-xl font-bold text-cocoa">หาหน้านี้ไม่เจอเลย</h1>
        <p className="mt-2 text-sm text-cocoa/70">
          อาจจะพิมพ์ลิงก์ผิด หรือหน้านี้ถูกย้ายไปแล้ว ลองกลับไปหน้าแรกดูนะคะ
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-sky px-6 py-3 font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep"
          >
            🏠 กลับหน้าแรก
          </Link>
          <Link
            href="/#menu"
            className="rounded-full bg-cream px-6 py-3 font-semibold text-cocoa ring-1 ring-bean transition hover:bg-white"
          >
            🥛 ดูเมนู
          </Link>
        </div>
      </div>
    </main>
  );
}
