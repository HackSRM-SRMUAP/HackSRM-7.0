import {defineField, defineType} from 'sanity'

export const organizer = defineType({
  name: 'organizer',
  title: 'Organizer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt text', type: 'string'},
      ],
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})
