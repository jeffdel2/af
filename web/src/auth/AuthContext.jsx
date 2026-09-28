import { createContext, useContext, useState } from 'react'
import { webAuth } from './webAuth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function storeSession(authResult) {
    setUser({
      name:  authResult.idTokenPayload.name,
      email: authResult.idTokenPayload.email,
      sub:   authResult.idTokenPayload.sub,
    })
  }

  function logout() {
    setUser(null)
    webAuth.logout({ returnTo: `${window.location.origin}/login` })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, storeSession, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
