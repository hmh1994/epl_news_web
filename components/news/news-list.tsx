"use client";

import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsType } from "@/src/entities/news/apis";
import {
  Clock,
  User,
  // TrendingUp, Calendar
} from "lucide-react";
import { useState } from "react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function NewsList({ newsList }: { newsList: Array<NewsType> }) {
  const [listCnt, setListCnt] = useState<number>(6);

  const onClickLoad = () => {
    if (listCnt === 48) return;
    setListCnt((prev) => prev + 6);
  };
  return (
    <>
      <div>
        <h2 className='text-2xl font-bold mb-6'>Latest News</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {newsList.slice(0, listCnt).map((article) => {
            return (
              <Link key={article.newsId} href={`${article.newsUrl}`}>
                <Card className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full'>
                  <div className='relative h-48'>
                    <Image
                      src={article.newsImg || "/placeholder.svg"}
                      alt={article.titleKr}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge variant='outline' className='text-xs'>
                        {article.type}
                      </Badge>
                      <span className='text-xs text-muted-foreground'>•</span>
                      {/* <span className='text-xs text-muted-foreground'>
                        {article.readTime}
                      </span> */}
                    </div>
                    <h3 className='font-bold mb-2 line-clamp-2'>
                      {article.titleKr}
                    </h3>
                    <div className='flex items-center gap-3'>
                      {article.team
                        .filter((el) => !!el)
                        .map((teamName: string) => (
                          <Button
                            variant='ghost'
                            key={teamName}
                            className={"p-0"}
                          >
                            <Badge variant='outline' className='text-xs'>
                              #{teamName}
                            </Badge>
                          </Button>
                        ))}
                    </div>
                    <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                      {article.contentKr}
                    </p>
                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <User className='h-3 w-3' />
                        <span>{article.authorKr}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        <span>{formatDate(article.publishDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Load More Button */}
      {listCnt < 48 && (
        <div className='text-center mt-12'>
          <Button variant='outline' size='lg' onClick={onClickLoad}>
            Load More Articles
          </Button>
        </div>
      )}
    </>
  );
}
