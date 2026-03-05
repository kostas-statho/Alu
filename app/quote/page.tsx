import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import QuoteForm from '@/components/forms/QuoteForm'

export const metadata: Metadata = {
  title: 'Αίτηση Προσφοράς',
  description: 'Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας σύντομα με αναλυτική προσφορά.',
}

export default function QuotePage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="font-heading text-3xl font-bold text-slate-900 md:text-4xl">
              Αίτηση Προσφοράς
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας σύντομα.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <QuoteForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
