import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-sanity-webhook-secret')

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const type = body?._type

    switch (type) {
      case 'service':
        revalidatePath('/services')
        revalidatePath(`/services/${body?.slug?.current || ''}`)
        revalidatePath('/')
        break
      case 'faqItem':
        revalidatePath('/faq')
        revalidatePath('/exoikonomw')
        break
      case 'exoikonomwPage':
        revalidatePath('/exoikonomw')
        break
      case 'siteSettings':
        revalidatePath('/')
        revalidatePath('/contact')
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
