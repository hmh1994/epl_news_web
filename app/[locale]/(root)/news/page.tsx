import { getNewsList } from "@/src/entities/news/apis";
import NewsList from "@/components/news/news-list";

export default async function NewsPage() {
  const { newsList } = await getNewsList({ count: 48 });

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
        {/* {featuredNews.length > 0 && (
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
        )} */}

        <NewsList newsList={newsList} />
      </div>
    </div>
  );
}
