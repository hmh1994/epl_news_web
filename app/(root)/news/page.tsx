"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, TrendingUp, Calendar } from "lucide-react";

// Mock news data
const newsData = [
  {
    id: "1",
    title: "Manchester United Signs New Star Player in Record Deal",
    excerpt:
      "The Red Devils have completed the signing of the highly sought-after midfielder in a deal worth £80 million, making it one of the biggest transfers of the season.",
    content: "Full article content here...",
    category: "Transfer",
    author: "John Smith",
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "3 min read",
    image:
      "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sp/2025/05/09/rcv.YNA.20250509.PEP20250509126901009_P1.jpg",
    featured: true,
    tags: ["Manchester United", "Transfer", "Premier League"],
  },
  {
    id: "2",
    title: "Champions League Quarter-Finals Draw Results",
    excerpt:
      "The draw for the Champions League quarter-finals has been completed, setting up some exciting matchups between Europe's elite clubs.",
    content: "Full article content here...",
    category: "Champions League",
    author: "Sarah Johnson",
    publishedAt: "2024-01-14T15:45:00Z",
    readTime: "2 min read",
    image:
      "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sp/2025/05/09/rcv.YNA.20250509.PEP20250509126901009_P1.jpg",
    featured: false,
    tags: ["Champions League", "Draw", "European Football"],
  },
  {
    id: "3",
    title: "World Cup 2026 Venue Announcements",
    excerpt:
      "FIFA has announced the final list of stadiums that will host matches during the 2026 World Cup across the United States, Canada, and Mexico.",
    content: "Full article content here...",
    category: "World Cup",
    author: "Mike Davis",
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: "4 min read",
    image:
      "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sp/2025/05/09/rcv.YNA.20250509.PEP20250509126901009_P1.jpg",
    featured: false,
    tags: ["World Cup", "FIFA", "2026"],
  },
  {
    id: "4",
    title: "Premier League Title Race Heats Up",
    excerpt:
      "With only 10 games remaining, the Premier League title race is closer than ever with three teams separated by just 4 points.",
    content: "Full article content here...",
    category: "Premier League",
    author: "Emma Wilson",
    publishedAt: "2024-01-12T14:20:00Z",
    readTime: "5 min read",
    image:
      "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sp/2025/05/09/rcv.YNA.20250509.PEP20250509126901009_P1.jpg",
    featured: true,
    tags: ["Premier League", "Title Race", "Analysis"],
  },
  {
    id: "5",
    title: "Young Talent Breaks Goal-Scoring Record",
    excerpt:
      "19-year-old striker becomes the youngest player to score 20 goals in a single Premier League season, breaking a record that stood for 15 years.",
    content: "Full article content here...",
    category: "Records",
    author: "Tom Brown",
    publishedAt: "2024-01-11T11:30:00Z",
    readTime: "3 min read",
    image:
      "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sp/2025/05/09/rcv.YNA.20250509.PEP20250509126901009_P1.jpg",
    featured: false,
    tags: ["Records", "Young Player", "Goals"],
  },
  {
    id: "6",
    title: "Women's Football Reaches New Heights",
    excerpt:
      "The latest women's football attendance figures show record-breaking numbers, highlighting the sport's incredible growth and popularity.",
    content: "Full article content here...",
    category: "Women's Football",
    author: "Lisa Garcia",
    publishedAt: "2024-01-10T16:45:00Z",
    readTime: "4 min read",
    image:
      "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sp/2025/05/09/rcv.YNA.20250509.PEP20250509126901009_P1.jpg",
    featured: false,
    tags: ["Women's Football", "Attendance", "Growth"],
  },
];

export default function NewsPage() {
  const [searchTerm] = useState("");
  const [selectedCategory] = useState("All");
  const [sortBy] = useState("latest");

  const filteredNews = newsData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === "latest") {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    return 0;
  });

  const featuredNews = sortedNews.filter((article) => article.featured);
  const regularNews = sortedNews.filter((article) => !article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              Football News
            </h1>
            <p className='text-xl md:text-2xl opacity-90 max-w-3xl mx-auto'>
              Stay updated with the latest football news, transfers, and match
              analysis from around the world
            </p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className='mb-12'>
            <div className='flex items-center gap-2 mb-6'>
              <TrendingUp className='h-6 w-6 text-primary' />
              <h2 className='text-2xl font-bold'>Featured Stories</h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {featuredNews.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`}>
                  <Card className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full'>
                    <div className='relative h-64'>
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute top-4 left-4'>
                        <Badge
                          variant='secondary'
                          className='bg-primary text-primary-foreground'
                        >
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardContent className='p-6'>
                      <div className='flex items-center gap-2 mb-3'>
                        <Badge variant='outline'>{article.category}</Badge>
                        <span className='text-sm text-muted-foreground'>•</span>
                        <span className='text-sm text-muted-foreground'>
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className='text-xl font-bold mb-3 line-clamp-2'>
                        {article.title}
                      </h3>
                      <p className='text-muted-foreground mb-4 line-clamp-3'>
                        {article.excerpt}
                      </p>
                      <div className='flex items-center justify-between text-sm text-muted-foreground'>
                        <div className='flex items-center gap-2'>
                          <User className='h-4 w-4' />
                          <span>{article.author}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4' />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div>
          <h2 className='text-2xl font-bold mb-6'>Latest News</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {regularNews.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`}>
                <Card className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full'>
                  <div className='relative h-48'>
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge variant='outline' className='text-xs'>
                        {article.category}
                      </Badge>
                      <span className='text-xs text-muted-foreground'>•</span>
                      <span className='text-xs text-muted-foreground'>
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className='font-bold mb-2 line-clamp-2'>
                      {article.title}
                    </h3>
                    <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                      {article.excerpt}
                    </p>
                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <User className='h-3 w-3' />
                        <span>{article.author}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className='text-center mt-12'>
          <Button variant='outline' size='lg'>
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
