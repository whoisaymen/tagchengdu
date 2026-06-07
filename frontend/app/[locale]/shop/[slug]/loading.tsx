import ShopCart from '@/app/components/shop/ShopCart'

export default function Loading() {
  return (
    <>
      <main className='relative flex min-h-svh flex-col overflow-hidden font-[family-name:var(--font-kleber)] lg:flex-row lg:pr-[4.75rem]'>
        <div className='relative h-[55svh] w-full overflow-hidden bg-[var(--site-ink)] animate-pulse lg:min-h-svh lg:w-[52%]'>
          <div className='pointer-events-none absolute inset-0 bg-[var(--site-paper)]/8 blur-xl' />
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[var(--site-accent-hot)]/18 to-transparent lg:hidden' />

          <div className='pointer-events-none absolute top-0 bottom-0 right-0 z-10 hidden w-[30%] bg-gradient-to-l from-[var(--site-accent-hot)] to-transparent lg:block' />
          <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[var(--site-accent-hot)] to-transparent lg:hidden' />

          <div className='absolute bottom-4 left-4 z-20 h-[1.45rem] w-[4.5rem] rounded-full bg-[var(--site-paper)] lg:h-[2.65rem] lg:w-[7.25rem]' />
        </div>

        <div className='relative flex h-[45svh] w-full flex-col bg-[var(--site-accent)] text-[var(--site-ink)] lg:min-h-svh lg:w-[48%]'>
          <div className='relative h-[16.5svh] flex-shrink-0 overflow-hidden lg:h-auto lg:flex-1'>
            <div className='pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-6 bg-gradient-to-t from-[var(--site-accent)] to-transparent' />

            <div className='h-full overflow-hidden px-4 pt-4 pb-0 font-[family-name:var(--font-geist-sans)] tracking-tighter md:px-6 lg:pt-16 lg:pb-4'>
              <div className='space-y-2 lg:space-y-3'>
                <div className='h-5 w-[92%] animate-pulse bg-[var(--site-ink)]/12 lg:h-7' />
                <div className='h-5 w-[88%] animate-pulse bg-[var(--site-ink)]/12 lg:h-7' />
                <div className='h-5 w-[82%] animate-pulse bg-[var(--site-ink)]/12 lg:h-7' />
                <div className='h-5 w-[76%] animate-pulse bg-[var(--site-ink)]/12 lg:h-7' />
              </div>
            </div>
          </div>

          <div className='absolute inset-x-0 bottom-[calc(2.35rem+0.4rem)] z-20 px-1 pt-0 text-center md:px-4 lg:static lg:flex lg:flex-1 lg:flex-shrink-0 lg:flex-col lg:justify-end lg:pb-2'>
            <div className='mt-2 relative left-1/2 w-[100vw] -translate-x-1/2 lg:left-auto lg:w-full lg:translate-x-0'>
              <div className='mx-auto mb-2 h-[clamp(3rem,8.8vw,5rem)] w-[72%] animate-pulse bg-[var(--site-ink)]/12' />
              <div className='mx-auto h-[clamp(4.25rem,10vw,7rem)] w-[90%] animate-pulse bg-[var(--site-ink)]/14' />
            </div>
          </div>
        </div>
      </main>
      <ShopCart />
    </>
  )
}
