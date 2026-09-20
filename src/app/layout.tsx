import type { Metadata, Viewport } from "next";
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

const title = "Pumpkin&Melone Soy Milk — น้ำเต้าหู้บ้าน ๆ จากความตั้งใจของแม่";
const description =
  "น้ำเต้าหู้สดใหม่ทุกเช้า ทำตั้งแต่ตี 3–4 เปิดจันทร์–เสาร์ 05:30–08:00 น. ซื้อที่หน้าร้านเท่านั้น";

// Used to build absolute URLs for share previews (LINE / Facebook); set on the server when we have a domain
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: title, template: "%s — Pumpkin&Melone" },
  description,
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "Pumpkin&Melone Soy Milk",
    title,
    description,
    images: [{ url: "/images/logo.webp", width: 1254, height: 1254, alt: "Pumpkin&Melone Soy Milk" }],
  },
  twitter: { card: "summary", title, description, images: ["/images/logo.webp"] },
};

export const viewport: Viewport = {
  themeColor: "#fff4dc",
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
