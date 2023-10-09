import { Request, Response } from 'express';
import {SUCCESS,FAIL,ERROR} from '../utils/httpStatusText'
import {fetchAllMedicines} from '../services/fetchAllMedicines.service'; 
import asyncWrapper from '../middlewares/asyncWrapper';
import { viewMedicineQuantityAndSales } from '../services/viewQuantityAndSales.service';

// Controller function to fetch all medicines
export const getAllMedicines = asyncWrapper( async ( req: Request,res: Response) => {
        const medicines = await fetchAllMedicines();
        res.status(200).json({ success: SUCCESS, data: medicines });}
     )
  

export const viewMedicinesQuantityAndSales=asyncWrapper( async ( req: Request,res: Response) => {
 const medicines=await viewMedicineQuantityAndSales();
 res.status(200).json({ success: SUCCESS, data: medicines });
})
