import IMedicine from '@/types/medicine.type'
import { createContext, useState, ReactNode, useEffect } from 'react'

interface CartItem {
  medicine: IMedicine
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCartProvider: (item: CartItem) => void
  removeFromCartProvider: (productId: any) => void
  incrementQuantityProvider: (productId: any) => void
  decrementQuantityProvider: (productId: any) => void
  clearCartProvider: () => void
  updateQuantityProvider: (productId: any, quantity: number) => void
  totalPrice: number
  calculateTotalPrice: (cartData: any) => void
  cartOpen: boolean
  setCartOpen: (value: boolean) => void
  toggleCart: () => void
  totalWithoutDiscount: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    calculateTotalPrice(cart)
  }, [cart])

  const calculateTotalPrice = (cartData: any) => {
    let total = 0

    for (const item of cartData) {
      total += item.medicine.discountedPrice * item.quantity
    }

    setTotalPrice(total)
  }

  const calculateTotalPriceWithoutDiscount = (cartData: any) => {
    let total = 0

    for (const item of cartData) {
      total += item.medicine.price * item.quantity
    }

    setTotalWithoutDiscount(total)
  }

  const addToCartProvider = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.medicine._id === item.medicine._id
      )

      if (existingItem) {
        return prevCart.map((cartItem) => {
          if (cartItem.medicine._id === item.medicine._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          }

          return cartItem
        })
      } else {
        return [...prevCart, item]
      }
    })
  }

  const removeFromCartProvider = (productId: any) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.medicine._id !== productId)
    )
  }

  const clearCartProvider = () => {
    setCart([])
  }

  const incrementQuantityProvider = (productId: any) => {
    const updatedCart = cart.map((item: any) => {
      if (item.medicine._id === productId) {
        return { ...item, quantity: item.quantity + 1 }
      }

      return item
    })
    setCart(updatedCart)
  }

  const decrementQuantityProvider = (productId: any) => {
    const updatedCart = cart.map((item: any) => {
      if (item.medicine._id === productId) {
        return { ...item, quantity: item.quantity - 1 }
      }

      return item
    })
    setCart(updatedCart)
  }

  const updateQuantityProvider = (productId: any, newQuantity: number) => {
    const updatedCart = cart.map((item: any) => {
      if (item.medicine._id === productId) {
        return { ...item, quantity: newQuantity }
      }

      return item
    })
    setCart(updatedCart)
  }

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  useEffect(() => {
    calculateTotalPrice(cart)
    calculateTotalPriceWithoutDiscount(cart)
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        calculateTotalPrice,
        addToCartProvider,
        removeFromCartProvider,
        clearCartProvider,
        updateQuantityProvider,
        incrementQuantityProvider,
        decrementQuantityProvider,
        cartOpen,
        setCartOpen,
        toggleCart,
        totalWithoutDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
