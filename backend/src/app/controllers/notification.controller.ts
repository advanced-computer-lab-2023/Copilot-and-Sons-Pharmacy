import { Router } from 'express'
import {
  getUserNotifications,
  removeUserNotification,
} from '../services/notification.service'
import { validate } from '../middlewares/validation.middleware'
import {
  GetNotificationsRequestValidator,
  RemoveNotificationRequestValidator,
} from '../validators/notification.validator'
import {
  GetNotificationsRequest,
  RemoveNotificationRequest,
} from 'pharmacy-common/types/notification.types'
import asyncWrapper from '../middlewares/asyncWrapper'

export const notificationRouter = Router()

notificationRouter.post(
  '/notifications/all',
  validate(GetNotificationsRequestValidator),
  asyncWrapper<GetNotificationsRequest>(async (req, res) => {
    const notifications = await getUserNotifications(req.body)
    res.json({ notifications })
  })
)

notificationRouter.delete(
  '/notifications',
  validate(RemoveNotificationRequestValidator),
  asyncWrapper<RemoveNotificationRequest>(async (req, res) => {
    await removeUserNotification(req.body)
    res.status(200).end()
  })
)
