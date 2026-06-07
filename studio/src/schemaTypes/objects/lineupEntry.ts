import {defineType, defineField} from 'sanity'

export const lineupEntry = defineType({
  name: 'lineupEntry',
  title: 'Lineup Entry',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'resident',
      options: {
        list: [
          {title: 'Resident', value: 'resident'},
          {title: 'Non-resident', value: 'nonresident'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Resident: must pick artist
    defineField({
      name: 'artist',
      title: 'Artist Page',
      type: 'reference',
      to: [{type: 'artist'}],
      hidden: ({parent}) => parent?.type !== 'resident',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if ((ctx.parent as any)?.type === 'resident' && !val) return 'Pick an artist'
          return true
        }),
    }),

    // Non-resident: type name (simple)
    defineField({
      name: 'name',
      title: 'DJ Name',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'nonresident',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if ((ctx.parent as any)?.type === 'nonresident' && !val) return 'Enter a DJ name'
          return true
        }),
    }),

    defineField({
      name: 'country',
      title: 'Country (optional)',
      type: 'string',
      description: 'e.g. DE',
      hidden: ({parent}) => parent?.type !== 'nonresident',
      validation: (Rule) => Rule.max(16),
    }),

    // === SET TIMING (authoritative for schedule UI) ===
    defineField({
      name: 'setStartsAt',
      title: '开始时间 Set Starts',
      type: 'datetime',
      description: 'When this DJ/artist set begins',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const parent = ctx.parent as any
          // Optional: only require for main acts, not warm-up DJs
          // if (!val) return 'Set start time is required'
          return true
        }),
    }),
    defineField({
      name: 'setEndsAt',
      title: '结束时间 Set Ends',
      type: 'datetime',
      description: 'When this set ends (can be next day)',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const parent = ctx.parent as any
          const startsAt = parent?.setStartsAt

          if (val && startsAt && new Date(val) <= new Date(startsAt)) {
            return 'End time must be after start time'
          }
          return true
        }),
    }),

    defineField({
      name: 'note',
      title: 'Note (optional)',
      type: 'string',
      description: 'e.g. Berlin / Live / Special set / Secret Guest',
    }),

    defineField({
      name: 'orderIndex',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      description: 'Display order in lineup (0 = first)',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      artistName: 'artist.name',
      name: 'name',
      note: 'note',
      orderIndex: 'orderIndex',
      media: 'artist.profileImage',
      country: 'country',
      setStartsAt: 'setStartsAt',
      setEndsAt: 'setEndsAt',
    },
    prepare({type, artistName, name, note, orderIndex, media, country, setStartsAt, setEndsAt}) {
      const title = type === 'resident' ? artistName : name
      const typeLabel = type === 'resident' ? 'Resident' : 'Non-resident'

      // Format time for preview
      let timeStr = ''
      if (setStartsAt) {
        const start = new Date(setStartsAt)
        const startTime = start.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })

        if (setEndsAt) {
          const end = new Date(setEndsAt)
          const endTime = end.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          timeStr = `${startTime}-${endTime}`
        } else {
          timeStr = startTime
        }
      }

      const parts = [typeLabel, country, timeStr, note, `#${orderIndex ?? 0}`].filter(Boolean)

      return {
        title: title || '—',
        subtitle: parts.join(' · '),
        media: type === 'resident' ? media : undefined,
      }
    },
  },
})
