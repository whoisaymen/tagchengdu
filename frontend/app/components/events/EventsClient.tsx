'use client'

import { useState } from 'react'
import EventsList from './EventsList'
import EventsInterface from './EventsInterface'

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
    const d = new Date(event.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key)?.push(event)
  }
  return map
}

export default function EventsClient({ events }: { events: Event[] }) {
  const eventsByMonth = groupEventsByMonth(events)
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())

  return (
    <div className='font-[family-name:var(--font-geist-sans)] bg-[#05161F]'>
      <div className='relative'>
        <main className='flex flex-col w-full py-14 lg:pt-20 pb-4 px-2 lg:px-4 gap-y-1 h-[75svh] lg:h-[80svh] overflow-y-auto relative no-scrollbar'>
          {eventsByMonth.get(`${currentYear}-${currentMonth}`)?.length ? (
            <EventsList
              events={eventsByMonth.get(`${currentYear}-${currentMonth}`)!}
            />
          ) : (
            <p className='text-white text-center text-xl pt-20'>
              No events this month
            </p>
          )}
        </main>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#05161F] to-transparent' />
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
