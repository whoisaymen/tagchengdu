'use client'
import { usePathname } from 'next/navigation'

const locales = ['en', 'cn', 'zh']
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

  // /shop/[slug]
  /^\/shop\/[^/]+$/,
  // /en/shop/[slug] and localized variants
  new RegExp(`^\/${localePattern}\/shop\/[^/]+$`),
]

const AnimatedBackground = () => {
  const pathname = usePathname()

  // Hide if pathname matches any pattern in HIDE_ON
  if (HIDE_ON.some((pattern) => pattern.test(pathname))) {
    return null
  }

  return (
    <div className='site-animated-background absolute inset-0 z-[500] mix-blend-overlay pointer-events-none' />
  )
}

export default AnimatedBackground

// OLD VERSION
// 'use client'
// import { usePathname } from 'next/navigation'
// import { motion } from 'framer-motion'

// const locales = ['en', 'cn']
// const localePattern = `(${locales.join('|')})`

// const HIDE_ON = [
//   // /events and /events/[slug]
//   /^\/events(\/[^/]*)?$/,
//   // /en/events and /cn/events and their slugs
//   new RegExp(`^\/${localePattern}\/events(\\/[^/]*)?$`),

//   // /artists/[slug]
//   /^\/artists\/[^/]+$/,
//   // /en/artists/[slug] and /cn/artists/[slug]
//   new RegExp(`^\/${localePattern}\/artists\/[^/]+$`),
// ]

// const AnimatedBackground = () => {
//   const pathname = usePathname()

//   // Hide if pathname matches any pattern in HIDE_ON
//   if (HIDE_ON.some((pattern) => pattern.test(pathname))) {
//     return null
//   }

//   return (
//     <motion.div
//       className='absolute inset-0 z-[500] mix-blend-overlay pointer-events-none'
//       initial={{ backgroundPosition: '0% 0%' }}
//       animate={{ backgroundPosition: '0% 100%' }}
//       transition={{
//         duration: 2,
//         ease: [0.76, 0, 0.24, 1],
//         repeat: Infinity,
//         repeatType: 'reverse',
//       }}
//       style={{
//         background:
//           'linear-gradient(var(--site-bg-dark) 0%, var(--site-bg-mid) 25%, var(--site-bg-bright) 50%, var(--site-bg-mid) 75%, var(--site-bg-dark) 100%) 0 0 / 100% 200%',
//         backgroundSize: '100% 150%',
//         willChange: 'background-position',
//       }}
//     />
//   )
// }

// export default AnimatedBackground
