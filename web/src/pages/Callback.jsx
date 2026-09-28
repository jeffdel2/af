import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { webAuth } from '../auth/webAuth'
import { useAuth } from '../auth/AuthContext'

export default function Callback() {
  const { storeSession } = useAuth()
  const navigate = useNavigate()
  const handled = useRef(false)

  useEffect(() => {
    if (handled.current) return
    handled.current = true

    webAuth.parseHash((err, result) => {
      if (err || !result) {
        console.error('Callback error:', err)
        navigate('/login', { replace: true })
        return
      }
      storeSession(result)
      navigate('/', { replace: true })
    })
  }, [])

  return (
    <p style={{ textAlign: 'center', marginTop: 80, fontFamily: 'sans-serif' }}>
      Completing sign in…
    </p>
  )
}
