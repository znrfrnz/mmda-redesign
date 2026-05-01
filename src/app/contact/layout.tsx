import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Metropolitan Manila Development Authority. Hotline 136, office address, email, and contact form.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
