'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, X, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowRight from '../svg/ArrowRight'

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

export default function ShopCart({ items }: { items: ShopItem[] }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: ShopItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

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
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      {/* Cart Drawer Toggle */}
      <div className='fixed bottom-0 md:right-0 md:top-0 w-full md:w-auto md:h-full font-[family-name:var(--font-kleber)] z-[10000] bg-[#E9EDB9] md:px-4 md:py-8'>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className='bg-[#E9EDB9] text-[#05161F] w-full md:h-auto pt-1 hover:bg-[#E9EDB9]/90 transition-colors border-0'
        >
          <div className='flex flex-col items-center'>
            {/* <span className='text-sm font-bold'>[{getTotalItems()}]</span> */}
            {isCartOpen ? (
              <ArrowRight
                theme={{ fill: '#B3C200' }}
                className='w-1 h-6  -rotate-180'
              />
            ) : (
              <ArrowRight
                theme={{ fill: '#05161F' }}
                className='w-4 -rotate-90 md:-rotate-180 md:order-2 md:w-12'
              />
            )}
            <span className='uppercase text-2xl -mt-2 md:order-1 md:text-5xl'>
              Bag
            </span>
          </div>
        </button>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: 0, y: '100%' }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
        fixed
        bottom-0 left-0
        w-full h-svh
        bg-[#B3C200] text-[#05161F] shadow-2xl z-[10000] overflow-hidden
        md:top-0 md:right-0 md:left-auto md:bottom-auto
        md:h-full md:w-full md:max-w-md
        md:initial
      `}
          >
            <div className='h-full flex flex-col'>
              {/* Cart Header */}
              <div className='p-6 border-b border-[#05161F]/20'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='text-2xl font-black uppercase'>
                      Shopping Bag
                    </h2>
                    <span className='text-lg font-bold'>
                      [{getTotalItems()}]
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className='p-2 hover:bg-[#05161F]/10 rounded-full transition-colors'
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Cart Content */}
              <div className='flex-1 overflow-y-auto'>
                {cartItems.length === 0 ? (
                  <div className='p-6 text-center'>
                    <p className='text-lg'>
                      You currently have no items in your shopping bag
                    </p>
                  </div>
                ) : (
                  <div className='p-6 space-y-4'>
                    {cartItems.map((item) => (
                      <div key={item.id} className='bg-white/10 rounded-xl p-4'>
                        <div className='flex gap-4'>
                          <div className='w-16 h-16 relative rounded-lg overflow-hidden'>
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              fill
                              className='object-cover'
                            />
                          </div>
                          <div className='flex-1'>
                            <h4 className='font-bold text-sm uppercase'>
                              {item.name}
                            </h4>
                            <p className='text-lg font-black'>¥{item.price}</p>
                            <div className='flex items-center gap-2 mt-2'>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className='p-1 hover:bg-[#05161F]/10 rounded'
                              >
                                <Minus size={16} />
                              </button>
                              <span className='font-bold px-2'>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className='p-1 hover:bg-[#05161F]/10 rounded'
                              >
                                <Plus size={16} />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className='ml-auto p-1 hover:bg-red-500/20 rounded text-red-600'
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

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className='p-6 border-t border-[#05161F]/20 space-y-4'>
                  <div className='flex justify-between items-center text-xl font-black'>
                    <span>Total:</span>
                    <span>¥{getTotalPrice()}</span>
                  </div>
                  <button className='w-full bg-[#05161F] text-[#B3C200] py-3 rounded-full font-bold uppercase hover:bg-[#05161F]/80 transition-colors'>
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className='fixed inset-0 bg-black/50 z-30 lg:hidden'
          />
        )}
      </AnimatePresence>
    </>
  )
}
