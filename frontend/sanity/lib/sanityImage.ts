// lib/sanityImage.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}
