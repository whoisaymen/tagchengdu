import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import ArrowRight from '@/app/components/svg/ArrowRight'
import { FiInstagram } from 'react-icons/fi'
import { FaSoundcloud } from 'react-icons/fa'
import { FaCirclePlay } from 'react-icons/fa6'

import { IoIosMusicalNotes } from 'react-icons/io'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, pagesSlugs } from '@/sanity/lib/queries'
import { GetPageQueryResult } from '@/sanity.types'
import { PageOnboarding } from '@/app/components/Onboarding'
import ArtistTitleSvg from '@/app/components/svg/ArtistTitle'
import AnimatedGradient from '@/app/components/artists/AnimatedGradient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function ItemPage(props: Props) {
  return (
    <div className='font-[family-name:var(--font-kleber)] flex flex-col lg:flex-row relative h-full justify-between'>
      <div className='w-full h-[45svh] lg:h-full relative'>
        <Image
          src='https://cdn.prod.website-files.com/662b714fa61e6fb38978091f/6724a05d5cfdad867cba9093_cora.jpeg'
          alt='Artist Image'
          height={800}
          width={800}
          className='object-cover w-full h-full'
        />
        <Link
          href='/about'
          className='absolute bottom-4 left-4 bg-[#E9EDB9] px-[0.5rem] lg:px-3 rounded-full text-[#05161F] uppercase text-[1.2rem] lg:text-4xl leading-[1.15] z-10'
        >
          Back
        </Link>
        {/* <div
          className='
    pointer-events-none absolute
    bottom-0 left-0 right-0 h-[20%]
    bg-gradient-to-t from-[#b25403] to-transparent
    lg:top-0 lg:bottom-0 lg:right-0 lg:left-auto lg:w-[30%] lg:h-full
    lg:bg-gradient-to-l lg:from-[#b25403] lg:to-transparent
  '
        /> */}
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[#b25403] to-transparent lg:hidden' />

        <AnimatedGradient />
      </div>
      <div className='w-full'>
        <div className='w-full h-[30svh] lg:h-[65vh] text-[#05161F] font-[family-name:var(--font-geist-sans)] bg-[#B3C200] flex flex-col justify-between py-0 relative tracking-tighter lg:pt-16 '>
          <FaCirclePlay className='absolute left-4 top-8 text-4xl' />

          <div className='pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-[#B3C200] to-transparent' />

          <div className='overflow-y-scroll h-full px-4 pb-2 space-y-8 mt-4 scrollbar scrollbar-thumb-[#B3C200] scrollbar-track-[#B3C200] '>
            <p className='text-base lg:text-2xl leading-tight'>
              {`Cora moves with astral intuition—alchemizing her indie acting
              roots into cinematic sets that radiate with celestial energy, and
              sear with Sichuan spice. Driven by rolling drums, percussive
              passages, punchy vocals and transcendent breakdowns, the
              Chengdu-born DJ weaves between old school trance, progressive
              house and techno grooves—superimposing dramatic subplots and
              emotional undertows onto rhythmic narratives, attuned to the
              kinetic desires of the dancefloor.`}
            </p>
            <p className='text-base lg:text-2xl leading-tight'>
              {`From her hometown residency at .TAG, Chengdu, to her newfound base
              in Berlin, Cora's path has been one of perpetual transformation,
              evolving into an accomplished DJ and producer amid an awakened and
              accelerating scene. Her debut release, ‘Mountain High’, marked a
              propulsive blend of progressive trance and her own take on
              traditional mountain singing, drawing on seven years of classical
              Italian operatic training. Her latest release, sees a meditative
              rendition of Buddhist mantra, ‘The Heart Sutra’. Across each of
              her personal productions, Cora’s confident and ethereal vocal
              experimentation makes every track distinctly her own.`}
            </p>
            <p className='text-base lg:text-2xl leading-tight'>
              {`Through her performance, productions, and party series 6G+, Cora
              blends primal rhythm with otherworldly experience, continuing to
              embrace a more uplifting and sensual incarnation of her
              ever-mystical sound——where trance meets transcendence, and fantasy
              meets physical release.`}
            </p>
          </div>
        </div>
        <div className='p-4 w-full text-center bg-[#B3C200] text-[#05161F] flex justify-center items-start uppercase pt-0 flex-col lg:gap-1 font-[family-name:var(--font-geist-sans)] tracking-tighter text-xl lg:text-3xl h-[25svh] lg:h-[35svh]'>
          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <ArrowRight
                theme={{ fill: '#05161F' }}
                className='w-6 h-auto lg:w-9'
              />
              <span className='uppercase'>Up next</span>
            </div>
            <div className='flex items-center gap-x-0 lg:gap-x-1'>
              <ArrowRight
                theme={{ fill: '#05161F' }}
                className='w-6 h-auto lg:w-9'
              />
              <span className='uppercase'>Contact</span>
            </div>
            <div className='flex items-center gap-x-0.5'>
              <FiInstagram />
              <FaSoundcloud className='bg-[#05161F] rounded-full text-[#B3C200] p-1' />
              <IoIosMusicalNotes className='bg-[#05161F] rounded-md text-[#B3C200] p-1' />
            </div>
          </div>
          <ArtistTitleSvg
            theme={{ fill: '#05161F', gradient: '#B3C200' }}
            className='w-full h-auto relative'
          />
        </div>
      </div>
    </div>
  )
}
