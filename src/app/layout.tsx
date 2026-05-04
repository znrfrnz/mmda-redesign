import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SettingsProvider } from "@/components/layout/SettingsProvider";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Home | MMDA",
    template: "%s | MMDA",
  },
  description:
    "Official portal of the Metropolitan Manila Development Authority. Access traffic updates, road advisories, public services, and citizen resources for Metro Manila.",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <SettingsProvider>
          <div className="relative flex min-h-screen flex-col">
            <UtilityBar />
            <Header />
            <main id="main-content" className="flex-1 overflow-x-clip w-full max-w-full">
              {children}
            </main>
            <Footer />
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
