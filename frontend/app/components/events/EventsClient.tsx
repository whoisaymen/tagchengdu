'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import EventsList from './EventsList'
import EventsInterface from './EventsInterface'
import { getEventMonthKey, getValidEventDate } from './eventsDate'
import Swirl from '../svg/Swirl'

type Event = {
  title: string
  date: string
  description: string
  tagLineup: { name: string }[]
  hiddenBarLineup: { name: string }[]
  flyer?: string
}

function groupEventsByMonth(events: Event[]) {
  const map = new Map<string, Event[]>()
  for (const event of events) {
    const key = getEventMonthKey(event.date)

    if (!key) {
      continue
    }

    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key)?.push(event)
  }

  for (const monthEvents of map.values()) {
    monthEvents.sort((a, b) => {
      const aDate = getValidEventDate(a.date)?.getTime() ?? 0
      const bDate = getValidEventDate(b.date)?.getTime() ?? 0

      return aDate - bDate
    })
  }

  return map
}

function EventsSwirlBackground() {
  return (
    <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
      <div
        className='absolute inset-0 mix-blend-overlay'
        style={{
          opacity: 0.18,
          filter: 'blur(0.7px) contrast(0.72) saturate(0.58)',
        }}
      >
        <Swirl
          theme={{ fill: 'var(--site-paper)' }}
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
          theme={{ fill: 'var(--site-paper)' }}
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
        <Swirl
          theme={{ fill: 'var(--site-paper)' }}
          className='w-[250vw]'
          animate={{
            rotate: [0, 40, -40, 0],
            scale: [1, 1.03, 0.97, 1],
          }}
          transition={{
            duration: 5.5,
            ease: [0.7, 0, 0.3, 1],
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.16,
          }}
          svgTransition={{
            duration: 7,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.16,
          }}
        />
      </div>
    </div>
  )
}

export default function EventsClient({
  events,
  initialMonth,
  initialYear,
}: {
  events: Event[]
  initialMonth: number
  initialYear: number
}) {
  const t = useTranslations('events')
  const eventsByMonth = groupEventsByMonth(events)
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)

  return (
    <div
      data-page='events'
      className='relative min-h-svh overflow-hidden overscroll-none font-[family-name:var(--font-geist-sans)] bg-[var(--site-ink)]'
    >
      <EventsSwirlBackground />
      <div className='relative z-10 min-h-svh'>
        <main className='flex flex-col w-full pt-[4.1rem] pb-4 md:pt-[4.5rem] min-[900px]:pt-20 px-2 min-[900px]:px-4 gap-y-1 h-[75svh] lg:h-[80svh] overflow-y-auto overscroll-contain relative no-scrollbar'>
          {eventsByMonth.get(`${currentYear}-${currentMonth}`)?.length ? (
            <EventsList
              key={`${currentYear}-${currentMonth}`}
              events={eventsByMonth.get(`${currentYear}-${currentMonth}`)!}
            />
          ) : (
            <p className='text-[var(--site-paper)] tracking-tight text-center text-lg pt-8 lg:pt-12'>
              {t('emptyMonth')}
            </p>
          )}
        </main>
        <div
          className='pointer-events-none absolute inset-x-0 bottom-0 h-[30%] lg:h-[34%]'
          style={{
            background:
              'linear-gradient(to top, #05161f 0%, rgba(5, 22, 31, 0.995) 7%, rgba(5, 22, 31, 0.96) 16%, rgba(5, 22, 31, 0.9) 26%, rgba(5, 22, 31, 0.8) 37%, rgba(5, 22, 31, 0.66) 49%, rgba(5, 22, 31, 0.5) 61%, rgba(5, 22, 31, 0.32) 74%, rgba(5, 22, 31, 0.16) 87%, rgba(5, 22, 31, 0) 100%)',
          }}
        />
      </div>
      <EventsInterface
        eventsByMonth={Object.fromEntries(eventsByMonth)}
        currentMonth={currentMonth}
        currentYear={currentYear}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />
    </div>
  )
}
