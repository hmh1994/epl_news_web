import { NewsHubPage } from "@/processes/news-hub-page";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsRoute({ params }: PageProps) {
  const { locale } = await params;
  return <NewsHubPage locale={locale} />;
}
