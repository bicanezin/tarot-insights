import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { GeistSans, GeistMono } from "geist/font";

import "./globals.css";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tarot Insights",
  description: "Online tarot deck with AI-powered interpretations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", GeistSans.variable, GeistMono.variable, mulish.variable)}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
