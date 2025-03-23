import Divider from "../common/divider";

export default function Stats() {
  return (
    <>
      <div className='grid grid-cols-4 gap-4 px-2 my-5'>
        <div className='rounded-lg border-neutral-400 border text-neutral-100 p-4'>
          <div className='text-xl font-bold'>Apperances</div>
          <Divider />
          <div className='text-5xl font-black'>269</div>
        </div>
        <div className='rounded-lg border-neutral-400 border text-neutral-100 p-4'>
          <div className='text-xl font-bold'>Clean sheets</div>
          <Divider />
          <div className='text-5xl font-black'>117</div>
        </div>
        <div className='rounded-lg border-neutral-400 border text-neutral-100 p-4'>
          <div className='text-xl font-bold'>Wins</div>
          <Divider />
          <div className='text-5xl font-black'>200</div>
        </div>
        <div className='rounded-lg border-neutral-400 border text-neutral-100 p-4'>
          <div className='text-xl font-bold'>Losses</div>
          <Divider />
          <div className='text-5xl font-black'>37</div>
        </div>
      </div>
      <Divider />
      <div className='grid grid-cols-2 gap-4 px-2 my-5'>
        <div className='rounded-lg overflow-hidden'>
          <div
            style={{
              borderImage:
                "linear-gradient(to right, #a1a1a1, #a1a1a1,  #525252) 1",
              borderRadius: 25,
            }}
            className='rounded-lg border-neutral-400 border text-neutral-200 p-4 border-t-[15px] mb-1'
          >
            <div className='text-xl font-black text-neutral-100'>
              Goalkeeping
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Saves</div>
              <div className='grow' />
              <div className='text-lg font-black'>461</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Penalties Saved</div>
              <div className='grow' />
              <div className='text-lg font-black'>3</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Punches</div>
              <div className='grow' />
              <div className='text-lg font-black'>66</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>High Claims</div>
              <div className='grow' />
              <div className='text-lg font-black'>123</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Catches</div>
              <div className='grow' />
              <div className='text-lg font-black'>26</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Sweeper clearances</div>
              <div className='grow' />
              <div className='text-lg font-black'>172</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Throw outs</div>
              <div className='grow' />
              <div className='text-lg font-black'>1,220</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Goal Kicks</div>
              <div className='grow' />
              <div className='text-lg font-black'>1,101</div>
            </div>
          </div>
        </div>
        <div className='rounded-lg overflow-hidden'>
          <div
            style={{
              borderImage:
                "linear-gradient(to right, #a1a1a1, #a1a1a1,  #525252) 1",
              borderRadius: 25,
            }}
            className='rounded-lg border-neutral-400 border text-neutral-200 p-4 border-t-[15px] mb-1'
          >
            <div className='text-xl font-black text-neutral-100'>Defence</div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Clean sheets</div>
              <div className='grow' />
              <div className='text-lg font-black'>117</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Goals Conceded</div>
              <div className='grow' />
              <div className='text-lg font-black'>213</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Errors leading to goal</div>
              <div className='grow' />
              <div className='text-lg font-black'>9</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Own goals</div>
              <div className='grow' />
              <div className='text-lg font-black'>0</div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
      <Divider />
      <div className='grid grid-cols-2 gap-4 px-2 my-5'>
        <div className='rounded-lg overflow-hidden'>
          <div
            style={{
              borderImage:
                "linear-gradient(to right, #a1a1a1, #a1a1a1,  #525252) 1",
              borderRadius: 25,
            }}
            className='rounded-lg border-neutral-400 border text-neutral-200 p-4 border-t-[15px] mb-1'
          >
            <div className='text-xl font-black text-neutral-100'>
              Discipline
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Yellow cards</div>
              <div className='grow' />
              <div className='text-lg font-black'>23</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Red cards</div>
              <div className='grow' />
              <div className='text-lg font-black'>1</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Fouls</div>
              <div className='grow' />
              <div className='text-lg font-black'>10</div>
            </div>
            <Divider />
          </div>
        </div>
        <div className='rounded-lg overflow-hidden'>
          <div
            style={{
              borderImage:
                "linear-gradient(to right, #a1a1a1, #a1a1a1,  #525252) 1",
              borderRadius: 25,
            }}
            className='rounded-lg border-neutral-400 border text-neutral-200 p-4 border-t-[15px] mb-1'
          >
            <div className='text-xl font-black text-neutral-100'>Team Play</div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Goals</div>
              <div className='grow' />
              <div className='text-lg font-black'>0</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Assists</div>
              <div className='grow' />
              <div className='text-lg font-black'>6</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Passes</div>
              <div className='grow' />
              <div className='text-lg font-black'>7,501</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Passes per match</div>
              <div className='grow' />
              <div className='text-lg font-black'>27.88</div>
            </div>
            <Divider />
            <div className='flex'>
              <div className='text-lg'>Accurate long balls</div>
              <div className='grow' />
              <div className='text-lg font-black'>1,177</div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}
