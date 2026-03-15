import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function LoginUser() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>User Login</h1>
        <p>Enter your credentials to access the app.</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
            Don&rsquo;t have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
