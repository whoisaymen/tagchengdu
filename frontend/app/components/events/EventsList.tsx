'use client'

import { useState } from 'react'
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
  const [openIndex, setOpenIndex] = useState<number | null>(() =>
    events.length ? 0 : null,
  )

  const handleOpen = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null)
      return
    }

    setOpenIndex(idx)
  }

  return (
    <div className='flex flex-col gap-y-1'>
      {events.map((event, idx) => (
        <div key={idx}>
          <EventBox
            event={event}
            open={openIndex === idx}
            onClick={() => handleOpen(idx)}
          />
        </div>
      ))}
    </div>
  )
}
