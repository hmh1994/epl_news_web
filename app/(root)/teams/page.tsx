"use client";

import Breadcrumb from "@/app/components/common/breadcrumb";
import Divider from "@/app/components/common/divider";
import TeamsTable from "@/app/components/teams/teams-table";
import { SyntheticEvent, useState } from "react";

export default function Teams() {
  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setShow(true);
  };

  const breadcrumbPath = [
    {
      pathName: "TEAMS",
    },
  ];

  return (
    <div className='bg-neutral-700 grid  gap-6 w-full px-4 pt-10 mb-10'>
      <div className={`bg-neutral-800 rounded-lg p-2 h-content mb-3`}>
        <Breadcrumb breadcrumbPath={breadcrumbPath} />
        <Divider />
        <form className='mx-auto flex justify-left p-1' onSubmit={handleSubmit}>
          <select
            id='league'
            className='bg-neutral-700 border border-neutral-300 text-neutral-200 text-sm rounded-lg block w-50 max-sm:w-12 p-2.5 max-sm:p-1 max-sm:sm mx-5'
          >
            <option value='europa'>유로파 컨퍼런스리그</option>
            <option value='premier'>프리미어리그</option>
          </select>
          <select
            id='season'
            className='bg-neutral-700 border border-neutral-300 text-neutral-200 text-sm rounded-lg block w-50 max-sm:w-12 p-2.5 max-sm:p-1 max-sm:sm mx-5'
          >
            <option value='2024-25'>2024-25</option>
            <option value='2023-24'>2023-24</option>
            <option value='2022-23'>2022-23</option>
            <option value='2021-22'>2021-22</option>
            <option value='2020-21'>2020-21</option>
          </select>
          <div className={"grow"} />
          <button
            className={
              "mx-3 bg-neutral-700 rounded-xl px-3 text-neutral-300 hover:bg-neutral-600 hover:bg-neutral-100"
            }
            type='submit'
          >
            SELECT
          </button>
        </form>
      </div>
      {show && (
        <div className={`bg-neutral-800 rounded-lg p-2 h-content mb-3`}>
          <TeamsTable />
        </div>
      )}
    </div>
  );
}
