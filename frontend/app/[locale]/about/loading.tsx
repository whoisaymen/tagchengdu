export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-start text-[#E9EDB9] font-[family-name:var(--font-geist-sans)] py-16 lg:py-40 tracking-tighter font-normal z-50 mix-blend-overlay text-glow w-full h-full'>
      <div className='w-full max-w-7xl px-4'>
        <div className='animate-pulse flex flex-col space-y-6'>
          <div className='h-32 bg-[#E9EDB9]/30 rounded' />
          <div className='h-32 bg-[#E9EDB9]/10 rounded' />
          <div className='h-32 bg-[#E9EDB9]/20 rounded' />
          <div className='h-32 bg-[#E9EDB9]/20 rounded' />
          <div className='h-32 bg-[#E9EDB9]/10 rounded' />
        </div>
      </div>
    </div>
  )
}
