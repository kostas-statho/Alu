import { Shield, Award, Leaf } from 'lucide-react'
import Container from '@/components/ui/Container'

const trustItems = [
  {
    icon: Shield,
    title: '20+ Χρόνια',
    description: 'Εμπειρίας στον χώρο',
  },
  {
    icon: Award,
    title: 'Exalco Certified',
    description: 'Πιστοποιημένος κατασκευαστής',
  },
  {
    icon: Leaf,
    title: 'Εξοικονομώ',
    description: 'Συνεργαζόμαστε με το πρόγραμμα',
  },
]

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-primary-50 py-8">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-4 text-center sm:text-left">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-primary-800">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
