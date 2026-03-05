'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { quoteSchema } from '@/lib/validations'

export default function QuoteForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      description: formData.get('description') as string,
      type: 'quote' as const,
      honeypot: formData.get('honeypot') as string,
    }

    const result = quoteSchema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      setStatus('idle')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!res.ok) throw new Error('Αποτυχία αποστολής')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-800">
          Η αίτησή σας στάλθηκε επιτυχώς!
        </p>
        <p className="mt-2 text-sm text-green-600">
          Θα επικοινωνήσουμε μαζί σας σύντομα.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-slate-900">Αίτηση Προσφοράς</h3>

      <div className="hidden" aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <Input label="Όνομα" name="name" placeholder="Το όνομά σας" error={errors.name} />
      <Input
        label="Email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        error={errors.email}
      />
      <Input
        label="Τηλέφωνο"
        name="phone"
        type="tel"
        required
        placeholder="69XXXXXXXX"
        error={errors.phone}
      />
      <Textarea
        label="Περιγραφή εργασίας"
        name="description"
        required
        placeholder="Περιγράψτε τι χρειάζεστε..."
        error={errors.description}
      />

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.
        </p>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? 'Αποστολή...' : 'Αποστολή Αίτησης'}
      </Button>
    </form>
  )
}
