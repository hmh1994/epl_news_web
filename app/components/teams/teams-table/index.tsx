"use client";

import { useRouter } from "next/navigation";

export default function TeamsTable() {
  const router = useRouter();

  const onClickDetail = (teamName: string) => () => {
    router.push("/teams/" + teamName);
  };

  const rowTemplate = () => (
    <div
      className={
        "grid md:grid-cols-11 max-md:grid-cols-8 max-sm:grid-cols-5 flex center-align text-neutral-200 pb-4 border-b border-neutral-500 mt-2 font-normal"
      }
    >
      <div className={"col-span-2 max-sm:col-span-1"}>첼시</div>
      <div className={"col-span-1"}>6</div>
      <div className={"col-span-1"}>6</div>
      <div className={"col-span-1 max-sm:hidden"}>0</div>
      <div className={"col-span-1 max-sm:hidden"}>0</div>
      <div className={"col-span-1 max-md:hidden"}>26</div>
      <div className={"col-span-1 max-md:hidden"}>5</div>
      <div className={"col-span-1 max-md:hidden"}>21</div>
      <div className={"col-span-1 block font-extrabold"}>18</div>
      <div className={"col-span-1 block"}>
        <button
          className={"bg-neutral-700 p-1 rounded-md text-sm cursor-pointer"}
          onClick={onClickDetail("chelsea")}
        >
          DETAIL
        </button>
      </div>
    </div>
  );

  return (
    <div className={"grid h-full"}>
      <div className='rounded-lg w-full mx-auto bg-neutral-900 pb-4'>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
          }
        >
          유로파 컨퍼런스리그
        </div>
        <div className={"p-4 flex-col justify-center center-align"}>
          <div
            className={
              "grid md:grid-cols-11 max-md:grid-cols-8 max-sm:grid-cols-5  flex center-align text-neutral-200 pb-4 border-b border-neutral-500 font-black @container"
            }
          >
            <div className={"col-span-2 max-sm:col-span-1"}>클럽</div>
            <div className={"col-span-1"}>경기</div>
            <div className={"col-span-1"}>승</div>
            <div className={"col-span-1 max-sm:hidden"}>무</div>
            <div className={"col-span-1 max-sm:hidden"}>패</div>
            <div className={"col-span-1 max-md:hidden"}>득점</div>
            <div className={"col-span-1 max-md:hidden"}>실점</div>
            <div className={"col-span-1 max-md:hidden"}>득실</div>
            <div className={"col-span-1"}>승점</div>
            <div className={"col-span-1"}></div>
          </div>

          {rowTemplate()}
          {rowTemplate()}
          {rowTemplate()}
          {rowTemplate()}
          {rowTemplate()}
          {rowTemplate()}
        </div>
      </div>
    </div>
  );
}
