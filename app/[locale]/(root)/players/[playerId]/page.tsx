import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayerDetail } from "@/features/player-database/player-detail/ui/player-detail";
import { fetchPlayerDetail } from "@/shared/api/epl/lib/player-detail";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

interface PageProps {
  params: Promise<{
    locale: string;
    playerId: string;
  }>;
}

export default async function PlayerDetailRoute({ params }: PageProps) {
  const { playerId, locale } = await params;
  const response = await fetchPlayerDetail(DEFAULT_LEAGUE_ID, playerId, {
    locale,
  });
  const player = response.data.player;

  if (!player) {
    notFound();
  }

  const basePath = locale ? `/${locale}` : "";
  const summary = player.summary;
  const isPhotoUrl = summary.photo.startsWith("http");

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <section className='relative pt-24 pb-14 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
        <div className='absolute inset-0 opacity-35'>
          <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl'></div>
          <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl'></div>
        </div>

        <div className='relative z-10 max-w-6xl mx-auto px-6'>
          <Link
            href={`${basePath}/players`}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400/40 hover:text-white'
          >
            ← 선수 데이터베이스로 돌아가기
          </Link>
          <div className='mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='flex items-center gap-5'>
              <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#169976] to-teal-500 text-3xl shadow-xl overflow-hidden'>
                {isPhotoUrl ? (
                  <img
                    src={summary.photo}
                    alt={summary.name}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  summary.photo
                )}
              </div>
              <div>
                <h1 className='mt-1 text-4xl md:text-6xl font-black text-white'>
                  {summary.name}
                </h1>
                <p className='mt-2 text-lg text-slate-300'>
                  {summary.nationality} · {summary.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className='pb-20'>
        <PlayerDetail player={player} variant='page' />
      </main>
    </div>
  );
}
