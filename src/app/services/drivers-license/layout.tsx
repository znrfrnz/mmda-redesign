import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver's License",
  description:
    "Verify violations, check clearance, and resolve driver's license concerns through MMDA coordination with LTO.",
};

export default function DriversLicenseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
