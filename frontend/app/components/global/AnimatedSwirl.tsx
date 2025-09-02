'use client'
import { usePathname } from 'next/navigation'
import Swirl from '../svg/Swirl'

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

function AnimatedSwirl() {
  const pathname = usePathname()

  // Hide if pathname matches any pattern in HIDE_ON
  if (HIDE_ON.some((pattern) => pattern.test(pathname))) {
    return null
  }

  return (
    <div className='absolute inset-0 mix-blend-overlay pointer-events-none z-[1000] overflow-hidden opacity-5'>
      <Swirl
        theme={{ fill: '#05161F' }}
        className='w-[35vw]'
        animate={{
          rotate: [0, 360, -360, 0], // was 40, now 120
          scale: [1, 1.12, 0.9, 1], // optional: exaggerate scale a bit too
        }}
        transition={{
          duration: 6.5,
          ease: [0.7, 0, 0.3, 1],
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0,
        }}
        // svgAnimate={{
        //   opacity: [0.7, 1, 0.7],
        // }}
        svgTransition={{
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0,
        }}
      />
      <Swirl
        theme={{ fill: '#05161F' }}
        className='w-[90vw]'
        animate={{
          rotate: [0, 360], // continuous spin
          scale: [1, 1, 1],
        }}
        transition={{
          duration: 3, // slower, smoother
          ease: 'linear', // constant speed
          repeat: Infinity,
          repeatType: 'loop', // always forward
          delay: 0.01,
        }}
        // svgAnimate={{
        //   opacity: [0.5, 0.8, 0.5],
        // }}
        svgTransition={{
          duration: 6.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0.08,
        }}
      />
      <Swirl
        theme={{ fill: '#05161F' }}
        className='w-[250vw]'
        animate={{
          rotate: [0, 40, -40, 0], // was 16, now 40
          scale: [1, 1.03, 0.97, 1],
        }}
        transition={{
          duration: 5.5,
          ease: [0.7, 0, 0.3, 1],
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0.16,
        }}
        // svgAnimate={{
        //   opacity: [0.3, 0.6, 0.3],
        // }}
        svgTransition={{
          duration: 7,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0.16,
        }}
      />
    </div>
  )
}

export default AnimatedSwirl
