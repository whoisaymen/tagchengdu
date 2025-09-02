export default {
  name: 'localeBlockContent',
  type: 'object',
  fields: [
    {name: 'en', type: 'array', title: 'English', of: [{type: 'block'}]},
    {name: 'cn', type: 'array', title: '中文', of: [{type: 'block'}]},
  ],
}
