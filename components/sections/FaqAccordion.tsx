'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/lib/types'

interface FaqAccordionProps {
  items: FaqItem[]
  groupByCategory?: boolean
}

const categoryLabels: Record<string, string> = {
  general: 'Γενικά',
  products: 'Προϊόντα & Υλικά',
  installation: 'Εγκατάσταση',
  exoikonomw: 'Εξοικονομώ',
  pricing: 'Τιμολόγηση',
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-slate-900 transition-colors hover:text-primary-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 text-slate-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all',
          isOpen ? 'mb-4 max-h-96' : 'max-h-0'
        )}
      >
        <p className="pb-2 text-sm leading-relaxed text-slate-600">{answer}</p>
      </div>
    </div>
  )
}

export default function FaqAccordion({ items, groupByCategory = false }: FaqAccordionProps) {
  if (!groupByCategory) {
    return (
      <div className="divide-y-0">
        {items.map((item) => (
          <AccordionItem key={item._id} question={item.question} answer={item.answer} />
        ))}
      </div>
    )
  }

  const grouped = items.reduce<Record<string, FaqItem[]>>((acc, item) => {
    const cat = item.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, categoryItems]) => (
        <div key={category}>
          <h3 className="mb-4 font-heading text-xl font-bold text-primary-800">
            {categoryLabels[category] || category}
          </h3>
          <div className="rounded-xl border border-slate-200 bg-white px-6">
            {categoryItems.map((item) => (
              <AccordionItem key={item._id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
