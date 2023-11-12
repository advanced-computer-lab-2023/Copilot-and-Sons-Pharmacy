import { Request, Response } from 'express'
import { SUCCESS } from '../utils/httpStatusText'
import { fetchAllMedicines } from '../services/fetchAllMedicines.service'
import asyncWrapper from '../middlewares/asyncWrapper'
import { viewMedicineQuantityAndSales } from '../services/viewQuantityAndSales.service'
import { addMedicineService } from '../services/addMedicine.service'
import { editMedicineService } from '../services/editMedicine.service'
import { getAllMedicinalUses } from '../services/getAllMedicinalUses'
import getPatientByUsername from '../services/getPatient.service'
import { APIError, NotFoundError } from '../errors'

export const getAllMedicines = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicines = await fetchAllMedicines()
    res.status(200).json({ success: SUCCESS, data: medicines })
  }
)

export const medicinalUses = asyncWrapper(
  async (req: Request, res: Response) => {
    const uses = await getAllMedicinalUses()
    res.status(200).json({ success: SUCCESS, data: uses })
  }
)

export const addMedicine = asyncWrapper(async (req: any, res: Response) => {
  const medicine = await addMedicineService({
    ...req.body,
    Image: req.file,
  })
  res.json({ success: SUCCESS, data: medicine })
})

export const viewMedicinesQuantityAndSales = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicines = await viewMedicineQuantityAndSales()
    res.status(200).json({ success: SUCCESS, data: medicines })
  }
)

export const editMedicine = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicine = await editMedicineService(req.params.name, {
      ...req.body,
      Image: req.file,
    })
    res.json({ success: SUCCESS, data: medicine })
  }
)

export const patchWallet = asyncWrapper(async (req: Request, res: Response) => {
  console.log('patch wallet')
  const totalMoney = parseInt(req.params.totalMoney)
  const userName = req.username
  const patient = await getPatientByUsername(userName!)
  if (!patient || !patient.walletMoney) throw new NotFoundError()
  if (patient.walletMoney - totalMoney < 0)
    throw new APIError('Not enough money in wallet', 400)
  patient.walletMoney -= totalMoney
  patient.save()
  res.send({ success: SUCCESS, data: patient.walletMoney })
})
