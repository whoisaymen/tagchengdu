'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import RichTextStrong from '@/app/components/rich-text/RichTextStrong'
import { formatEventDate } from './eventsDate'

{
  /* Flyer URLs come from the CMS and are rendered as-is here. */
}
{
  /* eslint-disable-next-line @next/next/no-img-element */
}
type Event = {
  title: string
  date: string
  description: string
  tagLineup: { name: string }[]
  hiddenBarLineup: { name: string }[]
  flyer?: string
}

const accordionTransition = {
  layout: {
    duration: 0.52,
    bounce: 0.16,
    type: 'spring',
    damping: 30,
    stiffness: 360,
  },
} as const

const contentTransition = {
  height: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  },
  opacity: {
    duration: 0.24,
    ease: 'easeOut',
  },
} as const

const innerTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
} as const

const titleFontFamily =
  'var(--font-geist-sans), var(--font-songti), sans-serif'

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => {
      const parsed = Number(code)
      return Number.isFinite(parsed) ? String.fromCharCode(parsed) : _
    })
}

function normalizeDescription(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/^\uFEFF/, '')
    .replace(/^[\u200B-\u200D\u2060]+/, '')
    .replace(/^\s+/, '')
    .replace(/<\s*strong\s*>/gi, '<b>')
    .replace(/<\s*\/\s*strong\s*>/gi, '</b>')
    .replace(/<\s*em\s*>/gi, '<i>')
    .replace(/<\s*\/\s*em\s*>/gi, '</i>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\s*\/\s*p\s*>/gi, '\n\n')
    .replace(/<\s*p(?:\s+[^>]*)?>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function renderFormattedText(text: string, keyPrefix: string) {
  const parts = text.split(/(<\/?b>|<\/?i>|\n)/gi)
  const nodes: ReactNode[] = []
  let isBold = false
  let isItalic = false
  let index = 0

  for (const part of parts) {
    if (!part) continue

    if (/^<b>$/i.test(part)) {
      isBold = true
      continue
    }

    if (/^<\/b>$/i.test(part)) {
      isBold = false
      continue
    }

    if (/^<i>$/i.test(part)) {
      isItalic = true
      continue
    }

    if (/^<\/i>$/i.test(part)) {
      isItalic = false
      continue
    }

    if (part === '\n') {
      nodes.push(<br key={`${keyPrefix}-br-${index}`} />)
      index += 1
      continue
    }

    const textNode = decodeHtmlEntities(part.replace(/<[^>]+>/g, ''))

    if (!textNode) continue

    let node: ReactNode = textNode

    if (isItalic) {
      node = (
        <em className='event-description-em italic opacity-80'>{node}</em>
      )
    }

    if (isBold) {
      node = <RichTextStrong>{node}</RichTextStrong>
    }

    nodes.push(<span key={`${keyPrefix}-text-${index}`}>{node}</span>)
    index += 1
  }

  return nodes
}

function EventDescription({ value }: { value: string }) {
  const normalized = normalizeDescription(value)

  if (!normalized) {
    return null
  }

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div
      className='space-y-3 text-sm leading-[1.18] tracking-tighter lg:text-base'
      style={{ fontFamily: titleFontFamily }}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 16)}`}>
          {renderFormattedText(paragraph, `p-${index}`)}
        </p>
      ))}
    </div>
  )
}

function RoomTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className='mb-2 inline-flex rounded-full bg-[var(--site-ink)] px-2.5 py-0.5 font-[family-name:var(--font-kleber)] text-[1.05rem] font-normal uppercase leading-[1.05] tracking-normal text-[var(--site-paper)] shadow-[0_0_10px_rgba(5,22,31,0.22)] lg:text-[1.35rem]'>
      {children}
    </h3>
  )
}

export default function EventBox({
  event,
  open,
  onClick,
}: {
  event: Event
  open: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      transition={accordionTransition}
      className='bg-[#b8c1c4] text-[var(--site-ink)] px-1 py-0 font-[family-name:var(--font-geist-sans)] flex flex-col w-full cursor-pointer overflow-hidden rounded-none shadow-lg'
      onClick={onClick}
    >
      <motion.div
        layout='position'
        className='flex w-full items-center justify-between'
      >
        <span className='w-full font-[family-name:var(--font-kleber)] text-5xl italic leading-none'>
          {formatEventDate(event.date)}
        </span>
        <div className='w-full pr-2 text-right leading-[1.05]'>
          <h2
            className='text-lg font-normal uppercase leading-[0.95] tracking-tighter lg:text-2xl'
            style={{ fontFamily: titleFontFamily }}
          >
            {event.title}
          </h2>
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='content'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={contentTransition}
            className='overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ y: -10, scaleY: 0.985, filter: 'blur(6px)' }}
              animate={{ y: 0, scaleY: 1, filter: 'blur(0px)' }}
              exit={{ y: -8, scaleY: 0.985, filter: 'blur(5px)' }}
              transition={innerTransition}
              className='origin-top px-2 pb-16 pt-4'
            >
              <div className='grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(10rem,0.5fr)_minmax(13rem,0.65fr)] lg:items-start lg:gap-8'>
                <motion.div layout='position' className='order-3 min-w-0 lg:order-1'>
                  <EventDescription value={event.description} />
                </motion.div>

                <motion.div
                  layout='position'
                  className='order-2 grid min-w-0 grid-cols-2 items-start gap-x-4 gap-y-7 lg:order-2 lg:flex lg:flex-col lg:gap-7'
                >
                  <div>
                    <RoomTitle>.TAG</RoomTitle>
                    {event.tagLineup && event.tagLineup.length > 0 ? (
                      <ul className='tracking-tighter'>
                        {event.tagLineup.map((artist, i) => (
                          <li
                            key={i}
                            className='text-sm leading-[1.18] lg:text-base'
                          >
                            {artist.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-sm text-[var(--site-accent-strong)]'>
                        No lineup announced
                      </p>
                    )}
                  </div>

                  <div>
                    <RoomTitle>Hidden Bar</RoomTitle>
                    {event.hiddenBarLineup &&
                    event.hiddenBarLineup.length > 0 ? (
                      <ul className='tracking-tighter'>
                        {event.hiddenBarLineup.map((artist, i) => (
                          <li
                            key={i}
                            className='text-sm leading-[1.18] lg:text-base'
                          >
                            {artist.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-sm text-[var(--site-accent-strong)]'>
                        No lineup announced
                      </p>
                    )}
                  </div>
                </motion.div>

                {event.flyer && (
                  <motion.div
                    layout='position'
                    className='order-1 min-w-0 lg:order-3 lg:justify-self-end'
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.flyer}
                      alt={`${event.title} flyer`}
                      className='w-full object-contain object-top lg:max-h-[52vh]'
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
