'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import ArrowRight from '@/app/components/svg/ArrowRight'
import { FiInstagram } from 'react-icons/fi'
import { FaSoundcloud } from 'react-icons/fa'
import { IoIosMusicalNotes } from 'react-icons/io'

type ArtistContentProps = {
  artist: {
    bio?: { [key: string]: any }
    upNext?: string
    contact?: string
    socialLinks?: { platform: string; url: string }[]
  }
  locale: string
}

export default function ArtistContent({ artist, locale }: ArtistContentProps) {
  const [showUpNext, setShowUpNext] = useState(false)
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
  return (
    <>
      {/* Biography/Up Next Section */}
      <div className='flex-1 text-[#05161F] font-[family-name:var(--font-geist-sans)] flex flex-col relative tracking-tighter lg:pt-16 overflow-hidden'>
        {/* Close button for Up Next - only shows when Up Next is open */}
        {showUpNext && (
          <span
            onClick={() => setShowUpNext(false)}
            className='font-[family-name:var(--font-kleber)] absolute top-4 right-4 z-20 uppercase tracking-normal text-[1.2rem] leading-[1.15] bg-[#E9EDB9] px-[0.5rem] lg:px-3 rounded-full text-[#05161F] lg:text-4xl z-10'
          >
            Close
          </span>
        )}

        {/* Bottom fade */}
        <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#B3C200] via-[#B3C200]/80 to-transparent z-10' />

        {/* Scrollable content */}
        <div className='overflow-y-scroll h-full px-4 pb-12 space-y-8 mt-4 scrollbar scrollbar-thumb-[#B3C200] scrollbar-track-[#B3C200]'>
          {showUpNext ? (
            // Up Next Content
            <div className='space-y-6'>
              {/* <h2 className='text-2xl lg:text-4xl font-bold uppercase mb-4'>
                Up Next
              </h2> */}
              <div className='text-base lg:text-2xl leading-tight mt-2'>
                {artist.upNext || 'No upcoming events scheduled.'}
              </div>
            </div>
          ) : (
            // Biography Content
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
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='flex-shrink-0 w-full text-center bg-[#B3C200] text-[#05161F] flex flex-col justify-end uppercase font-[family-name:var(--font-geist-sans)] tracking-tighter text-xl lg:text-3xl pb-0 lg:pb-2'>
        <div className='flex justify-between w-full px-1 pr-3 mb-1 lg:mb-4'>
          {/* Up Next Button */}
          <div className='flex items-center gap-x-0 lg:gap-x-1'>
            <ArrowRight
              theme={{ fill: '#05161F' }}
              className={`w-6 h-auto lg:w-9 ${showUpNext ? '-rotate-90' : ''}`}
            />
            <button
              onClick={() => setShowUpNext(!showUpNext)}
              className={`uppercase hover:underline`}
            >
              Up next
            </button>
            <span className='ml-2'>{artist.upNext || ''}</span>
          </div>

          {/* Contact */}
          <div className='flex items-center gap-x-0 lg:gap-x-1'>
            <ArrowRight
              theme={{ fill: '#05161F' }}
              className='w-6 h-auto lg:w-9'
            />
            {artist.contact ? (
              <a href={`mailto:${artist.contact}`} className='hover:underline'>
                Contact
              </a>
            ) : null}
          </div>

          <div className='flex items-center gap-x-0.5'>
            {artist.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.platform}
                className='flex items-center'
              >
                {platformIcons[link.platform] || platformIcons.other}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
