import { Suspense } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

import { AllPosts } from '@/app/components/Posts'
import { aboutQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { getLocale } from 'next-intl/server'
import Loading from './loading'

type AboutData = {
  description?: {
    [key: string]: any
    en?: any
  }
}

export default async function AboutPage() {
  const { data } = (await sanityFetch({ query: aboutQuery })) as {
    data: AboutData | null
  }

  const locale = await getLocale()

  const blocks = data?.description?.[locale] || data?.description?.en || []

  return (
    <div className='flex flex-col items-center justify-center text-[#E9EDB9] font-[family-name:var(--font-geist-sans)] py-16 lg:py-40 tracking-tighter font-normal z-50 mix-blend-overlay text-glow'>
      <div className='max-w-7xl text-lg lg:text-4xl px-4 leading-[1.15] flex flex-col space-y-6'>
        <PortableText value={blocks} components={portableTextComponents} />
      </div>
    </div>
    // <Loading />
  )
}

const portableTextComponents = {
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <span className='font-[family-name:var(--font-kleber)] tracking-normal text-[1.12rem] lg:text-[2.35rem] leading-[1.15]'>
        {children}
      </span>
    ),
  },
}
