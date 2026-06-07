import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'consentDocument',
  title: 'Consent Document',
  type: 'document',
  fields: [
    {name: 'code', type: 'string', title: 'Code'}, // e.g. "membership"
    {name: 'version', type: 'string', title: 'Version'},
    {name: 'title', type: 'localeString', title: 'Title'},
    {name: 'intro', type: 'localeBlockContent', title: 'Intro text'},
    {name: 'active', type: 'boolean', title: 'Active', initialValue: false},
    {name: 'publishedAt', type: 'datetime', title: 'Published at'},
  ],
  preview: {
    select: {
      title: 'title.en', // or 'title.en' if you want English
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled',
      }
    },
  },
})
