const EVENT_TIME_ZONE = 'Asia/Shanghai'

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TIME_ZONE,
  year: 'numeric',
  month: 'numeric',
})

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TIME_ZONE,
  weekday: 'short',
})

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TIME_ZONE,
  day: 'numeric',
})

export function getValidEventDate(value: string | Date | null | undefined) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

export function getEventMonthYear(value: string | Date | null | undefined) {
  const date = getValidEventDate(value)

  if (!date) {
    return null
  }

  const parts = monthFormatter.formatToParts(date)
  const year = Number(parts.find((part) => part.type === 'year')?.value)
  const month = Number(parts.find((part) => part.type === 'month')?.value)

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return null
  }

  return {
    year,
    month: month - 1,
  }
}

export function getEventMonthKey(value: string | Date | null | undefined) {
  const monthYear = getEventMonthYear(value)

  if (!monthYear) {
    return null
  }

  return `${monthYear.year}-${monthYear.month}`
}

export function getFirstFutureEventMonth<T extends { date: string }>(
  events: T[],
  now = new Date(),
) {
  const currentMonth = getEventMonthYear(now) || {
    year: now.getFullYear(),
    month: now.getMonth(),
  }

  const firstFutureEvent = events
    .map((event) => ({
      date: getValidEventDate(event.date),
      monthYear: getEventMonthYear(event.date),
    }))
    .filter(
      (
        item,
      ): item is {
        date: Date
        monthYear: { month: number; year: number }
      } => Boolean(item.date && item.monthYear),
    )
    .filter((item) => item.date.getTime() >= now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

  if (firstFutureEvent?.monthYear) {
    return firstFutureEvent.monthYear
  }

  const latestEvent = events
    .map((event) => ({
      date: getValidEventDate(event.date),
      monthYear: getEventMonthYear(event.date),
    }))
    .filter(
      (
        item,
      ): item is {
        date: Date
        monthYear: { month: number; year: number }
      } => Boolean(item.date && item.monthYear),
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0]

  return latestEvent?.monthYear || currentMonth
}

export function formatEventDate(value: string) {
  const date = getValidEventDate(value)

  if (!date) {
    return ''
  }

  return `${weekdayFormatter.format(date).toUpperCase()} ${dayFormatter.format(date)}`
}
