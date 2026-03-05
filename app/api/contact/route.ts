import { NextResponse } from 'next/server'
import { quoteSchema, appointmentSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true })
    }

    // Validate based on form type
    const schema = body.type === 'appointment' ? appointmentSchema : quoteSchema
    const result = schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Μη έγκυρα δεδομένα', issues: result.error.issues },
        { status: 400 }
      )
    }

    const data = result.data

    // Build email content
    const isAppointment = data.type === 'appointment'
    const subject = isAppointment
      ? `Νέο Ραντεβού — ${data.name || 'Χωρίς όνομα'}`
      : `Νέα Αίτηση Προσφοράς — ${data.name || 'Χωρίς όνομα'}`

    const emailLines = [
      `<h2>${isAppointment ? 'Νέο Αίτημα Ραντεβού' : 'Νέα Αίτηση Προσφοράς'}</h2>`,
      `<p><strong>Όνομα:</strong> ${data.name || '—'}</p>`,
      `<p><strong>Τηλέφωνο:</strong> ${data.phone}</p>`,
    ]

    if ('email' in data && data.email) {
      emailLines.push(`<p><strong>Email:</strong> ${data.email}</p>`)
    }

    emailLines.push(`<p><strong>Περιγραφή:</strong></p><p>${data.description}</p>`)

    // Send via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'kos.statho@gmail.com'

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Η αποστολή email δεν είναι διαθέσιμη' },
        { status: 500 }
      )
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
        to: contactEmail,
        subject,
        html: emailLines.join('\n'),
      }),
    })

    if (!emailRes.ok) {
      const errorData = await emailRes.text()
      console.error('Resend error:', errorData)
      return NextResponse.json({ error: 'Αποτυχία αποστολής email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Σφάλμα διακομιστή' }, { status: 500 })
  }
}
