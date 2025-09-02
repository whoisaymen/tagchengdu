'use client'

import { useState } from 'react'
import EventsList from './EventsList'

function groupEventsByYearMonth(events: any[]) {
  const grouped: Record<string, Record<string, any[]>> = {}
  events.forEach((event: any) => {
    const date = new Date(event.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    if (!grouped[year]) grouped[year] = {}
    if (!grouped[year][month]) grouped[year][month] = []
    grouped[year][month].push(event)
  })
  return grouped
}

export default function EventsNavigator({ events }: { events: any[] }) {
  const grouped = groupEventsByYearMonth(events)
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))
  const [selectedYear, setSelectedYear] = useState(years[0])
  const months = Object.keys(grouped[selectedYear] || {}).sort(
    (a, b) => Number(a) - Number(b)
  )
  const [selectedMonth, setSelectedMonth] = useState(months[0])

  const currentEvents = grouped[selectedYear]?.[selectedMonth] || []

  return (
    <div>
      <div className='flex justify-center items-center gap-4 py-4'>
        <button
          onClick={() => {
            const idx = years.indexOf(selectedYear)
            if (idx < years.length - 1) setSelectedYear(years[idx + 1])
          }}
          disabled={years.indexOf(selectedYear) === years.length - 1}
          className='px-2 py-1 text-lg disabled:opacity-30'
        >
          &lt;
        </button>
        <span className='text-2xl font-bold'>{selectedYear}</span>
        <button
          onClick={() => {
            const idx = years.indexOf(selectedYear)
            if (idx > 0) setSelectedYear(years[idx - 1])
          }}
          disabled={years.indexOf(selectedYear) === 0}
          className='px-2 py-1 text-lg disabled:opacity-30'
        >
          &gt;
        </button>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className='ml-6 px-2 py-1 text-lg bg-[#b25403] text-white rounded'
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(Number(selectedYear), Number(month) - 1).toLocaleString(
                'default',
                { month: 'long' }
              )}
            </option>
          ))}
        </select>
      </div>
      <EventsList events={currentEvents} />
    </div>
  )
}
