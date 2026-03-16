import { Link } from 'react-router-dom'
import '../styles/auth.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LoginPartner() {
  const navigate = useNavigate()
  const [data, setData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({...data, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/api/auth/foodpartner/login', data, { withCredentials: true })
    navigate('/reels')
  }


  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Food Partner Login</h1>
        <p>Sign in to manage your menu and orders.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="partner-email">Email</label>
            <input 
            onChange={handleChange}
            value={data.email}
            id="partner-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="auth-field">
            <label htmlFor="partner-password">Password</label>
            <input
              onChange={handleChange}
              value={data.password}
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
