const mockItem = [
  {
    ranking: 1,
    logo: "[L]",
    teamName: "TEAM NAME",
    gameCount: 23,
    diff: "+33",
    point: 56,
  },
  {
    ranking: 2,
    logo: "[L]",
    teamName: "TEAM NAME",
    gameCount: 23,
    diff: "+33",
    point: 56,
  },
  {
    ranking: 3,
    logo: "[L]",
    teamName: "TEAM NAME",
    gameCount: 23,
    diff: "+33",
    point: 56,
  },
  {
    ranking: 4,
    logo: "[L]",
    teamName: "TEAM NAME",
    gameCount: 23,
    diff: "+33",
    point: 56,
  },
  {
    ranking: 5,
    logo: "[L]",
    teamName: "TEAM NAME",
    gameCount: 23,
    diff: "+33",
    point: 56,
  },
];

export default function TeamRankingSection() {
  return (
    <div className={"grid h-full"}>
      <div className={"rounded-lg w-full mx-auto bg-neutral-900"}>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
          }
        >
          TEAM RECORDS
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "grid grid-cols-6 flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500 mb-3"
            }
          >
            <div className={"col-span-3 flex"}>#</div>
            <div className={"col-span-1 flex justify-center"}>경기</div>
            <div className={"col-span-1 flex justify-center"}>=</div>
            <div className={"col-span-1 flex justify-center"}>승점</div>
          </div>
          {mockItem.map((row) => (
            <div
              className={
                "grid grid-cols-6 flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500 mb-3"
              }
              key={row.ranking}
            >
              <div
                className={`col-span-3 flex justify-between ${
                  row.ranking <= 3 && "border-l border-green-400"
                } pl-2`}
              >
                <div>{row.ranking}</div>
                <div>
                  {row.logo} {row.teamName}
                </div>
              </div>
              <div className={"col-span-1 flex justify-center"}>
                {row.gameCount}
              </div>
              <div className={"col-span-1 flex justify-center"}>{row.diff}</div>
              <div className={"col-span-1 flex justify-center"}>
                {row.point}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
