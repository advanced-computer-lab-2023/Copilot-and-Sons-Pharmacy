import * as zod from 'zod'

export const LoginRequestValidator = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
})
