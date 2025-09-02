import { Suspense } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

import { AllPosts } from '@/app/components/Posts'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Swirl from '../components/svg/Swirl'
import AnimatedSwirl from '../components/global/AnimatedSwirl'

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <div className='font-[family-name:var(--font-kleber)]'>
      {/* Hypnotic Swirl Overlay */}
      {/* <div className='absolute inset-0 z-0'>
        <Swirl
          theme={{ fill: '#05161F' }}
          className='w-[30vw] mix-blend-overlay'
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
          svgAnimate={{
            opacity: [0.7, 1, 0.7],
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
          theme={{ fill: '#05161F' }}
          className='w-[95vw] mix-blend-overlay'
          animate={{
            rotate: [0, 360, -360, 0], // was 28, now 80
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 5,
            ease: [0.7, 0, 0.3, 1],
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.01,
          }}
          svgAnimate={{
            opacity: [0.5, 0.8, 0.5],
          }}
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
          className='w-[250vw] mix-blend-overlay'
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
          svgAnimate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          svgTransition={{
            duration: 7,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.16,
          }}
        />
      </div> */}
      {/* <AnimatedSwirl /> */}
      <main className='flex items-center justify-center h-svh w-full relative'>
        <h1 className='uppercase text-[7rem] lg:text-[20rem] text-center leading-[0.75] max-w-7xl mx-auto z-10 text-[#E9EDB9] relative mix-blend-exclusion'>
          To Another Galaxy
        </h1>
      </main>
    </div>
  )
}
