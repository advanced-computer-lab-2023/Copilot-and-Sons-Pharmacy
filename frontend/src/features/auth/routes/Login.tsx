import { login } from '@/api/auth'
import { useAuth } from '@/hooks/auth'
import { LoginRequest } from 'pharmacy-common/types/auth.types'
import { LoginRequestValidator } from 'pharmacy-common/validators/auth.validator'
import { ApiForm } from '@/components/ApiForm'
import { Link } from 'react-router-dom'

export const Login = () => {
  const { refreshUser } = useAuth()

  return (
    <>
      <ApiForm<LoginRequest>
        fields={[
          { label: 'Username', property: 'username' },
          { label: 'Password', property: 'password' },
        ]}
        validator={LoginRequestValidator}
        successMessage="Logged in successfully."
        action={login}
        onSuccess={() => refreshUser()}
        buttonText="Login"
      />
      <Link to={'/forgot-password'}>forgot your password?</Link>
    </>
  )
}
