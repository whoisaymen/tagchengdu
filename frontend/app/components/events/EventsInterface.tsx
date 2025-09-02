// 'use client'

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import ArrowRight from '../svg/ArrowRight'

// // Sample data structure - ready for Sanity integration
// const sampleEvents = [
//   {
//     id: 1,
//     day: 'THU',
//     date: 5,
//     title: '绝好调',
//     description:
//       'An evening of experimental electronic music featuring local and international artists.',
//     venue: 'Club Underground',
//     time: '22:00',
//   },
//   {
//     id: 2,
//     day: 'FRI',
//     date: 6,
//     title: 'COLLATERAL DISORDER',
//     description:
//       'Industrial techno night with heavy bass and immersive visuals.',
//     venue: 'Warehouse District',
//     time: '23:00',
//   },
//   {
//     id: 3,
//     day: 'SAT',
//     date: 14,
//     title: '露房娇娃6周年ALL IN',
//     description:
//       '6th anniversary celebration with special guest performances and exclusive sets.',
//     venue: 'Main Stage',
//     time: '21:00',
//   },
//   {
//     id: 4,
//     day: 'SUN',
//     date: 22,
//     title: "WHAT'S SUB 低音企划 ONE LOVE 圣诞特辑",
//     description:
//       'Christmas special featuring deep bass music and holiday-themed performances.',
//     venue: 'Studio Complex',
//     time: '20:00',
//   },
//   {
//     id: 5,
//     day: 'MON',
//     date: 25,
//     title: ".TAG FAMILY 2024-2025 NEW YEAR DANCE DAY 1: 跨年 NEW YEAR'S EVE",
//     description:
//       "New Year's Eve celebration - Day 1 of our epic 3-day dance marathon featuring top DJs and live performances.",
//     venue: 'Grand Ballroom',
//     time: '22:00',
//   },
//   {
//     id: 6,
//     day: 'WED',
//     date: 29,
//     title: '.TAG FAMILY 2024-2025 NEW YEAR DANCE DAY 2: PSY YOUR NEW LIFE',
//     description:
//       'Day 2 of New Year celebration focusing on psychedelic and trance music to start your new life.',
//     venue: 'Cosmic Hall',
//     time: '21:30',
//   },
//   {
//     id: 7,
//     day: 'THU',
//     date: 31,
//     title: "WHAT'S SUB 低音企划 ONE LOVE 圣诞特辑",
//     description:
//       'Final celebration of the year with our signature bass-heavy sound and community love.',
//     venue: 'Underground',
//     time: '23:59',
//   },
// ]

// const months = [
//   'JANUARY',
//   'FEBRUARY',
//   'MARCH',
//   'APRIL',
//   'MAY',
//   'JUNE',
//   'JULY',
//   'AUGUST',
//   'SEPTEMBER',
//   'OCTOBER',
//   'NOVEMBER',
//   'DECEMBER',
// ]

// export default function EventsInterface() {
//   const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
//   const [currentMonth, setCurrentMonth] = useState(11) // December (0-indexed)
//   const [currentYear, setCurrentYear] = useState(2024)

