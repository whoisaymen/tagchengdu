'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const locales = ['en', 'cn']
const localePattern = `(${locales.join('|')})`

const HIDE_ON = [
  // /events and /events/[slug]
  /^\/events(\/[^/]*)?$/,
  // /en/events and /cn/events and their slugs
  new RegExp(`^\/${localePattern}\/events(\\/[^/]*)?$`),

  // /artists/[slug]
  /^\/artists\/[^/]+$/,
  // /en/artists/[slug] and /cn/artists/[slug]
  new RegExp(`^\/${localePattern}\/artists\/[^/]+$`),
]

const AnimatedBackground = () => {
  const pathname = usePathname()

  // Hide if pathname matches any pattern in HIDE_ON
  if (HIDE_ON.some((pattern) => pattern.test(pathname))) {
    return null
  }

  return (
    <motion.div
      className='absolute inset-0 z-[500] mix-blend-overlay pointer-events-none'
      initial={{ backgroundPosition: '0% 0%' }}
      animate={{ backgroundPosition: '0% 100%' }}
      transition={{
        duration: 2,
        ease: [0.76, 0, 0.24, 1],
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      style={{
        background:
          // 'linear-gradient(180deg, #05161f, #b25403, #b3c200, #b25403, #05161f)',
          'linear-gradient(#05161f 0%, #b25403 25%, #b3c200 50%, #b25403 75%, #05161f 100%)  0 0/100% 200%',
        backgroundSize: '100% 150%',
      }}
    />
  )
}

export default AnimatedBackground
