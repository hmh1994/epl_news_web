import { useLeague } from "@/app/context/LeagueContext";
import Image from "next/image";

export default function Schedule() {
  const { league } = useLeague();
  console.log(`bg-${league}-main`);
  return (
    <div
      className={`mt-[100px] w-full flex items-center justify-center bg-${league}-main h-[59px]`}
    >
      <div className='flex'>
        <Image
          src={"/resource/england.png"}
          alt={"country"}
          width={20}
          height={20}
          className={"rounded-full overflow-hidden w-[20px] h-[20px]"}
        />
        SCHEDULE
      </div>
    </div>
  );
}
