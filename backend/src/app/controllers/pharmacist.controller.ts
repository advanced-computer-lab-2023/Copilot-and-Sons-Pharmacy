import { Request, Response, NextFunction } from "express";
import { SUCCESS } from "../utils/httpStatusText";
import asyncWrapper from "../middlewares/asyncWrapper";
import { addPharmacistService } from "../services/addPharmacist.service";
import { editMedicineService } from "../services/editMedicine.service";

const Pharmacist = require("../schemas/pharmacist");
const Joi = require("joi");

export const addPharmacist = asyncWrapper(
  async (req: Request, res: Response) => {
    const result = await addPharmacistService(req.body);
    if (result instanceof Error) {
      res.status(400).json({ success: false, error: result.message });
      return;
    }
      
    return res.json(result);
  }
);

export const editMedicine = asyncWrapper(
  async (req: Request, res: Response) => {
    const medicine = await editMedicineService(req.body.name, req.body.edits);
    res.json({ success: SUCCESS, data: medicine });
  }
);
