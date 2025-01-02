"use client";
import { useLeague } from "@/app/context/LeagueContext";
import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  const { league } = useLeague();
  return (
    <nav
      className={`w-full flex items-center justify-between h-[90px] bg-${league}-main`}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <Link href='#' className='flex items-center space-x-2'>
            <Image
              src={`/resource/${league}_logo.svg`}
              alt={`${league} Logo`}
              width={70}
              height={70}
            />
            <span className='text-white text-2xl font-extrabold'>
              {league.toUpperCase().replaceAll("_", " ")} News 
            </span>
          </Link>
          <div className='flex items-center space-x-4'>
            <Link
              href='#schedule'
              className='flex items-center justify-center text-white font-bold px-4 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-[#4e2574]'
            >
              SCHEDULE
            </Link>
            <Link
              href='#schedule'
              className='flex items-center justify-center text-white font-bold px-4 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-[#4e2574]'
            >
              RANKING
            </Link>
            <Link
              href='#schedule'
              className='flex items-center justify-center text-white font-bold px-4 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-[#4e2574]'
            >
              NEWS
            </Link>
          </div>
        </div>
        <div className='flex items-center'>
          {/* You can add additional elements here, like a search bar or user profile */}
          <Link
            href='#schedule'
            className='flex items-center justify-center text-white font-bold px-4 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-[#4e2574]'
          >
            LOGIN
          </Link>
        </div>
      </div>
    </nav>
  );
}
