import { IMedicine } from './../schemas/medicine.model';
import bcrypt from 'bcryptjs';
import generateJWT from '../utils/generateJWT';
import Medicine from '../schemas/medicine.model';

export const addMedicineService=async(info:IMedicine)=>{
    try{
        const {name,price,description,quantity,Image,medicinalUse}=info;
        const newMedicine:IMedicine=new Medicine({
            name,
            price,
            description,
            quantity,
            Image,
            medicinalUse
        });
    
        await newMedicine.save();
    
    
        return newMedicine;
    }
    catch (error){
        throw new Error('Could not add medicine: ' + error);
    }

}