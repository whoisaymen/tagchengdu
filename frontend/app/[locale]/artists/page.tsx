import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { artistsSlugs } from '@/sanity/lib/queries'

export default async function ArtistsPage() {
  const { data: artists } = await sanityFetch({
    query: artistsSlugs,
  })

  const sortedArtists = artists
    ?.slice()
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )

  return (
    <main className='flex flex-col items-center justify-center h-full w-full font-[family-name:var(--font-kleber)] relative'>
      {sortedArtists?.map((artist: { slug: string; name: string }) => (
        <Link key={artist.slug} href={`/artists/${artist.slug}`}>
          <h1 className='uppercase text-[3rem] md:text-[5rem] text-center leading-[0.75] max-w-7xl mx-auto z-10 relative text-[#E9EDB9] mix-blend-difference'>
            {artist.name}
          </h1>
        </Link>
      ))}
    </main>
  )
}
