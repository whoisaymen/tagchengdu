'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function UpNextMenu({ gigs = [] }: { gigs?: any[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative z-[1]'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-x-1 uppercase font-medium'
      >
        <span>Up Next</span>
      </button>

      <AnimatePresence mode='wait'>
        {open && (
          <motion.div
            key='menu'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='mt-6 w-full'
          >
            {gigs.length > 0 ? (
              <ul className='space-y-2'>
                {gigs.map((gig, i) => (
                  <li
                    key={i}
                    className='text-base lg:text-2xl font-[family-name:var(--font-geist-sans)]'
                  >
                    {gig.title || gig.name || 'Untitled gig'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-base opacity-70'>No upcoming gigs.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
