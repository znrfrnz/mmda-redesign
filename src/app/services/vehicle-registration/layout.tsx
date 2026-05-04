import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Registration",
  description:
    "Register vehicles, renew registration, and obtain proof of registration through MMDA coordination with LTO.",
};

export default function VehicleRegistrationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
