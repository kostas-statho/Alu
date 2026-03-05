import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-7xl font-bold text-primary-600">404</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-slate-900">
            Η σελίδα δεν βρέθηκε
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Η σελίδα που ψάχνετε δεν υπάρχει ή έχει μετακινηθεί.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/">Αρχική Σελίδα</Button>
            <Button href="/services" variant="outline">
              Υπηρεσίες
            </Button>
            <Button href="/contact" variant="outline">
              Επικοινωνία
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
