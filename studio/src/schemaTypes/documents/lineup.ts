import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lineup',
  title: 'Lineup',
  type: 'object',
  fields: [
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the artist (if not in the artist document)',
    }),
  ],
})
