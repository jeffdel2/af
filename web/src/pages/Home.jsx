import { useAuth } from '../auth/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div style={s.page}>
      <h1>Hello, {user?.name ?? user?.email}!</h1>
      <p style={s.email}>{user?.email}</p>
      <button onClick={logout} style={s.btn}>Sign Out</button>
    </div>
  )
}

const s = {
  page:  { maxWidth: 360, margin: '80px auto', fontFamily: 'sans-serif', textAlign: 'center' },
  email: { color: '#666', marginTop: 4 },
  btn:   { marginTop: 24, padding: '10px 20px', fontSize: 16, borderRadius: 4, background: '#c00', color: '#fff', border: 'none', cursor: 'pointer' },
}
