import Joi from 'joi'
import {
  isStrongPassword,
  getPasswordStrengthReason,
} from './password.validator'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
const userValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.alphanum': 'Username should only contain alphanumeric characters',
    'string.min': 'Username should have a minimum length of {#limit}',
    'string.max': 'Username should have a maximum length of {#limit}',
    'any.required': 'Username is required',
  }),
  password: Joi.string()
    .min(8)
    .required()
    .custom((value) => {
      if (!isStrongPassword(value)) {
        const errorReason = getPasswordStrengthReason(value)
        throw new AppError(errorReason, 400, ERROR) // Throw a custom error message
      }

      return value
    })
    .messages({
      'string.min': 'Password should have a minimum length of {#limit}',
      'any.required': 'Password is required',
    }),
})

export default userValidator
