import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import ArrowRight from '@/app/components/svg/ArrowRight'
import { FiInstagram } from 'react-icons/fi'
import { FaSoundcloud } from 'react-icons/fa'
import { FaCirclePlay } from 'react-icons/fa6'

import { IoIosMusicalNotes } from 'react-icons/io'
import { sanityFetch } from '@/sanity/lib/live'
import {
  artistMetadataQuery,
  artistQuery,
  artistsSlugs,
  getPageQuery,
} from '@/sanity/lib/queries'
import { GetPageQueryResult } from '@/sanity.types'
import { PageOnboarding } from '@/app/components/Onboarding'
import ArtistTitleSvg from '@/app/components/svg/ArtistTitle'
import AnimatedGradient from '@/app/components/artists/AnimatedGradient'
import { getLocale } from 'next-intl/server'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import ArtistImage from '@/app/components/artists/ArtistImage'
import { useMemo } from 'react'
import Loading from './loading'
import SwirlArtistPage from '@/app/components/svg/SwirlArtistPage'
import ArtistContent from '@/app/components/artists/ArtistContent'
import ArtistSetPlayer from '@/app/components/artists/ArtistSetPlayer'
import { SITE_TITLE } from '@/app/lib/siteMetadata'
import {
  getArtistProfileThemeStyle,
  getSortedArtistIndex,
  normalizeArtistTitleSvg,
  resolveArtistProfileTheme,
} from '@/app/components/artists/artistProfileThemes'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

type ArtistData = {
  name?: string
  slug?: { current?: string }
  profileImage?: {
    asset?: { url?: string }
    alt?: { [key: string]: string } // localeString
  }
  bio?: { [key: string]: any } // localeBlockContent
  gigs?: any[]
  set?: string
  contact?: string // plain string
  socialLinks?: any[]
  mediaFile?: any
  upNext?: string // plain string
  instagram?: string
  soundcloud?: string
  raLink?: string
  musicLink?: string
  profileTheme?: string | null
  customSVG?: string
}

