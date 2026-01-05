import {defineField, defineType} from 'sanity'

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tier', title: 'Tier', type: 'string', options: { list: [
      {title: 'Platinum', value: 'Platinum'},
      {title: 'Gold', value: 'Gold'},
      {title: 'Silver', value: 'Silver'},
      {title: 'Community', value: 'Community'},
    ] }, validation: r => r.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}, fields: [
      { name: 'alt', title: 'Alt text', type: 'string' }
    ] }),
    defineField({ name: 'url', title: 'Website URL', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logo', subtitle: 'tier' } },
})
