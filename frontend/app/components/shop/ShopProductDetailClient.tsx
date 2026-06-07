'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import { Link } from '@/i18n/navigation'
import ArrowRight from '@/app/components/svg/ArrowRight'
import {
  getLocalizedBlocks,
  getLocalizedText,
  getSelectedVariant,
  getVariantChineseLabel,
  type PortableTextBlock,
  type ShopProduct,
} from '@/app/components/shop/shopData'
import RichTextStrong from '@/app/components/rich-text/RichTextStrong'

const inactiveVariantColor = '#d41717'

const imageSlideVariants: Variants = {
  initial: (direction: number) => ({ x: direction * 72 }),
  animate: { x: 0 },
  exit: (direction: number) => ({ x: direction * -72 }),
}

function ShopProductCustomTitle({ customSVG }: { customSVG: string }) {
  const titleRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const svg = titleRef.current?.querySelector('svg')

      if (!svg) {
        return
      }

      try {
        const bbox = svg.getBBox()
        const padX = bbox.width * 0.004
        const padY = bbox.height * 0.012

        if (!bbox.width || !bbox.height) {
          return
        }

        svg.setAttribute(
          'viewBox',
          `${bbox.x - padX} ${bbox.y - padY} ${bbox.width + padX * 2} ${
            bbox.height + padY * 2
          }`,
        )
        svg.style.display = 'block'
        svg.style.height = 'auto'
        svg.style.width = '100%'
      } catch {
        return
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [customSVG])

  return (
    <div
      ref={titleRef}
      className='w-full max-h-[25svh] flex justify-center items-center p-3 lg:px-2 lg:pb-2 pt-0'
      style={
        {
          aspectRatio: 'auto',
          '--artist-title-main': 'var(--site-ink)',
          '--artist-title-gradient': 'var(--site-accent-strong)',
        } as CSSProperties & Record<string, string>
      }
      dangerouslySetInnerHTML={{ __html: customSVG }}
    />
  )
}

type Props = {
  product: ShopProduct
  locale: string
  initialVariantSlug?: string
}