export async function generateStaticParams() {
  // Get all artist slugs
  const { data } = await sanityFetch({
    query: artistsSlugs,
    perspective: 'published',
    stega: false,
  })

  // Generate paths for all locales
  const locales = ['en', 'zh'] // List your supported locales

  // Return all combinations
  return (
    data?.flatMap((item: any) =>
      locales.map((locale) => ({
        slug: item.slug,
        locale,
      })),
    ) || []
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale

  const { data: artist } = (await sanityFetch({
    query: artistQuery,
    params: { slug: resolvedParams.slug },
    stega: false,
  })) as { data: ArtistData | null }

  if (!artist) {
    return {
      title: 'Artist Not Found',
      description: 'We could not find the requested artist.',
    }
  }

  // Extract description from bio if available
  let description = `Artist at ${SITE_TITLE}`
  const bioContent = artist.bio?.[locale] || artist.bio?.en
  if (bioContent) {
    if (typeof bioContent === 'string') {
      description = bioContent.substring(0, 160)
    } else if (Array.isArray(bioContent)) {
      // Extract text from portable text blocks
      description = bioContent
        .filter((block) => block._type === 'block')
        .map(
          (block) =>
            block.children?.map((child: any) => child.text).join('') || '',
        )
        .join(' ')
        .substring(0, 160)
    }
  }

  return {
    title: artist.name || 'Artist',
    description,
    openGraph: artist.profileImage?.asset?.url
      ? {
          images: [{ url: artist.profileImage.asset.url }],
        }
      : undefined,
  }
}

export default async function ArtistPage(props: Props) {
  const params = await props.params
  const locale = params.locale || 'en'

  const [{ data: artist }, { data: artists }] = (await Promise.all([
    sanityFetch({
      query: artistQuery,
      params,
    }),
    sanityFetch({
      query: artistsSlugs,
      stega: false,
    }),
  ])) as [
    { data: ArtistData | null },
    { data: { slug?: string | null; name?: string | null }[] | null },
  ]

  if (!artist) {
    return (
      <div className='h-svh w-full flex items-center justify-center font-[family-name:var(--font-geist-sans)] tracking-tighter'>
        <h2 className='text-xl'>Artist not found.</h2>
      </div>
    )
  }

  const artistIndex = getSortedArtistIndex(artists, {
    slug: params.slug,
    name: artist.name,
  })
  const artistTheme = resolveArtistProfileTheme(
    artist.profileTheme,
    artistIndex,
    params.slug,
  )
  const artistThemeStyle = getArtistProfileThemeStyle(artistTheme)
  const artistCustomSvg = artist.customSVG
    ? normalizeArtistTitleSvg(artist.customSVG)
    : null

  const platformIcons: Record<string, React.ReactNode> = {
    instagram: <FiInstagram />,
    soundcloud: (
      <FaSoundcloud className='bg-[#05161F] rounded-full text-[#B3C200] p-1' />
    ),
    residentadvisor: (
      <svg className='w-6 h-auto' viewBox='0 0 83 40' aria-label='RA logo'>
        <title>RA</title>
        <g fill='none' fillRule='evenodd'>
          <path fill='none' d='M0 0h24v24H0z'></path>
          <path
            d='M82.092 32.018c.556-.533.908-1.28.908-2.113 0-.802-.38-1.523-.9-2.051L58.665 4.3l-7.073 7.11 18.45 18.543h-26.14c-1.278-.038-2.29-.469-3.147-1.304l-11.73-11.788a6.828 6.828 0 00-4.689-1.888l-.017.001H10.004v-4.92h14.825c2.938.002 5.559 1.21 7.48 3.15l8.749 8.793 7.073-7.11-8.92-8.963C35.485 2.234 30.45 0 24.805 0H0v25.027h20.978v.002a4.919 4.919 0 013.486 1.48L35.95 38.053A6.74 6.74 0 0040.449 40h31.733a4.911 4.911 0 003.423-1.45l6.491-6.524-.004-.008'
            fill='currentColor'
          ></path>
        </g>
      </svg>
    ),
    mixcloud: (
      <svg className='w-6 h-auto' viewBox='0 0 32 32' aria-label='Mixcloud'>
        {/* Add your Mixcloud SVG here */}
        <circle cx='16' cy='16' r='16' fill='#1DA1F2' />
      </svg>
    ),
    applemusic: (
      <svg className='w-6 h-auto' viewBox='0 0 32 32' aria-label='Apple Music'>
        {/* Add your Apple Music SVG here */}
        <circle cx='16' cy='16' r='16' fill='#FA57C1' />
      </svg>
    ),
    bandcamp: (
      <svg className='w-6 h-auto' viewBox='0 0 32 32' aria-label='Bandcamp'>
        {/* Add your Bandcamp SVG here */}
        <rect x='4' y='12' width='24' height='8' fill='#629AA9' />
      </svg>
    ),
    other: (
      <IoIosMusicalNotes className='bg-[#05161F] rounded-md text-[#B3C200] p-1' />
    ),
  }

  function getPlatformIcon(platform: string) {
    return platformIcons[platform] || platformIcons.other
  }

  return (
    <>
      <div
        className='font-[family-name:var(--font-kleber)] flex flex-col lg:flex-row relative h-full justify-between'
        data-artist-theme={artistTheme.key}
        style={artistThemeStyle}
      >
        {/* Left Column - Image */}
        <div className='w-full h-[50svh] lg:h-full relative'>
          <SwirlArtistPage
            theme={{ fill: 'var(--site-ink)' }}
            className='w-[80%] lg:w-[40vw] saturate-0 z-20'
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 6.5,
              ease: 'linear',
              repeat: Infinity,
              delay: 0,
            }}
          />
          {artist.profileImage && (
            <ArtistImage
              image={artist.profileImage}
              alt={artist.profileImage?.alt?.[locale] || 'Artist Image'}
              priority
              className='object-cover w-full h-full'
            />
          )}
          <div className='absolute bottom-4 left-4 z-30'>
            <Link
              href='/artists'
              className='bg-[var(--site-paper)] px-[0.5rem] lg:px-3 rounded-full text-[var(--site-ink)] uppercase text-[1.2rem] lg:text-4xl leading-[1.15]'
            >
              Back
            </Link>
          </div>
          {artist.set ? (
            <ArtistSetPlayer
              artistName={artist.name}
              setUrl={artist.set}
              viewport='desktop'
              className='hidden lg:block lg:bottom-4 lg:right-4'
            />
          ) : null}
          {artist.set ? (
            <ArtistSetPlayer
              artistName={artist.name}
              setUrl={artist.set}
              viewport='mobile'
              className='bottom-4 right-4 lg:hidden'
            />
          ) : null}
          <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[var(--artist-image-fade)] to-transparent lg:hidden' />
          <AnimatedGradient />
        </div>

        {/* Right Column - Content */}
        <div className='relative w-full h-[50svh] lg:h-full bg-[var(--artist-panel)] flex flex-col'>
          <ArtistContent artist={artist} locale={locale} />

          {/* Artist Title SVG */}
          {artistCustomSvg && (
            <div
              className='w-full max-h-[25svh] flex justify-center items-center p-3 lg:px-2 lg:pb-2 pt-0'
              dangerouslySetInnerHTML={{ __html: artistCustomSvg }}
            />
          )}
        </div>
      </div>
    </>
  )
}

// function ArtistTitle({
//   name,
//   className,
// }: {
//   name: string
//   className?: string
// }) {
//   const baseSize = 500
//   const lengthFactor = Math.max(0.5, 1 / Math.sqrt(name.length * 0.3))
//   const fontSize = baseSize * lengthFactor

//   // Make height exactly what we need
//   const height = fontSize * 0.8 // Tight fit
//   const textY = height * 1 // Position text near bottom

//   return (
//     <svg
//       className={className}
//       viewBox={`0 0 1000 ${height}`}
//       preserveAspectRatio='none'
//     >
//       <defs>
//         <linearGradient
//           id='artist-gradient'
//           x1='0'
//           y1={height}
//           x2='0'
//           y2='0'
//           gradientUnits='userSpaceOnUse'
//         >
//           <stop offset='0%' stopColor='#b25403' />
//           <stop offset='25%' stopColor='#05161F' />
//         </linearGradient>
//       </defs>
//       <text
//         x='0'
//         y={textY}
//         textLength='1000'
//         // lengthAdjust='spacingAndGlyphs'
//         fontFamily="'Kleber Unlicensed Trial Version Stark', var(--font-kleber), sans-serif"
//         fontWeight='bold'
//         fontSize={fontSize}
//         fill='url(#artist-gradient)'
//         dominantBaseline='auto' // Better baseline control
//       >
//         {name}
//       </text>
//     </svg>
//   )
// }

// function sanitizeArtistName(name: string | undefined) {
//   if (!name) return 'Artist'

//   return String(name)
//     .normalize('NFD') // Normalize Unicode
//     .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
//     .replace(/[\u200B-\u200D\uFEFF\u2060\u00AD\u061C\u180E]/g, '') // Remove zero-width chars
//     .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '') // Keep printable chars
//     .trim()
// }
