import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getAllFaqItems } from '@/sanity/lib/queries'
import type { FaqItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Συχνές Ερωτήσεις',
  description:
    'Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις για κουφώματα αλουμινίου, εγκατάσταση, Εξοικονομώ και τιμολόγηση.',
}

export default async function FaqPage() {
  const faqItems: FaqItem[] = await getAllFaqItems()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-primary-800 to-primary-600 py-16 text-white md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">Συχνές Ερωτήσεις</h1>
            <p className="mt-4 text-lg text-white/80">
              Βρείτε απαντήσεις στα πιο συχνά ερωτήματα σχετικά με τις υπηρεσίες μας
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqItems} groupByCategory />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Δεν βρήκατε αυτό που ψάχνετε;
            </h2>
            <p className="mt-3 text-slate-600">
              Επικοινωνήστε μαζί μας και θα σας απαντήσουμε άμεσα.
            </p>
            <div className="mt-6">
              <Button href="/contact" size="lg">
                Επικοινωνία
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
