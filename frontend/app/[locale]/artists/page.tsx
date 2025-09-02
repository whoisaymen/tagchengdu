import { Suspense } from 'react'
import Link from 'next/link'

import { AllPosts } from '@/app/components/Posts'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Loading from './loading'

const names = [
  'Cora',
  'Bugsy',
  'Kaishandao',
  'NYB',
  'Xing',
  'Zarah',
  'Darkle',
  'HAO',
  'DJ Blue',
  'Leonwill',
  'M2F',
  'QiuQiu',
  'Come to Mama',
  'Hazel',
  // 'DJ Tool',
  // 'DJ K',
  // 'DJ LOL',
  // 'DJ Y',
  // 'Aymen',
]

export default async function ArtistsPage() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <main className='flex flex-col items-center justify-center h-full w-full font-[family-name:var(--font-kleber)] overflow-y-scroll'>
      {names.map((name, index) => (
        <Link
          key={index}
          href={`/artists/${name.toLowerCase().replace(/ /g, '-')}`}
        >
          <h1
            key={index}
            className='uppercase text-[3.5rem] md:text-[5rem] text-center leading-[0.75] max-w-7xl mx-auto z-10 relative text-[#E9EDB9] mix-blend-difference'
          >
            {name}
          </h1>
        </Link>
      ))}
    </main>
    // <Loading />
  )
}
