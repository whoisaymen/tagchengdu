'use client'

import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'

interface ArtistImageProps {
  image: any
  alt?: string
  priority?: boolean
  className?: string
}

export default function ArtistImage(props: ArtistImageProps) {
  const { image: source, alt, priority, className } = props
  const { hotspot } = source

  console.log('ArtistImage hostpost:', hotspot)

  // Simple hotspot application - Sanity hotspot should work directly
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : '50% 50%'

  const blurDataURL = source?.asset?.metadata?.lqip
  const imageUrl = source?.asset?.url

  if (!imageUrl) {
    return (
      <div
        className={`relative w-full h-full ${className} bg-gray-200 flex items-center justify-center`}
      >
        <span className='text-sm text-gray-500'>Image not available</span>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={imageUrl}
        alt={stegaClean(alt) || ''}
        fill
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        sizes='(max-width: 768px) 100vw, 50vw'
        className='object-cover'
        style={{
          objectPosition,
        }}
      />
    </div>
  )
}
