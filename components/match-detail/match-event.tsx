export function MatchEvent({ event }: { event: any }) {
  switch (event.type) {
    case "goal":
      return (
        <div className='flex items-center gap-2 py-2'>
          <div className='w-12 text-right font-medium'>
            {event.minute}&apos;
          </div>
          <div className='w-6 flex justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-green-600'
            >
              <circle cx='12' cy='12' r='10' />
              <circle cx='12' cy='12' r='6' />
              <circle cx='12' cy='12' r='2' />
            </svg>
          </div>
          <div className='flex-1'>
            <div className='font-medium'>{event.player}</div>
            {event.assistedBy && (
              <div className='text-xs text-muted-foreground'>
                Assist: {event.assistedBy}
              </div>
            )}
          </div>
          <div className='w-20 text-right'>
            {event.team === "home" ? "1-0" : "0-1"}
          </div>
        </div>
      );
    case "yellowCard":
      return (
        <div className='flex items-center gap-2 py-2'>
          <div className='w-12 text-right font-medium'>
            {event.minute}&apos;
          </div>
          <div className='w-6 flex justify-center'>
            <div className='w-3 h-4 bg-yellow-400'></div>
          </div>
          <div className='flex-1'>
            <div className='font-medium'>{event.player}</div>
            <div className='text-xs text-muted-foreground'>Yellow Card</div>
          </div>
          <div className='w-20'></div>
        </div>
      );
    case "redCard":
      return (
        <div className='flex items-center gap-2 py-2'>
          <div className='w-12 text-right font-medium'>
            {event.minute}&apos;
          </div>
          <div className='w-6 flex justify-center'>
            <div className='w-3 h-4 bg-red-600'></div>
          </div>
          <div className='flex-1'>
            <div className='font-medium'>{event.player}</div>
            <div className='text-xs text-muted-foreground'>Red Card</div>
          </div>
          <div className='w-20'></div>
        </div>
      );
    case "substitution":
      return (
        <div className='flex items-center gap-2 py-2'>
          <div className='w-12 text-right font-medium'>
            {event.minute}&apos;
          </div>
          <div className='w-6 flex justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-blue-500'
            >
              <path d='M17 2v20' />
              <path d='M7 2v20' />
              <path d='M17 12H7' />
            </svg>
          </div>
          <div className='flex-1'>
            <div className='font-medium'>
              <span className='text-green-600'>↑ {event.playerIn}</span>
              <span className='mx-1'>|</span>
              <span className='text-red-600'>↓ {event.playerOut}</span>
            </div>
            <div className='text-xs text-muted-foreground'>Substitution</div>
          </div>
          <div className='w-20'></div>
        </div>
      );
    default:
      return null;
  }
}
