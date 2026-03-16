import { Link } from 'react-router-dom'
import '../styles/auth.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RegisterPartner() {
  const navigate = useNavigate()
  const [data, setData] = useState({ name: '', email: '', password: '', contactName: '', contactNumber: '', address: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({...data, [name]: value})
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/api/auth/foodpartner/register', data, { withCredentials: true })
    navigate('/food/create')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Food Partner Registration</h1>
        <p>Register to start offering meals through the platform.</p>

        <form className="auth-form" onSubmit={HandleSubmit}>
          <div className="auth-field">
            <label htmlFor="partner-name">Business name</label>
            <input 
            value={data.name}
            onChange={handleChange}
            id="partner-name" name="name" type="text" autoComplete="organization" required />
          </div>

          <div className="auth-field">
            <label htmlFor="partner-contact-name">Contact name</label>
            <input
              onChange={handleChange}
              value={data.contactName}
              id="partner-contact-name"
              name="contactName"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="partner-contact-number">Contact number</label>
            <input
              onChange={handleChange}
              value={data.contactNumber}
              id="partner-contact-number"
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="partner-address">Address</label>
            <input
              value={data.address}
              onChange={handleChange}
              id="partner-address"
              name="address"
              type="text"
              autoComplete="street-address"
              required
            />
          </div>

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
