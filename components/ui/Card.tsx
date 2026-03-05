import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
