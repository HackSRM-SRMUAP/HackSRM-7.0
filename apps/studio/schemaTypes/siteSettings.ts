import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'README.txt' }),
    defineField({ name: 'devfolioSlug', title: 'Devfolio Slug', type: 'string' }),
    defineField({ name: 'registerUrl', title: 'Registration URL', type: 'url' }),
  ],
  preview: { select: { title: 'title' } },
})
