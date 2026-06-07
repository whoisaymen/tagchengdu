import { Suspense } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

import { AllPosts } from '@/app/components/Posts'
import { aboutQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { getLocale } from 'next-intl/server'
import Loading from './loading'
import RichTextStrong from '@/app/components/rich-text/RichTextStrong'

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
    <div className='flex flex-col items-center justify-center text-[var(--site-paper)] font-[family-name:var(--font-geist-sans)] py-16 md:py-28 lg:py-32 min-[1440px]:py-40 tracking-tighter font-normal z-50 mix-blend-overlay text-glow'>
      <div className='max-w-7xl text-lg md:text-[2rem] lg:text-4xl px-4 md:px-6 min-[1440px]:px-8 leading-[1.15] flex flex-col space-y-6 md:space-y-10 min-[1440px]:space-y-12'>
        <PortableText value={blocks} components={portableTextComponents} />
      </div>
    </div>
    // <Loading />
  )
}

const portableTextComponents = {
  marks: {
    strong: RichTextStrong,
  },
}
