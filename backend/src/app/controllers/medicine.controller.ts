import { Request, Response } from 'express';
import {SUCCESS,FAIL,ERROR} from '../utils/httpStatusText'
import {fetchAllMedicines} from '../services/fetchAllMedicines.service'; 
import asyncWrapper from '../middlewares/asyncWrapper';

// Controller function to fetch all medicines
export const getAllMedicines = asyncWrapper( async ( req: Request,res: Response) => {
        const medicines = await fetchAllMedicines();
        res.json({ success: SUCCESS, data: medicines });}
     )
  

