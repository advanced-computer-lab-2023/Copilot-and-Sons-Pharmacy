import { Router } from 'express'
import {
  getEmailAndNameForUsername,
  getModelIdForUsername,
  getUserByUsername,
  isUserType,
  login,
} from '../services/auth.service'
import { validate } from '../middlewares/validation.middleware'
import { LoginRequestValidator } from 'pharmacy-common/validators/auth.validator'
import {
  LoginResponse,
  type LoginRequest,
} from 'pharmacy-common/types/auth.types'
import { allowAuthenticated } from '../middlewares/auth.middleware'
import { NotAuthorizedError } from '../errors/auth.errors'
import {
  GetCurrentUserResponse,
  GetUserByUsernameResponse,
  UserType,
} from 'pharmacy-common/types/user.types'
import asyncWrapper from '../middlewares/asyncWrapper'

export const authRouter = Router()

authRouter.post(
  '/auth/login',
  validate(LoginRequestValidator),
  asyncWrapper<LoginRequest>(async (req, res) => {
    const { username, password } = req.body
    const token = await login(username, password)

    res.send({
      token,
    } satisfies LoginResponse)
  })
)

/**
 * Get the currently logged in user
 */
authRouter.get(
  '/auth/me',
  allowAuthenticated,
  asyncWrapper(async (req, res) => {
    const user = await getUserByUsername(req.username!)
    const { email, name } = await getEmailAndNameForUsername(req.username!)
    res.send({
      id: user.id,
      username: user.username,
      type: user.type as UserType,
      modelId: await getModelIdForUsername(user.username),
      email,
      name,
    } satisfies GetCurrentUserResponse)
  })
)

authRouter.get(
  '/auth/:username',
  allowAuthenticated,
  asyncWrapper(async (req, res) => {
    // Only admins and the user itself can access this endpoint
    if (
      req.params.username !== req.username &&
      !(await isUserType(UserType.Admin, req.username!))
    ) {
      throw new NotAuthorizedError()
    }

    const { email, name } = await getEmailAndNameForUsername(req.username!)

    const user = await getUserByUsername(req.params.username)

    res.send({
      id: user.id,
      username: user.username,
      type: user.type as UserType,
      modelId: await getModelIdForUsername(user.username),
      email,
      name,
    } satisfies GetUserByUsernameResponse)
  })
)
