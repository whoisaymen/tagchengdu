export default function Loading() {
  // Example widths to simulate different name lengths
  const widths = [
    'w-2/3',
    'w-1/2',
    'w-3/4',
    'w-5/6',
    'w-1/3',
    'w-full',
    'w-2/5',
    'w-4/5',
    'w-3/5',
    'w-1/4',
    'w-11/12',
    'w-2/3',
  ]

  return (
    <main className='flex flex-col items-center justify-center h-full w-full font-[family-name:var(--font-kleber)] overflow-y-scroll px-8'>
      {widths.map((w, i) => (
        <div
          key={i}
          className='w-full max-w-7xl mx-auto z-10 relative my-1 flex justify-center'
        >
          <div
            className={`uppercase text-[3.5rem] md:text-[5rem] text-center leading-[0.75] bg-[#E9EDB9]/20 rounded animate-pulse h-[2.5rem] md:h-[5rem] ${w}`}
          />
        </div>
      ))}
    </main>
  )
}
