'use client'

import { motion, AnimatePresence } from 'framer-motion'

type Event = {
  title: string
  date: string
  description: string
  tagLineup: { name: string }[]
  hiddenBarLineup: { name: string }[]
  flyer?: string
}

function formatEventDate(dateString: string) {
  const date = new Date(dateString)
  const weekday = date
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toUpperCase()
  const day = date.getDate()
  return `${weekday} ${day}`
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
      transition={{ layout: { duration: 0.35, type: 'spring', bounce: 0.18 } }}
      className='bg-[#E9EDB9] text-[#05161F] px-1 py-0 font-[family-name:var(--font-geist-sans)] flex flex-col w-full cursor-pointer rounded-none shadow-lg'
      onClick={onClick}
    >
      <motion.div layout className='flex justify-between items-center w-full'>
        <span className='text-5xl w-full italic font-[family-name:var(--font-kleber)] '>
          {formatEventDate(event.date)}
        </span>
        <h2 className='tracking-tighter text-sm uppercase  w-full text-right pr-2'>
          {event.title}
        </h2>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            key='content'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className='overflow-hidden px-2 pt-4 py-16'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex lg:flex-row gap-6'>
              {/* .TAG */}
              <div className='w-full'>
                <h3 className='font-[family-name:var(--font-kleber)] text-lg font-bold mb-2'>
                  .TAG
                </h3>
                {event.tagLineup && event.tagLineup.length > 0 ? (
                  <ul className='tracking-tighter'>
                    {event.tagLineup.map((artist, i) => (
                      <li key={i} className='text-sm lg:text-xl leading-[1.15]'>
                        {artist.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-sm text-[#b25403]'>No lineup announced</p>
                )}
              </div>

              {/* Hidden Bar */}
              <div className='w-full'>
                <h3 className='text-lg font-bold mb-2 font-[family-name:var(--font-kleber)] uppercase'>
                  Hidden Bar
                </h3>
                {event.hiddenBarLineup && event.hiddenBarLineup.length > 0 ? (
                  <ul className='tracking-tighter'>
                    {event.hiddenBarLineup.map((artist, i) => (
                      <li key={i} className='text-sm lg:text-xl leading-[1.15]'>
                        {artist.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-sm text-[#b25403]'>No lineup announced</p>
                )}
              </div>
              {open && event.flyer && (
                <div className='mb-4 w-full'>
                  <img
                    src={event.flyer}
                    alt={`${event.title} flyer`}
                    className='w-full'
                  />
                </div>
              )}
            </div>
            {/* Description below the columns */}
            <div className='mt-4'>
              <p className='text-sm tracking-tighter'>{event.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
