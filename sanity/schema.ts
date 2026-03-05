import { type SchemaTypeDefinition } from 'sanity'
import { service } from './schemas/service'
import { faqItem } from './schemas/faqItem'
import { exoikonomwPage } from './schemas/exoikonomwPage'
import { siteSettings } from './schemas/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, faqItem, exoikonomwPage, siteSettings],
}
