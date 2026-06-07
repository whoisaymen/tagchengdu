import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { shopProductsQuery } from '@/sanity/lib/queries'
import {
  getLocalizedText,
  getShopProducts,
  SHOP_LANDING_POSITIONS,
  type SanityShopProduct,
} from '@/app/components/shop/shopData'
import ShopCart from '../../components/shop/ShopCart'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ShopPage(props: Props) {
  const { locale } = await props.params
  const { data } = (await sanityFetch({
    query: shopProductsQuery,
  })) as { data: SanityShopProduct[] | null }

  const products = getShopProducts(data)
    .filter((product) => Boolean(product.listingImage))
    .slice(0, 3)

  return (
    <main className='relative min-h-svh w-full overflow-hidden font-[family-name:var(--font-kleber)]'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-2 sm:px-4'>
        <h1 className='relative z-10 text-center uppercase text-[var(--site-paper)] mix-blend-exclusion text-[clamp(7.4rem,21.5vw,10rem)] md:text-[clamp(4.75rem,17vw,20rem)] leading-[0.74] md:leading-[0.76] tracking-[-0.03em]'>
          <span className='block'>To</span>
          <span className='block'>Another</span>
          <span className='block'>Galaxy</span>
        </h1>
      </div>

      <div className='relative min-h-svh w-full pb-20 md:pb-0'>
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className={`${SHOP_LANDING_POSITIONS[index] || 'absolute left-1/2 top-1/2 w-[42vw] -translate-x-1/2 -translate-y-1/2 md:w-[16vw]'} z-[1100] block transition-transform duration-200 hover:scale-[1.02]`}
          >
            <div
              className='shop-packshot-buzz origin-center'
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Image
                src={product.listingImage || '/images/image.png'}
                alt={getLocalizedText(product.name, locale)}
                width={900}
                height={900}
                priority={index === 0}
                sizes='(max-width: 767px) 56vw, (max-width: 1023px) 26vw, 20vw'
                className='h-auto w-full object-contain bg-transparent shadow-none'
              />
            </div>
          </Link>
        ))}
      </div>

      <ShopCart />
    </main>
  )
}
