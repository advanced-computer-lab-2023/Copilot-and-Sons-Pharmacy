import { Request, Response, NextFunction } from 'express'
import { APIError } from '../errors'

export default (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(error)

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Bad Request',
      message: error.message,
      code: 400,
      data: null,
    })
  }

  if (error instanceof APIError) {
    return res.status(error.status).json(error)
  }

  const statusCode = (error as any).statusCode || 500
  const statusText = (error as any).httpStatusText || 'Internal Server Error'

  res.status(statusCode).json({
    status: statusText,
    message: error.message,
    code: statusCode,
    data: null,
  })
}
