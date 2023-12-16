// validationSchemas.js
import { z } from 'zod'

export const Step1Schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .refine(
      (password: any) => {
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
  dateOfBirth: z.date(),
  hourlyRate: z.number(),
  affiliation: z.string().min(1),
})

export const Step2Schema = z.object({
  major: z.string().min(2),
  university: z.string().min(2),
  graduationYear: z.number(),
  degree: z.enum([
    'Associate degree',
    "Bachelor's degree",
    "Master's degree",
    'Doctoral degree',
  ]),
})
