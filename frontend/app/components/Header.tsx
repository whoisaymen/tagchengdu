import Link from 'next/link'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import HeaderNav from './nav/HeaderNav'

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className='fixed top-0 left-0 right-0 text-[var(--site-paper)] p-3 max-[400px]:px-2 md:p-4 md:pr-4 min-[900px]:pr-8 flex justify-between items-center z-[35] uppercase font-[family-name:var(--font-kleber)] text-[1.2rem] md:text-[2rem] lg:text-4xl'>
      <HeaderNav />
    </header>
  )
}
