export default function Loading() {
  return (
    <div className='font-[family-name:var(--font-kleber)] flex flex-col lg:flex-row relative h-full justify-between'>
      {/* Left: Artist image skeleton */}
      <div className='w-full h-[45svh] lg:h-full relative bg-[#b25403]/30 animate-pulse'>
        <div className='absolute bottom-4 left-4 bg-[#E9EDB9] px-[0.5rem] lg:px-3 rounded-full text-[#05161F] uppercase text-[1.2rem] lg:text-4xl leading-[1.15] z-10 opacity-60'>
          <div className='w-24 h-8 bg-[#05161F]/20 rounded' />
        </div>
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[#b25403] to-transparent lg:hidden' />
        <div className='absolute inset-0 bg-gradient-to-tr from-[#b25403]/20 to-[#B3C200]/10 opacity-60' />
      </div>
      {/* Right: Info and SVG title skeleton */}
      <div className='w-full lg:min-h-svh bg-[#B3C200] flex flex-col items-center justify-between'>
        <div className='w-full h-[30svh] lg:h-[65vh] text-[#05161F] font-[family-name:var(--font-geist-sans)] flex flex-col justify-between py-0 relative tracking-tighter lg:pt-16'>
          <div className='absolute left-4 top-8 text-4xl opacity-40'>
            <div className='w-10 h-10 bg-[#b25403]/30 rounded-full' />
          </div>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-[#B3C200] to-transparent' />
          <div className='overflow-y-scroll h-full px-4 pb-12 space-y-8 mt-4'>
            <div className='space-y-4'>
              <div className='h-6 w-1/2 bg-[#b25403]/30 rounded animate-pulse' />
              <div className='h-4 w-2/3 bg-[#b25403]/20 rounded animate-pulse' />
              <div className='h-4 w-1/3 bg-[#b25403]/10 rounded animate-pulse' />
            </div>
          </div>
        </div>
        {/* Bottom: Up next, contact, socials, and SVG title */}
        <div className='p-4 w-full text-center bg-[#B3C200] text-[#05161F] flex justify-center items-start uppercase pt-0 flex-col lg:gap-1 font-[family-name:var(--font-geist-sans)] tracking-tighter text-xl lg:text-3xl h-[25svh] lg:h-auto'>
          <div className='flex justify-between w-full -mb-4'>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <div className='w-6 h-6 bg-[#05161F]/20 rounded mr-2' />
              <span className='uppercase opacity-60'>Up next</span>
              <span className='ml-2 w-24 h-4 bg-[#b25403]/20 rounded animate-pulse' />
            </div>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <div className='w-6 h-6 bg-[#05161F]/20 rounded mr-2' />
              <span className='w-20 h-4 bg-[#b25403]/20 rounded animate-pulse' />
            </div>
            <div className='flex items-center gap-x-0.5'>
              <div className='w-8 h-8 bg-[#05161F]/20 rounded-full animate-pulse' />
              <div className='w-8 h-8 bg-[#05161F]/10 rounded-full animate-pulse' />
              <div className='w-8 h-8 bg-[#05161F]/5 rounded-full animate-pulse' />
            </div>
          </div>
          <div className='w-full flex justify-center mt-6'>
            {/* SVG title skeleton */}
            <div className='w-3/4 h-20 bg-[#05161F]/10 rounded animate-pulse' />
          </div>
        </div>
      </div>
    </div>
  )
}
