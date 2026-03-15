import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function RegisterPartner() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Food Partner Registration</h1>
        <p>Register to start offering meals through the platform.</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-field">
            <label htmlFor="partner-name">Business name</label>
            <input id="partner-name" name="name" type="text" autoComplete="organization" required />
          </div>

          <div className="auth-field">
            <label htmlFor="partner-email">Email</label>
            <input id="partner-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="auth-field">
            <label htmlFor="partner-password">Password</label>
            <input
              id="partner-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="auth-button">
              Create account
            </button>
          </div>

          <div className="auth-secondary">
            Already have an account? <Link to="/partner/login">Sign in</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
