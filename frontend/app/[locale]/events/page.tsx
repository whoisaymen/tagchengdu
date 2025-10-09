import { eventsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import EventsClient from '@/app/components/events/EventsClient'

export default async function EventsPage() {
  const { data: events = [] } = await sanityFetch({ query: eventsQuery })

  const normalizedEvents = events.map((event) => ({
    ...event,
    tagLineup: (event.tagLineup ?? []).map((item: any) => ({
      name: item.name,
    })),
    hiddenBarLineup: (event.hiddenBarLineup ?? []).map((item: any) => ({
      name: item.name,
    })),
  }))

  return <EventsClient events={normalizedEvents} />
}
