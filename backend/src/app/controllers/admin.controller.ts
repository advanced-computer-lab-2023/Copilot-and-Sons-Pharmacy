import { Request, Response } from 'express'
import { SUCCESS } from '../utils/httpStatusText'
import asyncWrapper from '../middlewares/asyncWrapper'
import { addAdminService } from '../services/addAdmin.service'
import { getMedicineByName } from '../services/medicine/searchForMedicineByName'
import { getMedicineByMeidinalUse } from '../services/medicine/filterMedicineByMedicinalUse'
import { removeUser } from '../services/removeUser.service'
import { getPatientById } from '../services/adminViewsPatientInfo'
import Pharmacist from '../schemas/pharmacist'
import { ObjectId } from 'mongodb'
import { acceptPharmacist } from '../services/acceptPharmacist.service'
import { rejectPharmacist } from '../services/rejectPharmacist.service'
import { applyDiscounts } from '../services/medicine/discount.service'

export const filterMedicineByMedicinalUse = async (
  req: Request,
  res: Response
) => {
  const medicines = await getMedicineByMeidinalUse(req.params.medicinalUse)

  if (medicines.length == 0)
    res.json("There's no available medicines with this medicinalUse")
  else {
    res.json({ success: SUCCESS, data: medicines })
  }
}

export const serachForMedicine = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicine = await getMedicineByName(req.params.name)

    if (medicine.length == 0)
      res.json("There's no available medicines with this name")
    else {
      const discountedMedicines = await applyDiscounts(
        medicine as any,
        req.username!
      )

      res.json({ success: SUCCESS, data: discountedMedicines })
    }
  }
)

export const adminViewsPatientInfo = asyncWrapper(
  async (req: Request, res: Response) => {
    const _id = req.params.id
    console.log('hey')
    const patient = await getPatientById(_id)
    console.log('hi')

    if (!patient) {
      res.json('Patient not found')
    }

    res.json({ success: SUCCESS, data: patient })
    console.log(patient)
  }
)

export const addAdmin = asyncWrapper(async (req: Request, res: Response) => {
  const admin = await addAdminService(req.body)
  res.status(201).json({ success: SUCCESS, data: admin })
})

export const getAllPharmacists = asyncWrapper(
  async (req: Request, res: Response) => {
    const pharmacists = await Pharmacist.find({})
    res.status(200).json(pharmacists)
    console.log(res)
  }
)

export const getPendingPharmacists = async (req: Request, res: Response) => {
  Pharmacist.find({ status: 'Pending' })
    .populate('user')
    .sort({ createdAt: -1 })
    .then((result: any[]) => {
      res.send(result)
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

export const getAcceptedPharmacists = async (req: Request, res: Response) => {
  Pharmacist.find({ status: 'Accepted' })
    .populate('user')
    .sort({ createdAt: -1 })
    .then((result: any[]) => {
      res.send(result)
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

export const getPharmacistByID = async (req: Request, res: Response) => {
  if (ObjectId.isValid(req.params.id)) {
    Pharmacist.findById(req.params.id)
      .then((result: any) => {
        res.send(result)
      })
      .catch((err: Error) => {
        console.log(err)
      })
  } else {
    res.status(400).send('Invalid ID')
  }
}

export const deleteUser = asyncWrapper(async (req: Request, res: Response) => {
  const { username } = req.body // Extract the username from the request body
  await removeUser(username) // Pass the username to the removeUser function
  res.json({ success: SUCCESS, message: 'User deleted successfully', username })
})

//accept pharmacist request
export const acceptPharmacistRequest = asyncWrapper(async (req, res) => {
  const pharmacist = await acceptPharmacist(req.params.id)
  const name = pharmacist!.name
  res.json({
    success: SUCCESS,
    message: 'Pharmacist Request accepted successfully',
    name,
  })
})

//reject pharmacist request
export const rejectPharmacistRequest = asyncWrapper(async (req, res) => {
  const pharmacist = await rejectPharmacist(req.params.id)
  const name = pharmacist!.name
  res.json({
    success: SUCCESS,
    message: 'Pharmacist Request rejected successfully',
    name,
  })
})
