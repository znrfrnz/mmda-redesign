import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Permits",
  description:
    "Apply for special permits for oversized or hazardous cargo transport on Metro Manila roads through MMDA.",
};

export default function SpecialPermitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
