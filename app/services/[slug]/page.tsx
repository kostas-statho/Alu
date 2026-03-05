import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import QuoteForm from '@/components/forms/QuoteForm'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getServiceBySlug, getServiceSlugs, getAllServices } from '@/sanity/lib/queries'
import type { Service } from '@/lib/types'
import Link from 'next/link'

interface ServicePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)
  if (!service) return { title: 'Υπηρεσία' }

  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const [service, allServices] = await Promise.all([
    getServiceBySlug(params.slug),
    getAllServices(),
  ])

  if (!service) notFound()

  const relatedServices = allServices.filter((s: Service) => s.slug.current !== params.slug).slice(0, 3)

  const faqItems = (service.faq || []).map(
    (item: { question: string; answer: string }, i: number) => ({
      _id: `faq-${i}`,
      question: item.question,
      answer: item.answer,
      category: 'general' as const,
    })
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Aluminium Company Ltd',
    },
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
            <h1 className="font-heading text-4xl font-bold md:text-5xl">{service.title}</h1>
            {service.shortDescription && (
              <p className="mt-4 text-lg text-white/80">{service.shortDescription}</p>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {service.description && service.description.length > 0 && (
              <div className="prose prose-lg prose-slate max-w-none">
                <PortableText value={service.description} />
              </div>
            )}
          </div>
        </Container>
      </section>

      {service.specs && service.specs.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-slate-900">
                Τεχνικά Χαρακτηριστικά
              </h2>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <table className="w-full">
                  <tbody>
                    {service.specs.map(
                      (spec: { label: string; value: string }, i: number) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-6 py-4 font-medium text-slate-900">{spec.label}</td>
                          <td className="px-6 py-4 text-slate-600">{spec.value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>
      )}

      {faqItems.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-slate-900">
                Συχνές Ερωτήσεις
              </h2>
              <div className="rounded-xl border border-slate-200 bg-white px-6">
                <FaqAccordion items={faqItems} />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-slate-900">
              Ζητήστε Προσφορά
            </h2>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <QuoteForm />
            </div>
          </div>
        </Container>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="mb-8 font-heading text-2xl font-bold text-slate-900">
              Άλλες Υπηρεσίες
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((s: Service) => (
                <Link
                  key={s._id}
                  href={`/services/${s.slug.current}`}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-primary-600">
                    {s.title}
                  </h3>
                  {s.shortDescription && (
                    <p className="mt-2 text-sm text-slate-600">{s.shortDescription}</p>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button href="/services" variant="outline">
                Όλες οι Υπηρεσίες
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
