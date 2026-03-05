import Link from 'next/link'
import {
  DoorOpen, DoorClosed, ShieldCheck, Home, Fence,
  GlassWater, Building2, ArrowUpDown, Wrench
} from 'lucide-react'
import Card from '@/components/ui/Card'
import type { Service } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DoorOpen,
  DoorClosed,
  ShieldCheck,
  Home,
  Fence,
  GlassWater,
  Building2,
  ArrowUpDown,
  Wrench,
}

interface ServiceGridProps {
  services: Service[]
  columns?: 2 | 3
}

export default function ServiceGrid({ services, columns = 3 }: ServiceGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${
        columns === 3 ? 'lg:grid-cols-3' : ''
      }`}
    >
      {services.map((service) => {
        const Icon = iconMap[service.icon] || Wrench
        return (
          <Link key={service._id} href={`/services/${service.slug.current}`}>
            <Card className="group h-full cursor-pointer">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-slate-900">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {service.shortDescription}
              </p>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
