import { CircleCheckBig, X } from "lucide-react";
import Image from "next/image";
export default function TeamMetaInfo({ team }: { team: string }) {
  return (
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
      <div className={"flex flex-col justify-self-center mt-2"}>
        <div className='flex place-content-center my-3'>
          <span className={"text-neutral-100 text-xs font-black my-auto"}>
            PREMIER LEAGUE
          </span>
          <div className={"bg-neutral-500 rounded-xl px-2 w-fit ml-2"}>
            <span className={"text-neutral-100 text-sm font-black"}>4th</span>
          </div>
        </div>
        <div className={"flex mt-2"}>
          <CircleCheckBig className={"bg-green-400 rounded-xl mx-1"} />
          <CircleCheckBig className={"bg-green-400 rounded-xl mx-1"} />
          <X className={"bg-red-400 rounded-xl mx-1"} />
          <CircleCheckBig className={"bg-green-400 rounded-xl mx-1"} />
          <X className={"bg-red-400 rounded-xl mx-1"} />
        </div>
      </div>
    </div>
  );
}
