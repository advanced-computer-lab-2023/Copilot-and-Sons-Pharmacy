import { Schema } from 'mongoose';
import Patient from '../schemas/patient.schema';
import User from '../schemas/user.model';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';
const Pharmacist = require('../schemas/pharmacist');

export async function removeUser(username: string): Promise<void> {

    const user = await User.findOne({ username });
      console.log(user);
      
    if (!user ) {
      throw new AppError("This user doesn't exist", 404, ERROR);
    }
    else{
      await Pharmacist.findOneAndDelete({ user: user._id });
      await Patient.findOneAndDelete({ user: user._id });
      await User.findOneAndDelete({ username });
      
    }

}