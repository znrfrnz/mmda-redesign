import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unpaid Fines",
  description:
    "Check and pay outstanding traffic fines online through the MMDA payment portal. Submit payment details and update your violation clearance record.",
};

export default function UnpaidFinesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
