import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Hero from '@/components/sections/Hero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { Shield, Award, Ruler, Leaf, BookOpen } from 'lucide-react'
import { getExoikonomwPage, getAllFaqItems } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Εξοικονομώ — Επιδότηση Κουφωμάτων',
  description:
    'Μάθετε πώς μπορείτε να αντικαταστήσετε τα κουφώματά σας με επιδότηση έως 100% μέσω του προγράμματος Εξοικονομώ. Δωρεάν καθοδήγηση.',
}

const defaultSubsidyTiers = [
  { category: 'Ευάλωτα νοικοκυριά', percentage: '70–85%', maxBudget: '€40.000' },
  { category: 'ΑμεΑ / Σεισμόπληκτοι', percentage: '75–90%', maxBudget: '€50.000' },
  { category: 'Πολύτεκνοι', percentage: '70–80%', maxBudget: '€45.000' },
  { category: 'Γενικός πληθυσμός', percentage: '50–65%', maxBudget: '€30.000' },
  { category: 'Πολύ χαμηλά εισοδήματα (≤€5.000)', percentage: '95–100%', maxBudget: '—' },
]

const defaultProcessSteps = [
  { stepNumber: 1, title: 'Ενεργειακή Επιθεώρηση', description: "Α' ΠΕΑ από πιστοποιημένο ενεργειακό επιθεωρητή" },
  { stepNumber: 2, title: 'Υποβολή Αίτησης', description: 'Ηλεκτρονική υποβολή στην πλατφόρμα του Εξοικονομώ' },
  { stepNumber: 3, title: 'Έγκριση', description: 'Αξιολόγηση και έγκριση της αίτησής σας' },
  { stepNumber: 4, title: 'Επιλογή Κατασκευαστή', description: 'Μας επιλέγετε ως κατασκευαστή κουφωμάτων' },
  { stepNumber: 5, title: 'Εκτέλεση Εργασιών', description: 'Κατασκευή και τοποθέτηση νέων κουφωμάτων Exalco' },
  { stepNumber: 6, title: "Β' Ενεργειακή Επιθεώρηση", description: "Β' ΠΕΑ για επιβεβαίωση ενεργειακής αναβάθμισης" },
  { stepNumber: 7, title: 'Εκταμίευση', description: 'Λαμβάνετε την επιδότηση στον λογαριασμό σας' },
]

const whyUsPoints = [
  { icon: Award, text: '20+ χρόνια εμπειρίας σε κατασκευές αλουμινίου' },
  { icon: Shield, text: 'Πιστοποιημένος κατασκευαστής Exalco' },
  { icon: Ruler, text: 'Δωρεάν επιμέτρηση και εκτίμηση κόστους' },
  { icon: BookOpen, text: 'Πλήρης καθοδήγηση στη διαδικασία του Εξοικονομώ' },
  { icon: Leaf, text: 'Εγγυημένη ποιότητα κατασκευής' },
]

export default async function ExoikonomwPage() {
  const [pageData, allFaqs] = await Promise.all([getExoikonomwPage(), getAllFaqItems()])

  const exoFaqs = allFaqs.filter(
    (faq: { category?: string }) => faq.category === 'exoikonomw'
  )

  const subsidyTiers =
    pageData?.subsidyTiers && pageData.subsidyTiers.length > 0
      ? pageData.subsidyTiers
      : defaultSubsidyTiers

  const processSteps =
    pageData?.processSteps && pageData.processSteps.length > 0
      ? pageData.processSteps
      : defaultProcessSteps

  return (
    <>
      <Hero
        title="Αναβαθμίστε τα κουφώματά σας με επιδότηση έως 100%"
        subtitle="Σας καθοδηγούμε σε κάθε βήμα του Εξοικονομώ"
        primaryCta={{ label: 'Ρωτήστε μας', href: '/contact' }}
        secondaryCta={{ label: 'Καλέστε μας', href: 'tel:+306984106315' }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-slate-900">
              Τι είναι το Εξοικονομώ;
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                Το Εξοικονομώ είναι ένα πρόγραμμα χρηματοδοτούμενο από την Ευρωπαϊκή Ένωση
                (ΕΣΠΑ) με στόχο την ενεργειακή αναβάθμιση κατοικιών στην Ελλάδα.
              </p>
              <p>
                Καλύπτει την αντικατάσταση κουφωμάτων, μόνωση, θέρμανση και ψύξη, με επιδότηση
                από 50% έως 100% ανάλογα με το εισόδημα.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-slate-900">
              Ποσοστά Επιδότησης
            </h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Κατηγορία</th>
                    <th className="px-6 py-4 text-left font-semibold">Επιδότηση</th>
                    <th className="px-6 py-4 text-left font-semibold">Μέγ. Προϋπολογισμός</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidyTiers.map(
                    (
                      tier: { category: string; percentage: string; maxBudget: string },
                      i: number
                    ) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 font-medium text-slate-900">{tier.category}</td>
                        <td className="px-6 py-4 font-semibold text-primary-600">
                          {tier.percentage}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{tier.maxBudget}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-slate-900">
              Τι καλύπτεται;
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Αντικατάσταση κουφωμάτων (Exalco systems)',
                'Σκίαστρα και ρολά',
                'Ενεργειακοί υαλοπίνακες',
                'Πόρτες εισόδου',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-slate-900">
            Πώς λειτουργεί;
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {processSteps.map(
                (step: { stepNumber: number; title: string; description: string }) => (
                  <div key={step.stepNumber} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-slate-900">
            Γιατί εμάς;
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {whyUsPoints.map((point) => (
              <div key={point.text} className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <point.icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium text-slate-800">{point.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {exoFaqs.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center font-heading text-3xl font-bold text-slate-900">
                Συχνές Ερωτήσεις
              </h2>
              <div className="rounded-xl border border-slate-200 bg-white px-6">
                <FaqAccordion items={exoFaqs} />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-primary-600 py-16 text-white md:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold">
              Ρωτήστε μας για το Εξοικονομώ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Επικοινωνήστε μαζί μας για δωρεάν ενημέρωση σχετικά με την επιδότηση
              και τη διαδικασία αναβάθμισης κουφωμάτων.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                size="lg"
                className="bg-white text-primary-700 hover:bg-slate-100"
              >
                Επικοινωνία
              </Button>
              <Button
                href="tel:+306984106315"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Καλέστε μας
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
