import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moving Pictures | Speed and Love",
  description:
    "Discover Speed and Love (双轨) - An action-packed romance drama starring Yu Shuxin and He Yu. Watch trailers, explore the cast, and track your progress.",
  keywords: [
    "Speed and Love",
    "双轨",
    "Chinese Drama",
    "Yu Shuxin",
    "He Yu",
    "iQIYI",
    "Thai Drama",
    "Romance",
    "Action",
  ],
  authors: [{ name: "Moving Pictures" }],
  openGraph: {
    title: "Moving Pictures | Speed and Love",
    description:
      "Discover Speed and Love - An action-packed romance drama featuring street racing and underground fighting.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Pictures | Speed and Love",
    description:
      "Discover Speed and Love - An action-packed romance drama featuring street racing and underground fighting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
