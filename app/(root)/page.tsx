import {
  MainBanner,
  LatestNews,
  TeamRanking,
  PlayerRanking,
  UpcomingMatches,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <MainBanner />
        <LatestNews />
        <TeamRanking />
        <PlayerRanking />
        <UpcomingMatches />
      </main>
    </div>
  );
}
