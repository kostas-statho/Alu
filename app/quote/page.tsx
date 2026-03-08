import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import QuoteForm from '@/components/forms/QuoteForm'
import { ShieldCheck, Clock, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Αίτηση Προσφοράς',
  description: 'Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας σύντομα με αναλυτική προσφορά.',
}

export default function QuotePage() {
  return (
    <>
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

      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <Container>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Clock className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Απάντηση σε 24 ώρες</h3>
              <p className="mt-1 text-sm text-slate-500">Λαμβάνετε αναλυτική προσφορά εντός μίας εργάσιμης ημέρας</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <ShieldCheck className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Δωρεάν Επιμέτρηση</h3>
              <p className="mt-1 text-sm text-slate-500">Ερχόμαστε στον χώρο σας χωρίς καμία δέσμευση</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Phone className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Ή Καλέστε μας</h3>
              <p className="mt-1 text-sm text-slate-500">
                <a href="tel:+306984106315" className="text-primary-600 hover:underline">+30 698 410 6315</a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
