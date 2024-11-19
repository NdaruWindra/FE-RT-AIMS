import { useAppSelector } from '@/hooks/use-redux'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export function ProtectedRoutes({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.user)
  let location = useLocation()

  if (!user.isAuthenticated) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  return children
}
