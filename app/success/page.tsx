import { Suspense } from 'react'
import SuccessContent from "./sucessContent"

export default function Success() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            border: '3px solid #f3f3f3', 
            borderTop: '3px solid #0a1a3b', 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Loading payment confirmation...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}