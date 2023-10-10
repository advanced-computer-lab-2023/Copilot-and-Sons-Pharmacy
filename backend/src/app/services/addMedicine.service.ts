import { IMedicine } from './../schemas/medicine.model';
import Medicine from '../schemas/medicine.model';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';

export const addMedicineService=async(info:IMedicine)=>{
    try{
        const {name,price,description,quantity,Image,medicinalUse, activeIngredients}=info;
        const newMedicine:IMedicine=new Medicine({
            name,
            price,
            description,
            quantity,
            Image,
            activeIngredients,
            medicinalUse
        });
    
        await newMedicine.save();
    
    
        return newMedicine;
    }
    catch (error){
        throw new AppError('Could not add medicine',400, ERROR);
    }

}