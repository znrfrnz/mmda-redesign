import type { Metadata } from "next";
import { NewsListing } from "@/components/news/NewsListing";

export const metadata: Metadata = {
  title: "News & Advisories",
  description:
    "Stay informed with the latest traffic advisories, press releases, and public notices from the Metropolitan Manila Development Authority.",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <NewsListing initialCategory={params.category} />;
}
