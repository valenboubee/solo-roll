import "./globals.css";
import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "The Solo Adventurer's Toolbox",
  description: "A digital book of adventure tables.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${garamond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
