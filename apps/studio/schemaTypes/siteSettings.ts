import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'registerUrl', title: 'Registration URL', type: 'url' }),
  ],
  preview: { select: { title: 'registerUrl' } },
})
