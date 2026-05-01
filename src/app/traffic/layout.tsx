import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traffic & Roads",
  description:
    "Real-time traffic conditions, route status, number coding schedule, and road information for Metro Manila.",
};

export default function TrafficLayout({ children }: { children: React.ReactNode }) {
  return children;
}
