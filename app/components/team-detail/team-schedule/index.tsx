export default function TeamSchedule() {
  return (
    <div className={"grid h-content"}>
      <div className='rounded-lg w-full mx-auto bg-neutral-900 mt-10 pb-4'>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black mb-2"
          }
        >
          SCHEDULE
        </div>
        <div className={"p-1 flex-col justify-center center-align px-5"}>
          <div
            className={
              "flex center-align text-neutral-200 pb-2 border-b border-neutral-500"
            }
          >
            <div className='font-semibold'>25.02.22 - 05:00</div>
            <div className='grow' />

            <div className='flex'>
              <div className={"bg-neutral-500 rounded-sm mr-2 px-2 w-fit "}>
                <span className={"text-neutral-100 text-sm font-black"}>
                  홈
                </span>
              </div>
              <span className='text-green-400'>TEAM 1</span>
            </div>
            <div className='grow' />
            <div>4</div>
            <div className='grow' />
            <div className='font-black'>종료</div>
            <div className='grow' />
            <div>0</div>
            <div className='grow' />
            <div>
              <span className='text-red-400'>TEAM 2</span>
            </div>
            <div className='grow' />
            <button
              className={
                "mx-3 bg-neutral-700 rounded-sm px-3 text-neutral-300 hover:bg-neutral-600 hover:bg-neutral-100"
              }
            >
              기록
            </button>
          </div>

          {[1, 2, 3, 4, 5].map((el) => (
            <div
              className={
                "flex center-align text-neutral-200 py-2 border-b border-neutral-500"
              }
              key={el}
            >
              <div className='font-semibold'>25.02.22 - 05:00</div>
              <div className='grow' />

              <div className='flex'>
                <div className={"bg-neutral-500 rounded-sm mr-2 px-2 w-fit"}>
                  <span className={"text-neutral-100 text-sm font-black"}>
                    홈
                  </span>
                </div>
                <span>TEAM 1</span>
              </div>
              <div className='grow' />
              <div></div>
              <div className='grow' />
              <div>예정</div>
              <div className='grow' />
              <div></div>
              <div className='grow' />
              <div>TEAM 2</div>
              <div className='grow' />
              <button
                className={
                  "mx-3 bg-neutral-700 rounded-sm px-3 text-neutral-300 hover:bg-neutral-600 hover:bg-neutral-100"
                }
              >
                기록
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
