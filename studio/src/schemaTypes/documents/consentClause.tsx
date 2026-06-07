import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'consentClause',
  title: 'Consent Clause',
  type: 'document',
  fields: [
    {
      name: 'document',
      type: 'reference',
      to: [{type: 'consentDocument'}],
      title: 'Document',
    },
    {name: 'key', type: 'string', title: 'Key'},
    {
      name: 'section',
      type: 'string',
      title: 'Section',
      options: {
        list: [
          {title: 'Core Principles', value: 'core'},
          {title: 'Guidelines', value: 'guidelines'},
        ],
        layout: 'radio',
      },
      initialValue: 'core',
    },
    {name: 'order', type: 'number', title: 'Order'},
    {name: 'title', type: 'localeString', title: 'Title'},
    {name: 'body', type: 'localeBlockContent', title: 'Body'},
    {name: 'required', type: 'boolean', title: 'Required', initialValue: true},
  ],
  preview: {
    select: {
      title: 'title.en',
      order: 'order',
      documentTitle: 'document.title.en',
    },
    prepare({title, order, documentTitle}) {
      return {
        title: title || 'Untitled',
        subtitle: documentTitle || '',
        media: (
          <div
            style={{
              background: '#000', // Tailwind blue-600
              color: 'white',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {order}
          </div>
        ),
      }
    },
  },
})
