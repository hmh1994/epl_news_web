import { SmallText, SubtitleText } from "@/src/shared/ui";
import Link from "next/link";

const newsList = [
  "Arteta: We have to be brave and bold at the Bernabeu",
  "Latest Premier League player injuries - club by club news",
  "Explained: How Liverpool can win Permier League title THIS weekend",
  "Shearer: De Bruyne still has the quality to run the show",
  "Premier League review: What we've learned in Matchweek 32 so far",
];

const SimpleNews = () => {
  return (
    <div className={"p-2 bg-neutral-100 rounded-md"}>
      <div className='border-secondary border-b'>
        <SubtitleText cssOption={"text-base!"}>NEWS</SubtitleText>
      </div>

      <div>
        {newsList.map((news: string, idx: number) => (
          <div className={"my-5"} key={news}>
            <div className='flex'>
              <div>
                <div className='rounded-md bg-slate-800 py-0.5 px-1.5 border border-transparent text-sm text-white transition-all shadow-sm'>
                  News
                </div>
              </div>
              <div className={"pl-2"}>
                <Link href='/'>
                  <SmallText cssOption='hover:underline'>{news}</SmallText>
                </Link>
              </div>
            </div>
            {idx !== newsList.length - 1 && (
              <div className='border-b border-secondary mt-2' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleNews;
