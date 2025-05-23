import Image from "next/image";
import Link from "next/link";
import { FullTableBtn } from "../common";
import { teamData } from "@/app/fixtures/home";

export function TeamRanking() {
  return (
    <section className='bg-muted py-12 space-y-6'>
      <div className='container'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>Team Rankings</h2>
            <p className='text-muted-foreground'>
              Current standings in the league.
            </p>
          </div>
          <FullTableBtn link={"/teams"} />
        </div>

        <div className='rounded-lg border shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-muted/50'>
                <tr className='text-left'>
                  <th className='p-3 text-sm font-medium'>Pos</th>
                  <th className='p-3 text-sm font-medium'>Team</th>
                  <th className='p-3 text-sm font-medium text-center'>P</th>
                  <th className='p-3 text-sm font-medium text-center'>W</th>
                  <th className='p-3 text-sm font-medium text-center'>D</th>
                  <th className='p-3 text-sm font-medium text-center'>L</th>
                  <th className='p-3 text-sm font-medium text-center'>GD</th>
                  <th className='p-3 text-sm font-medium text-center'>Pts</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((team, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }
                  >
                    <td className='p-3 text-sm'>{team.pos}</td>
                    <td className='p-3 text-sm'>
                      <Link href={`/teams/${team.teamId}`}>
                        <div className='flex items-center gap-2'>
                          <Image
                            src={team.logo || "/placeholder.svg"}
                            alt={team.team}
                            width={20}
                            height={20}
                            className='rounded-full'
                          />
                          <span>{team.team}</span>
                        </div>
                      </Link>
                    </td>
                    <td className='p-3 text-sm text-center'>{team.played}</td>
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
