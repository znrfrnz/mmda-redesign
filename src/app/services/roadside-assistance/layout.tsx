import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadside Assistance",
  description:
    "Request emergency road assistance from MMDA for vehicle breakdowns, accidents, and other vehicle emergencies across Metro Manila.",
};

export default function RoadsideAssistanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