export default function ShopProductDetailClient({
  product,
  locale,
  initialVariantSlug,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const initialSelectedVariant = getSelectedVariant(product, initialVariantSlug)
  const [selectedVariantSlug, setSelectedVariantSlug] = useState(
    initialSelectedVariant?.slug,
  )
  const [transitionDirection, setTransitionDirection] = useState(1)

  const selectedVariant = getSelectedVariant(product, selectedVariantSlug)
  const heroImage =
    selectedVariant?.heroImage ||
    product.heroImage ||
    product.listingImage ||
    ''
  const productTitle = getLocalizedText(product.name, locale)
  const description = getLocalizedBlocks(product.description, locale)

  const handleSelectVariant = (variantSlug: string) => {
    if (variantSlug === selectedVariant?.slug) {
      return
    }

    const currentIndex = product.variants.findIndex(
      (variant) => variant.slug === selectedVariant?.slug,
    )
    const nextIndex = product.variants.findIndex(
      (variant) => variant.slug === variantSlug,
    )

    if (currentIndex !== -1 && nextIndex !== -1) {
      setTransitionDirection(nextIndex > currentIndex ? 1 : -1)
    }

    setSelectedVariantSlug(variantSlug)
    router.replace(`${pathname}?variant=${variantSlug}`, { scroll: false })
  }

  return (
    <main className='relative flex min-h-svh flex-col overflow-hidden font-[family-name:var(--font-kleber)] lg:flex-row lg:pr-[4.75rem]'>
      <div className='relative h-[55svh] w-full overflow-hidden lg:min-h-svh lg:w-[52%]'>
        <AnimatePresence
          initial={false}
          custom={transitionDirection}
          mode='sync'
        >
          {heroImage ? (
            <motion.div
              key={`${selectedVariant?.slug || 'default'}-${heroImage}`}
              custom={transitionDirection}
              variants={imageSlideVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className='absolute inset-0'
            >
              <Image
                src={heroImage}
                alt={
                  selectedVariant
                    ? getLocalizedText(selectedVariant.name, locale)
                    : productTitle
                }
                fill
                priority
                sizes='(max-width: 1023px) 100vw, 52vw'
                className='object-cover'
                style={{ objectPosition: '50% 40%' }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          className='pointer-events-none absolute top-0 bottom-0 right-0 z-10 hidden w-[30%] bg-gradient-to-l from-[var(--site-accent-hot)] to-transparent lg:block'
          initial={{ width: '20%' }}
          animate={{ width: '30%' }}
          transition={{
            duration: 2,
            ease: [0.76, 0, 0.24, 1],
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        <Link
          href='/shop'
          className='absolute bottom-4 left-4 z-20 rounded-full bg-[var(--site-paper)] px-[0.5rem] text-[1.2rem] leading-[1.15] uppercase text-[var(--site-ink)] lg:px-3 lg:text-4xl'
        >
          Back
        </Link>

        <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[#ff0000] to-transparent lg:hidden' />
      </div>

      <div className='relative flex h-[45svh] w-full flex-col bg-[var(--site-accent)] text-[var(--site-ink)] lg:min-h-svh lg:w-[48%]'>
        <div className='relative h-[16.5svh] flex-shrink-0 overflow-hidden lg:h-auto lg:flex-1'>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-6 bg-gradient-to-t from-[var(--site-accent)] to-transparent z-10' />

          <div className='h-full overflow-y-auto px-4 pt-4 pb-0 font-[family-name:var(--font-geist-sans)] tracking-tighter md:px-6 lg:pt-16 lg:pb-4'>
            <PortableText
              value={description as PortableTextBlock[]}
              components={{
                marks: {
                  strong: RichTextStrong,
                },
                block: {
                  normal: ({ children }) => (
                    <p className='text-base lg:text-2xl leading-tight [&+&]:mt-7'>
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </div>
        </div>

        <div className='absolute inset-x-0 bottom-[calc(2rem)] z-20 px-1 pt-0 text-center md:px-4 lg:static lg:flex lg:flex-1 lg:flex-shrink-0 lg:flex-col lg:justify-end lg:pb-2'>
          {product.variants.length > 0 ? (
            <div className='grid grid-cols-4 gap-x-1 text-center uppercase font-[family-name:var(--font-kleber)]'>
              {product.variants.map((variant) => {
                const isActive = variant.slug === selectedVariant?.slug
                const labelColor = isActive
                  ? 'var(--site-ink)'
                  : inactiveVariantColor

                return (
                  <button
                    key={variant.id}
                    type='button'
                    onClick={() => handleSelectVariant(variant.slug)}
                    className='flex cursor-pointer flex-col items-center justify-start'
                  >
                    <span className='mb-1 h-6'>
                      {isActive ? (
                        <ArrowRight
                          theme={{ fill: 'var(--site-ink)' }}
                          className='w-6 h-auto rotate-90'
                        />
                      ) : null}
                    </span>
                    <span
                      className='block uppercase text-[clamp(1rem,3.8vw,1.8rem)] leading-[0.86]'
                      style={{ color: labelColor }}
                    >
                      {variant.name?.en || variant.name?.cn}
                    </span>
                    {variant.name?.cn ? (
                      <span
                        className='font-songti mt-1 block text-[0.95rem] leading-[1.05] normal-case'
                        style={{ color: labelColor }}
                      >
                        {getVariantChineseLabel(variant.name.cn)}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          ) : null}

          <div className='mt-2 relative left-1/2 w-[100vw] -translate-x-1/2 lg:left-auto lg:w-full lg:translate-x-0'>
            {product.name?.cn ? (
              <div
                className='font-songti mx-auto mb-1 w-full overflow-visible pb-[0.08em] text-[clamp(2.75rem,8.8vw,5.4rem)] leading-[0.98] text-transparent'
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, var(--site-ink) 8%, #3f2415 48%, var(--site-accent-hot) 92%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                {product.name.cn}
              </div>
            ) : null}
            {product.customSVG && (
              <ShopProductCustomTitle customSVG={product.customSVG} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
