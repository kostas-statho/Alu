import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import ServiceGrid from '@/components/sections/ServiceGrid'
import ExoikonomwBanner from '@/components/sections/ExoikonomwBanner'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Phone, Mail } from 'lucide-react'
import { getAllServices, getSiteSettings } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Κουφώματα Αλουμινίου Αθήνα | Aluminium Company Ltd',
}

export default async function HomePage() {
  const [services, settings] = await Promise.all([getAllServices(), getSiteSettings()])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.companyName,
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.city,
      addressCountry: 'GR',
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        title="Κουφώματα Αλουμινίου Υψηλής Ποιότητας"
        subtitle="20+ χρόνια εμπειρίας στην κατασκευή και τοποθέτηση κουφωμάτων αλουμινίου. Πιστοποιημένος κατασκευαστής Exalco."
        primaryCta={{ label: 'Αίτηση Προσφοράς', href: '/quote' }}
        secondaryCta={{ label: 'Κλείστε Ραντεβού', href: '/appointment' }}
      />

      <TrustBar />

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 md:text-4xl">
              Οι Υπηρεσίες μας
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Ολοκληρωμένες λύσεις σε κουφώματα αλουμινίου και σιδηροκατασκευές
            </p>
          </div>
          <ServiceGrid services={services.slice(0, 6)} />
          <div className="mt-10 text-center">
            <Button href="/services" variant="outline" size="lg">
              Δείτε Όλες τις Υπηρεσίες
            </Button>
          </div>
        </Container>
      </section>

      <ExoikonomwBanner />

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 md:text-4xl">
              Η Εταιρεία μας
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Με πάνω από 20 χρόνια εμπειρίας στον χώρο του αλουμινίου, προσφέρουμε
              ολοκληρωμένες λύσεις κατασκευής και τοποθέτησης κουφωμάτων. Ως πιστοποιημένος
              κατασκευαστής Exalco, εγγυόμαστε κορυφαία ποιότητα υλικών και κατασκευής.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Μάθετε Περισσότερα
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-center md:gap-12">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-3 text-lg font-semibold text-primary-600 hover:underline"
            >
              <Phone className="h-6 w-6" />
              {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-3 text-lg font-semibold text-primary-600 hover:underline"
            >
              <Mail className="h-6 w-6" />
              {settings.email}
            </a>
            <Button href="/contact" size="lg">
              Επικοινωνήστε μαζί μας
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
