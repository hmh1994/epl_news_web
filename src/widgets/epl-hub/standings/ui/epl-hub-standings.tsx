import { ArrowRight } from "lucide-react";
import { TeamStanding } from "@/entities/team/model/team-standing";
import { TeamStandingRow } from "@/entities/team/ui/team-standing-row";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface EplHubStandingsProps {
  teams: TeamStanding[];
}

export const EplHubStandings = ({ teams }: EplHubStandingsProps) => {
  return (
    <div className='relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <div className='absolute inset-0 bg-gradient-to-br from-[#169976]/5 via-transparent to-teal-500/5 rounded-3xl'></div>
      <div className='relative'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-3xl font-bold text-white mb-2'>프리미어리그 순위</h2>
            <p className='text-slate-400'>실시간 업데이트되는 최신 순위</p>
          </div>
          <button className='group flex items-center space-x-2 text-[#169976] hover:text-emerald-400 font-medium'>
            <span>전체보기</span>
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </button>
        </div>

        <div className='scrollbar-slim overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-white/10'>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  순위
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  팀
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  경기
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  승점
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  골득실
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  최근 폼
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((standing) => {
                const team = TEAMS_BY_ID[standing.teamId];
                return (
                  <TeamStandingRow
                    key={standing.position}
                    standing={standing}
                    teamName={team?.name ?? standing.teamId.toUpperCase()}
                    crest={team?.crest ?? "⚽"}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
