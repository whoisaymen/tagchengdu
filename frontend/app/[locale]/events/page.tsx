// import { Suspense } from 'react'
// import Link from 'next/link'
// import { PortableText } from '@portabletext/react'
// import { eventsQuery } from '@/sanity/lib/queries'
// import { sanityFetch } from '@/sanity/lib/live'
// import EventsList from '@/app/components/events/EventsList'
// import EventsInterface from '@/app/components/events/EventsInterface'
// import Loading from './loading'

// function formatEventDate(dateString: string) {
//   const date = new Date(dateString)
//   const weekday = date
//     .toLocaleDateString('en-US', { weekday: 'short' })
//     .toUpperCase()
//   const day = date.getDate()
//   return `${weekday} ${day}`
// }
// export default async function EventsPage() {
//   const { data: events = [] } = await sanityFetch({ query: eventsQuery })

//   return (
//     <div className='font-[family-name:var(--font-geist-sans)] bg-[#05161F]'>
//       <div className='relative'>
//         <main
//           className='flex flex-col w-full py-14 lg:pt-20 pb-4 px-2 lg:px-4 gap-y-1 h-[75svh] lg:h-[80svh] overflow-y-auto relative no-scrollbar'
//           style={{ minHeight: 'unset' }}
//         >
//           <EventsList events={events} />
//         </main>
//         <div
//           className='
//         pointer-events-none absolute
//         inset-x-0 bottom-0 h-[20%]
//         bg-gradient-to-t from-[#05161F] to-transparent

//       '
//         />
//       </div>

//       <EventsInterface />
//     </div>
//   )
// }

// import { Suspense } from 'react'
// import { eventsQuery } from '@/sanity/lib/queries'
// import { sanityFetch } from '@/sanity/lib/live'
// import EventsList from '@/app/components/events/EventsList'
// import EventsInterface from '@/app/components/events/EventsInterface'
// import Loading from './loading'

// type Event = {
//   title: string
//   date: string
//   description: string
//   tagLineup: { name: string }[]
//   hiddenBarLineup: { name: string }[]
//   flyer?: string
// }

// function groupEventsByMonth(events: Event[]) {
//   const map = new Map<string, Event[]>()
//   for (const event of events) {
//     const d = new Date(event.date)
//     const key = `${d.getFullYear()}-${d.getMonth()}`
//     if (!map.has(key)) {
//       map.set(key, [])
//     }
//     map.get(key)?.push(event)
//   }
//   return map
// }

// export default async function EventsPage() {
//   const { data: events = [] } = await sanityFetch({ query: eventsQuery })
//   const eventsByMonth = groupEventsByMonth(events)

//   const now = new Date()
//   const currentMonth = now.getMonth()
//   const currentYear = now.getFullYear()

//   return (
//     <div className='font-[family-name:var(--font-geist-sans)] bg-[#05161F]'>
//       <div className='relative'>
//         <main className='flex flex-col w-full py-14 lg:pt-20 pb-4 px-2 lg:px-4 gap-y-1 h-[75svh] lg:h-[80svh] overflow-y-auto relative no-scrollbar'>
//           {eventsByMonth.get(`${currentYear}-${currentMonth}`)?.length ? (
//             <EventsList
//               events={eventsByMonth.get(`${currentYear}-${currentMonth}`)!}
//             />
//           ) : (
//             <p className='text-white text-center text-xl pt-20'>
//               No events this month
//             </p>
//           )}
//         </main>
//         <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#05161F] to-transparent' />
//       </div>

//       <EventsInterface
//         eventsByMonth={Object.fromEntries(eventsByMonth)}
//         initialMonth={currentMonth}
//         initialYear={currentYear}
//       />
//     </div>
//   )
// }

import { eventsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import EventsClient from '@/app/components/events/EventsClient'

export default async function EventsPage() {
  const { data: events = [] } = await sanityFetch({ query: eventsQuery })
  return <EventsClient events={events} />
}
