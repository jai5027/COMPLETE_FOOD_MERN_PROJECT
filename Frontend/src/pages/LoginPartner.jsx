import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function LoginPartner() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Food Partner Login</h1>
        <p>Sign in to manage your menu and orders.</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
              autoComplete="current-password"
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="auth-button">
              Sign in
            </button>
          </div>

          <div className="auth-secondary">
            Need an account? <Link to="/partner/register">Register</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
