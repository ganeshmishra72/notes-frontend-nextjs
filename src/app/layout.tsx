import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../../providers";
import { Toaster } from "react-hot-toast";
import { AiChatProvider } from "@/component/AI-chat/AiChatContext";
import AiChatDrawer from "@/component/AI-chat/AIChatDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NotesHub",
  description: "By Raghvendra Mishra Java Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <AiChatProvider>
          <Toaster position="top-right" />
        {children}
        <AiChatDrawer/>
        </AiChatProvider>
        </Providers>

      </body>
    </html>
  );
}
