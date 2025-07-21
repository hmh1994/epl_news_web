import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { FullTableBtn } from "../common";
import { teamData } from "@/app/fixtures/home";
import { getTeamRank } from "@/src/entities/teams/apis/get-team-rank";

export async function TeamRanking() {
  const { TeamRank } = await getTeamRank();
  return (
    <section className='bg-muted py-12 space-y-6'>
      <div className='container'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>팀 순위</h2>
            <p className='text-muted-foreground my-1'>현재 리그 순위</p>
          </div>
          <FullTableBtn link={"/teams"} />
        </div>

        <div className='rounded-lg border shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-muted/50'>
                <tr className='text-left'>
                  <th className='p-3 text-sm font-medium'>순위</th>
                  <th className='p-3 text-sm font-medium'>팀</th>
                  <th className='p-3 text-sm font-medium text-center'>
                    경기수
                  </th>
                  <th className='p-3 text-sm font-medium text-center'>승</th>
                  <th className='p-3 text-sm font-medium text-center'>무</th>
                  <th className='p-3 text-sm font-medium text-center'>패</th>
                  <th className='p-3 text-sm font-medium text-center'>
                    골득실
                  </th>
                  <th className='p-3 text-sm font-medium text-center'>점수</th>
                </tr>
              </thead>
              <tbody>
                {TeamRank.slice(0, 5).map((team, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }
                  >
                    <td className='p-3 text-sm'>{index + 1}</td>
                    <td className='p-3 text-sm'>
                      <Link href={`/teams/${team.teamId}`}>
                        <div className='flex items-center gap-2'>
                          <Image
                            src={team.teamLogo || "/placeholder.svg"}
                            alt={team.shortNameEn}
                            width={20}
                            height={20}
                            className='rounded-full'
                          />
                          <span>{team.shortNameKr}</span>
                        </div>
                      </Link>
                    </td>
                    <td className='p-3 text-sm text-center'>{team.matches}</td>
                    <td className='p-3 text-sm text-center'>{team.won}</td>
                    <td className='p-3 text-sm text-center'>{team.drawn}</td>
                    <td className='p-3 text-sm text-center'>{team.lost}</td>
                    <td className='p-3 text-sm text-center'>{team.gd}</td>
                    <td className='p-3 text-sm font-bold text-center'>
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
