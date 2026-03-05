import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingChat from '@/components/layout/FloatingChat'
import './globals.css'

const inter = Inter({
  subsets: ['greek', 'latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Κουφώματα Αλουμινίου Αθήνα | Aluminium Company Ltd',
    template: '%s | Aluminium Company Ltd',
  },
  description:
    'Κατασκευή και τοποθέτηση κουφωμάτων αλουμινίου, πορτών ασφαλείας, κιγκλιδωμάτων και στεγάστρων. Πιστοποιημένος κατασκευαστής Exalco. Δωρεάν επιμέτρηση.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={inter.variable}>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Μετάβαση στο περιεχόμενο
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingChat />
        {process.env.PLAUSIBLE_DOMAIN && (
          <Script
            strategy="afterInteractive"
            data-domain={process.env.PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  )
}
