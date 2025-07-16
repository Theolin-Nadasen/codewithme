import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Main_Navigation_bar from "@/components/main_navigation_bar"
import Main_Footer_bar from "@/components/main_footer_bar";
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
  title: "Code With Me",
  description: "Code With Me website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-screen flex flex-col justify-between">

          <Main_Navigation_bar />

          <div className="flex-grow">
            {children}
          </div>

          <Main_Footer_bar />

        </div>
      </body>
    </html>
  );
}
