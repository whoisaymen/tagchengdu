'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SwirlArtistPage from '@/app/components/svg/SwirlArtistPage'
import AnimatedGradient from '@/app/components/artists/AnimatedGradient'
import {
  getArtistProfileThemeStyle,
  getFallbackArtistIndexBySlug,
  resolveArtistProfileTheme,
} from '@/app/components/artists/artistProfileThemes'

function getArtistSlugFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const artistsSegmentIndex = segments.indexOf('artists')

  if (artistsSegmentIndex < 0) {
    return null
  }

  return segments[artistsSegmentIndex + 1] || null
}

export default function ArtistDetailLoading() {
  const pathname = usePathname()
  const slug = getArtistSlugFromPath(pathname)
  const artistTheme = resolveArtistProfileTheme(
    undefined,
    getFallbackArtistIndexBySlug(slug),
    slug,
  )

  return (
    <div
      className='font-[family-name:var(--font-kleber)] flex flex-col lg:flex-row relative h-full justify-between'
      data-artist-theme={artistTheme.key}
      style={getArtistProfileThemeStyle(artistTheme)}
    >
      <div className='w-full h-[50svh] lg:h-full relative bg-[var(--site-ink)] animate-pulse'>
        <SwirlArtistPage
          theme={{ fill: 'var(--site-ink)' }}
          className='w-[80%] lg:w-[40vw] saturate-0 animate-pulse'
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 6.5,
            ease: 'linear',
            repeat: Infinity,
            delay: 0,
          }}
        />

        <Link
          href='/artists'
          className='absolute bottom-4 left-4 bg-[var(--site-paper)] px-[0.5rem] lg:px-3 rounded-full text-[var(--site-ink)] uppercase text-[1.2rem] lg:text-4xl leading-[1.15] z-10'
        >
          Back
        </Link>
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[var(--artist-image-fade)] to-transparent lg:hidden' />
        <AnimatedGradient />
      </div>

      <div className='w-full h-[50svh] lg:h-full bg-[var(--artist-panel)] flex flex-col'>
        <div className='flex-1 text-[var(--artist-text)] font-[family-name:var(--font-geist-sans)] flex flex-col relative tracking-tighter lg:pt-16 overflow-hidden'>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[var(--artist-panel)] to-transparent z-10' />
          <div className='overflow-y-scroll h-full px-4 pb-12 space-y-8 mt-4 scrollbar scrollbar-thumb-[var(--artist-scrollbar)] scrollbar-track-[var(--artist-panel)]'>
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
            <div className='h-6 w-full bg-[var(--artist-text)]/10 rounded animate-pulse mb-2' />
          </div>
        </div>

        <div className='flex-shrink-0 w-full text-center bg-[var(--artist-panel)] text-[var(--artist-text)] flex flex-col justify-end uppercase font-[family-name:var(--font-geist-sans)] tracking-tighter text-xl lg:text-3xl pb-1 lg:pb-2'>
          <div className='flex justify-between w-full px-2 pr-3 mb-1 lg:mb-4'>
            <div className='flex items-center gap-x-0 lg:gap-x-1 justify-center'>
              <span className='inline-block h-6 w-20 bg-[var(--artist-text)]/10 rounded animate-pulse' />
            </div>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <span className='inline-block h-6 w-20 bg-[var(--artist-text)]/10 rounded animate-pulse' />
            </div>
            <div className='flex items-center gap-x-0.5'>
              <span className='inline-block h-6 w-6 bg-[var(--artist-text)]/10 rounded animate-pulse' />
              <span className='inline-block h-6 w-6 bg-[var(--artist-text)]/10 rounded animate-pulse' />
              <span className='inline-block h-6 w-6 bg-[var(--artist-text)]/10 rounded animate-pulse' />
            </div>
          </div>
          <div className='w-full max-h-[20svh] flex justify-center items-center p-1 px-2 lg:px-2 pt-0'>
            <div className='w-full h-32 bg-[var(--artist-text)]/10 rounded animate-pulse' />
          </div>
        </div>
      </div>
    </div>
  )
}
