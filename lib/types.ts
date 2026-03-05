import type { PortableTextBlock } from '@portabletext/react'

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  description: PortableTextBlock[]
  icon: string
  heroImage?: SanityImage
  specs?: Spec[]
  gallery?: SanityImage[]
  faq?: ServiceFaq[]
  order?: number
  seoTitle?: string
  seoDescription?: string
}

export interface Spec {
  label: string
  value: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface FaqItem {
  _id: string
  question: string
  answer: string
  category: 'general' | 'products' | 'installation' | 'exoikonomw' | 'pricing'
  order?: number
}

export interface SiteSettings {
  companyName: string
  phone: string
  email: string
  whatsappNumber: string
  viberNumber: string
  address: string
  city: string
  businessHours?: string
  googleMapsUrl?: string
}

export interface SubsidyTier {
  category: string
  percentage: string
  maxBudget: string
}

export interface ProcessStep {
  stepNumber: number
  title: string
  description: string
}

export interface ExoikonomwPage {
  heroTitle: string
  heroSubtitle?: string
  introText: PortableTextBlock[]
  subsidyTiers: SubsidyTier[]
  eligibleWorks: { title: string; description: string }[]
  processSteps: ProcessStep[]
  whyUsPoints: string[]
  programmeStatus?: string
  nextDeadline?: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}
