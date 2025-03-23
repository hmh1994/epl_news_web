import Breadcrumb from "@/app/components/common/breadcrumb";
import Divider from "@/app/components/common/divider";
import PlayerDetailView from "@/app/components/player-detail/player-detail-view";
import Stats from "@/app/components/player-detail/stats";
import PlayerDetailTabs from "@/app/components/player-detail/tabs";

export default async function PlayerDetail({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const { player } = await params;
  const breadcrumbPath = [
    {
      pathLink: "/players",
      pathName: "PLAYERS",
    },
    {
      pathLink: "/",
      pathName: `${player}`,
    },
  ];
  return (
    <div className='bg-neutral-700 grid  gap-6 w-full px-4 pt-10 mb-10'>
      <div className={`bg-neutral-800 rounded-lg p-2 h-content mb-3`}>
        <Breadcrumb breadcrumbPath={breadcrumbPath} />
        <Divider />
        <div className='h-[200px] my-3 px-2'>
          <div className='relative h-full w-full bg-neutral-900 rounded-lg'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_250px_at_50%_250px,#3e3e3e,transparent)]'>
              <div className='flex  text-white px-10 pt-3'>
                <div className='w-[250px]'>player image</div>
                <div className={"mt-10"}>
                  <div className='text-5xl font-extrabold'>Ederson</div>
                </div>
                <div className={"grow"} />
                <div className='text-[120px] font-black'>31</div>
              </div>
            </div>
          </div>
        </div>
        <Divider />

        <PlayerDetailView />
      </div>
    </div>
  );
}
