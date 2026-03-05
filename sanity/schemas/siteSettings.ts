import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ρυθμίσεις Ιστοσελίδας',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Επωνυμία',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Τηλέφωνο',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp',
      type: 'string',
      description: 'With country code, e.g., 306984106315',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'viberNumber',
      title: 'Viber',
      type: 'string',
      description: 'With country code, e.g., +306984106315',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Διεύθυνση',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Πόλη',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'businessHours',
      title: 'Ωράριο',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Ρυθμίσεις Ιστοσελίδας' }
    },
  },
})
