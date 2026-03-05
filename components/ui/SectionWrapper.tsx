import { cn } from '@/lib/utils'
import Container from './Container'

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  bgColor?: 'white' | 'slate' | 'primary'
}

const bgColors = {
  white: 'bg-white',
  slate: 'bg-slate-50',
  primary: 'bg-primary-50',
}

export default function SectionWrapper({
  className,
  children,
  bgColor = 'white',
  ...props
}: SectionWrapperProps) {
  return (
    <section className={cn('py-16 md:py-24', bgColors[bgColor], className)} {...props}>
      <Container>{children}</Container>
    </section>
  )
}
