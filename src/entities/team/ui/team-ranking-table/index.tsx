import { SubtitleText } from "@/src/shared/ui";
import Link from "next/link";
import Image from "next/image";

const teamData = [
  {
    name: "리버풀",
    logo: "/epl_teams/liverpool.png",
    points: 86,
    played: 38,
    gd: 45,
    recent: ["W", "W", "D", "L", "W"],
  },
  {
    name: "아스널",
    logo: "/epl_teams/liverpool.png",
    points: 84,
    played: 38,
    gd: 42,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "맨시티",
    logo: "/epl_teams/liverpool.png",
    points: 80,
    played: 38,
    gd: 38,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "노팅엄",
    logo: "/epl_teams/liverpool.png",
    points: 78,
    played: 38,
    gd: 32,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "뉴캐슬",
    logo: "/epl_teams/liverpool.png",
    points: 76,
    played: 38,
    gd: 28,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "첼시",
    logo: "/epl_teams/liverpool.png",
    points: 74,
    played: 38,
    gd: 24,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "애스턴 빌라",
    logo: "/epl_teams/liverpool.png",
    points: 72,
    played: 38,
    gd: 20,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "본머스",
    logo: "/epl_teams/liverpool.png",
    points: 70,
    played: 38,
    gd: 16,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "풀럼",
    logo: "/epl_teams/liverpool.png",
    points: 68,
    played: 38,
    gd: 12,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "브라이턴",
    logo: "/epl_teams/liverpool.png",
    points: 66,
    played: 38,
    gd: 8,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "브랜트퍼드",
    logo: "/epl_teams/liverpool.png",
    points: 64,
    played: 38,
    gd: 4,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "팰리스",
    logo: "/epl_teams/liverpool.png",
    points: 62,
    played: 38,
    gd: 0,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "에버턴",
    logo: "/epl_teams/liverpool.png",
    points: 60,
    played: 38,
    gd: -4,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "맨유",
    logo: "/epl_teams/liverpool.png",
    points: 58,
    played: 38,
    gd: -8,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "울버햄튼",
    logo: "/epl_teams/liverpool.png",
    points: 56,
    played: 38,
    gd: -12,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "토트넘",
    logo: "/epl_teams/liverpool.png",
    points: 54,
    played: 38,
    gd: -16,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "웨스트햄",
    logo: "/epl_teams/liverpool.png",
    points: 52,
    played: 38,
    gd: -20,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "입스위치",
    logo: "/epl_teams/liverpool.png",
    points: 50,
    played: 38,
    gd: -24,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "레스터 시티",
    logo: "/epl_teams/liverpool.png",
    points: 48,
    played: 38,
    gd: -28,
    recent: ["W", "W", "W", "W", "W"],
  },
  {
    name: "사우샘프턴",
    logo: "/epl_teams/liverpool.png",
    points: 46,
    played: 38,
    gd: -32,
    recent: ["W", "W", "W", "W", "W"],
  },
];

const getRankBg = (idx: number) => {
  if (idx < 4) return "bg-green-50"; // 챔스권
  if (idx < 6) return "bg-yellow-50"; // 유로파
  if (idx > 16) return "bg-red-50"; // 강등권
  return "";
};

const resultColor = {
  W: "bg-green-500 text-white",
  D: "bg-gray-400 text-white",
  L: "bg-red-500 text-white",
};

const TeamRankingTable = () => {
  return (
    <div className='p-4 bg-white rounded-xl shadow-md overflow-x-auto'>
      <div className='sticky top-0 z-10 bg-white pb-2'>
        <SubtitleText cssOption='text-lg font-extrabold tracking-wide text-primary'>
          Premier League Table
        </SubtitleText>
      </div>
      <div className='grid grid-cols-12 gap-2 py-2 border-b font-semibold text-gray-700 bg-neutral-50 rounded-t-lg'>
        <div className='text-center'>순위</div>
        <div className='col-span-3 text-center'>클럽</div>
        <div className='text-center'>승점</div>
        <div className='text-center'>경기</div>
        <div className='text-center'>득실</div>
        <div className='col-span-5 text-center'>최근 5경기</div>
      </div>
      {teamData.map((team, idx) => (
        <Link href={`/teams/${team.name}`} key={team.name}>
          <div
            className={`grid grid-cols-12 gap-2 items-center py-3 border-b hover:bg-secondary/10 transition cursor-pointer ${getRankBg(
              idx
            )}`}
          >
            <div className='text-center font-bold'>{idx + 1}</div>
            <div className='col-span-3 flex items-center gap-2'>
              <Image
                src={team.logo as string}
                alt={team.name}
                width={28}
                height={28}
                className='rounded-full border'
              />
              <span className='font-medium'>{team.name}</span>
            </div>
            <div className='text-center font-bold'>{team.points}</div>
            <div className='text-center'>{team.played}</div>
            <div className='text-center'>{team.gd}</div>
            <div className='col-span-5 flex justify-center gap-1'>
              {team.recent.map((r, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${resultColor[r]}`}
                  title={r === "W" ? "승" : r === "D" ? "무" : "패"}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TeamRankingTable;
