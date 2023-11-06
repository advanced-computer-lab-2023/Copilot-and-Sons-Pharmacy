import { useAuth } from '@/hooks/auth'
import { UserType } from 'pharmacy-common/types/user.types'
import { Navigate } from 'react-router-dom'
import { RedirectToDashboard } from './RedirectToDashboard'

/**
 * A route that requires authentication.
 * @param requiredUserType If provided, the user must have this type to view the route.
 */
export function AuthenticatedRoute({
  children,
  requiredUserType,
}: React.PropsWithChildren<{
  requiredUserType?: UserType
}>) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  if (requiredUserType && user.type !== requiredUserType) {
    return <RedirectToDashboard />
  }

  return children
}
