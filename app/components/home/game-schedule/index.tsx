export default function GameSchedule() {
  return (
    <div className={"grid h-full"}>
      <div className={"rounded-lg w-full mx-auto bg-neutral-900"}>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
          }
        >
          <button
            className={
              "rounded-xl p-1 hover:text-gray-200 hover:bg-neutral-500 w-25"
            }
          >
            TODAY
          </button>
        </div>
        <div className={"p-4 flex justify-center center-align"}>
          <span className='bg-neutral-700 text-neutral-200 text-md me-2 px-2.5 py-0.5 rounded-xl mx-2'>
            진행중
          </span>
          <span className='bg-neutral-700 text-neutral-200 text-md me-2 px-2.5 py-0.5 rounded-xl  mx-2'>
            시간순
          </span>
        </div>
      </div>

      <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
          }
        >
          스페인
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>HOME TEAM</div>
            <div>[LOGO]</div>
            <div
              className={
                "flex-col justify-center center-align w-10 px-auto mx-3"
              }
            >
              <div className={"flex center-align justify-center"}>23:00</div>
            </div>
            <div>[LOGO]</div>
            <div>AWAY TEAM</div>
          </div>
        </div>

        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500"
            }
          >
            <div>HOME TEAM</div>
            <div>[LOGO]</div>
            <div
              className={
                "flex-col justify-center center-align w-10 px-auto mx-3"
              }
            >
              <div className={"flex center-align justify-center"}>2:2</div>
            </div>
            <div>[LOGO]</div>
            <div>AWAY TEAM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
