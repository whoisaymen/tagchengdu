// src/schemaTypes/documents/room.ts
import {defineType, defineField} from 'sanity'

export const room = defineType({
  name: 'room',
  title: 'Room 空间',
  type: 'document',
  fields: [
    defineField({
      name: 'nameEn',
      title: 'Name (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameCn',
      title: 'Name (CN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderIndex',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {en: 'nameEn', cn: 'nameCn'},
    prepare({en, cn}) {
      return {title: `${en} / ${cn}`}
    },
  },
})
