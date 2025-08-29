'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Success() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // You could fetch session details here if needed
    setLoading(false)
  }, [sessionId])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--light)' }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light)' }}>
      <header className="header">
        <h1>AI Academy for Beginners</h1>
      </header>
      
      <div className="container">
        <div className="success-card">
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🎉</div>
          <h2 className="success-title">Payment Successful!</h2>
          <p className="success-text">
            Thank you for your payment. We've received your service request and will be in touch within 24 hours.
          </p>
          <div className="info-box">
            <p style={{ fontSize: '0.9rem', color: 'var(--navy)', margin: 0 }}>
              <strong>Session ID:</strong> {sessionId}
            </p>
          </div>
          <a href="/" className="btn" style={{ textDecoration: 'none' }}>
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
}