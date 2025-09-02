export default function Loading() {
  return (
    <div className='font-[family-name:var(--font-geist-sans)] bg-[#05161F] min-h-screen relative'>
      {/* Main scrollable event list */}
      <div className='relative pb-[320px]'>
        {' '}
        {/* Space for fixed bar */}
        <main
          className='flex flex-col w-full py-14 lg:pt-20 pb-4 px-2 lg:px-4 gap-y-1 h-[75svh] lg:h-[80svh] overflow-y-auto relative no-scrollbar'
          style={{ minHeight: 'unset' }}
        >
          <div className='flex flex-col gap-y-1'>
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className='bg-[#E9EDB9]/70 rounded-md p-4 flex flex-col gap-3 animate-pulse'
              >
                <div className='flex items-center justify-between gap-4'>
                  <div className='h-6 w-24 bg-[#05161F]/40 rounded' />
                  <div className='h-6 w-[25%] bg-[#05161F]/60 rounded' />
                </div>
                {/* <div className='h-4 w-2/3 bg-[#b25403]/40 rounded' />
                <div className='h-4 w-full bg-[#b25403]/20 rounded' />
                <div className='flex gap-2 mt-2'>
                  <div className='h-4 w-16 bg-[#B3C200]/30 rounded' />
                  <div className='h-4 w-16 bg-[#B3C200]/20 rounded' />
                  <div className='h-4 w-16 bg-[#B3C200]/10 rounded' />
                </div> */}
              </div>
            ))}
          </div>
        </main>
        {/* Bottom gradient overlay for scroll area */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#05161F] to-transparent z-50' />
      </div>

      {/* Fixed month/year bar at the bottom */}
      <div className='fixed w-full bottom-0 left-0 z-20'>
        <div className='w-full mx-auto px-4 font-[family-name:var(--font-kleber)] py-8 pt-6 relative bg-[#05161F]'>
          <div className='text-7xl md:text-9xl bg-gradient-to-b from-[#B25403] to-[#B3C200] bg-clip-text text-center text-transparent leading-none flex items-end justify-between md:items-center'>
            <div className='w-12 h-20 rounded bg-[#B3C200]/20 animate-pulse' />
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-4 flex-1'>
              <div className='text-8xl lg:text-9xl bg-gradient-to-b from-[#D90000] via-[#B3C200] to-[#D90000] bg-clip-text text-transparent leading-[1]'>
                <span className='inline-block w-96 h-16 lg:h-24 bg-[#b25403]/50 rounded animate-pulse' />
              </div>
              <div className='text-8xl lg:text-9xl bg-gradient-to-b from-[#D90000] via-[#B3C200] to-[#D90000] bg-clip-text text-transparent leading-[1]'>
                <span className='inline-block w-32 h-16 lg:h-24 bg-[#b25403]/50 rounded animate-pulse' />
              </div>
            </div>
            <div className='w-12 h-20 rounded bg-[#B3C200]/20 animate-pulse' />
          </div>
          {/* Top gradient overlay for the bar */}
          <div className='pointer-events-none absolute -top-8.5 left-0 right-0 h-[20%] bg-gradient-to-t from-[#05161F] to-transparent' />
        </div>
      </div>
    </div>
  )
}
