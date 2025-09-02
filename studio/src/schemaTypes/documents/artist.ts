import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist',
  icon: UserIcon,
  type: 'document',
  // Enable i18n for this document
  // options: {i18n: true},
  fields: [
    defineField({
      name: 'name',
      title: '艺名 Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '网址别名 Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: '头像 Profile Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'localeString', // <-- localized alt text
          title: '图片描述 Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: '简介 Bio',
      type: 'localeBlockContent', // <-- localized rich text
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'instagram',
    //   title: 'Instagram',
    //   type: 'url',
    //   validation: (rule) => rule.uri({scheme: ['https']}),
    // }),
    // defineField({
    //   name: 'soundcloud',
    //   title: 'SoundCloud',
    //   type: 'url',
    //   validation: (rule) => rule.uri({scheme: ['https']}),
    // }),
    // defineField({
    //   name: 'musicLink',
    //   title: 'Music Link',
    //   type: 'url',
    //   description: 'Link to music (e.g. Bandcamp, Spotify, etc.)',
    //   validation: (rule) => rule.uri({scheme: ['https']}),
    // }),

    defineField({
      name: 'gigs',
      title: '演出 Gigs',
      type: 'array',
      of: [
        // Reference to an event
        {type: 'reference', to: [{type: 'event'}]},
        // Or a custom gig object
        defineField({
          name: 'customGig',
          type: 'object',
          title: '自定义演出 Custom Gig',
          fields: [
            {
              name: 'title',
              title: '演出名称 Title',
              type: 'string',
            },
            {
              name: 'date',
              title: '日期 Date',
              type: 'date',
            },
            {
              name: 'location',
              title: '地点 Location',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              location: 'location',
            },
            prepare({title, date, location}) {
              return {
                title: title || '未命名演出',
                subtitle: [date, location].filter(Boolean).join(' | '),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: '联系 Contact',
      type: 'string',
      description: 'Contact info or booking email',
    }),
    defineField({
      name: 'socialLinks',
      title: '链接 Links',
      type: 'array',
      of: [
        defineField({
          name: 'socialLink',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'SoundCloud', value: 'soundcloud'},
                  {title: 'Resident Advisor', value: 'residentadvisor'},
                  {title: 'Mixcloud', value: 'mixcloud'},
                  {title: 'Apple Music', value: 'applemusic'},
                  {title: 'Bandcamp', value: 'bandcamp'},
                  {title: 'Other', value: 'other'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['https']}),
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({platform, url}) {
              // Map value to title for display
              const platformTitles = {
                instagram: 'Instagram',
                soundcloud: 'SoundCloud',
                residentadvisor: 'Resident Advisor',
                mixcloud: 'Mixcloud',
                applemusic: 'Apple Music',
                bandcamp: 'Bandcamp',
                other: 'Other',
              }
              return {
                title: platformTitles[platform] || platform,
                subtitle: url,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'mediaFile',
      title: '最新录音 Recent Recording',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
    },
  },
})
