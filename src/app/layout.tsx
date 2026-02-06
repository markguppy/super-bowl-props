import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Super Bowl Prop Bets",
  description: "Make your Super Bowl prop bet picks and see how you stack up!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">{children}</body>
    </html>
  );
}
