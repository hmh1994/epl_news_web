import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image
              src={"/resource/logo-dark.png"}
              alt={"logo"}
              width={50}
              height={50}
            />
            <span className='text-xl font-bold'>INFOOTBALL</span>
          </div>
        </Link>
        <nav className='hidden md:flex gap-6'>
          <Link
            href='/'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            Home
          </Link>
          <Link
            href='/news'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            News
          </Link>
          <Link
            href='/matches'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            Matches
          </Link>
          <Link
            href='/teams'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            Teams
          </Link>
          <Link
            href='/players'
            className='text-sm font-medium hover:text-primary transition-colors'
          >
            Players
          </Link>
        </nav>
        <div className='flex items-center gap-4'>
          <Button
            variant='outline'
            size='sm'
            className='hidden md:flex hover:bg-primary hover:text-white'
          >
            Sign In
          </Button>
          {/* <Button
              size='sm'
              className='hidden md:flex bg-green-600 hover:bg-green-700'
            >
              Join Community
            </Button> */}
          <Button variant='ghost' size='icon' className='md:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-6 w-6'
            >
              <line x1='4' x2='20' y1='12' y2='12' />
              <line x1='4' x2='20' y1='6' y2='6' />
              <line x1='4' x2='20' y1='18' y2='18' />
            </svg>
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
