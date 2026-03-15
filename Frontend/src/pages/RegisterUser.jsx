import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function RegisterUser() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>User Registration</h1>
        <p>Create your account to start ordering.</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-field">
            <label htmlFor="user-name">Full name</label>
            <input id="user-name" name="name" type="text" autoComplete="name" required />
          </div>

          <div className="auth-field">
            <label htmlFor="user-email">Email</label>
            <input id="user-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="auth-field">
            <label htmlFor="user-password">Password</label>
            <input
              id="user-password"
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
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
