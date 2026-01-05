import {defineField, defineType} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Head', value: 'head'},
          {title: 'Co-Head', value: 'cohead'},
          {title: 'Technical Lead', value: 'technical-lead'},
          {title: 'Website Lead', value: 'website-lead'},
          {title: 'PR Team', value: 'pr'},
          {title: 'Sponsors Team', value: 'sponsors'},
          {title: 'Social Media Team (SMT)', value: 'smt'},
          {title: 'Organizer', value: 'organizer'},
          {title: 'Volunteer', value: 'volunteer'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt text', type: 'string'},
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'github', title: 'GitHub', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'twitter', title: 'Twitter/X', type: 'url'},
        {name: 'website', title: 'Website', type: 'url'},
      ],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image'},
  },
})
