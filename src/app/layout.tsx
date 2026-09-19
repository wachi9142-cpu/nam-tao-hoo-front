import type { Metadata } from "next";
import { Mali, Noto_Sans_Thai } from "next/font/google";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { Footer } from "@/components/landing/Footer";
import { SideRail } from "@/components/landing/SideRail";
import { TopBar } from "@/components/landing/TopBar";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const mali = Mali({
  variable: "--font-mali",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pumpkin&Melone Soy Milk — น้ำเต้าหู้บ้าน ๆ จากความตั้งใจของแม่",
  description:
    "น้ำเต้าหู้สดใหม่ทุกเช้า ทำตั้งแต่ตี 3–4 เปิดจันทร์–เสาร์ 05:30–09:00 น. ซื้อที่หน้าร้านเท่านั้น",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${mali.variable} ${notoThai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <TopBar />
          <SideRail />
          <FloatingContact />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
