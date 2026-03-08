import { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Πολιτική Απορρήτου',
  description: 'Πολιτική Απορρήτου — Aluminium Company Ltd',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-600 py-16 text-white md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Πολιτική Απορρήτου
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Τελευταία ενημέρωση: Μάρτιος 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                1. Εισαγωγή
              </h2>
              <p className="leading-relaxed text-slate-600">
                Η Aluminium Company Ltd (εφεξής «Εταιρεία») δεσμεύεται για την προστασία των
                προσωπικών δεδομένων σας σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων
                (GDPR) και την ελληνική νομοθεσία.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                2. Δεδομένα που Συλλέγουμε
              </h2>
              <p className="mb-3 leading-relaxed text-slate-600">
                Συλλέγουμε μόνο τα δεδομένα που μας παρέχετε εθελοντικά μέσω των φορμών
                επικοινωνίας:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-slate-600">
                <li>
                  <strong className="text-slate-800">Φόρμα Αίτησης Προσφοράς:</strong> όνομα,
                  email, τηλέφωνο, περιγραφή εργασίας
                </li>
                <li>
                  <strong className="text-slate-800">Φόρμα Ραντεβού:</strong> όνομα, τηλέφωνο,
                  περιγραφή
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                3. Σκοπός Επεξεργασίας
              </h2>
              <p className="mb-3 leading-relaxed text-slate-600">
                Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-slate-600">
                <li>Απάντηση στα αιτήματά σας</li>
                <li>Αποστολή προσφοράς ή κλείσιμο ραντεβού</li>
                <li>Επικοινωνία σχετικά με τις υπηρεσίες μας</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                4. Analytics
              </h2>
              <p className="mb-3 leading-relaxed text-slate-600">
                Χρησιμοποιούμε το <strong className="text-slate-800">Plausible Analytics</strong>,
                ένα εργαλείο ανάλυσης που σέβεται το απόρρητό σας. Το Plausible:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-slate-600">
                <li>Δεν χρησιμοποιεί cookies</li>
                <li>Δεν συλλέγει προσωπικά δεδομένα</li>
                <li>Δεν παρακολουθεί μεμονωμένους χρήστες</li>
                <li>Συμμορφώνεται πλήρως με τον GDPR</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                5. Αποθήκευση Δεδομένων
              </h2>
              <p className="leading-relaxed text-slate-600">
                Τα δεδομένα σας αποθηκεύονται με ασφάλεια και διατηρούνται μόνο για τον χρόνο
                που απαιτείται για την εκπλήρωση του σκοπού συλλογής τους.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                6. Κοινοποίηση σε Τρίτους
              </h2>
              <p className="leading-relaxed text-slate-600">
                Δεν πωλούμε, δεν ενοικιάζουμε και δεν κοινοποιούμε τα δεδομένα σας σε τρίτους
                εκτός αν αυτό απαιτείται από τον νόμο.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                7. Τα Δικαιώματά σας
              </h2>
              <p className="mb-3 leading-relaxed text-slate-600">
                Σύμφωνα με τον GDPR, έχετε δικαίωμα:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-slate-600">
                <li>Πρόσβασης στα δεδομένα σας</li>
                <li>Διόρθωσης ανακριβών δεδομένων</li>
                <li>Διαγραφής («δικαίωμα στη λήθη»)</li>
                <li>Περιορισμού επεξεργασίας</li>
                <li>Φορητότητας δεδομένων</li>
                <li>Εναντίωσης στην επεξεργασία</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 font-heading text-xl font-bold text-primary-800">
                8. Επικοινωνία
              </h2>
              <p className="mb-4 leading-relaxed text-slate-600">
                Για ερωτήσεις σχετικά με τα προσωπικά σας δεδομένα, επικοινωνήστε μαζί μας:
              </p>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:kos.statho@gmail.com" className="text-primary-600 hover:underline">
                    kos.statho@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Τηλέφωνο:</strong>{' '}
                  <a href="tel:+306984106315" className="text-primary-600 hover:underline">
                    +30 698 410 6315
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
