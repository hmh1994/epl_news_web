"use client";

import { useState, useRef, useEffect } from "react";

export default function Menu() {
  const [show, setShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShow(!show);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={menuRef} className='border-neutral-200 bg-neutral-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-white'>
            FootNerd
          </span>
        </a>
        <button
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg md:hidden focus:outline-none focus:ring-2 text-neutral-400 hover:bg-neutral-700 focus:ring-neutral-600'
          onClick={handleClick}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='false'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          id='navbar-default'
          className={`${!show && "hidden"} w-full md:block md:w-auto`}
        >
          <ul
            className={`font-medium flex flex-col p-4 md:p-0 mt-4 ${
              show && "border rounded-lg"
            } bg-neutral-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 bg-neutral-800 md:bg-neutral-900 border-neutral-700`}
          >
            <li>
              <a
                href='/teams'
                className='block py-2 px-3 text-neutral-900 rounded-sm hover:bg-neutral-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-700 md:p-0 dark:text-white md:dark:hover:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white md:dark:hover:bg-transparent'
              >
                Teams
              </a>
            </li>
            <li>
              <a
                href='/ranking'
                className='block py-2 px-3 text-neutral-900 rounded-sm hover:bg-neutral-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-700 md:p-0 dark:text-white md:dark:hover:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white md:dark:hover:bg-transparent'
              >
                Ranking
              </a>
            </li>
            <li>
              <a
                href='/news'
                className='block py-2 px-3 text-neutral-900 rounded-sm hover:bg-neutral-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-700 md:p-0 dark:text-white md:dark:hover:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white md:dark:hover:bg-transparent'
              >
                News
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
