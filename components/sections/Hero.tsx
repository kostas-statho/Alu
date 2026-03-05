import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

interface HeroProps {
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export default function Hero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-20 text-white md:py-32">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" />
      <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/5" />
      <Container className="relative">
        <h1 className="max-w-3xl font-heading text-3xl font-extrabold leading-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">{subtitle}</p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg" className="bg-white text-primary-700 hover:bg-slate-100">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
