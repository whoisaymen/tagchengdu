import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShopCart from '@/app/components/shop/ShopCart'
import ShopProductDetailClient from '@/app/components/shop/ShopProductDetailClient'
import {
  getLocalizedBlocks,
  getLocalizedText,
  getShopProduct,
  type SanityShopProduct,
} from '@/app/components/shop/shopData'
import { SITE_TITLE } from '@/app/lib/siteMetadata'
import { sanityFetch } from '@/sanity/lib/live'
import { shopProductQuery, shopProductSlugs } from '@/sanity/lib/queries'

type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ variant?: string | string[] }>
}

export async function generateStaticParams() {
  const { data } = (await sanityFetch({
    query: shopProductSlugs,
    perspective: 'published',
    stega: false,
  })) as { data: Array<{ slug: string }> | null }

  const locales = ['en', 'cn']

  return (
    data?.flatMap((item) =>
      locales.map((locale) => ({
        locale,
        slug: item.slug,
      })),
    ) || []
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const { data } = (await sanityFetch({
    query: shopProductQuery,
    params: { slug },
    stega: false,
  })) as { data: SanityShopProduct | null }

  const product = getShopProduct(data, slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'We could not find the requested product.',
    }
  }

  const description = getLocalizedBlocks(product.description, locale)
  const descriptionText = description
    .flatMap(
      (block) =>
        block.children?.map((child) => child.text).filter(Boolean) || [],
    )
    .join(' ')
    .slice(0, 160)

  return {
    title: getLocalizedText(product.name, locale),
    description: descriptionText || `${SITE_TITLE} merch`,
  } satisfies Metadata
}

export default async function ItemPage(props: Props) {
  const { locale, slug } = await props.params
  const searchParams = await props.searchParams
  const requestedVariant = Array.isArray(searchParams.variant)
    ? searchParams.variant[0]
    : searchParams.variant

  const { data } = (await sanityFetch({
    query: shopProductQuery,
    params: { slug },
  })) as { data: SanityShopProduct | null }

  const product = getShopProduct(data, slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ShopProductDetailClient
        product={product}
        locale={locale}
        initialVariantSlug={requestedVariant}
      />
      <ShopCart />
    </>
  )
}
