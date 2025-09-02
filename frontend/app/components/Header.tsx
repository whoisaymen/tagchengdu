import Link from 'next/link'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import HeaderNav from './nav/HeaderNav'

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className='fixed top-0 left-0 right-0 text-[#E9EDB9] p-3 lg:p-4 lg:pr-8 flex justify-between items-center z-20 uppercase font-[family-name:var(--font-kleber)] text-[1.2rem] lg:text-4xl'>
      <HeaderNav />
    </header>
  )
}
