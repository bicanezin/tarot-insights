
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google'; // Using Inter as a fallback, Geist is preferred
import { Geist_Sans as GeistSans, Geist_Mono as GeistMono } from 'geist/font'; // Corrected import path

import './globals.css';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster";


const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});


export const metadata: Metadata = {
  title: 'Tarot Insights',
  description: 'Online tarot deck with AI-powered interpretations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable,
          fontSans.variable // Fallback sans font
        )}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
