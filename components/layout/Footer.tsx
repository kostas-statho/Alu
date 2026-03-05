import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Container from '@/components/ui/Container'

const navLinks = [
  { href: '/', label: 'Αρχική' },
  { href: '/services', label: 'Υπηρεσίες' },
  { href: '/about', label: 'Η Εταιρεία μας' },
  { href: '/exoikonomw', label: 'Εξοικονομώ' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Επικοινωνία' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 text-white">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-3 md:py-16">
          <div>
            <h3 className="mb-4 text-lg font-bold">Aluminium Company Ltd</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Κουφώματα αλουμινίου, πόρτες ασφαλείας, κιγκλιδώματα και σιδηροκατασκευές.
              Πιστοποιημένος κατασκευαστής Exalco με 20+ χρόνια εμπειρίας.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Πλοήγηση
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Επικοινωνία
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+306984106315"
                  className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  +30 698 410 6315
                </a>
              </li>
              <li>
                <a
                  href="mailto:kos.statho@gmail.com"
                  className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  kos.statho@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4" />
                  Αθήνα, Ελλάδα
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
            <p>&copy; {currentYear} Aluminium Company Ltd. Με επιφύλαξη κάθε δικαιώματος.</p>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Πολιτική Απορρήτου
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
