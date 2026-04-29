import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MMDA — Metropolitan Manila Development Authority",
  description:
    "Learn about the MMDA's mandate, leadership, organizational structure, and history of serving Metro Manila.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
