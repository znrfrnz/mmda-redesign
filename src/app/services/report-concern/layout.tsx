import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report a Concern — MMDA",
  description:
    "Submit reports about road damage, flooding, illegal structures, or other concerns in Metro Manila to the MMDA operations team.",
};

export default function ReportConcernLayout({ children }: { children: React.ReactNode }) {
  return children;
}
