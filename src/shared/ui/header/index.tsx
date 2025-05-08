import Image from "next/image";
import SubtitleText from "../typography/subtitle-text";
import BaseText from "../typography/base-text";
import Link from "next/link";
import ResponsiveContainer from "../responsive-container";

const Header = () => {
  return (
    <>
      <div
        className='
            fixed
            top-0
            left-0
            right-0
            z-50
            hidden
            md:block
            h-[30px]
            content-center
            bg-black
          '
      >
        <ResponsiveContainer>
          <div className='flex'>
            <div className='grow' />
            <div className='text-[12px] text-white'>
              contact: hmh94s@gmail.com
            </div>
          </div>
        </ResponsiveContainer>
      </div>
      <div
        className='
        fixed
        top-0
        md:top-[30px]
        left-0
        right-0
        z-50
        h-[50px]
        sm:h-[60px]
        md:h-[70px]
        lg:h-[80px]
        content-center
        bg-black
        w-full
      '
      >
        <ResponsiveContainer>
          <div className={"flex"}>
            <div>
              <Image
                src='/resource/logo.png'
                width={40}
                height={40}
                alt='logo'
              />
            </div>
            <div className='content-center'>
              <SubtitleText cssOption='text-white!'>INFOOTBALL</SubtitleText>
            </div>
            <div className='grow' />
            <div className='flex gap-4'>
              <button className='cursor-pointer px-2 hover:bg-primary rounded-lg transition-all duration-300 ease-in-out'>
                <Link href='/schedules'>
                  <BaseText cssOption='text-zinc-100!'>Schedules</BaseText>
                </Link>
              </button>
              <button className='cursor-pointer px-2 hover:bg-primary rounded-lg transition-all duration-300 ease-in-out'>
                <Link href='/teams'>
                  <BaseText cssOption='text-zinc-100!'>Teams</BaseText>
                </Link>
              </button>
              <button className='cursor-pointer px-2 hover:bg-primary rounded-lg transition-all duration-300 ease-in-out'>
                <Link href='/players'>
                  <BaseText cssOption='text-zinc-100!'>Players</BaseText>
                </Link>
              </button>
              <button className='cursor-pointer px-2 hover:bg-primary rounded-lg transition-all duration-300 ease-in-out'>
                <Link href='/news'>
                  <BaseText cssOption='text-zinc-100!'>News</BaseText>
                </Link>
              </button>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
      <div
        className='h-[50px] sm:h-[60px]
        md:h-[100px]
        lg:h-[110px]'
      />
    </>
  );
};

export default Header;
