import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Viewport } from 'next'
import EventsClient from '@/app/components/events/EventsClient'
import { getFirstFutureEventMonth } from '@/app/components/events/eventsDate'
import { eventsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

type LineupEntry = {
  name?: string | null
  artist?: {
    name?: string | null
  } | null
}

type RoomLineup = {
  room?: {
    _id?: string | null
    id?: string | null
    name?: string | null
    nameEn?: string | null
    nameCn?: string | null
  } | null
  entries?: LineupEntry[] | null
}

type ApiEvent = {
  title?: string | null
  date?: string | null
  doors_at?: string | null
  starts_at?: string | null
  description?: string | null
  poster_url?: string | null
  lineups?: RoomLineup[] | null
}

type EventsApiResponse = {
  events?: ApiEvent[] | null
}

type PortableTextSpan = {
  text?: string | null
  marks?: string[] | null
}

type PortableTextBlock = {
  _type?: string | null
  children?: PortableTextSpan[] | null
}

type LocaleBlockContent = {
  en?: PortableTextBlock[] | null
  cn?: PortableTextBlock[] | null
}

type SanityEvent = {
  title?: string | null
  date?: string | null
  doorsAt?: string | null
  startsAt?: string | null
  description?: LocaleBlockContent | null
  poster?: {
    asset?: {
      url?: string | null
    } | null
  } | null
  lineups?: RoomLineup[] | null
}

type NormalizedEvent = {
  title: string
  date: string
  description: string
  tagLineup: { name: string }[]
  hiddenBarLineup: { name: string }[]
  flyer?: string
}

const EVENTS_API_BASE =
  process.env.T2_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://api.toanothergalaxy.cn'
const EVENTS_FETCH_TIMEOUT_MS = 12000
const USE_EVENTS_DEV_CACHE =
  process.env.NODE_ENV === 'development' &&
  process.env.T2_EVENTS_DEV_CACHE !== 'off'

export const viewport: Viewport = {
  themeColor: '#05161f',
  colorScheme: 'dark',
}

function normalizeLineupNames(entries: LineupEntry[] | null | undefined) {
  return (entries || [])
    .map((entry) => entry.artist?.name || entry.name || '')
    .filter(Boolean)
    .map((name) => ({ name }))
}

function getRoomEntries(
  lineups: RoomLineup[] | null | undefined,
  roomMatchers: string[],
) {
  const matchedRoom = (lineups || []).find((lineup) => {
    const roomNames = [
      lineup.room?._id,
      lineup.room?.id,
      lineup.room?.name,
      lineup.room?.nameEn,
      lineup.room?.nameCn,
    ]
      .filter(Boolean)
      .map((name) => name!.toLowerCase())

    return roomMatchers.some((matcher) =>
      roomNames.some((name) => name.includes(matcher)),
    )
  })

  return normalizeLineupNames(matchedRoom?.entries)
}

function getEventDate(event: ApiEvent) {
  return event.starts_at || event.doors_at || event.date || ''
}

function getSanityEventDate(event: SanityEvent) {
  return event.startsAt || event.doorsAt || event.date || ''
}

function getLocalizedBlocks(
  value: LocaleBlockContent | null | undefined,
  locale: string,
) {
  if (!value) {
    return []
  }

  if (locale === 'cn') {
    return value.cn || value.en || []
  }

  return value.en || value.cn || []
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatPortableTextSpan(span: PortableTextSpan) {
  let text = escapeHtml(span.text || '')

  if (!text) {
    return ''
  }

  if (span.marks?.includes('strong')) {
    text = `<b>${text}</b>`
  }

  if (span.marks?.includes('em')) {
    text = `<i>${text}</i>`
  }

  return text
}

function blocksToDescription(blocks: PortableTextBlock[]) {
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => (block.children || []).map(formatPortableTextSpan).join(''))
    .filter(Boolean)
    .join('\n\n')
}

function normalizeApiEvent(event: ApiEvent): NormalizedEvent {
  const tagLineup = getRoomEntries(event.lineups, ['room-tag', 'tag', 'main'])
  const hiddenBarLineup = getRoomEntries(event.lineups, [
    'room-hidden-bar',
    'hidden',
    'bar',
  ])

  return {
    title: event.title || '',
    date: getEventDate(event),
    description: event.description || '',
    tagLineup,
    hiddenBarLineup,
    flyer: event.poster_url || undefined,
  }
}

function normalizeSanityEvent(
  event: SanityEvent,
  locale: string,
): NormalizedEvent {
  const tagLineup = getRoomEntries(event.lineups, ['room-tag', 'tag', 'main'])
  const hiddenBarLineup = getRoomEntries(event.lineups, [
    'room-hidden-bar',
    'hidden',
    'bar',
  ])

  return {
    title: event.title || '',
    date: getSanityEventDate(event),
    description: blocksToDescription(
      getLocalizedBlocks(event.description, locale),
    ),
    tagLineup,
    hiddenBarLineup,
    flyer: event.poster?.asset?.url || undefined,
  }
}

function getEventsCachePath(locale: string) {
  const safeLocale = locale === 'cn' ? 'cn' : 'en'

  return path.join(
    process.cwd(),
    '.next',
    'cache',
    'tagchengdu',
    `events-${safeLocale}.json`,
  )
}

function isNormalizedEvent(value: unknown): value is NormalizedEvent {
  if (!value || typeof value !== 'object') {
    return false
  }

  const event = value as Partial<NormalizedEvent>

  return (
    typeof event.title === 'string' &&
    typeof event.date === 'string' &&
    typeof event.description === 'string' &&
    Array.isArray(event.tagLineup) &&
    Array.isArray(event.hiddenBarLineup)
  )
}

function isActiveOrFutureEvent(event: NormalizedEvent) {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000
  const date = new Date(event.date)

  return !Number.isNaN(date.getTime()) && date.getTime() >= cutoff
}

function getActiveOrFutureEvents(events: NormalizedEvent[]) {
  return events.filter(isActiveOrFutureEvent)
}

async function readCachedEvents(locale: string) {
  if (!USE_EVENTS_DEV_CACHE) {
    return null
  }

  try {
    const cacheText = await readFile(getEventsCachePath(locale), 'utf8')
    const data = JSON.parse(cacheText) as { events?: unknown }

    if (!Array.isArray(data.events)) {
      return null
    }

    const events = getActiveOrFutureEvents(data.events.filter(isNormalizedEvent))

    return events.length ? events : null
  } catch {
    return null
  }
}

async function writeCachedEvents(locale: string, events: NormalizedEvent[]) {
  if (!USE_EVENTS_DEV_CACHE) {
    return
  }

  const cachePath = getEventsCachePath(locale)

  try {
    await mkdir(path.dirname(cachePath), { recursive: true })
    await writeFile(
      cachePath,
      JSON.stringify(
        {
          cachedAt: new Date().toISOString(),
          events,
        },
        null,
        2,
      ),
      'utf8',
    )
  } catch (error) {
    console.warn('Failed to write events dev cache', error)
  }
}

async function fetchApiEvents(locale: string) {
  const url = new URL('/events', EVENTS_API_BASE)
  url.searchParams.set('lang', locale === 'cn' ? 'cn' : 'en')

  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    EVENTS_FETCH_TIMEOUT_MS,
  )

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
      next: {
        revalidate: 60,
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Events API responded ${response.status}`)
    }

    const data = (await response.json()) as EventsApiResponse

    const events = (Array.isArray(data.events) ? data.events : [])
      .map(normalizeApiEvent)
      .filter((event) => event.title && event.date)

    await writeCachedEvents(locale, events)

    return events
  } catch (error) {
    const message =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    console.warn(`Failed to fetch events from T2 API (${message})`)
    return (await readCachedEvents(locale)) || []
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchSanityEvents(locale: string) {
  const { data } = (await sanityFetch({ query: eventsQuery })) as {
    data: SanityEvent[] | null
  }

  const events = (Array.isArray(data) ? data : [])
    .map((event) => normalizeSanityEvent(event, locale))
    .filter((event) => event.title && event.date)

  return getActiveOrFutureEvents(events)
}

async function fetchEvents(locale: string) {
  const apiEvents = await fetchApiEvents(locale)

  if (apiEvents.length) {
    return apiEvents
  }

  try {
    const sanityEvents = await fetchSanityEvents(locale)

    if (sanityEvents.length) {
      return sanityEvents
    }
  } catch (error) {
    const message =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    console.warn(`Failed to fetch events from Sanity (${message})`)
  }

  if (locale === 'cn') {
    const englishEvents = await readCachedEvents('en')

    if (englishEvents?.length) {
      return englishEvents
    }
  }

  return []
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const normalizedEvents = await fetchEvents(locale)
  const initialMonth = getFirstFutureEventMonth(normalizedEvents)

  return (
    <EventsClient
      events={normalizedEvents}
      initialMonth={initialMonth.month}
      initialYear={initialMonth.year}
    />
  )
}
