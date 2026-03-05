'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

const navLinks = [
  { href: '/', label: 'Αρχική' },
  { href: '/services', label: 'Υπηρεσίες' },
  { href: '/about', label: 'Η Εταιρεία μας' },
  { href: '/exoikonomw', label: 'Εξοικονομώ' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Επικοινωνία' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="text-xl font-extrabold text-primary-800">
            Aluminium Company
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/quote" size="sm" className="ml-2">
              Αίτηση Προσφοράς
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <Container>
            <div className="space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button href="/quote" className="w-full" onClick={() => setIsOpen(false)}>
                  Αίτηση Προσφοράς
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </nav>
  )
}
