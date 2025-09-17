import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
})
 

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-screen flex flex-col bg-neutral-50 overflow-hidden">
        <header className="flex-shrink-0 bg-white border-b border-neutral-200">
            <h1 className="text-2xl font-bold text-primary-700 px-6 py-4">Solace</h1>
        </header>
        <main className="flex-1 overflow-hidden">
          <div className="h-full max-w-7xl mx-auto px-6 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
