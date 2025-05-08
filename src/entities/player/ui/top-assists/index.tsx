import { SmallText, SubtitleText } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";

const players = [
  {
    playerName: "Emiliano Sala",
    url: "/players/sala",
    assist: 12,
  },
  {
    playerName: "sala",
    url: "/players/sala",
    assist: 10,
  },
  {
    playerName: "sala",
    url: "/players/sala",
    assist: 7,
  },
  {
    playerName: "sala",
    url: "/players/sala",
    assist: 6,
  },
  {
    playerName: "sala",
    url: "/players/sala",
    assist: 6,
  },
];

const TopAssits = () => {
  return (
    <div className={"p-2 bg-neutral-100 rounded-md"}>
      <div className='border-secondary border-b'>
        <SubtitleText cssOption='text-base! font-bold'>
          TOP ASSISTS
        </SubtitleText>
      </div>
      <div className={"py-2"}>
        {players.map((player, idx) => (
          <Link href={player.url} key={JSON.stringify(player) + idx}>
            <div
              className={`my-1 flex justify-between py-1 rounded-lg px-2 hover:bg-secondary hover:underline ${
                idx % 2 === 0 && "bg-neutral-300"
              }`}
            >
              <div className={`flex gap-2 justify-between`}>
                <div>
                  <Image
                    src='/players/sala.jpeg'
                    width={idx === 0 ? 50 : 40}
                    height={idx === 0 ? 50 : 40}
                    alt={"ranker-player"}
                    className={"rounded-full"}
                  />
                </div>
                <div className={"content-center"}>
                  <SmallText
                    cssOption={`${
                      idx === 0
                        ? "text-lg! sm:text-md! font-medium!"
                        : "font-normal"
                    }`}
                  >
                    {player.playerName.toUpperCase()}
                  </SmallText>
                  {idx === 0 && (
                    <SmallText
                      cssOption={`${
                        idx === 0 ? "font-semibold!" : "font-medium!"
                      }`}
                    >
                      {player.assist} ASSISTS
                    </SmallText>
                  )}
                </div>
              </div>
              {idx !== 0 && (
                <div className={"content-center"}>
                  <SmallText
                    cssOption={`${
                      idx === 0 ? "font-semibold!" : "font-medium!"
                    }`}
                  >
                    {player.assist} ASSISTS
                  </SmallText>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopAssits;
