// frontend/app/shop/page.tsx
import Link from 'next/link'
import { useState } from 'react'
import ShopCart from '../../components/shop/ShopCart'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

const items = [
  {
    id: 'tag-logo-tshirt', // Add unique ID (using slug for simplicity)
    name: 'TAG Logo T-Shirt',
    slug: 'tag-logo-tshirt',
    image: '/images/image.png',
    price: 180,
    description: 'Classic black T-shirt with .TAG logo. 100% cotton.',
  },
  {
    id: 'tag-tote-bag', // Add unique ID
    name: 'TAG Tote Bag',
    slug: 'tag-tote-bag',
    image: '/images/image2.png',
    price: 80,
    description: 'Heavy-duty tote bag for your records and more.',
  },
  {
    id: 'tag-cap', // Add unique ID
    name: 'TAG Cap',
    slug: 'tag-cap',
    image: '/images/image.png',
    price: 120,
    description: 'Black cap with embroidered .TAG logo.',
  },
]

const mobileOffsets = [
  'ml-[50%] mt-2', // first item: right
  'ml-0 mr-auto -mt-6', // second item: left, up
  'ml-auto mr-0 mt-8', // third item: right, down
]

const desktopOffsets = [
  'lg:-translate-y-2 lg:translate-x-2',
  'lg:translate-y-4 lg:-translate-x-4',
  'lg:-translate-y-3 lg:translate-x-3',
]

export default async function ShopPage() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <main className='flex flex-col items-center justify-center h-full w-full font-[family-name:var(--font-kleber)] overflow-y-scroll'>
      <h1 className='absolute uppercase text-[7rem] lg:text-[20rem] text-center leading-[0.75] max-w-7xl top-1/2  -translate-y-1/2 text-[#E9EDB9] mix-blend-hue z-[10000]'>
        To Another Galaxy
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-fullh-full max-w-5xl py-16'>
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/shop/${item.slug}`}
            className={`
                
                ${mobileOffsets[i] || ''}
                ${desktopOffsets[i] || ''}
              `}
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-48 h-full object-cover rounded-lg mb-4'
            />
          </Link>
        ))}
      </div>
      {/* Cart component */}
      <ShopCart items={items} />
    </main>
  )
}
