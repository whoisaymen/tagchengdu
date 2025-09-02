'use client'

import { useRef, useState } from 'react'
import EventBox from './EventBox'

type Event = {
  title: string
  date: string
  description: string
  tagLineup: { name: string }[]
  hiddenBarLineup: { name: string }[]
  flyer?: string
}

export default function EventsList({ events }: { events: Event[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleOpen = (idx: number) => {
    setOpenIndex(idx)
    setTimeout(() => {
      itemRefs.current[idx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 200) // Wait for animation to start
  }

  return (
    <div className='flex flex-col gap-y-1'>
      {events.map((event, idx) => (
        <div
          key={idx}
          ref={(el) => {
            itemRefs.current[idx] = el
          }}
        >
          <EventBox
            event={event}
            open={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        </div>
      ))}
    </div>
  )
}
