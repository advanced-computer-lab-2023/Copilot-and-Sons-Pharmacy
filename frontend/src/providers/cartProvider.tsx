import IMedicine from '@/types/medicine.type';
import  { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  medicine: IMedicine;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCartProvider: (item: CartItem) => void;
  removeFromCartProvider: (productId: any) => void;
  incrementQuantityProvider: (productId: any, quantity: number) => void;
  decrementQuantityProvider: (productId: any, quantity: number) => void;
  clearCartProvider:()=>void;
  updateQuantityProvider:(productId:any,quantity:number)=>void;
  totalPrice:number;
  calculateTotalPrice:(cartData: any)=>void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice(cart); 
  }, [cart]);

  const calculateTotalPrice = (cartData: any) => {
    let total = 0;
    for (const item of cartData) {
      total += item.medicine.price * item.quantity;
    }
    setTotalPrice(total);
  };

  const addToCartProvider = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.medicine._id  === item.medicine._id);
  
      if (existingItem) {
        return prevCart.map((cartItem) => {
          if (cartItem.medicine._id === item.medicine._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity
            };
          }
          return cartItem;
        });
      } else {
        return [...prevCart, item];
      }
    });
    calculateTotalPrice([...cart, item]);
  };

  const removeFromCartProvider = (productId: any) => {
    setCart((prevCart) => prevCart.filter((item) => item.medicine._id !== productId));
    calculateTotalPrice(cart.filter((item) => item.medicine._id !== productId));
  };

  const clearCartProvider = () => {
    setCart([]);
    calculateTotalPrice([]);

  };
  const incrementQuantityProvider = (productId: any, quantity: number) => {
    const updatedCart = cart.map((item: any) => {
        if (item.medicine._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
  };

  const decrementQuantityProvider = (productId: any, quantity: number) => {
    const updatedCart = cart.map((item: any) => {
        if (item.medicine._id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
  };

  const updateQuantityProvider=(productId :any, newQuantity:number)=>{
    const updatedCart = cart.map((item: any) => {
      if (item.medicine._id === productId) {
        return { ...item, quantity: newQuantity};
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  }

  return (
    <CartContext.Provider value={{ cart,totalPrice ,calculateTotalPrice,addToCartProvider, removeFromCartProvider,clearCartProvider,updateQuantityProvider, incrementQuantityProvider, decrementQuantityProvider }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
