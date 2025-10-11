import { stegaClean } from '@sanity/client/stega'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'

interface ArtistImageProps {
  image: any
  alt?: string
  priority?: boolean
  className?: string
}

export default function ArtistImage({
  image: source,
  alt,
  priority,
  className,
}: ArtistImageProps) {
  if (!source?.asset?._ref) return null

  const { width, height } = getImageDimensions(source)
  const { hotspot } = source

  // Default to center if no hotspot
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : '50% 50%'

  const url = urlForImage(source)?.url()

  return (
    <Image
      src={url as string}
      alt={stegaClean(alt) || ''}
      width={width}
      height={height}
      priority={priority}
      className={className || 'object-cover w-full h-full'}
      style={{ objectPosition }}
    />
  )
}
