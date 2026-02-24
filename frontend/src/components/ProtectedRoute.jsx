import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.jsx'

function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}`
    return <Navigate replace state={{ from }} to="/auth" />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate replace to="/play" />
  }

  return children
}

export default ProtectedRoute
