import { ChevronRight, Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "..//ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { newsData } from "@/app/fixtures/home";

export function LatestNews() {
  return (
    <section className='container py-12 space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>Latest News</h2>
          <p className='text-muted-foreground'>
            Stay updated with the latest football news and updates.
          </p>
        </div>
        <Link href={"/news"}>
          <Button
            variant='outline'
            className='flex items-center gap-1 cursor-pointer'
          >
            View All News <ChevronRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {newsData.map((news, index) => (
          <Card key={index} className='overflow-hidden'>
            <Link href='/'>
              <div className='relative h-48'>
                <Image
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  fill
                  className='object-cover'
                />
                <Badge className='absolute top-2 left-2 bg-green-600'>
                  {news.category}
                </Badge>
              </div>
            </Link>
            <Link href='/'>
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
                <CardDescription>{news.description}</CardDescription>
              </CardHeader>
            </Link>
            <CardFooter className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>{news.date}</span>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='icon'>
                  <Heart className='h-4 w-4' />
                  <span className='sr-only'>Like</span>
                </Button>
                <Button variant='ghost' size='icon'>
                  <Share2 className='h-4 w-4' />
                  <span className='sr-only'>Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
