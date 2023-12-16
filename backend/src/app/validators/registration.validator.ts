import Joi from 'joi'
import {
  isStrongPassword,
  getPasswordStrengthReason,
} from './password.validator'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'

const registrationValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.alphanum': 'Username should only contain alphanumeric characters',
    'string.min': 'Username should have a minimum length of {#limit}',
    'string.max': 'Username should have a maximum length of {#limit}',
    'any.required': 'Username is required',
  }),
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
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
  dateOfBirth: Joi.date().required().messages({
    'date.base': 'Invalid date format',
    'any.required': 'Date of birth is required',
  }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': 'Invalid gender',
    'any.required': 'Gender is required',
  }),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Mobile number should be a 11-digit numeric string',
      'any.required': 'Mobile number is required',
    }),
  emergencyContact: Joi.object({
    fullName: Joi.string().required(),
    mobileNumber: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Emergency contact mobile number should be a 11-digit numeric string',
        'any.required': 'Emergency contact mobile number is required',
      }),
    relation: Joi.string().required(),
  }).required(),
})

export default registrationValidator
