import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Main_Navigation_bar from "@/components/main_navigation_bar"
import Main_Footer_bar from "@/components/main_footer_bar";
import Content_Container from "@/components/content_container";
import ChatBox from "@/components/chat_box";
import FloatingYoutubeButton from "@/components/floating_youtube_button";
import Providers from "./providers"; // Import the Providers component
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
  title: "Code With Me | Online Code Editor, Challenges & Developer Tools",
  description: "Learn to code with our interactive online editor, coding challenges, and developer tools. Build projects, practice programming, and level up your skills.",
  keywords: ["code editor", "coding challenges", "learn to code", "programming", "developer tools", "online IDE"],
  authors: [{ name: "Theo Nadasen" }],
  creator: "Theo Nadasen",
  publisher: "Code With Me",
  metadataBase: new URL("https://codewithme.co.za"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Code With Me | Online Code Editor & Developer Tools",
    description: "Learn to code with our interactive online editor, coding challenges, and developer tools.",
    url: "https://codewithme.co.za",
    siteName: "Code With Me",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code With Me | Online Code Editor & Developer Tools",
    description: "Learn to code with our interactive online editor, coding challenges, and developer tools.",
    creator: "@NadasenTheolin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          <Providers> {/* Wrap children with Providers */}
            <Main_Navigation_bar />

            <Content_Container>
              {children}
            </Content_Container>

            <ChatBox />
            <FloatingYoutubeButton />
          </Providers>
        </div>
      </body>
    </html>
  );
}
