import {defineField, defineType} from 'sanity'

export const rulesPage = defineType({
  name: 'rulesPage',
  title: 'Rules Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'README.txt' }),
    defineField({ name: 'core', title: 'Core Rules', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'conduct', title: 'Conduct', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'submissions', title: 'Submissions', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'eligibility', title: 'Eligibility', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'note', title: 'Note', type: 'text' }),
  ],
  preview: { select: { title: 'title' } },
})
