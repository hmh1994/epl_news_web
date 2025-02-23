"use client";
import Image from "next/image";
import Divider from "../../common/divider";

export default function PlayerRanking({ team }: { team: string }) {
  return (
    <>
      <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black mb-3"
          }
        >
          최고 선수
        </div>
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"bg-green-500 rounded-xl px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>7.36</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>7.30</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>7.20</span>
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black mb-3"
          }
        >
          득점 순위
        </div>
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"bg-green-500 rounded-xl px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>7</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>5</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>3</span>
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black mb-3"
          }
        >
          도움 순위
        </div>
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"bg-green-500 rounded-xl px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>3</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>2</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"pl-3 flex gap-1 lg:gap-2"}>
          <div className={"content-center"}>
            <Image
              src={"/players/sala.jpeg"}
              width={35}
              height={35}
              alt={"palyer"}
              className={"rounded-full"}
            />
          </div>
          <div className={"ml-1 text-white content-center"}>
            <div className={"text-xl"}>살라</div>
            <div className={"text-sm"}>{team}</div>
          </div>
          <div className={"grow"} />
          <div className={"mr-3 content-center"}>
            <div className={"px-2 w-fit ml-2"}>
              <span className={"text-white text-sm font-black"}>2</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
