'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [sessionId])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f6f7fb' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <div style={{ 
            border: '3px solid #f3f3f3', 
            borderTop: '3px solid #0a1a3b', 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb' }}>
      <header style={{ 
        background: '#0a1a3b', 
        color: 'white', 
        padding: '28px 16px', 
        borderBottom: '4px solid #c8a348', 
        textAlign: 'center' 
      }}>
        <h1 style={{ margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>
          AI Academy for Beginners
        </h1>
      </header>
      
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 8px 24px rgba(10, 26, 59, 0.08)', 
          border: '1px solid rgba(10, 26, 59, 0.08)', 
          padding: '48px 24px', 
          textAlign: 'center', 
          marginTop: '24px' 
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🎉</div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#0a1a3b', 
            marginBottom: '16px' 
          }}>
            Payment Successful!
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#6b7280', 
            marginBottom: '24px' 
          }}>
            Thank you for your payment. We have received your service request and will be in touch within 24 hours.
          </p>
          <div style={{ 
            background: 'rgba(200, 163, 72, 0.1)', 
            border: '1px solid #c8a348', 
            borderRadius: '8px', 
            padding: '16px', 
            margin: '16px 0' 
          }}>
            <p style={{ fontSize: '0.9rem', color: '#0a1a3b', margin: 0 }}>
              <strong>Session ID:</strong> {sessionId}
            </p>
          </div>
          <a 
            href="/" 
            style={{ 
              display: 'inline-block',
              background: '#c8a348',
              color: '#0a0a0a',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '800',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(200, 163, 72, 0.3)',
              transition: 'transform 0.1s ease'
            }}
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
}