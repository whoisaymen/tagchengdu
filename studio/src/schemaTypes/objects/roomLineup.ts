import {defineType, defineField} from 'sanity'

export const roomLineup = defineType({
  name: 'roomLineup',
  title: 'Room Lineup',
  type: 'object',
  fields: [
    defineField({
      name: 'room',
      title: 'Room',
      type: 'reference',
      to: [{type: 'room'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entries',
      title: 'Lineup',
      type: 'array',
      of: [{type: 'lineupEntry'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      roomEn: 'room.nameEn',
      roomCn: 'room.nameCn',
      entries: 'entries',
    },
    prepare({roomEn, roomCn, entries}) {
      const count = Array.isArray(entries) ? entries.length : 0
      const title = `${roomEn || 'Room'} / ${roomCn || ''}`.trim()
      return {
        title,
        subtitle: `${count} DJ${count === 1 ? '' : 's'}`,
      }
    },
  },
})
