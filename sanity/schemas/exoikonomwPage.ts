import { defineField, defineType } from 'sanity'

export const exoikonomwPage = defineType({
  name: 'exoikonomwPage',
  title: 'Εξοικονομώ (Σελίδα)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Εισαγωγικό Κείμενο',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subsidyTiers',
      title: 'Ποσοστά Επιδότησης',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'category', title: 'Κατηγορία', type: 'string' }),
            defineField({ name: 'percentage', title: 'Ποσοστό', type: 'string' }),
            defineField({ name: 'maxBudget', title: 'Μέγ. Προϋπολογισμός', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'eligibleWorks',
      title: 'Επιλέξιμες Εργασίες',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Τίτλος', type: 'string' }),
            defineField({ name: 'description', title: 'Περιγραφή', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'processSteps',
      title: 'Βήματα Διαδικασίας',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'stepNumber', title: 'Αριθμός', type: 'number' }),
            defineField({ name: 'title', title: 'Τίτλος', type: 'string' }),
            defineField({ name: 'description', title: 'Περιγραφή', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'whyUsPoints',
      title: 'Γιατί Εμάς',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'programmeStatus',
      title: 'Κατάσταση Προγράμματος',
      type: 'string',
      options: {
        list: [
          { title: 'Ανοιχτό', value: 'open' },
          { title: 'Κλειστό', value: 'closed' },
          { title: 'Αναμένεται', value: 'upcoming' },
        ],
      },
    }),
    defineField({
      name: 'nextDeadline',
      title: 'Επόμενη Προθεσμία',
      type: 'date',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Εξοικονομώ — Σελίδα' }
    },
  },
})
