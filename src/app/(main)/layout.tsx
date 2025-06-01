import { Header } from '@/components/shared/Header';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <footer className="py-6 md:px-8 md:py-0 border-t">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} Tarot Insights.
            </p>
          </div>
        </footer>
      </div>
      <Toaster />
    </LanguageProvider>
  );
}
