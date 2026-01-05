import {defineType} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {type: 'block'},
    {
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for accessibility and SEO.'
        }
      ]
    }
  ],
})
