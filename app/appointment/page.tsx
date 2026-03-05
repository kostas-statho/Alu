import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import AppointmentForm from '@/components/forms/AppointmentForm'

export const metadata: Metadata = {
  title: 'Κλείστε Ραντεβού',
  description: 'Κλείστε ραντεβού για δωρεάν επιμέτρηση και εκτίμηση κόστους στον χώρο σας.',
}

export default function AppointmentPage() {
  return (
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
  )
}
