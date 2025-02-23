import Image from "next/image";
export default function RecentMatch({ team }: { team: string }) {
  return (
    <div
      className={"flex flex-col justify-self-center lg:col-span-2 w-full mt-4"}
    >
      <div className='rounded-lg w-content mx-auto bg-neutral-900 min-w-[330px]'>
        <div
          className={
            "rounded-t-lg  bg-neutral-700 w-full p-1 flex justify-center center-align text-white text-xs "
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
            className={"items-center my-auto border border-white p-1 text-sm"}
          >
            WIN
          </div>
          <div className={"items-center my-auto  p-1 text-3xl ml-5"}>0 - 2</div>
        </div>
      </div>

      <div className='rounded-lg w-content mx-auto bg-neutral-900 mt-6 min-w-[330px]'>
        <div
          className={
            "rounded-t-lg bg-neutral-700 w-full p-1 flex justify-center center-align text-white text-xs"
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
  );
}
