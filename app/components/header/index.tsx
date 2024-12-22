import Menu from "./Menu";
import Schedule from "./Schedule";

export default function Header() {
  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-10'>
        <header className='w-full flex flex-col items-center justify-center '>
          <div className='w-full flex items-center justify-center bg-white h-[60px]'>
            HEADER
          </div>
          <Menu />
        </header>
      </div>
      <Schedule />
    </>
  );
}
