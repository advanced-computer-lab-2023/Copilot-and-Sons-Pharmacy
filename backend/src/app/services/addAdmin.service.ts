import Administrator,{IAdministrator} from '../schemas/administrator.model';
import bcrypt from 'bcryptjs';
import generateJWT from '../utils/generateJWT';
export const addAdminService=async(info:IAdministrator)=>{
    const {username,password}=info;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin:IAdministrator=new Administrator({
        username,
      password:  hashedPassword
    });

    await newAdmin.save();

    const newToken = await generateJWT({
        username: newAdmin.username,
        id: newAdmin._id,
        role: 'ADMINISTRATOR',
      });
    
      newAdmin.token = newToken;
    
      return newAdmin;
}


///check if user name not taken by patient or pharamicist