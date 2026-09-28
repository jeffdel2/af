import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { webAuth, CONNECTION } from '../auth/webAuth'
import { useAuth } from '../auth/AuthContext'

export default function Signup() {
  const { isAuthenticated } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)

  if (isAuthenticated) return <Navigate to="/" replace />

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    webAuth.signup(
      { connection: CONNECTION, email, password },
      (err) => {
        if (err) { setError(err.description || 'Sign up failed'); return }
        // Account created — log in immediately
        webAuth.login(
          { realm: CONNECTION, username: email, password },
          (err) => setError(err.description || 'Sign in after signup failed'),
        )
      },
    )
  }

  return (
    <div style={s.page}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={s.form}>
        <input
          type="email" placeholder="Email" required
          value={email} onChange={e => setEmail(e.target.value)}
          style={s.input}
        />
        <input
          type="password" placeholder="Password" required
          value={password} onChange={e => setPassword(e.target.value)}
          style={s.input}
        />
        {error && <p style={s.error}>{error}</p>}
        <button type="submit" style={s.btn}>Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  )
}

const s = {
  page:  { maxWidth: 360, margin: '80px auto', fontFamily: 'sans-serif', textAlign: 'center' },
  form:  { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: '10px 12px', fontSize: 16, borderRadius: 4, border: '1px solid #ccc' },
  btn:   { padding: '10px 12px', fontSize: 16, borderRadius: 4, background: '#635dff', color: '#fff', border: 'none', cursor: 'pointer' },
  error: { color: '#c00', margin: 0 },
}
