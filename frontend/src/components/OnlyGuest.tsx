import { useAuth } from '@/hooks/auth'
import { UserType } from 'pharmacy-common/types/user.types'

/**
 * A component that displays its children only if the user is not authenticated.
 */
export function OnlyGuest({
  children,
}: React.PropsWithChildren<{
  requiredUserType?: UserType
}>) {
  const { user } = useAuth()

  if (user) {
    return
  }

  return children
}
