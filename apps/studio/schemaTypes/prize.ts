import {defineField, defineType} from 'sanity'

export const prize = defineType({
  name: 'prize',
  title: 'Prize',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'amount', title: 'Amount (display)', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'sponsor',
      title: 'Sponsor',
      type: 'reference',
      to: [{ type: 'sponsor' }],
      description: 'Pick from existing sponsors (add in Sponsors if missing)'
    }),
    defineField({ name: 'by', title: 'By (custom label)', type: 'string', description: 'Optional override when not a listed sponsor' }),
    defineField({ name: 'tier', title: 'Tier', type: 'string', options: { list: [
      {title: 'Platinum', value: 'Platinum'},
      {title: 'Gold', value: 'Gold'},
      {title: 'Silver', value: 'Silver'},
      {title: 'Community', value: 'Community'},
      {title: 'Bronze', value: 'Bronze'},
      {title: 'Supporter', value: 'Supporter'},
    ] } }),
    defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'name', subtitle: 'amount' } },
})
