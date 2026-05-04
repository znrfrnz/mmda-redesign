import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Towing & Impound",
  description:
    "Locate towed vehicles, check impound status, and process vehicle release through the MMDA towing and impound services portal.",
};

export default function TowingImpoundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
