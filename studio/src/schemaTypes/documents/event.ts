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
    defineField({
      name: 'date',
      title: '日期 Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagLineup',
      title: '.TAG 内容 Lineup',
      type: 'array',
      of: [{type: 'lineup'}],
    }),
    defineField({
      name: 'hiddenBarLineup',
      title: 'Hidden Bar 内容 Lineup',
      type: 'array',
      of: [{type: 'lineup'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})
