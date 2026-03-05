import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Ερώτηση',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Απάντηση',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Κατηγορία',
      type: 'string',
      options: {
        list: [
          { title: 'Γενικά', value: 'general' },
          { title: 'Προϊόντα & Υλικά', value: 'products' },
          { title: 'Εγκατάσταση', value: 'installation' },
          { title: 'Εξοικονομώ', value: 'exoikonomw' },
          { title: 'Τιμολόγηση', value: 'pricing' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Σειρά',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
