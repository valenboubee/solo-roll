import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Solo Adventurer's Toolbox",
  description: "A digital book of adventure tables.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
