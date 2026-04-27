"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { AdvisoryStrip } from "@/components/home/AdvisoryStrip";
import { ServiceCards } from "@/components/home/ServiceCards";
import { NewsPreview } from "@/components/home/NewsPreview";

export default function Home() {
  return (
    <>
      <AdvisoryStrip />
      <HeroSection />
      <ServiceCards />
      <NewsPreview />
    </>
  );
}

