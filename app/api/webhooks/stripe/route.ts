import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    console.log('Payment successful:', {
      sessionId: session.id,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      metadata: session.metadata,
    })
    
    // Example of parsing the form data from metadata
    if (session.metadata?.formData) {
      try {
        const formData = JSON.parse(session.metadata.formData)
        // Process the form data and payment info together
        console.log('Processing completed order:', {
          customerName: formData.name,
          services: formData.services,
          amount: session.amount_total,
        })
      } catch (e) {
        console.error('Error parsing form data from metadata:', e)
      }
    }
  }

  return NextResponse.json({ received: true })
}
