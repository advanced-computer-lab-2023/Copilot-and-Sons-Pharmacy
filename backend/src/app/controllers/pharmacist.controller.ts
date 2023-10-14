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

    return res.json(result);
  }
);


