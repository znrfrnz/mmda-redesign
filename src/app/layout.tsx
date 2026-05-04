import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SettingsProvider } from "@/components/layout/SettingsProvider";

const publicSans = Public_Sans({
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
    <html lang="en" className={`${publicSans.variable} h-full scroll-smooth antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <SettingsProvider>
          <div className="relative flex min-h-screen flex-col">
            <UtilityBar />
            <Header />
            <main id="main-content" className="flex-1 overflow-x-hidden w-full max-w-full">
              {children}
            </main>
            <Footer />
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
