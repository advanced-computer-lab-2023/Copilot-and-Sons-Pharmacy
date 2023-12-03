import { Request, Response } from 'express'
import { FAIL, SUCCESS } from '../utils/httpStatusText'
import { fetchAllMedicines } from '../services/medicine/fetchAllMedicines.service'
import asyncWrapper from '../middlewares/asyncWrapper'
import { viewMedicineQuantityAndSales } from '../services/medicine/viewQuantityAndSales.service'
import { addMedicineService } from '../services/medicine/addMedicine.service'
import { editMedicineService } from '../services/medicine/editMedicine.service'
import { getAllMedicinalUses } from '../services/medicine/getAllMedicinalUses'
import getPatientByUsername from '../services/getPatient.service'
import { APIError, NotFoundError } from '../errors'
import { viewAlternativeMedicine } from '../services/viewAlternativeMedicine'
import {
  searchReportByDate,
  searchReportByMonth,
} from '../services/medicine/salesReport.service'

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
  // added == undefined because if the walletMoney is 0, it was giving not found
  if (!patient || patient.walletMoney == undefined) throw new NotFoundError()
  if (patient.walletMoney - totalMoney < 0)
    throw new APIError('Not enough money in wallet', 400)
  patient.walletMoney -= totalMoney
  patient.save()
  res.send({ success: SUCCESS, data: patient.walletMoney })
})

export const viewAlternatives = asyncWrapper(
  async (req: Request, res: Response) => {
    const alternatives = await viewAlternativeMedicine(req.params.id)

    if (!alternatives) {
      throw new APIError('no alternatives available', 400, FAIL)
    }

    res.send({ success: SUCCESS, data: alternatives })
  }
)

export const filterReportByDate = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicines = await searchReportByDate(req.query.date as string)
    res.status(200).json({ success: SUCCESS, data: medicines })
  }
)

export const filterReportByMonth = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicines = await searchReportByMonth(req.query.month as string)
    res.status(200).json({ success: SUCCESS, data: medicines })
  }
)
