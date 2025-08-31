import IntakeForm from "@/components/intakeForm";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--light)' }}>
      <header className="header">
        <h1>AI Academy for Beginners</h1>
        <div className="badge">
          Service Intake Form
        </div>
      </header>
      
      <div className="container">
        <IntakeForm />
      </div>
      
      <footer className="footer">
        © AI Academy for Beginners
      </footer>
    </main>
  )
}