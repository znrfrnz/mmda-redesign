import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mockNews } from "@/lib/mock-data";
import { NewsArticleDetail } from "@/components/news/NewsArticleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = mockNews.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export function generateStaticParams() {
  return mockNews.map((article) => ({ slug: article.slug }));
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = mockNews.find((a) => a.slug === slug);
  if (!article) notFound();

  return <NewsArticleDetail article={article} />;
}
