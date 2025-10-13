'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import ArrowRight from '@/app/components/svg/ArrowRight'
import { IoClose } from 'react-icons/io5'

interface BioAndUpNextProps {
  bio: any
  locale: string
  upNext?: string
}

export default function BioAndUpNext({
  bio,
  locale,
  upNext,
}: {
  bio: any
  locale: string
  upNext?: string
}) {
  const [showUpNext, setShowUpNext] = useState(false)

  return (
    <div className='flex-1 text-[#05161F] font-[family-name:var(--font-geist-sans)] flex flex-col relative tracking-tighter lg:pt-16 overflow-hidden'>
      {/* Bottom fade */}
      <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#B3C200] via-[#B3C200]/80 to-transparent z-10' />

      {/* Up Next button */}
      <button
        className='absolute top-4 left-4 flex items-center gap-x-2 z-20 bg-transparent'
        onClick={() => setShowUpNext((v) => !v)}
      >
        <motion.div
          animate={{ rotate: showUpNext ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight
            theme={{ fill: '#05161F' }}
            className='w-6 h-auto lg:w-9'
          />
        </motion.div>
        <span className='uppercase'>Up next</span>
      </button>

      {/* Scrollable content */}
      <AnimatePresence mode='wait'>
        {!showUpNext && (
          <motion.div
            key='bio'
            className='overflow-y-scroll h-full px-4 pb-12 space-y-8 mt-4 scrollbar scrollbar-thumb-[#B3C200] scrollbar-track-[#B3C200]'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PortableText
              value={bio?.[locale] || bio?.en || []}
              components={{
                marks: {
                  strong: ({ children }) => (
                    <span className='font-[family-name:var(--font-kleber)] tracking-normal text-[1.12rem] lg:text-[2.35rem] leading-[1.15]'>
                      {children}
                    </span>
                  ),
                },
                block: {
                  normal: ({ children }) => (
                    <p className='text-base lg:text-2xl leading-tight'>
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {showUpNext && (
          <motion.div
            key='upnext'
            className='overflow-y-scroll h-full px-4 pb-12 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className='text-xl lg:text-3xl font-bold'>
              {upNext ? `Next tour dates: ${upNext}` : 'No upcoming dates'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
