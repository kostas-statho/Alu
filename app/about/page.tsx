import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Shield, Award, Leaf, Ruler } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Η Εταιρεία μας',
  description:
    'Με 20+ χρόνια εμπειρίας στον χώρο του αλουμινίου, προσφέρουμε ολοκληρωμένες λύσεις κατασκευής και τοποθέτησης κουφωμάτων. Πιστοποιημένος κατασκευαστής Exalco.',
}

const values = [
  {
    icon: Shield,
    title: 'Κορυφαία Ποιότητα',
    description:
      'Χρησιμοποιούμε αποκλειστικά συστήματα Exalco, με πιστοποιήσεις ISO 9001 και ISO 14001.',
  },
  {
    icon: Award,
    title: '20+ Χρόνια Εμπειρίας',
    description:
      'Δύο δεκαετίες εμπειρίας στην κατασκευή και τοποθέτηση κουφωμάτων αλουμινίου.',
  },
  {
    icon: Leaf,
    title: 'Εξοικονομώ',
    description:
      'Συνεργαζόμαστε με το πρόγραμμα Εξοικονομώ για επιδοτούμενες ενεργειακές αναβαθμίσεις.',
  },
  {
    icon: Ruler,
    title: 'Δωρεάν Επιμέτρηση',
    description:
      'Δωρεάν επίσκεψη στο χώρο σας για ακριβή επιμέτρηση και εκτίμηση κόστους.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-600 py-16 text-white md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">Η Εταιρεία μας</h1>
            <p className="mt-4 text-lg text-white/80">
              Αξιοπιστία, ποιότητα και εμπειρία στον χώρο του αλουμινίου
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-slate-900">Η Ιστορία μας</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                Με πάνω από 20 χρόνια εμπειρίας στον χώρο του αλουμινίου, η εταιρεία μας
                αποτελεί σημείο αναφοράς στην κατασκευή και τοποθέτηση κουφωμάτων αλουμινίου
                στην Αθήνα και σε ολόκληρη την Ελλάδα.
              </p>
              <p>
                Από τα πρώτα μας βήματα, η δέσμευσή μας ήταν η παροχή κατασκευών υψηλής
                ποιότητας που συνδυάζουν αισθητική, λειτουργικότητα και αντοχή. Σήμερα,
                συνεχίζουμε να εξελισσόμαστε ακολουθώντας τις πιο σύγχρονες τεχνολογίες και
                τάσεις στον κλάδο.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-slate-900">
            Γιατί να μας Επιλέξετε
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <value.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-1 text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <Award className="h-10 w-10" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
                Πιστοποιημένος Κατασκευαστής Exalco
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Η Exalco είναι κορυφαία Ελληνική βιομηχανία αλουμινίου. Ως πιστοποιημένος
                κατασκευαστής, χρησιμοποιούμε αποκλειστικά τα προφίλ και τα συστήματά της,
                εγγυώμενοι κορυφαία ποιότητα σε κάθε κατασκευή.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary-50 py-16 md:py-20">
        <Container>
          <div className="text-center">
            <Leaf className="mx-auto h-10 w-10 text-primary-600" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-slate-900 md:text-3xl">
              Συνεργαζόμαστε με το Εξοικονομώ
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
              Σας καθοδηγούμε σε κάθε βήμα της διαδικασίας για να αξιοποιήσετε την επιδότηση
              και να αναβαθμίσετε τα κουφώματά σας με χαμηλό ή μηδενικό κόστος.
            </p>
            <div className="mt-6">
              <Button href="/exoikonomw" size="lg">
                Μάθετε Περισσότερα
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Δείτε τις Υπηρεσίες μας
            </h2>
            <p className="mt-3 text-slate-600">
              Ανακαλύψτε τι μπορούμε να κάνουμε για εσάς.
            </p>
            <div className="mt-6">
              <Button href="/services" variant="outline" size="lg">
                Υπηρεσίες
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
