import { stegaClean } from '@sanity/client/stega'
import { Image } from 'next-sanity/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '@/sanity/lib/utils'

interface ArtistImageProps {
  image: any
  alt?: string
  priority?: boolean
  className?: string
}

export default function ArtistImage(props: ArtistImageProps) {
  const { image: source, alt, priority, className } = props
  const image = source?.asset?._ref ? (
    <Image
      className={className || 'object-cover w-full h-full'}
      width={getImageDimensions(source).width}
      height={getImageDimensions(source).height}
      alt={stegaClean(alt) || ''}
      src={urlForImage(source)?.url() as string}
      priority={priority}
    />
  ) : null

  return <>{image}</>
}
