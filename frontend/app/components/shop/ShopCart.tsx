'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import ArrowRight from '../svg/ArrowRight'
import Swirl from '../svg/Swirl'

export interface ShopItem {
  name: string
  slug: string
  image: string
  price: number
  description: string
  id: string
}

interface CartItem extends ShopItem {
  quantity: number
}

const cartCopy = {
  en: {
    bag: 'Bag',
    shoppingBag: 'Shopping Bag',
    empty: (
      <>
        You currently
        <br />
        have no items in your
        <br />
        shopping bag
      </>
    ),
    emptyInline: 'You currently have no items in your shopping bag',
    total: 'Total',
    checkout: 'Checkout',
    close: 'Close shopping bag',
  },
  cn: {
    bag: 'Bag',
    shoppingBag: '购物袋',
    empty: (
      <>
        购物袋里
        <br />
        还没有商品
      </>
    ),
    emptyInline: '购物袋里还没有商品',
    total: '总计',
    checkout: '结账',
    close: '关闭购物袋',
  },
}

export default function ShopCart() {
  const locale = useLocale()
  const pathname = usePathname()
  const copy = locale === 'cn' ? cartCopy.cn : cartCopy.en
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const mobileBarHeight = '2.35rem'
  const mobileSheetHeight = '45svh'
  const bagLabelClass =
    '-mt-1 text-[1.45rem] leading-none uppercase font-normal'
  const desktopBagLabelClass =
    'font-[family-name:var(--font-kleber)] text-4xl uppercase leading-[1.15] font-normal'
  const isShopIndex = new RegExp(`^/(${locale})/shop/?$`).test(pathname)

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <AnimatePresence>
        {isCartOpen ? (
          <motion.button
            type='button'
            aria-label='Close shopping bag backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            onClick={() => setIsCartOpen(false)}
            className='fixed inset-0 z-[9990] cursor-default bg-black/12 lg:bg-black/16'
          />
        ) : null}
      </AnimatePresence>

      <div className='fixed inset-x-0 bottom-0 z-[10000] font-[family-name:var(--font-kleber)] lg:hidden'>
        <motion.div
          initial={false}
          animate={{ height: isCartOpen ? mobileSheetHeight : mobileBarHeight }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className='overflow-hidden bg-[var(--site-paper)] text-[var(--site-ink)] shadow-[0_-10px_30px_rgba(0,0,0,0.18)]'
        >
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className='flex w-full flex-col items-center justify-center bg-[var(--site-paper)]'
            style={{ height: mobileBarHeight }}
          >
            <ArrowRight
              theme={{ fill: 'var(--site-ink)' }}
              className={`h-4.5 w-3 ${isCartOpen ? 'rotate-90' : '-rotate-90'}`}
            />
            <span className={bagLabelClass}>{copy.bag}</span>
          </button>

          <div
            className='flex flex-col pb-3'
            style={{
              height: `calc(${mobileSheetHeight} - ${mobileBarHeight})`,
            }}
          >
            <div className='mx-7 border-t border-[var(--site-ink)]/25' />

            {cartItems.length === 0 ? (
              <div className='flex flex-1 flex-col px-7 pt-5 text-center text-[var(--site-ink)]'>
                <div className='flex flex-1 items-center justify-center font-[family-name:var(--font-geist-sans)] tracking-tighter'>
                  <p className='max-w-[14rem] text-base leading-tight'>
                    {copy.empty}
                  </p>
                </div>
                <div className='pb-1 font-[family-name:var(--font-geist-sans)] text-base leading-tight tracking-tighter font-normal'>
                  [{getTotalItems()}]
                </div>
                <div className='border-t border-[var(--site-ink)]/25' />
              </div>
            ) : (
              <div className='flex flex-1 flex-col px-7 pt-5'>
                <div className='flex-1 space-y-4 overflow-y-auto pr-1'>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className='flex gap-3 border-b border-[var(--site-ink)]/12 pb-3'
                    >
                      <div className='relative h-16 w-16 overflow-hidden rounded-lg bg-black/5'>
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='flex-1 font-[family-name:var(--font-geist-sans)] tracking-tighter'>
                        <div className='flex items-start justify-between gap-2'>
                          <div>
                            <h4 className='text-sm uppercase leading-tight'>
                              {item.name}
                            </h4>
                            <p className='mt-1 text-sm'>¥{item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)}>
                            <X size={16} />
                          </button>
                        </div>
                        <div className='mt-3 flex items-center gap-2'>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus size={16} />
                          </button>
                          <span className='min-w-6 text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-4 border-t border-[var(--site-ink)]/25 pt-4'>
                  <div className='flex items-center justify-between font-[family-name:var(--font-geist-sans)] text-base tracking-tighter'>
                    <span>{copy.total}</span>
                    <span>¥{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ width: isCartOpen ? '20rem' : '4.75rem' }}
        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
        className='fixed right-0 top-0 z-[10000] hidden h-full overflow-hidden bg-[var(--site-paper)] font-[family-name:var(--font-kleber)] text-[var(--site-ink)] shadow-[-12px_0_34px_rgba(5,22,31,0.18)] lg:flex'
      >
        {isShopIndex ? (
          <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
            <Swirl
              theme={{ fill: 'var(--site-accent)' }}
              className='w-[185%]'
              style={{
                left: '-18%',
                top: '68%',
                mixBlendMode: 'multiply',
                opacity: 0.2,
                filter: 'blur(0.2px)',
              }}
              animate={{
                rotate: [0, 40, -40, 0],
                scale: [1, 1.03, 0.97, 1],
              }}
              transition={{
                duration: 5.5,
                ease: [0.7, 0, 0.3, 1],
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.16,
              }}
              svgTransition={{
                duration: 7,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.16,
              }}
            />
          </div>
        ) : null}

        <motion.button
          type='button'
          aria-label='Open shopping bag'
          onClick={() => setIsCartOpen(true)}
          animate={{ opacity: isCartOpen ? 0 : 1 }}
          transition={{ duration: 0.14, ease: 'linear' }}
          className={`absolute inset-0 z-20 flex h-full w-[4.75rem] cursor-pointer flex-col items-center p-2 pt-4 ${isCartOpen ? 'pointer-events-none' : ''}`}
        >
          <span className={desktopBagLabelClass}>{copy.bag}</span>
          <ArrowRight
            theme={{ fill: 'var(--site-ink)' }}
            className='h-9 w-7 rotate-180'
          />
        </motion.button>

        <motion.div
          animate={{ opacity: isCartOpen ? 1 : 0 }}
          transition={{ duration: 0.14, ease: 'linear' }}
          className={`relative z-10 flex h-full w-[20rem] flex-none flex-col p-4 pb-2 ${isCartOpen ? '' : 'pointer-events-none'}`}
        >
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label={copy.close}
            className='flex cursor-pointer items-center justify-between border-b border-[var(--site-ink)]/25 pb-5'
          >
            <span className='font-[family-name:var(--font-geist-sans)] text-[2rem] leading-none tracking-tighter'>
              [{getTotalItems()}]
            </span>
            <ArrowRight
              theme={{ fill: 'var(--site-ink)' }}
              className='h-9 w-7'
            />
          </button>

          <div className='flex flex-1 flex-col overflow-hidden'>
            {cartItems.length === 0 ? (
              <div className='flex flex-1 items-start justify-center pt-8 text-center font-[family-name:var(--font-geist-sans)] tracking-tighter'>
                <p className='max-w-[13.5rem] text-[1.45rem] leading-[0.92]'>
                  {copy.empty}
                </p>
              </div>
            ) : (
              <div className='flex-1 space-y-4 overflow-y-auto py-6 pr-1'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='border-b border-[var(--site-ink)]/15 pb-4 font-[family-name:var(--font-geist-sans)] tracking-tighter'
                  >
                    <div className='flex gap-3'>
                      <div className='relative h-16 w-16 overflow-hidden bg-[var(--site-ink)]/5'>
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='flex-1'>
                        <h4 className='text-sm uppercase leading-tight'>
                          {item.name}
                        </h4>
                        <p className='mt-1 text-sm'>¥{item.price}</p>
                        <div className='mt-3 flex items-center gap-2'>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className='p-1 hover:bg-[var(--site-ink)]/10'
                          >
                            <Minus size={16} />
                          </button>
                          <span className='px-2'>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className='p-1 hover:bg-[var(--site-ink)]/10'
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className='ml-auto p-1 hover:bg-[var(--site-ink)]/10'
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='border-t border-[var(--site-ink)]/25 pt-5 font-[family-name:var(--font-geist-sans)] tracking-tighter'>
            {cartItems.length > 0 ? (
              <div className='space-y-4'>
                <div className='flex items-center justify-between text-xl'>
                  <span>{copy.total}</span>
                  <span>¥{getTotalPrice()}</span>
                </div>
                <button className='w-full bg-[var(--site-ink)] px-4 py-3 text-[var(--site-accent)] uppercase transition-colors hover:bg-[var(--site-ink)]/85'>
                  {copy.checkout}
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
