import Image from "next/image";

interface NewsItem {
  publisher: {
    name: string;
    logo: string;
  };
  title: string;
  thumbnail: string;
  timeAgo: string;
}

export default function NewsSection() {
  const newsItems: NewsItem[] = [
    {
      publisher: {
        name: "NATE",
        logo: "/epl_teams/liverpool.png",
      },
      title:
        "'이젠 진짜 프리미어리거?' 토트넘 앙마르, EPL 공식 홈페이지 프로필 등록",
      thumbnail: "/epl_teams/liverpool.png",
      timeAgo: "5시간 전",
    },
    {
      publisher: {
        name: "머니투데이",
        logo: "/epl_teams/liverpool.png",
      },
      title:
        "'손흥민 후계자' 앙마르 '토트넘 1군 데뷔할 것' BBC+EPL 기대 폭발! 韓 18세 축구천재 프랑스 입단",
      thumbnail: "/epl_teams/liverpool.png",
      timeAgo: "3시간 전",
    },
    {
      publisher: {
        name: "뉴스1",
        logo: "/epl_teams/liverpool.png",
      },
      title: "김병지 강원 대표 '양민혁의 창의성, EPL에서도 통할 것'",
      thumbnail: "/epl_teams/liverpool.png",
      timeAgo: "1일 전",
    },
    {
      publisher: {
        name: "SPOTV NEWS",
        logo: "/epl_teams/liverpool.png",
      },
      title:
        "'EPL 최연소 한국인' 앙마르, 토트넘 데뷔 눈앞으로...FA컵서 첫 출전 유력",
      thumbnail: "/epl_teams/liverpool.png",
      timeAgo: "14시간 전",
    },
  ];

  const NewsSection = ({ items }: { items: NewsItem[] }) => (
    <div className='space-y-4'>
      {items.map((item, index) => (
        <div
          key={index}
          className='flex items-start gap-3 p-4 hover:bg-gray-50'
        >
          <div className='flex-1'>
            <div className='flex items-center gap-1 mb-1'>
              <Image
                src={item.publisher.logo}
                alt={item.publisher.name}
                width={20}
                height={20}
                className='rounded-sm'
              />
              <span className='text-sm text-gray-600'>
                {item.publisher.name}
              </span>
            </div>
            <h3 className='text-base font-medium leading-snug mb-1'>
              {item.title}
            </h3>
            <span className='text-sm text-gray-500'>{item.timeAgo}</span>
          </div>
          <Image
            src={item.thumbnail}
            alt=''
            width={80}
            height={80}
            className='rounded-md'
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className='max-w-2xl mx-auto bg-white'>
      <NewsSection items={newsItems} />

      <NewsSection items={newsItems} />
    </div>
  );
}
