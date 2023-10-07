import { Request, Response ,NextFunction} from 'express';
import registerService  from '../services/register.service';
import { FAIL, SUCCESS } from '../utils/httpStatusText';
import asyncWrapper from '../middlewares/asyncWrapper';
export const registerController = asyncWrapper( async (req:Request, res:Response, next:NextFunction) => {

const patient=await registerService(req.body);
res.status(201).json({status:SUCCESS,data:patient})

}
)


