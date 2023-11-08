import { api } from ".";

export async function addToCartApi(medicineId:any,quantity:number){
 return await api.post(`/cart/add`, { medicineId,quantity });
}
export async function fetchCartApi() {
      return  await api.get("http://localhost:3000/api/cart/view");
    }
  export const removeFromCartApi = async (productId: any) => {
    return  await api.delete(`/cart/remove`,{params: {"medicineId": productId}});
    
  };

 export const incrementQuantityApi = async (productId: any,quantity:number) => {

   return   await api.put(`/cart/change-quantity`,{
    "medicineId":productId,
    "quantity":quantity+1
});

  };

  export const decrementQuantityApi = async (productId: any,quantity:number) => {
   return await api.put(`/cart/change-quantity`,{
    "medicineId":productId,
    "quantity":quantity-1
});
  };
 export const updateQuantityApi= async (productId: any,newquantity:number) => {

  return   await api.put(`/cart/change-quantity`,{
   "medicineId":productId,
   "quantity":newquantity
});

 };