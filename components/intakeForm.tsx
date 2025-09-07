'use client'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface FormData {
  name: string
  email: string
  phone: string
  services: string[]
  comments: string
  website: string
  paymentOption: 'none' | 'deposit' | 'full'
  paymentAmount: number
  consent: boolean
}

const services = [
  'AI Strategy Consultation',
  'ChatGPT Training Workshop',
  'Custom AI Implementation',
  'Agentic AI, Voice, Messaging and CRM',
  'AI implementation in Marketing',
  'AI Tool Integration',
  'Short Video and story Telling with AI',
  'Prompt Engineering'
]

export default function IntakeForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    services: [],
    comments: '',
    website: '',
    paymentOption: 'none',
    paymentAmount: 0,
    consent: false
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name === 'services') {
        const updatedServices = checkbox.checked 
          ? [...formData.services, value]
          : formData.services.filter(service => service !== value)
        setFormData(prev => ({ ...prev, services: updatedServices }))
      } else if (name === 'consent') {
        setFormData(prev => ({ ...prev, consent: checkbox.checked }))
      }
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'paymentAmount' ? Number(value) : value 
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent, withPayment = false) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (withPayment && formData.paymentAmount > 0) {
        // Create Stripe checkout session
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const { sessionId } = await response.json()
        
        const stripe = await stripePromise
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId })
        }
      } else {
        // Submit form without payment
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setSubmitted(true)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Determine button states based on payment option
  const isSubmitDisabled = !formData.consent || isLoading || (formData.paymentOption === 'deposit' || formData.paymentOption === 'full')
  const isStripeDisabled = !formData.consent || isLoading || formData.paymentOption === 'none' || formData.paymentAmount === 0

  if (submitted) {
    return (
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Thank you!</h2>
        <p className="success-text">Your form has been submitted successfully. We'll be in touch soon.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <form onSubmit={(e) => handleSubmit(e, false)}>
        <section>
          <h2 className="section-title">Your Details</h2>
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Jane Doe"
              required
              className="form-input"
            />
          </div>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+44 7700 900123"
                required
                className="form-input"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Services Needed</h2>
          <div className="checkbox-grid">
            {services.map((service) => (
              <div key={service} className="checkbox-item">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleInputChange}
                />
                <label>{service}</label>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Further Comments (max 200 words)</h2>
          <div className="form-group">
            <label htmlFor="comments" className="form-label">
              Additional Details
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              maxLength={1600}
              placeholder="Write your additional comments here (200 words max)"
              className="form-textarea"
            />
          </div>
        </section>

        <section>
          <h2 className="section-title">Website / Social Media</h2>
          <div className="form-group">
            <label htmlFor="website" className="form-label">
              Your Website or Social Handles
            </label>
            <input
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com or @yourhandle"
              className="form-input"
            />
          </div>
        </section>

        <section>
          <h2 className="section-title">Payment</h2>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Choose payment option</label>
              <select
                name="paymentOption"
                value={formData.paymentOption}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="none">Decide later</option>
                <option value="deposit">Pay deposit now</option>
                <option value="full">Pay in full now</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount</label>
              <select
                name="paymentAmount"
                value={formData.paymentAmount}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value={0}>Select an amount</option>
                <option value={49}>£49</option>
                <option value={149}>£149</option>
                <option value={199}>£199</option>
                <option value={499}>£499</option>
                <option value={999}>£999</option>
                <option value={1499}>£1,499</option>
              </select>
            </div>
          </div>
        </section>

        <div style={{ marginTop: '32px' }}>
          <p className="text-small">
            Click Pay with Stripe to go to secure checkout; or just Submit to send your enquiry without payment
          </p>
          
          <div className="btn-group" style={{ marginBottom: '16px' }}>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="btn"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            
            {formData.paymentAmount > 0 && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isStripeDisabled}
                className="btn"
              >
                {isLoading ? 'Processing...' : 'Pay with Stripe'}
              </button>
            )}
          </div>

          <div className="checkbox-item" style={{ marginBottom: '12px' }}>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              required
            />
            <label>I agree to be contacted about my enquiry</label>
          </div>
          
          <p className="text-small">
            By submitting: you agree to our privacy policy. We respect your data
          </p>
        </div>
      </form>
    </div>
  )
}