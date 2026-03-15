import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function Home() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="home-hero">
          <h1>Welcome</h1>
          <p>Choose the right account to get started.</p>
        </div>

        <div className="home-actions">
          <Link className="home-action" to="/register">
            Register as User
          </Link>
          <Link className="home-action" to="/partner/register">
            Register as Food Partner
          </Link>
        </div>
      </section>
    </main>
  )
}
