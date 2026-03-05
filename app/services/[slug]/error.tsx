'use client'

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function ServiceError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-7xl font-bold text-primary-600">500</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-slate-900">
            Σφάλμα φόρτωσης υπηρεσίας
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Δεν ήταν δυνατή η φόρτωση της υπηρεσίας. Παρακαλώ δοκιμάστε ξανά αργότερα.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={() => reset()}>Δοκιμάστε ξανά</Button>
            <Button href="/services" variant="outline">
              Όλες οι Υπηρεσίες
            </Button>
            <Button href="/" variant="outline">
              Αρχική Σελίδα
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
