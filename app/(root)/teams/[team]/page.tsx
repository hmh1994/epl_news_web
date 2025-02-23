import Breadcrumb from "@/app/components/common/breadcrumb";
import Divider from "@/app/components/common/divider";
import PlayerRanking from "@/app/components/team-detail/player-ranking";
import RecentMatch from "@/app/components/team-detail/recent-match";
import StadiumInfo from "@/app/components/team-detail/stadium-info";
import TeamMetaInfo from "@/app/components/team-detail/team-meta-info";
import TeamRankingChart from "@/app/components/team-detail/team-ranking-chart";
import TeamSchedule from "@/app/components/team-detail/team-schedule";
import TeamSns from "@/app/components/team-detail/team-sns";

export default async function TeamDetail({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;
  const breadcrumbPath = [
    {
      pathLink: "/teams",
      pathName: "TEAMS",
    },
    {
      pathLink: "/",
      pathName: `${team}`,
    },
  ];
  return (
    <div className='bg-neutral-700 grid  gap-6 w-full px-4 pt-10 mb-10'>
      <div className={`bg-neutral-800 rounded-lg p-2 h-content mb-3`}>
        <Breadcrumb breadcrumbPath={breadcrumbPath} />
        <Divider />
        <div className={"my-3 px-2"}>
          <div className={"grid grid-cols-1  md:grid-cols-4 gap-4"}>
            <TeamMetaInfo team={team} />
            <div className={"sm:hidden block"}>
              <Divider />
            </div>
            <div>
              <StadiumInfo />
              <TeamSns />
            </div>
            <RecentMatch team={team} />
          </div>
        </div>
        <Divider />
        <div className={"grid md:grid-cols-3 grid-cols-1 gap-4 h-content"}>
          <div className={"col-span-2"}>
            <TeamSchedule />
            <Divider />
            <div className={"col-span-2"}>
              <TeamRankingChart />
            </div>
          </div>
          <div>
            <PlayerRanking team={team} />
            {/* <PlayerList /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
