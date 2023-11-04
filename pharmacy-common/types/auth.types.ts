import type { z } from 'zod'
import type { LoginRequestValidator } from '../validators/auth.validator'

export type LoginRequest = z.infer<typeof LoginRequestValidator>

export interface LoginResponse {
  token: string
}
