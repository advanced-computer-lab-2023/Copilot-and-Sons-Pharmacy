import { Request, Response } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import { addToCartService } from '../services/cartServices/addtoCart.service'
import { SUCCESS } from '../utils/httpStatusText'
import { viewCartService } from '../services/cartServices/viewCart.service'
import { removeItemFromCartService } from '../services/cartServices/removeItemFromCart.service'
import { changeCartItemQuantityService } from '../services/cartServices/changeCartItemQuantity.service'
import { addPrescriptiontoCartService } from '../services/cartServices/addPrescriptiontoCartService'
import { ClearCartService } from '../services/cartServices/clearCart.servivce'

export const addToCart = asyncWrapper(async (req: Request, res: Response) => {
  const cart = await addToCartService(req.body, req.username)
  res.json({ success: SUCCESS, data: cart })
})

export const viewCart = asyncWrapper(async (req: Request, res: Response) => {
  const cartItems = await viewCartService(req.username)
  res.json({ success: SUCCESS, data: cartItems })
})

export const removeItemFromCart = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await removeItemFromCartService(
      req.query.medicineId,
      req.username
    )
    res.json({ success: SUCCESS, data: cart })
  }
)

export const ClearAllItemsFromCart = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await ClearCartService(req.username)
    res.json({ success: SUCCESS, data: cart })
  }
)

export const changeCartItemQuantity = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await changeCartItemQuantityService(req.body, req.username)
    res.json({ success: SUCCESS, data: cart })
  }
)

export const addPrescriptiontoCart = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await addPrescriptiontoCartService(
      req.body.prescriptionId,
      req.username
    )
    res.json({ success: SUCCESS, data: cart })
  }
)
