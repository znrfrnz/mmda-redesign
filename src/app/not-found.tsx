"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { MagnifyingGlass, House } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { language } = useSettingsStore();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        {language === "en" ? "Page not found" : "Hindi nahanap ang pahina"}
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        {language === "en"
          ? "The page you're looking for doesn't exist or has been moved. Try searching or return to the homepage."
          : "Ang pahina na hinahanap mo ay hindi umiiral o inilipat na. Subukan maghanap o bumalik sa homepage."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="gap-2 active:scale-[0.98] transition-transform">
          <Link href="/">
            <House className="size-4" weight="bold" />
            {language === "en" ? "Go to Homepage" : "Pumunta sa Homepage"}
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2 active:scale-[0.98] transition-transform">
          <Link href="/search">
            <MagnifyingGlass className="size-4" weight="bold" />
            {language === "en" ? "Search" : "Maghanap"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
