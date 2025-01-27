import { useLeague } from "@/app/context/LeagueContext";

export default function NewsSection() {
  const { league } = useLeague();
  return (
    <div className={"grid h-full"}>
      <div className={"rounded-lg w-full mx-auto bg-neutral-900"}>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
          }
        >
          {league.toUpperCase()} NEWS
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>[News 출처]</div>
            <div>손흥민 군대가라 빨리 다시 군대가라</div>
          </div>
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>[News 출처]</div>
            <div>손흥민 군대가라 빨리 다시 군대가라</div>
          </div>
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>[News 출처]</div>
            <div>손흥민 군대가라 빨리 다시 군대가라</div>
          </div>
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>[News 출처]</div>
            <div>손흥민 군대가라 빨리 다시 군대가라</div>
          </div>
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>[News 출처]</div>
            <div>손흥민 군대가라 빨리 다시 군대가라</div>
          </div>
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>[News 출처]</div>
            <div>손흥민 군대가라 빨리 다시 군대가라</div>
          </div>
        </div>
      </div>
    </div>
  );
}
