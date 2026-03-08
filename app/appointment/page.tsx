import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { MapPin, Clock, Ruler } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Κλείστε Ραντεβού',
  description: 'Κλείστε ραντεβού για δωρεάν επιμέτρηση και εκτίμηση κόστους στον χώρο σας.',
}

export default function AppointmentPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-xl">
            <div className="mb-8 text-center">
              <h1 className="font-heading text-3xl font-bold text-slate-900 md:text-4xl">
                Κλείστε Ραντεβού
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Δωρεάν επιμέτρηση και εκτίμηση κόστους στον χώρο σας.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <AppointmentForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <Container>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <MapPin className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Ερχόμαστε σε εσάς</h3>
              <p className="mt-1 text-sm text-slate-500">Αθήνα και Αττική — δωρεάν μετάβαση</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Ruler className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Ακριβής Επιμέτρηση</h3>
              <p className="mt-1 text-sm text-slate-500">Μετρήσεις στον χώρο σας για σωστή προσφορά</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Clock className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Χωρίς Δέσμευση</h3>
              <p className="mt-1 text-sm text-slate-500">Η επίσκεψη και η εκτίμηση είναι εντελώς δωρεάν</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
