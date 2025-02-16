import Breadcrumb from "@/app/components/common/breadcrumb";
import Divider from "@/app/components/common/divider";
import NewsSection from "@/app/components/home/news-section";
import PlayerList from "@/app/components/team-detail/player-list";
import { CircleCheckBig, X } from "lucide-react";
import Image from "next/image";

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
            <div className={"flex flex-col items-center my-auto"}>
              <div>
                <Image
                  src='/resource/epl_logo.svg'
                  width={100}
                  height={100}
                  alt={team}
                />
              </div>
              <span className={"text-neutral-100 text-2xl font-black"}>
                {team.toUpperCase()}
              </span>
            </div>
            <div className={"sm:hidden block"}>
              <Divider />
            </div>
            <div className={"flex flex-col justify-self-center my-auto"}>
              <span className={"text-neutral-100 text-xl font-black"}>
                PREMIER LEAGUE
              </span>
              <div className={"flex"}>
                <CircleCheckBig className={"bg-green-400 rounded-xl mx-1"} />
                <CircleCheckBig className={"bg-green-400 rounded-xl mx-1"} />
                <X className={"bg-red-400 rounded-xl mx-1"} />
                <CircleCheckBig className={"bg-green-400 rounded-xl mx-1"} />
                <X className={"bg-red-400 rounded-xl mx-1"} />
              </div>
              <div className={"bg-neutral-500 rounded-xl px-2 w-fit my-2 mt-4"}>
                <span className={"text-neutral-100 text-lg font-black"}>
                  4th
                </span>
              </div>
            </div>
            <div
              className={
                "flex flex-col justify-self-center lg:col-span-2 w-full"
              }
            >
              <div className='w-content mx-auto bg-neutral-900 min-w-[330px]'>
                <div
                  className={
                    "bg-neutral-700 w-full p-1 flex justify-center center-align text-white text-xs"
                  }
                >
                  LAST MATCH
                </div>
                <div className={"flex p-2 text-neutral-100"}>
                  <div>
                    <Image
                      src='/epl_teams/liverpool.png'
                      width={50}
                      height={50}
                      alt={team}
                    />
                  </div>
                  <div className={"my-auto"}>LIVERPOOL</div>
                  <div className={"grow min-w-[50px] max-w-[100px]"} />
                  <div
                    className={
                      "items-center my-auto border border-white p-1 text-sm"
                    }
                  >
                    WIN
                  </div>
                  <div className={"items-center my-auto  p-1 text-3xl ml-5"}>
                    0 - 2
                  </div>
                </div>
              </div>

              <div className='w-content mx-auto bg-neutral-900 mt-3 min-w-[330px]'>
                <div
                  className={
                    "bg-neutral-700 w-full p-1 flex justify-center center-align text-white text-xs"
                  }
                >
                  NEXT MATCH
                </div>
                <div className={"flex p-2 text-neutral-100"}>
                  <div>
                    <Image
                      src='/epl_teams/liverpool.png'
                      width={50}
                      height={50}
                      alt={team}
                    />
                  </div>
                  <div className={"my-auto"}>LIVERPOOL</div>
                  <div className={"grow min-w-[50px] max-w-[100px]"} />
                  <div className={"my-auto  p-1 ml-5"}>
                    <div>SUN, 16 FEB</div>
                    <div>02:30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"grid md:grid-cols-3 grid-cols-1 gap-4 h-content"}>
          <div className={"col-span-2"}>
            <div className={"grid h-content"}>
              <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
                <div
                  className={
                    "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
                  }
                >
                  경기
                </div>
                <div className={"p-4 flex-col justify-center center-align"}>
                  <div
                    className={
                      "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
                    }
                  >
                    <div>HOME TEAM</div>
                    <div>[LOGO]</div>
                    <div
                      className={
                        "flex-col justify-center center-align w-10 px-auto mx-3"
                      }
                    >
                      <div className={"flex center-align justify-center"}>
                        23:00
                      </div>
                    </div>
                    <div>[LOGO]</div>
                    <div>AWAY TEAM</div>
                  </div>
                </div>

                <div className={"p-4 flex-col justify-center center-align"}>
                  <div
                    className={
                      "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
                    }
                  >
                    <div>HOME TEAM</div>
                    <div>[LOGO]</div>
                    <div
                      className={
                        "flex-col justify-center center-align w-10 px-auto mx-3"
                      }
                    >
                      <div className={"flex center-align justify-center"}>
                        2:2
                      </div>
                    </div>
                    <div>[LOGO]</div>
                    <div>AWAY TEAM</div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className={"col-span-2"}>
              <NewsSection />
            </div>
          </div>
          <div>
            <PlayerList />
          </div>
        </div>
      </div>
    </div>
  );
}
