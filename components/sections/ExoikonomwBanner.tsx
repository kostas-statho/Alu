import { Leaf } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function ExoikonomwBanner() {
  return (
    <section className="bg-gradient-to-r from-primary-700 to-primary-600 py-16 text-white md:py-20">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <Leaf className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Επιδότηση κουφωμάτων έως 100%
            </h2>
            <p className="mt-2 text-lg text-white/80">
              Μάθετε αν δικαιούστε επιδότηση μέσω του προγράμματος Εξοικονομώ
            </p>
          </div>
          <Button
            href="/exoikonomw"
            size="lg"
            className="flex-shrink-0 bg-white text-primary-700 hover:bg-slate-100"
          >
            Μάθετε Περισσότερα
          </Button>
        </div>
      </Container>
    </section>
  )
}
