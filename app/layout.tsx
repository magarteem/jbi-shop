import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "ЖБИ — железобетонные изделия оптом",
  description:
    "Производство и поставка железобетонных изделий. Широкий каталог ЖБИ: балки, плиты, трубы, фундаментные блоки и другие конструкции.",
  keywords: "ЖБИ, железобетонные изделия, балки, плиты перекрытия, фундаментные блоки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geist.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
