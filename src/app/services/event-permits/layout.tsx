import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Permits",
  description:
    "Get permits for road events, closures, and special traffic arrangements in Metro Manila from MMDA.",
};

export default function EventPermitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
