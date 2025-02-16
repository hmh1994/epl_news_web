import Image from "next/image";
import Divider from "../../common/divider";
export default function PlayerList() {
  return (
    <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
      <div
        className={
          "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black mb-3"
        }
      >
        PLAYERS
      </div>
      <div className={"pl-3 flex gap-1 lg:gap-2"}>
        <div className={"content-center"}>
          <Image
            src={"/players/sala.jpeg"}
            width={50}
            height={50}
            alt={"palyer"}
            className={"rounded-full"}
          />
        </div>
        <div className={"ml-3 text-white content-center"}>
          <div className={"text-xl"}>살라</div>
          <div className={"text-sm"}>공격수</div>
        </div>
        <div className={"grow"} />
        <div className={"mr-3 text-white content-center"}>
          <div className={"text-sm"}>경기: 24 (1위)</div>
          <div className={"text-sm"}>득점: 22 (16위)</div>
          <div className={"text-sm"}>도움: 12 (24위)</div>
        </div>
      </div>
      <Divider />
      <div className={"pl-3 flex gap-1 lg:gap-2"}>
        <div className={"content-center"}>
          <Image
            src={"/players/sala.jpeg"}
            width={50}
            height={50}
            alt={"palyer"}
            className={"rounded-full"}
          />
        </div>
        <div className={"ml-3 text-white content-center"}>
          <div className={"text-xl"}>살라</div>
          <div className={"text-sm"}>공격수</div>
        </div>
        <div className={"grow"} />
        <div className={"mr-3 text-white content-center"}>
          <div className={"text-sm"}>경기: 24 (1위)</div>
          <div className={"text-sm"}>득점: 22 (16위)</div>
          <div className={"text-sm"}>도움: 12 (24위)</div>
        </div>
      </div>
      <Divider />
      <div className={"pl-3 flex gap-1 lg:gap-2"}>
        <div className={"content-center"}>
          <Image
            src={"/players/sala.jpeg"}
            width={50}
            height={50}
            alt={"palyer"}
            className={"rounded-full"}
          />
        </div>
        <div className={"ml-3 text-white content-center"}>
          <div className={"text-xl"}>살라</div>
          <div className={"text-sm"}>공격수</div>
        </div>
        <div className={"grow"} />
        <div className={"mr-3 text-white content-center"}>
          <div className={"text-sm"}>경기: 24 (1위)</div>
          <div className={"text-sm"}>득점: 22 (16위)</div>
          <div className={"text-sm"}>도움: 12 (24위)</div>
        </div>
      </div>
      <Divider />
      <div className={"pl-3 flex gap-1 lg:gap-2"}>
        <div className={"content-center"}>
          <Image
            src={"/players/sala.jpeg"}
            width={50}
            height={50}
            alt={"palyer"}
            className={"rounded-full"}
          />
        </div>
        <div className={"ml-3 text-white content-center"}>
          <div className={"text-xl"}>살라</div>
          <div className={"text-sm"}>공격수</div>
        </div>
        <div className={"grow"} />
        <div className={"mr-3 text-white content-center"}>
          <div className={"text-sm"}>경기: 24 (1위)</div>
          <div className={"text-sm"}>득점: 22 (16위)</div>
          <div className={"text-sm"}>도움: 12 (24위)</div>
        </div>
      </div>
      <Divider />
      <div className={"pl-3 flex gap-1 lg:gap-2"}>
        <div className={"content-center"}>
          <Image
            src={"/players/sala.jpeg"}
            width={50}
            height={50}
            alt={"palyer"}
            className={"rounded-full"}
          />
        </div>
        <div className={"ml-3 text-white content-center"}>
          <div className={"text-xl"}>살라</div>
          <div className={"text-sm"}>공격수</div>
        </div>
        <div className={"grow"} />
        <div className={"mr-3 text-white content-center"}>
          <div className={"text-sm"}>경기: 24 (1위)</div>
          <div className={"text-sm"}>득점: 22 (16위)</div>
          <div className={"text-sm"}>도움: 12 (24위)</div>
        </div>
      </div>
      <Divider />
    </div>
  );
}
