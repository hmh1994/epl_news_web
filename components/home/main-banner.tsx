export function MainBanner() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=500&width=1920')] bg-cover bg-center relative">
      <div className='absolute inset-0 bg-black/50'></div>
      <div className='container relative z-10 flex flex-col items-center justify-center space-y-4 text-center text-white'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
            The Ultimate Football Community
          </h1>
          <p className='mx-auto max-w-[700px] text-lg md:text-xl'>
            INFOOTBALL gives you all the live scores, detailed stats, and news
            you need to follow soccer from anywhere in the world.
          </p>
        </div>
        {/* <div className='flex flex-col sm:flex-row gap-4'>
              <Button size='lg' className='bg-green-600 hover:bg-green-700'>
                Join Now
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-white border-white hover:bg-white/20'
              >
                Explore Content
              </Button>
            </div> */}
      </div>
    </section>
  );
}
