import Divider from "../../common/divider";

export default function PlayerInfoCard() {
  return (
    <div className='rounded-lg border-1 border-neutral-500 p-3 text-neutral-100'>
      <div className='flex'>
        <div>Club</div>
        <div className='grow' />
        <div className='font-semibold'>Manchester City</div>
      </div>
      <Divider />
      <div className='flex'>
        <div>Position</div>
        <div className='grow' />
        <div className='font-semibold'>Goalkeeper</div>
      </div>
      <Divider />
      <div className='font-bold my-2'>Permier League Record</div>
      <div className='flex'>
        <div>Appearances</div>
        <div className='grow' />
        <div className='font-semibold'>269</div>
      </div>
      <Divider />
      <div className='flex'>
        <div>Clean sheets</div>
        <div className='grow' />
        <div className='font-semibold'>117</div>
      </div>
      <Divider />
      <div className='flex'>
        <div>Goals</div>
        <div className='grow' />
        <div className='font-semibold'>0</div>
      </div>
      <Divider />
      <div className='flex'>
        <div>Assists</div>
        <div className='grow' />
        <div className='font-semibold'>6</div>
      </div>
      <Divider />
      <div className='font-bold my-2'>Honours & Awards</div>
      <div className='flex font-semibold'>
        <div>Golden Glove</div>
        <div className='grow' />
        <div className='font-semibold'>3</div>
      </div>
      <Divider />
      <div className='my-1'>2019/20</div>
      <div className='my-1'>2020/21</div>
      <div className='my-1'>2021/22</div>
      <Divider />
      <div className='flex font-semibold'>
        <div>Permier League Champion</div>
        <div className='grow' />
        <div className='font-semibold'>6</div>
      </div>
      <Divider />
      <div className='my-1'>2019/20</div>
      <div className='my-1'>2020/21</div>
      <div className='my-1'>2021/22</div>
      <Divider />
    </div>
  );
}
