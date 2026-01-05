import {defineField, defineType} from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date/Time', type: 'datetime', description: 'When this announcement is relevant or published' }),
    defineField({ name: 'time', title: 'Time Label', type: 'string', description: 'Optional short label, e.g., 09:45' }),
    defineField({ name: 'pinned', title: 'Pinned', type: 'boolean', initialValue: false }),
    defineField({ name: 'level', title: 'Level', type: 'string', options: { list: [
      {title: 'Info', value: 'info'},
      {title: 'Important', value: 'important'},
      {title: 'Alert', value: 'alert'},
    ] }, initialValue: 'info' }),
  ],
  preview: { select: { title: 'title', subtitle: 'date' } },
})
