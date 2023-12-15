import { NotFoundError } from '../errors'
import User, { IUser } from '../schemas/user.model'
import {
  GetNotificationsRequest,
  RemoveNotificationRequest,
} from 'pharmacy-common/types/notification.types'

export async function getUserNotifications({
  username,
}: GetNotificationsRequest) {
  const user = await User.findOne({ username })

  if (!user) throw new NotFoundError()

  return user.notifications
}

export async function addUserNotification({
  username,
  notification,
}: {
  username: string
  notification: IUser['notifications'][0]
}) {
  const user = await User.findOne({ username })

  if (!user) throw new NotFoundError()

  user.notifications.push(notification)
  user.save()
}

export async function removeUserNotification({
  username,
  notificationId,
}: RemoveNotificationRequest) {
  const user = await User.findOneAndUpdate(
    { username },
    {
      $pull: {
        notifications: { _id: notificationId },
      },
    }
  )

  if (!user) throw new NotFoundError()
}
