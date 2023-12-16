import { isDate } from 'date-fns'
import * as zod from 'zod'

export const RegisterRequestValidator = zod.object({
  username: zod
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9]+$/),
  password: zod
    .string()
    .min(8)
    .refine(
      (password) => {
        const hasLowercase = /[a-z]/.test(password)
        const hasUppercase = /[A-Z]/.test(password)
        const hasDigit = /\d/.test(password)
        const hasSymbol = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)

        return hasLowercase && hasUppercase && hasDigit && hasSymbol
      },
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      }
    ),
  name: zod.string().min(3).max(255),
  email: zod.string().email(),
  mobileNumber: zod
    .string()
    .min(11)
    .max(11)
    .regex(/^\d{11}$/),
  dateOfBirth: zod.string().refine((date) => !isDate(date), {
    message: 'Date of Birth is required',
  }),
  gender: zod.enum(['Male', 'Female']),
})

export const emergencyContactValidator = zod.object({
  fullName: zod.string().min(3).max(255),
  mobileNumber: zod
    .string()
    .min(11)
    .max(11)
    .regex(/^\d{11}$/),
  relation: zod.string().min(3).max(255),
})
