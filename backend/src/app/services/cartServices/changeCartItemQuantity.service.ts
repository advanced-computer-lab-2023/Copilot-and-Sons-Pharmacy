import { CartModel } from "../../schemas/cart.model";
import Patient from "../../schemas/patient.schema";
import userModel from "../../schemas/user.model";
import AppError from "../../utils/appError";
import { FAIL } from "../../utils/httpStatusText";

export async function changeCartItemQuantityService(updateditem: any, username: any) {
    const patientUser = await userModel.findOne({ username });
    const user = await Patient.findOne({ user: patientUser?._id });
    
    if (!user) {
      // Handle the case where user is not found
      throw new AppError("User not found", 404, FAIL);
    }
  
    const cart = await CartModel.findOne({ _id: user.cart });
    const { quantity, medicineId } = updateditem;
  
    if (!cart) {
      // Handle the case where cart is not found
      throw new AppError("Cart not found", 404, FAIL);
    }
  
    const medicineIndex = cart.items.findIndex((item) => item.medicine == medicineId);
  
    if (medicineIndex === -1) {
      throw new AppError("No medicine with this id in the cart!", 404, FAIL);
    } else {
      // Ensure that cart.items and the item being updated are defined
      if (cart.items && cart.items[medicineIndex]) {
        cart.items[medicineIndex].quantity = quantity;
        await cart.save();
        return cart;
      } else {
        throw new AppError("Cart item or quantity is undefined", 500, FAIL);
      }
    }
  }
  