//   const handleEventClick = (eventId: number) => {
//     setExpandedEvent(expandedEvent === eventId ? null : eventId)
//   }

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     if (direction === 'next') {
//       if (currentMonth === 11) {
//         setCurrentMonth(0)
//         setCurrentYear(currentYear + 1)
//       } else {
//         setCurrentMonth(currentMonth + 1)
//       }
//     } else {
//       if (currentMonth === 0) {
//         setCurrentMonth(11)
//         setCurrentYear(currentYear - 1)
//       } else {
//         setCurrentMonth(currentMonth - 1)
//       }
//     }
//     setExpandedEvent(null) // Close any expanded events when navigating
//   }

//   return (
//     <>
//       <div className='fixed w-full bottom-0 h-auto lg:h-[20vh] flex items-end justify-center pointer-events-none'>
//         <div className='w-full h-full mx-auto px-4 pointer-events-auto font-[family-name:var(--font-kleber)] h-auto py-8 pt-11 relative bg-[#05161F]'>
//           <div className='text-7xl md:text-9xl bg-gradient-to-b from-[#B25403] to-[#B3C200] bg-clip-text text-center text-transparent leading-none flex items-end justify-between md:items-center'>
//             <button
//               onClick={() => navigateMonth('prev')}
//               className='hover:scale-110'
//             >
//               <ArrowRight
//                 theme={{ fill: '#B3C200' }}
//                 className='w-12 h-20 -rotate-180'
//               />
//             </button>
//             <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-4'>
//               <div className='text-[4.5rem] lg:text-9xl bg-gradient-to-b from-[#D90000] via-[#B3C200] to-[#D90000] bg-clip-text text-transparent leading-[1]'>
//                 {months[currentMonth]}
//               </div>
//               <div className='text-[4.5rem] lg:text-9xl bg-gradient-to-b from-[#D90000] via-[#B3C200] to-[#D90000] bg-clip-text text-transparent leading-[1] -mt-4 lg:mt-0'>
//                 {currentYear}
//               </div>
//             </div>

//             <button
//               onClick={() => navigateMonth('next')}
//               className='md:order-none  hover:scale-110'
//             >
//               <ArrowRight theme={{ fill: '#B3C200' }} className='w-12 h-20' />
//             </button>
//           </div>

//           <div className='pointer-events-none absolute -top-8.5 left-0 right-0 h-[20%] bg-gradient-to-t from-[#05161F] to-transparent' />
//         </div>
//       </div>
//     </>
//   )
// }
'use client'

import ArrowRight from '../svg/ArrowRight'

const months = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

type EventsByMonth = {
  [key: string]: any[] // key = '2024-11'
}

type Props = {
  eventsByMonth: EventsByMonth
  currentMonth: number
  currentYear: number
  setCurrentMonth: (m: number) => void
  setCurrentYear: (y: number) => void
}

function getHasNext(
  eventsByMonth: EventsByMonth,
  currentMonth: number,
  currentYear: number
) {
  let y = currentYear
  let m = currentMonth + 1
  while (y <= currentYear + 5) {
    while (m < 12) {
      if (eventsByMonth[`${y}-${m}`]) return true
      m++
    }
    y++
    m = 0
  }
  return false
}

function getHasPrev(
  eventsByMonth: EventsByMonth,
  currentMonth: number,
  currentYear: number
) {
  let y = currentYear
  let m = currentMonth - 1
  while (y >= currentYear - 5) {
    while (m >= 0) {
      if (eventsByMonth[`${y}-${m}`]) return true
      m--
    }
    y--
    m = 11
  }
  return false
}

function getNextMonth(
  eventsByMonth: EventsByMonth,
  currentMonth: number,
  currentYear: number
) {
  let y = currentYear
  let m = currentMonth + 1
  while (y <= currentYear + 5) {
    while (m < 12) {
      if (eventsByMonth[`${y}-${m}`]) return { month: m, year: y }
      m++
    }
    y++
    m = 0
  }
  return { month: currentMonth, year: currentYear }
}

function getPrevMonth(
  eventsByMonth: EventsByMonth,
  currentMonth: number,
  currentYear: number
) {
  let y = currentYear
  let m = currentMonth - 1
  while (y >= currentYear - 5) {
    while (m >= 0) {
      if (eventsByMonth[`${y}-${m}`]) return { month: m, year: y }
      m--
    }
    y--
    m = 11
  }
  return { month: currentMonth, year: currentYear }
}

export default function EventsInterface({
  eventsByMonth,
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}: Props) {
  const handleNavigate = (dir: 'prev' | 'next') => {
    if (dir === 'next') {
      const next = getNextMonth(eventsByMonth, currentMonth, currentYear)
      setCurrentMonth(next.month)
      setCurrentYear(next.year)
    } else {
      const prev = getPrevMonth(eventsByMonth, currentMonth, currentYear)
      setCurrentMonth(prev.month)
      setCurrentYear(prev.year)
    }
  }

  const hasPrev = getHasPrev(eventsByMonth, currentMonth, currentYear)
  const hasNext = getHasNext(eventsByMonth, currentMonth, currentYear)

  return (
    <div className='fixed w-full bottom-0 h-auto lg:h-[20vh] flex items-end justify-center pointer-events-none'>
      <div className='w-full h-full mx-auto px-4 pointer-events-auto font-[family-name:var(--font-kleber)] h-auto py-8 pt-11 relative bg-[#05161F]'>
        <div className='text-7xl md:text-9xl bg-gradient-to-b from-[#B25403] to-[#B3C200] bg-clip-text text-center text-transparent leading-none flex items-end justify-between md:items-center'>
          {/* LEFT ARROW */}
          {hasPrev ? (
            <button
              onClick={() => handleNavigate('prev')}
              className='hover:scale-110'
              aria-label='Previous month'
            >
              <ArrowRight
                theme={{ fill: '#B3C200' }}
                className='w-12 h-20 -rotate-180'
              />
            </button>
          ) : (
            <div className='w-12 h-20' />
          )}

          {/* MONTH/YEAR DISPLAY */}
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-4'>
            <div className='text-[4.5rem] lg:text-9xl bg-gradient-to-b from-[#D90000] via-[#B3C200] to-[#D90000] bg-clip-text text-transparent leading-[1]'>
              {months[currentMonth]}
            </div>
            <div className='text-[4.5rem] lg:text-9xl bg-gradient-to-b from-[#D90000] via-[#B3C200] to-[#D90000] bg-clip-text text-transparent leading-[1] -mt-4 lg:mt-0'>
              {currentYear}
            </div>
          </div>

          {/* RIGHT ARROW */}
          {hasNext ? (
            <button
              onClick={() => handleNavigate('next')}
              className='hover:scale-110'
              aria-label='Next month'
            >
              <ArrowRight theme={{ fill: '#B3C200' }} className='w-12 h-20' />
            </button>
          ) : (
            <div className='w-12 h-20' />
          )}
        </div>

        <div className='pointer-events-none absolute -top-8.5 left-0 right-0 h-[20%] bg-gradient-to-t from-[#05161F] to-transparent' />
      </div>
    </div>
  )
}
