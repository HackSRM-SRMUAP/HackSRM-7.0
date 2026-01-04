import { defineField, defineType } from 'sanity'

export const schedule = defineType({
  name: 'schedule',
  title: 'Schedule (Quest Log)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Major Event (Start/End)', value: 'major' },
          { title: 'Workshop/Talk', value: 'workshop' },
          { title: 'Fun Activity', value: 'fun' },
          { title: 'Food/Break', value: 'break' },
        ],
        layout: 'radio', // Looks cleaner in the studio
      },
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location (Map)',
      type: 'string',
      initialValue: 'Main Auditorum',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', 
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startTime',
    },
  },
})