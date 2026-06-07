import { Link } from '@/i18n/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { artistsSlugs } from '@/sanity/lib/queries'

const listMask =
  'linear-gradient(to bottom, transparent 0, transparent clamp(4.5rem, 7vh, 5.5rem), black clamp(6rem, 11vh, 9rem), black calc(100% - clamp(6rem, 11vh, 9rem)), transparent calc(100% - clamp(2rem, 5vh, 4rem)), transparent 100%)'

function hasLongSingleWordName(name: string) {
  return name.split(/\s+/).some((word) => word.length >= 15)
}

export default async function ArtistsPage() {
  const { data: artists } = await sanityFetch({
    query: artistsSlugs,
  })

  const sortedArtists = artists
    ?.slice()
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    )

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
          {sortedArtists?.map((artist: { slug: string; name: string }) => {
            const isLongName = hasLongSingleWordName(artist.name)

            return (
              <Link
                key={artist.slug}
                href={`/artists/${artist.slug}`}
                className='group relative block px-2 focus-visible:outline-none'
              >
                <h1
                  className={`uppercase text-[clamp(3rem,10vw,5rem)] text-center leading-[0.79] max-w-7xl mx-auto z-10 relative transition-transform duration-150 group-hover:scale-[1.015] group-focus-visible:scale-[1.015] ${isLongName ? 'max-[380px]:text-[clamp(2.5rem,11.2vw,2.8rem)]' : ''}`}
                >
                  <span
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 translate-y-[0.04em] scale-[1.01] text-[#07131b] opacity-48 blur-[0.55px] mix-blend-multiply'
                  >
                    {artist.name}
                  </span>
                  <span
                    className='relative block text-[#f6efbb] mix-blend-screen transition-[color,filter,opacity] duration-150 group-hover:text-[#fff7d6] group-focus-visible:text-[#fff7d6]'
                    style={{
                      filter:
                        'drop-shadow(0 0 6px rgba(255, 248, 211, 0.08)) drop-shadow(0 1px 6px rgba(5, 22, 31, 0.1))',
                      opacity: 0.97,
                    }}
                  >
                    {artist.name}
                  </span>
                </h1>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
