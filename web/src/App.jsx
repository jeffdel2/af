import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Callback from './pages/Callback.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login"    element={<Login />} />
      <Route path="/signup"   element={<Signup />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  )
}
