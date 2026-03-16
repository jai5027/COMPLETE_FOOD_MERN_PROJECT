import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useState } from 'react'
import Reels from '../general/Reels.jsx'

export default function RegisterUser() {
  const navigate = useNavigate()
  const [data, setData] = useState({fullname: '', email: '', password: ''})

  const handleChange = (e) => {
    const {name,value} = e.target
    setData({...data, [name]:value})
  }

  const HandleSubmit = async (e) => {
      e.preventDefault()

      await axios.post("http://localhost:3000/api/auth/user/register",
        data, { withCredentials: true }) 
        navigate('/reels')  
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>User Registration</h1>
        <p>Create your account to start ordering.</p>

        <form className="auth-form" onSubmit={HandleSubmit}>
          <div className="auth-field">
            <label htmlFor="user-name">Full name</label>
            <input value={data.name} 
            onChange={handleChange}
            id="user-name" 
            name="fullname" 
            type="text" 
            autoComplete="name" required />
          </div>

          <div className="auth-field">
            <label htmlFor="user-email">Email</label>
            <input value={data.email} 
            onChange={handleChange}
            id="user-email" 
            name="email" 
            type="email" 
            autoComplete="email" required />
          </div>

          <div className="auth-field">
            <label htmlFor="user-password">Password</label>
            <input
              value={data.password}
            onChange={handleChange}
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
