import Pharmacist from '../schemas/pharmacist'
import AppError from '../utils/appError'
import { FAIL } from '../utils/httpStatusText'
import User, { IUser } from '../schemas/user.model'
import { UserType } from 'pharmacy-common/types/user.types'
import { AddPharmacistRequest } from 'pharmacy-common/types/pharmacist.types'
import FireBase from '../../../../firebase.config'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import bcrypt from 'bcryptjs'
import { JwtPayload, generateJWTToken } from './auth.service'
import { bcryptSalt } from '../config'

type Pharmacist = {
  user: IUser
  username: string
  password: string
  name: string
  email: string
  dateOfBirth: Date
  hourlyRate: string
  affilation: string
  status: string
  educationalBackground: {
    major: string
    university: string
    graduationYear: string
    degree: string
  }
}

export const addPharmacistService = async (
  pharmacist: AddPharmacistRequest
) => {
  const existingEmail = await Pharmacist.findOne({ email: pharmacist.email })

  if (existingEmail) {
    throw new AppError('Pharmacist with this email already exists', 400, FAIL)
  }

  if (pharmacist.documents.length != 3) {
    throw new AppError(
      'Please upload your ID, medical license and degree',
      400,
      FAIL
    )
  }

  console.log('DOCUMENTS', pharmacist.documents)

  const existingUsername = await User.findOne({ username: pharmacist.username })

  if (existingUsername) {
    throw new AppError(
      'Pharmacist with this username already exists',
      409,
      FAIL
    )
  }

  const hashedPassword = await bcrypt.hash(pharmacist.password, bcryptSalt)

  const user = new User({
    username: pharmacist.username,
    password: hashedPassword,
    type: UserType.Pharmacist,
  })
  await user.save()
  const documentsPaths: string[] = []
  const storage = getStorage(FireBase)
  const storageRef = ref(storage, 'pharmacists/')

  for (let i = 0; i < pharmacist.documents.length; i++) {
    const fileRef = ref(storageRef, pharmacist.name + [i])
    await uploadBytes(fileRef, pharmacist.documents[i].buffer, {
      contentType: pharmacist.documents[i].mimetype,
    })
    const fullPath = await getDownloadURL(fileRef)
    documentsPaths.push(fullPath.toString())
  }

  const newPharmacist = new Pharmacist({
    name: pharmacist.name,
    email: pharmacist.email,
    dateOfBirth: pharmacist.dateOfBirth,
    hourlyRate: pharmacist.hourlyRate,
    affilation: pharmacist.affilation,
    status: pharmacist.status,
    educationalBackground: {
      major: pharmacist.educationalBackground.major,
      university: pharmacist.educationalBackground.university,
      graduationYear: pharmacist.educationalBackground.graduationYear,
      degree: pharmacist.educationalBackground.degree,
    },
    documents: documentsPaths,
    user: user.id,
  })
  await newPharmacist.save()

  return await generateJWTToken(new JwtPayload(pharmacist.username))
}
