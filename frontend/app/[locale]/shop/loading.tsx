import ShopCart from '@/app/components/shop/ShopCart'
import { SHOP_LANDING_POSITIONS } from '@/app/components/shop/shopData'
import Image from 'next/image'

const SHOP_LOADING_IMAGES = [
  '/images/image.png',
  '/images/image2.png',
  '/images/tile-1-black.png',
]

export default function Loading() {
  return (
    <>
      <main className='relative min-h-svh w-full overflow-hidden font-[family-name:var(--font-kleber)]'>
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-2 sm:px-4'>
          <h1 className='relative z-10 text-center uppercase text-[var(--site-paper)] mix-blend-exclusion text-[clamp(7.4rem,21.5vw,10rem)] leading-[0.74] tracking-[-0.03em] md:text-[clamp(4.75rem,17vw,20rem)] md:leading-[0.76]'>
            <span className='block'>To</span>
            <span className='block'>Another</span>
            <span className='block'>Galaxy</span>
          </h1>
        </div>

        <div className='relative min-h-svh w-full pb-20 md:pb-0'>
          {SHOP_LOADING_IMAGES.map((src, index) => (
            <div
              key={src}
              className={`${SHOP_LANDING_POSITIONS[index]} z-[1100] block`}
            >
              <Image
                src={src}
                alt=''
                width={900}
                height={900}
                sizes='(max-width: 767px) 56vw, (max-width: 1023px) 26vw, 20vw'
                className='shop-loading-packshot-preview h-auto w-full object-contain bg-transparent shadow-none'
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </main>
      <ShopCart />
    </>
  )
}
