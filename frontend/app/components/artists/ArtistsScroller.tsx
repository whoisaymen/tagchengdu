'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export function ArtistsScroller({
  artists,
}: {
  artists: { slug: string; name?: string }[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(Math.floor(artists.length / 2))

  // Scroll to active artist on mount
  useEffect(() => {
    if (containerRef.current && artists.length) {
      const activeEl = containerRef.current.children[activeIdx] as HTMLElement
      activeEl?.scrollIntoView({ behavior: 'auto', block: 'center' })
    }
  }, [artists, activeIdx])

  // Detect scroll and set active index
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const children = Array.from(container.children)
      const containerRect = container.getBoundingClientRect()
      let closestIdx = 0
      let minDistance = Infinity

      children.forEach((child, idx) => {
        const rect = (child as HTMLElement).getBoundingClientRect()
        const distance = Math.abs(
          rect.top +
            rect.height / 2 -
            (containerRect.top + containerRect.height / 2)
        )
        if (distance < minDistance) {
          minDistance = distance
          closestIdx = idx
        }
      })
      setActiveIdx(closestIdx)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='relative h-full w-full flex flex-col items-center justify-center overflow-hidden'>
      {/* Fade gradients (keep your previous style/colors) */}
      <div className='absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-[#0a0a0a] to-transparent z-10' />
      <div className='absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#0a0a0a] to-transparent z-10' />

      <div
        ref={containerRef}
        className='flex flex-col items-center justify-center h-full w-full overflow-y-scroll scrollbar-hide'
        style={{ scrollSnapType: 'y mandatory' }}
        tabIndex={0}
      >
        {artists.map((artist, idx) => (
          <div
            key={artist.slug}
            style={{
              scrollSnapAlign: 'center',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: idx === activeIdx ? 'scale(1.2)' : 'scale(1)',
              opacity: idx === activeIdx ? 1 : 0.5,
              zIndex: idx === activeIdx ? 2 : 1,
              margin: '2rem 0',
            }}
          >
            <Link href={`/artists/${artist.slug}`}>
              <h1
                className='uppercase text-[3.5rem] md:text-[5rem] text-center leading-[0.75] max-w-7xl mx-auto z-10 relative text-[#E9EDB9] mix-blend-difference'
                style={{
                  pointerEvents: idx === activeIdx ? 'auto' : 'none',
                  cursor: idx === activeIdx ? 'pointer' : 'default',
                }}
              >
                {artist.name || artist.slug.replace(/-/g, ' ')}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
