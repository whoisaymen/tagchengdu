'use client'

import { motion } from 'framer-motion'

export default function AnimatedGradient() {
  return (
    <motion.div
      className='
        pointer-events-none absolute
        lg:top-0 lg:bottom-0 lg:right-0 lg:left-auto
        lg:h-full lg:w-[30%]
        lg:bg-gradient-to-l lg:from-[#b25403] lg:to-transparent
        hidden lg:block
      '
      initial={{ width: '20%' }}
      animate={{ width: '30%' }}
      transition={{
        duration: 2,
        ease: [0.76, 0, 0.24, 1],
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  )
}
