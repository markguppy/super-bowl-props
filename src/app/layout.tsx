import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "Super Bowl LX Prop Bets",
  description: "Make your Super Bowl LX prop bet picks and see how you stack up!",
  openGraph: {
    title: "Super Bowl LX Prop Bets",
    description: "Make your Super Bowl LX prop bet picks and see how you stack up!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface-900 text-white min-h-screen">
        <header className="bg-nfl-navy/80 border-b border-surface-600 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/nfl-shield.svg" alt="NFL" width={28} height={37} />
              <span className="text-lg font-bold tracking-wide">
                Super Bowl <span className="text-nfl-red">LX</span>
              </span>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
