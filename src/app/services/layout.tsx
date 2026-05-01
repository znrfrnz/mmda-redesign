import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citizen Services",
  description:
    "Access MMDA services online: driver's licenses, vehicle registration, traffic violations, permits, towing, and roadside assistance.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
