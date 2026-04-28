import type { Metadata } from "next";
import { NewsListing } from "@/components/news/NewsListing";

export const metadata: Metadata = {
  title: "News & Advisories — MMDA",
  description:
    "Stay informed with the latest traffic advisories, press releases, and public notices from the Metropolitan Manila Development Authority.",
};

export default function NewsPage() {
  return <NewsListing />;
}
