import { Link } from 'react-router-dom'
import '../styles/auth.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LoginUser() {
     const navigate = useNavigate()
     const [data, setData] = useState({ email: '', password: '' })

     const HandleCahnge = (e) => {
        const { name, value } = e.target
        setData({...data, [name]: value}) 
     }

     const HandleSubmit = async (e) => {
       e.preventDefault()
       
       await axios.post('http://localhost:3000/api/auth/user/login', data, { withCredentials: true })
       navigate('/reels')

     }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>User Login</h1>
        <p>Enter your credentials to access the app.</p>

        <form className="auth-form" onSubmit={HandleSubmit}>
          <div className="auth-field">
            <label htmlFor="user-email">Email</label>
            <input id="user-email" 
            onChange={HandleCahnge}
            value={data.email}
            name="email" 
            type="email" 
            autoComplete="email" required />
          </div>

          <div className="auth-field">
            <label htmlFor="user-password">Password</label>
            <input
              onChange={HandleCahnge}
              value={data.password}
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
