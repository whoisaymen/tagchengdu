import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题 Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Explicit event timing (authoritative)
    defineField({
      name: 'doorsAt',
      title: '开门时间 Doors Open',
      type: 'datetime',
      description: 'When attendees can enter the venue',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startsAt',
      title: '开始时间 Event Starts',
      type: 'datetime',
      description: 'When the event/music officially starts',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endsAt',
      title: '结束时间 Event Ends',
      type: 'datetime',
      description: 'When the event officially ends (can be next day)',
      validation: (Rule) => Rule.required(),
    }),

    // Keep legacy date field for backwards compatibility, but deprecate it
    defineField({
      name: 'date',
      title: '日期 Date (DEPRECATED - use doorsAt/startsAt instead)',
      type: 'datetime',
      hidden: true,
    }),

    defineField({
      name: 'poster',
      title: '海报 Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'lineups',
      title: 'Lineups 阵容',
      type: 'array',
      of: [{type: 'roomLineup'}],
      description: 'Add downstairs, upstairs, etc. only when active for this event.',
    }),

    defineField({
      name: 'ticketTiers',
      title: '票档 Ticket Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nameCn',
              title: '名称（中文）',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'nameEn',
              title: 'Name (English)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price (¥)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'totalQuantity',
              title: 'Total Tickets',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'saleStartsAt',
              title: 'Sale Starts',
              type: 'datetime',
            },
            {
              name: 'saleEndsAt',
              title: 'Sale Ends',
              type: 'datetime',
            },
            {
              name: 'orderIndex',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              nameCn: 'nameCn',
              nameEn: 'nameEn',
              price: 'price',
              qty: 'totalQuantity',
            },
            prepare({nameCn, nameEn, price, qty}) {
              return {
                title: `${nameEn} / ${nameCn}`,
                subtitle: `¥${price} · ${qty} tickets`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      doorsAt: 'doorsAt',
      startsAt: 'startsAt',
    },
    prepare({title, doorsAt, startsAt}) {
      const displayDate = doorsAt || startsAt
      const subtitle = displayDate
        ? new Date(displayDate).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'No date set'

      return {
        title,
        subtitle,
      }
    },
  },
})
