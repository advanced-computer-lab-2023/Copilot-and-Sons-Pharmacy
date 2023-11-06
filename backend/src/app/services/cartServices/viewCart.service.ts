import { CartModel } from "../../schemas/cart.model"
import Patient from "../../schemas/patient.schema"
import userModel from "../../schemas/user.model"

export async function viewCartService(username:any){
    let  patientUser = await userModel.findOne({  username })
    const patient=await Patient.findOne({user:patientUser?._id})
    // const cart = await CartModel.findOne({_id:user?.cart})
    const user = await patient?.populate({
        path: 'cart',
        populate: {
          path: 'items.medicine',
          model: 'Medicine', // Replace with the correct model name
        },
      });
      return user?.cart.items;
  

}