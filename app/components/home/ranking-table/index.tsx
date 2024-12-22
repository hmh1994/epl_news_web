export default function RankingTable() {
  return (
    <div className='w-full p-4 h-full bg-zinc-100'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium'>순위</h2>
        <span className='text-gray-600'>프리미어리그</span>
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-8 text-sm text-gray-600 mb-2'>
          <div className='col-span-3'>클럽</div>
          <div className='text-right'>경기</div>
          <div className='text-right'>승</div>
          <div className='text-right'>무</div>
          <div className='text-right'>패</div>
          <div className='text-right'>승점</div>
        </div>

        <div className='grid grid-cols-8 items-center bg-gray-50 p-2 rounded-lg'>
          <div className='col-span-3 flex items-center gap-2'>
            <span className='text-sm'>1</span>
            <img
              src='/epl_teams/liverpool.png?height=20&width=20'
              alt='Liverpool'
              className='w-5 h-5'
            />
            <span className='text-sm'>리버풀</span>
          </div>
          <div className='text-right text-sm'>15</div>
          <div className='text-right text-sm'>11</div>
          <div className='text-right text-sm'>3</div>
          <div className='text-right text-sm'>1</div>
          <div className='text-right text-sm font-medium'>36</div>
        </div>

        <div className='grid grid-cols-8 items-center p-2 rounded-lg'>
          <div className='col-span-3 flex items-center gap-2'>
            <span className='text-sm'>2</span>
            <img
              src='/epl_teams/liverpool.png?height=20&width=20'
              alt='Chelsea'
              className='w-5 h-5'
            />
            <span className='text-sm'>첼시</span>
          </div>
          <div className='text-right text-sm'>16</div>
          <div className='text-right text-sm'>10</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm'>2</div>
          <div className='text-right text-sm font-medium'>34</div>
        </div>

        <div className='grid grid-cols-8 items-center bg-gray-50 p-2 rounded-lg'>
          <div className='col-span-3 flex items-center gap-2'>
            <span className='text-sm'>3</span>
            <img
              src='/epl_teams/liverpool.png?height=20&width=20'
              alt='Arsenal'
              className='w-5 h-5'
            />
            <span className='text-sm'>아스널</span>
          </div>
          <div className='text-right text-sm'>16</div>
          <div className='text-right text-sm'>8</div>
          <div className='text-right text-sm'>6</div>
          <div className='text-right text-sm'>2</div>
          <div className='text-right text-sm font-medium'>30</div>
        </div>

        <div className='grid grid-cols-8 items-center p-2 rounded-lg'>
          <div className='col-span-3 flex items-center gap-2'>
            <span className='text-sm'>5</span>
            <img
              src='/epl_teams/liverpool.png?height=20&width=20'
              alt='Nottingham Forest'
              className='w-5 h-5'
            />
            <span className='text-sm'>리버풀</span>
          </div>
          <div className='text-right text-sm'>16</div>
          <div className='text-right text-sm'>8</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm font-medium'>28</div>
        </div>
        <div className='grid grid-cols-8 items-center p-2 rounded-lg'>
          <div className='col-span-3 flex items-center gap-2'>
            <span className='text-sm'>6</span>
            <img
              src='/epl_teams/liverpool.png?height=20&width=20'
              alt='Nottingham Forest'
              className='w-5 h-5'
            />
            <span className='text-sm'>리버풀</span>
          </div>
          <div className='text-right text-sm'>16</div>
          <div className='text-right text-sm'>8</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm font-medium'>28</div>
        </div>
        <div className='grid grid-cols-8 items-center p-2 rounded-lg'>
          <div className='col-span-3 flex items-center gap-2'>
            <span className='text-sm'>7</span>
            <img
              src='/epl_teams/liverpool.png?height=20&width=20'
              alt='Nottingham Forest'
              className='w-5 h-5'
            />
            <span className='text-sm'>리버풀</span>
          </div>
          <div className='text-right text-sm'>16</div>
          <div className='text-right text-sm'>8</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm'>4</div>
          <div className='text-right text-sm font-medium'>28</div>
        </div>
      </div>
    </div>
  );
}
