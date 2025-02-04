import { useAuth } from '../components/admin/Auth.jsx'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userLoggedIn, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
