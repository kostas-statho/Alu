import { z } from 'zod'

export const quoteSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email('Παρακαλώ εισάγετε ένα έγκυρο email'),
  phone: z.string().min(10, 'Το τηλέφωνο πρέπει να έχει τουλάχιστον 10 ψηφία'),
  description: z.string().min(10, 'Η περιγραφή πρέπει να έχει τουλάχιστον 10 χαρακτήρες'),
  type: z.literal('quote'),
  honeypot: z.string().max(0).optional(),
})

export const appointmentSchema = z.object({
  name: z.string().max(100).optional(),
  phone: z.string().min(10, 'Το τηλέφωνο πρέπει να έχει τουλάχιστον 10 ψηφία'),
  description: z.string().min(10, 'Η περιγραφή πρέπει να έχει τουλάχιστον 10 χαρακτήρες'),
  type: z.literal('appointment'),
  honeypot: z.string().max(0).optional(),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
export type AppointmentFormData = z.infer<typeof appointmentSchema>
