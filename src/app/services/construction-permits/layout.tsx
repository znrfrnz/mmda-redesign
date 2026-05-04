import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Permits",
  description:
    "Request permits for road construction, maintenance, and utility work affecting Metro Manila roads from MMDA.",
};

export default function ConstructionPermitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
