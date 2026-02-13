import Link from "next/link";
import { PlayerDetail } from "@/features/player-database/player-detail/ui/player-detail";
import type { PlayerDetailResponse } from "@/shared/api/epl/model/types";

interface PlayerDetailPageProps {
  player: PlayerDetailResponse["data"]["player"];
  locale: string;
}

export const PlayerDetailPage = ({ player, locale }: PlayerDetailPageProps) => {
  const summary = player.summary;
  const basePath = locale ? `/${locale}` : "";
  const isPhotoUrl = summary.photo.startsWith("http");

  return (
    <div className='min-h-screen bg-slate-950 text-white bg-[radial-gradient(circle_at_20%_-10%,rgba(16,185,129,0.1),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(20,184,166,0.08),transparent_40%)]'>
      <section className='relative pt-24 pb-12'>
        <div className='relative z-10 max-w-6xl mx-auto px-6'>
          <Link
            href={`${basePath}/players`}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            ← 선수 데이터베이스로 돌아가기
          </Link>
          <div className='mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='flex items-center gap-5'>
              <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900/80 border border-white/10 text-3xl overflow-hidden'>
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
                <h1 className='mt-1 text-4xl md:text-6xl font-semibold text-white'>
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
};
