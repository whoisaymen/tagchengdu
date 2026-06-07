'use client'

import { usePathname } from 'next/navigation'
import Swirl from '../svg/Swirl'

const locales = ['en', 'cn', 'zh']
const localePattern = `(${locales.join('|')})`

const HIDE_ON = [
  /^\/events(\/[^/]*)?$/,
  new RegExp(`^\/${localePattern}\/events(\/[^/]*)?$`),
  /^\/artists\/[^/]+$/,
  new RegExp(`^\/${localePattern}\/artists\/[^/]+$`),
  /^\/shop\/[^/]+$/,
  new RegExp(`^\/${localePattern}\/shop\/[^/]+$`),
]

const PROJECT_ON = [/^\/about$/, new RegExp(`^\/${localePattern}\/about$`)]
const ARTISTS_INDEX_ON = [
  /^\/artists$/,
  new RegExp(`^\/${localePattern}\/artists$`),
]

const LARGE_SWIRL = {
  className: 'w-[250vw]',
  animate: {
    rotate: [0, 40, -40, 0],
    scale: [1, 1.03, 0.97, 1],
  },
  transition: {
    duration: 5.5,
    ease: [0.7, 0, 0.3, 1],
    repeat: Infinity,
    repeatType: 'reverse' as const,
    delay: 0.16,
  },
  svgTransition: {
    duration: 7,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse' as const,
    delay: 0.16,
  },
}

function AnimatedSwirl() {
  const pathname = usePathname()

  if (HIDE_ON.some((pattern) => pattern.test(pathname))) {
    return null
  }

  const shouldProjectOverContent = PROJECT_ON.some((pattern) =>
    pattern.test(pathname),
  )
  const shouldProjectOverArtists = ARTISTS_INDEX_ON.some((pattern) =>
    pattern.test(pathname),
  )

  return (
    <div className='absolute inset-0 pointer-events-none z-[1000] overflow-hidden'>
      <div
        className='absolute inset-0 mix-blend-overlay'
        style={{ opacity: shouldProjectOverArtists ? 0.24 : 0.2 }}
      >
        <Swirl
          theme={{ fill: 'var(--site-ink)' }}
          className='w-[35vw]'
          animate={{
            rotate: [0, 360, -360, 0],
            scale: [1, 1.12, 0.9, 1],
          }}
          transition={{
            duration: 6.5,
            ease: [0.7, 0, 0.3, 1],
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0,
          }}
          svgTransition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0,
          }}
        />
        <Swirl
          theme={{ fill: 'var(--site-ink)' }}
          className='w-[90vw]'
          animate={{
            rotate: [0, 360],
            scale: [1, 1, 1],
          }}
          transition={{
            duration: 3,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            delay: 0.01,
          }}
          svgTransition={{
            duration: 6.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.08,
          }}
        />
        <Swirl theme={{ fill: 'var(--site-ink)' }} {...LARGE_SWIRL} />
      </div>

      {shouldProjectOverArtists ? (
        <div className='absolute inset-0'>
          <Swirl
            theme={{ fill: 'var(--site-ink)' }}
            {...LARGE_SWIRL}
            style={{
              mixBlendMode: 'overlay',
              opacity: 0.14,
              filter: 'blur(0.4px)',
            }}
          />
        </div>
      ) : null}

      {shouldProjectOverContent ? (
        <div className='absolute inset-0'>
          <Swirl
            theme={{ fill: 'var(--site-ink)' }}
            {...LARGE_SWIRL}
            style={{
              mixBlendMode: 'multiply',
              opacity: 0.09,
              filter: 'blur(1px) drop-shadow(0 0 12px rgba(5, 22, 31, 0.18))',
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default AnimatedSwirl
