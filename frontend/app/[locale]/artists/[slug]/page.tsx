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
  contact?: string // plain string
  socialLinks?: any[]
  mediaFile?: any
  upNext?: string // plain string
  instagram?: string
  soundcloud?: string
  raLink?: string
  musicLink?: string
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: artistsSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
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
  let description = 'Artist at TAG Chengdu'
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
            block.children?.map((child: any) => child.text).join('') || ''
        )
        .join(' ')
        .substring(0, 160)
    }
  }

  return {
    title: `${artist.name || 'Artist'} | TAG Chengdu`,
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
  console.log('ArtistPage params:', params)
  const locale = params.locale || 'en'

  const { data: artist } = (await sanityFetch({
    query: artistQuery,
    params,
  })) as { data: ArtistData | null }

  if (!artist) {
    return (
      <div className='h-svh w-full flex items-center justify-center font-[family-name:var(--font-geist-sans)] tracking-tighter'>
        <h2 className='text-xl'>Artist not found.</h2>
      </div>
    )
  }

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
    // <Loading />
    <div className='font-[family-name:var(--font-kleber)] flex flex-col lg:flex-row relative h-full justify-between'>
      <div className='w-full h-[45svh] lg:h-full relative'>
        {artist.profileImage && (
          <ArtistImage
            image={artist.profileImage}
            alt={artist.profileImage?.alt?.[locale] || 'Artist Image'}
            priority
            className='object-cover w-full h-full'
          />
        )}
        <Link
          href='/artists'
          className='absolute bottom-4 left-4 bg-[#E9EDB9] px-[0.5rem] lg:px-3 rounded-full text-[#05161F] uppercase text-[1.2rem] lg:text-4xl leading-[1.15] z-10'
        >
          Back
        </Link>
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[#b25403] to-transparent lg:hidden' />
        <AnimatedGradient />
      </div>

      <div className='w-full lg:min-h-svh bg-[#B3C200] flex flex-col items-center justify-between'>
        <div className='w-full h-[30svh] lg:h-[65vh] text-[#05161F] font-[family-name:var(--font-geist-sans)]  flex flex-col justify-between py-0 relative tracking-tighter lg:pt-16 '>
          {/* <FaCirclePlay className='absolute left-4 top-8 text-4xl' /> */}
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-[#B3C200] to-transparent' />
          <div className='overflow-y-scroll h-full px-4 pb-12 space-y-8 mt-4 scrollbar scrollbar-thumb-[#B3C200] scrollbar-track-[#B3C200] '>
            <PortableText
              value={artist.bio?.[locale] || artist.bio?.en || []}
              components={{
                marks: {
                  strong: ({ children }) => (
                    <span className='font-[family-name:var(--font-kleber)] tracking-normal text-[1.12rem] lg:text-[2.35rem] leading-[1.15]'>
                      {children}
                    </span>
                  ),
                },
                block: {
                  normal: ({ children }) => (
                    <p className='text-base lg:text-2xl leading-tight'>
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </div>
        </div>
        <div className='pl-2 pr-3 md:p-4 w-full text-center bg-[#B3C200] text-[#05161F] flex justify-center items-start uppercase pt-0 flex-col lg:gap-1 font-[family-name:var(--font-geist-sans)] tracking-tighter text-xl lg:text-3xl h-[25svh] lg:h-auto'>
          <div className='flex justify-between w-full -mb-4'>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <ArrowRight
                theme={{ fill: '#05161F' }}
                className='w-6 h-auto lg:w-9'
              />
              <span className='uppercase'>Up next</span>
              <span className='ml-2'>{artist.upNext || ''}</span>
            </div>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <ArrowRight
                theme={{ fill: '#05161F' }}
                className='w-6 h-auto lg:w-9'
              />
              {(() => {
                const contact = artist.contact
                return contact ? (
                  <a href={`mailto:${contact}`} className='hover:underline'>
                    Contact
                  </a>
                ) : null
              })()}
            </div>
            <div className='flex items-center gap-x-0.5'>
              {artist.instagram && (
                <a
                  href={artist.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FiInstagram />
                </a>
              )}
              {artist.soundcloud && (
                <a
                  href={artist.soundcloud}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaSoundcloud className='bg-[#05161F] rounded-full text-[#B3C200] p-1' />
                </a>
              )}
              {/* {artist.raLink && ( */}
              <a
                href={artist.raLink}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Resident Advisor'
                className='flex items-center bg-[#05161F] text-[#B3C200] p-1 py-1.75 md:p-2 md:bg-transparent md:text-[#05161F] rounded-sm'
              >
                <svg
                  className='w-3.5 md:w-8 h-auto'
                  viewBox='0 0 83 40'
                  aria-label='RA logo'
                >
                  <title>RA</title>
                  <g fill='none' fillRule='evenodd'>
                    <path fill='none' d='M0 0h24v24H0z'></path>
                    <path
                      d='M82.092 32.018c.556-.533.908-1.28.908-2.113 0-.802-.38-1.523-.9-2.051L58.665 4.3l-7.073 7.11 18.45 18.543h-26.14c-1.278-.038-2.29-.469-3.147-1.304l-11.73-11.788a6.828 6.828 0 00-4.689-1.888l-.017.001H10.004v-4.92h14.825c2.938.002 5.559 1.21 7.48 3.15l8.749 8.793 7.073-7.11-8.92-8.963C35.485 2.234 30.45 0 24.805 0H0v25.027h20.978v.002a4.919 4.919 0 013.486 1.48L35.95 38.053A6.74 6.74 0 0040.449 40h31.733a4.911 4.911 0 003.423-1.45l6.491-6.524-.004-.008'
                      fill='currentColor'
                    ></path>
                  </g>
                </svg>
              </a>
              {/* )} */}
              {artist.musicLink && (
                <a
                  href={artist.musicLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IoIosMusicalNotes className='bg-[#05161F] rounded-md text-[#B3C200] p-1' />
                </a>
              )}
            </div>
          </div>
          <ArtistTitle
            name={sanitizeArtistName(artist.name)}
            // name='Kaishandao'
            className='w-full h-auto relative'
          />
        </div>
      </div>
    </div>
  )
}
function ArtistTitle({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const baseSize = 500
  const lengthFactor = Math.max(0.5, 1 / Math.sqrt(name.length * 0.3))
  const fontSize = baseSize * lengthFactor

  // Make height exactly what we need
  const height = fontSize * 0.8 // Tight fit
  const textY = height * 1 // Position text near bottom

  return (
    <svg
      className={className}
      viewBox={`0 0 1000 ${height}`}
      preserveAspectRatio='none'
    >
      <defs>
        <linearGradient
          id='artist-gradient'
          x1='0'
          y1={height}
          x2='0'
          y2='0'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0%' stopColor='#b25403' />
          <stop offset='25%' stopColor='#05161F' />
        </linearGradient>
      </defs>
      <text
        x='0'
        y={textY}
        textLength='1000'
        lengthAdjust='spacingAndGlyphs'
        fontFamily="'Kleber Unlicensed Trial Version Stark', var(--font-kleber), sans-serif"
        fontWeight='bold'
        fontSize={fontSize}
        fill='url(#artist-gradient)'
        dominantBaseline='auto' // Better baseline control
      >
        {name}
      </text>
    </svg>
  )
}

function sanitizeArtistName(name: string | undefined) {
  if (!name) return 'Artist'

  return String(name)
    .normalize('NFD') // Normalize Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[\u200B-\u200D\uFEFF\u2060\u00AD\u061C\u180E]/g, '') // Remove zero-width chars
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '') // Keep printable chars
    .trim()
}
