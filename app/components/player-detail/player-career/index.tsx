"use client";

import React, { useState } from "react";

type Career = {
  id: string;
  season: string;
  teamName: string;
  apps: string;
  goal: number;
  competition: Array<{
    name: string;
    apps: string;
    goal: number;
  }>;
};

const careers: Career[] = [
  {
    id: "season_unique_id_1",
    season: "2024/2025",
    teamName: "Tottenham Hotspur",
    apps: "20 (0)",
    goal: 9,
    competition: [
      {
        name: "EFL Cup",
        apps: "4 (0)",
        goal: 2,
      },
      {
        name: "Other Club Friendlies",
        apps: "1 (0)",
        goal: 0,
      },
      {
        name: "FA Cup",
        apps: "4 (0)",
        goal: 2,
      },
    ],
  },
  {
    id: "season_unique_id_2",
    season: "2024/2025",
    teamName: "Bournemouth",
    apps: "4 (0)",
    goal: 7,
    competition: [],
  },
  {
    id: "season_unique_id_3",
    season: "2023/2024",
    teamName: "Bournemouth",
    apps: "4 (0)",
    goal: 7,
    competition: [],
  },
  {
    id: "season_unique_id_4",
    season: "2022/2023",
    teamName: "Liverpool",
    apps: "4 (0)",
    goal: 7,
    competition: [],
  },
];

const PlayerCareer: React.FC = () => {
  const [activeDescription, setActiveDescription] = useState<string | null>(
    null
  );

  const handleToggle = (id: string) => {
    setActiveDescription((prev) => (prev === id ? null : id));
  };

  return (
    <div className='mt-5'>
      <div className='w-full mx-auto rounded-lg shadow-md sm:max-w-4xl'>
        {/* 테이블 영역 */}
        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='text-sm font-normal text-neutral-100 border-t border-b text-left'>
                <th className='px-4 py-3'>Season</th>
                <th className='px-4 py-3'>Club</th>
                <th className='px-4 py-3'>Apps(Subs)</th>
                <th className='px-4 py-3'>Goals</th>
                <th className='px-4 py-3'></th>
              </tr>
            </thead>
            <tbody className='text-sm font-normal text-neutral-300'>
              {careers.map((career) => (
                <React.Fragment key={career.id}>
                  <tr
                    className='py-10 cursor-pointer border-b border-neutral-200 hover:bg-neutral-700'
                    onClick={() => handleToggle(career.id)}
                  >
                    <td className='px-4 py-4'>{career.season}</td>
                    <td className='px-4 py-4'>{career.teamName}</td>
                    <td className='px-4 py-4'>{career.apps}</td>
                    <td className='px-4 py-4'>{career.goal}</td>

                    <td className='p-4'>
                      <div className='px-4 py-4 text-center inline-flex items-center'>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300  ${
                            activeDescription === career.id ? "rotate-180" : ""
                          }`}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='white'
                        >
                          <path d='M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z' />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  {activeDescription === career.id && (
                    <tr className='py-4 px-4 border-t border-gray-200'>
                      <td colSpan={4} className='p-8'>
                        <h4 className='font-medium text-base text-neutral-300 mb-2'>
                          Other Competition
                        </h4>
                        {career.competition.map((competition) => (
                          <div
                            className='text-sm text-neutral-400 flex justify-between align-left'
                            key={competition.name}
                          >
                            <div></div>
                            <div className='w-[140px]'>{competition.name}</div>
                            <div className='max-w-[140px]'>
                              {competition.apps}
                            </div>
                            <div className='max-w-[140px]'>
                              {competition.goal}
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerCareer;
