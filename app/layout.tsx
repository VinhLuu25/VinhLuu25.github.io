import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin", "vietnamese"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Dành riêng cho Phương · 20/10",
  description: "Một khu vườn nhỏ, một lá thư, và những điều anh muốn gửi đến em.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
