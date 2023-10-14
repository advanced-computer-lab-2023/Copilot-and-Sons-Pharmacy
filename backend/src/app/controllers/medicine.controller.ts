import { Request, Response } from "express";
import { SUCCESS, FAIL, ERROR } from "../utils/httpStatusText";
import { fetchAllMedicines } from "../services/fetchAllMedicines.service";
import asyncWrapper from "../middlewares/asyncWrapper";
import { viewMedicineQuantityAndSales } from "../services/viewQuantityAndSales.service";
import { addMedicineService } from "../services/addMedicine.service";
import { editMedicineService } from "../services/editMedicine.service";
import { getAllMedicinalUses } from "../services/getAllMedicinalUses";

export const getAllMedicines = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicines = await fetchAllMedicines();
    res.status(200).json({ success: SUCCESS, data: medicines });
  }
);
export const medicinalUses = asyncWrapper(
  async (req: Request, res: Response) => {
    const uses = await getAllMedicinalUses();
    res.status(200).json({ success: SUCCESS, data: uses });
  }
);

export const addMedicine = asyncWrapper(async (req: Request, res: Response) => {
  const medicine = await addMedicineService(req.body);
  res.json({ success: SUCCESS, data: medicine });
});

export const viewMedicinesQuantityAndSales = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicines = await viewMedicineQuantityAndSales();
    res.status(200).json({ success: SUCCESS, data: medicines });
  }
);

export const editMedicine = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicine = await editMedicineService(req.params.name, req.body.edits);
    res.json({ success: SUCCESS, data: medicine });
  }
);