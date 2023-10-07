import { Request, Response, NextFunction } from 'express';
import registrationSchema from '../validators/registration.validator';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';

// Middleware function to validate user registration data
export const validateRegistrationData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = registrationSchema.validate(req.body);

  if (error) {
   const err=new AppError(error.details[0].message,400,ERROR) 
   next(err)
  }

  // If validation passed, continue to the next middleware or route handler
  else next();
};
