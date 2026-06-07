'use client'

import { usePathname } from 'next/navigation'
import ArtistDetailLoading from '@/app/components/artists/ArtistDetailLoading'

const listMask =
  'linear-gradient(to bottom, transparent 0, transparent clamp(4.5rem, 7vh, 5.5rem), black clamp(6rem, 11vh, 9rem), black calc(100% - clamp(6rem, 11vh, 9rem)), transparent calc(100% - clamp(2rem, 5vh, 4rem)), transparent 100%)'

const loadingArtistNames = [
  'Bugsy',
  'Cora',
  'D.DAN',
  'Darkle',
  'DJ BLUE',
  'DJ TOOL',
  'Hao',
  'Hazel',
  'Kaishandao',
  'Lawrence Lee',
  'Leonwill',
  'NYB',
  'Pinkboialwayscry',
  'QiuQiu',
  'Zarah',
]

function hasLongSingleWordName(name: string) {
  return name.split(/\s+/).some((word) => word.length >= 15)
}

export default function Loading() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const artistsSegmentIndex = segments.indexOf('artists')
  const isArtistDetail =
    artistsSegmentIndex >= 0 && segments.length > artistsSegmentIndex + 1

  if (isArtistDetail) {
    return <ArtistDetailLoading />
  }

  return (
    <main className='relative h-full w-full overflow-hidden font-[family-name:var(--font-kleber)]'>
      <div
        className='mx-auto h-full w-full max-w-7xl overflow-y-auto no-scrollbar px-4 md:px-6'
        style={{
          paddingTop: 'clamp(6rem, 11vh, 9rem)',
          paddingBottom: 'clamp(6rem, 11vh, 9rem)',
          scrollPaddingTop: 'clamp(6rem, 11vh, 9rem)',
          scrollPaddingBottom: 'clamp(6rem, 11vh, 9rem)',
          WebkitMaskImage: listMask,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskImage: listMask,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
        }}
      >
        <div className='flex min-h-full flex-col items-center justify-center'>
          {loadingArtistNames.map((name) => {
            const isLongName = hasLongSingleWordName(name)

            return (
              <div
                key={name}
                className='relative block px-2'
                aria-hidden='true'
              >
                <h1
                  className={`uppercase text-[clamp(3rem,10vw,5rem)] text-center leading-[0.79] max-w-7xl mx-auto z-10 relative ${isLongName ? 'max-[380px]:text-[clamp(2.5rem,11.2vw,2.8rem)]' : ''}`}
                >
                  <span className='relative inline-block align-top'>
                    <span className='invisible'>{name}</span>
                    <span className='absolute inset-x-0 bottom-[0.08em] top-[0.08em] rounded-[0.08em] bg-[#f6efbb]/24 opacity-80 shadow-[0_2px_2px_rgba(5,22,31,0.2)] blur-[0.4px] animate-pulse' />
                  </span>
                </h1>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
