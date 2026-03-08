import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ServiceGrid from '@/components/sections/ServiceGrid'
import Button from '@/components/ui/Button'
import { Award } from 'lucide-react'
import { getAllServices } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Υπηρεσίες',
  description:
    'Ανακαλύψτε τις υπηρεσίες μας σε κουφώματα αλουμινίου, πόρτες ασφαλείας, κιγκλιδώματα, στέγαστρα και σιδηροκατασκευές. Αποκλειστικά συστήματα Exalco.',
}

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-600 py-16 text-white md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">Υπηρεσίες</h1>
            <p className="mt-4 text-lg text-white/80">
              Ολοκληρωμένες λύσεις σε κουφώματα αλουμινίου, πόρτες ασφαλείας, κιγκλιδώματα,
              στέγαστρα και σιδηροκατασκευές παντός τύπου.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <ServiceGrid services={services} columns={3} />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-5 sm:gap-8 md:flex-row">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 sm:h-20 sm:w-20">
              <Award className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
                Αποκλειστικά Συστήματα Exalco
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Ως πιστοποιημένος κατασκευαστής Exalco, χρησιμοποιούμε αποκλειστικά συστήματα
                κορυφαίας Ελληνικής βιομηχανίας αλουμινίου. Πιστοποιήσεις ISO 9001 και ISO 14001
                εγγυώνται την ποιότητα κάθε κατασκευής.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Ενδιαφέρεστε για κάποια υπηρεσία;
            </h2>
            <p className="mt-3 text-slate-600">
              Ζητήστε δωρεάν προσφορά ή κλείστε ραντεβού για επιμέτρηση.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/quote" size="lg">
                Ζητήστε Προσφορά
              </Button>
              <Button href="/appointment" variant="outline" size="lg">
                Κλείστε Ραντεβού
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
