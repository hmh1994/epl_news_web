import {
  ChevronRight,
  // , Heart, Share2
} from "lucide-react";
import { Button } from "../ui/button";
// import { Badge } from "..//ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { getNewsList } from "@/src/entities/news/apis";
// import { getTranslations } from "next-intl/server";
export const dynamic = "force-dynamic";
export async function LatestNews() {
  // const t = await getTranslations("home");
  const { newsList } = await getNewsList();
  return (
    <section className='container py-12 space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>최신 뉴스</h2>
          {/* <h2 className='text-2xl font-bold tracking-tight'>{t("title")}</h2> */}
          <p className='text-muted-foreground'>
            축구계의 최신 뉴스와 정보를 빠르게 만나보세요.
          </p>
        </div>
        <Link href={"/news"}>
          <Button
            variant='outline'
            className='flex items-center gap-1 cursor-pointer'
          >
            모든 뉴스 보기 <ChevronRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {newsList.slice(0, 3).map((news, index) => (
          <Card key={index} className='overflow-hidden'>
            <Link href={news.newsUrl}>
              <div className='relative h-48'>
                <Image
                  src={news.newsImg || "/placeholder.svg"}
                  alt={news.titleKr}
                  fill
                  className='object-cover'
                />
                {/* <Badge className='absolute top-2 left-2 bg-green-600'>
                  {news.source}
                </Badge> */}
              </div>
            </Link>
            <Link href='/'>
              <CardHeader>
                <CardTitle>{news.titleKr}</CardTitle>
                <CardDescription>{news.contentKr}</CardDescription>
              </CardHeader>
            </Link>
            <CardFooter className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>
                {news.publishdate}
              </span>
              {/* <div className='flex items-center gap-2'>
                <Button variant='ghost' size='icon'>
                  <Heart className='h-4 w-4' />
                  <span className='sr-only'>Like</span>
                </Button>
                <Button variant='ghost' size='icon'>
                  <Share2 className='h-4 w-4' />
                  <span className='sr-only'>Share</span>
                </Button>
              </div> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
