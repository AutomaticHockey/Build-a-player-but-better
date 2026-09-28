import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { siteBrand } from "@/components/sites/build-a-player-com-2b9394ee/root-8a5edab2/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteBrand.name,
  description: siteBrand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
