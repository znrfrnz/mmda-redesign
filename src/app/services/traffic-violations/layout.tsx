import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traffic Violations",
  description:
    "Look up traffic violations by plate number or license number. Check penalty status, payment history, and fine details with MMDA.",
};

export default function TrafficViolationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
