import type { NextFunction, Request, Response } from 'express'
import {
  NotAuthenticatedError,
  NotAuthorizedError,
  TokenError,
} from '../errors/auth.errors'
import { isUserType, verifyJWTToken } from '../services/auth.service'
import { UserType } from 'pharmacy-common/types/user.types'

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization

  if (authHeader == null) {
    next()

    return
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    throw new TokenError()
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    throw new TokenError()
  }

  const payload = await verifyJWTToken(token)
  req.username = payload.username
  next()
}

export function allowAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.username == null) {
    throw new NotAuthenticatedError()
  }

  next()
}

export async function allow(userType: UserType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.username == null) {
      throw new NotAuthenticatedError()
    }

    if (!(await isUserType(userType, req.username!))) {
      throw new NotAuthorizedError()
    }

    next()
  }
}
