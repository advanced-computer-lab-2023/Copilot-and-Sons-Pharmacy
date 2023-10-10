import { Request, Response ,NextFunction} from 'express';
import { addMedicineService } from '../services/addMedicine.service';
import { SUCCESS } from '../utils/httpStatusText';
import asyncWrapper from '../middlewares/asyncWrapper';
 import { addPharmacistService } from '../services/addPharmacist.service';
import { editMedicineService } from '../services/editMedicine.service';




const Pharmacist = require('../schemas/pharmacist');
const Joi = require('joi');


export const addPharmacist = asyncWrapper(async (req: Request, res: Response) => {
const result=await addPharmacistService(req.body);

return res.json(result)

    })


        
        export const addMedicine =asyncWrapper( async ( req: Request,res: Response) => { 
          const medicine = await addMedicineService(req.body);
          res.json({ success: SUCCESS, data: medicine });
        })

        export const editMedicine =asyncWrapper( async ( req: Request,res: Response) => { 
          const medicine = await editMedicineService(req.body.name,req.body.edits);
          res.json({ success: SUCCESS, data: medicine });
        })