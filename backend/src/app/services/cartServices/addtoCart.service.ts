import { CartModel } from "../../schemas/cart.model";
import Medicine, { IMedicine } from "../../schemas/medicine.model";
import Patient from "../../schemas/patient.schema";
import userModel from "../../schemas/user.model";
import AppError from "../../utils/appError";
import { FAIL } from "../../utils/httpStatusText";

export async function addToCartService(item: any, username: any) {
  const { medicineId, quantity } = item;
  const medicine = await Medicine.findById(medicineId);

  if (!medicine) {
    throw new AppError("no Medicine with this name exists!", 404, FAIL);
  }
  let  patientUser = await userModel.findOne({  username })
  const user=await Patient.findOne({user:patientUser?._id})


  const cart = await CartModel.findOne({_id:user?.cart})



  const medicineIndex =
    cart?.items.findIndex((item) => item.medicine == medicineId) ;

  if (medicineIndex!=undefined&&medicineIndex > -1) {
    let medicineItem = cart?.items[medicineIndex];
    if (medicineItem !=undefined&& cart) {

      medicineItem.quantity = ~~quantity + ~~medicineItem.quantity;
      cart.items[medicineIndex] = medicineItem;
    }
  } else {
    cart?.items?.push({ medicine: medicineId, quantity });
  }
  await cart?.save();
  return cart;
}
