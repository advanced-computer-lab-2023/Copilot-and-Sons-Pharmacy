import { Schema } from 'mongoose';
import Patient from '../schemas/patient.schema';
import User from '../schemas/user.model';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';
import Pharmacist from '../schemas/pharmacist';

export async function removeUser(username: string): Promise<void> {

    const user = await User.findOne({ username });
    const pharm = await Pharmacist.findOne({ username });
  
      console.log(user);
      console.log(pharm);
      if(user){
        await Patient.findOneAndDelete({ user: user._id });
        await User.findOneAndDelete({ username });
      }else  if (pharm) {
      await Pharmacist.findOneAndDelete({ username });
     
    }
    else{
      throw new AppError("This user doesn't exist", 404, ERROR);
      
    }

}