import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full overflow-hidden">
      <body className="font-sans h-full overflow-hidden">
        <div className="h-screen flex flex-col bg-neutral-50">
          <header className="flex-shrink-0 bg-white border-b border-neutral-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <h1 className="text-3xl font-bold text-primary-700">Solace Advocates</h1>
            </div>
          </header>
          
          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full max-w-7xl mx-auto px-6 py-6 overflow-y-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
