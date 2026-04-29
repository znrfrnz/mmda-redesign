import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search — MMDA",
  description:
    "Search across MMDA services, news, advisories, and pages.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
