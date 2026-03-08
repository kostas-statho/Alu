import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ContactInfo from '@/components/sections/ContactInfo'
import QuoteForm from '@/components/forms/QuoteForm'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { getSiteSettings } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Επικοινωνία',
  description:
    'Επικοινωνήστε μαζί μας για προσφορά, ραντεβού ή οποιαδήποτε ερώτηση. Τηλέφωνο, email, WhatsApp, Viber.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

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
            <h1 className="font-heading text-4xl font-bold md:text-5xl">Επικοινωνία</h1>
            <p className="mt-4 text-lg text-white/80">
              Είμαστε εδώ για κάθε ερώτηση. Ζητήστε προσφορά ή κλείστε ραντεβού.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold text-slate-900">
                Στοιχεία Επικοινωνίας
              </h2>
              <ContactInfo
                phone={settings.phone}
                email={settings.email}
                address={`${settings.address}, ${settings.city}`}
                whatsappNumber={settings.whatsappNumber}
                viberNumber={settings.viberNumber}
                businessHours={settings.businessHours}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <QuoteForm />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <AppointmentForm />
            </div>
          </div>
        </Container>
      </section>

      {settings.googleMapsUrl && (
        <section className="pb-16 md:pb-24">
          <Container>
            <h2 className="mb-6 font-heading text-2xl font-bold text-slate-900">Τοποθεσία</h2>
            <div className="aspect-video overflow-hidden rounded-xl border border-slate-200">
              <iframe
                src={settings.googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Χάρτης τοποθεσίας"
              />
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
