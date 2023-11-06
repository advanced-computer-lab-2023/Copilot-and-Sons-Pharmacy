import { Request, Response } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import { addToCartService } from '../services/cartServices/addtoCart.service'
import { SUCCESS } from '../utils/httpStatusText'
import { viewCartService } from '../services/cartServices/viewCart.service'
import { removeItemFromCartService } from '../services/cartServices/removeItemFromCart.service'
import { changeCartItemQuantityService } from '../services/cartServices/changeCartItemQuantity.service'

export const addToCart = asyncWrapper(async (req: Request, res: Response) => {
  // const username = req.username;
  //////////////////////////////////////////////////////
  //rember to use authentiaction for now assume that will send in headers
  const authHeader = req.headers['authorization']

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    req.username = token
  }

  //////////////////////////////////////////////////////////////////
  const cart = await addToCartService(req.body, req.username)
  res.json({ success: SUCCESS, data: cart })
})

export const viewCart = asyncWrapper(async (req: Request, res: Response) => {
  // const username = req.username;
  //////////////////////////////////////////////////////
  //rember to use authentiaction for now assume that will send in headers
  const authHeader = req.headers['authorization']

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    req.username = token
  }

  //////////////////////////////////////////////////////////////////
  const cartItems = await viewCartService(req.username)
  res.json({ success: SUCCESS, data: cartItems })
})

export const removeItemFromCart = asyncWrapper(
  async (req: Request, res: Response) => {
    // const username = req.username;
    //////////////////////////////////////////////////////
    //rember to use authentiaction for now assume that will send in headers
    const authHeader = req.headers['authorization']

    if (authHeader) {
      const token = authHeader.split(' ')[1]
      req.username = token
    }

    //////////////////////////////////////////////////////////////////
    const cart = await removeItemFromCartService(
      req.body.medicineId,
      req.username
    )
    res.json({ success: SUCCESS, data: cart })
  }
)

export const changeCartItemQuantity = asyncWrapper(
  async (req: Request, res: Response) => {
    // const username = req.username;
    //////////////////////////////////////////////////////
    //rember to use authentiaction for now assume that will send in headers
    const authHeader = req.headers['authorization']

    if (authHeader) {
      const token = authHeader.split(' ')[1]
      req.username = token
    }

    //////////////////////////////////////////////////////////////////
    const cart = await changeCartItemQuantityService(req.body, req.username)
    res.json({ success: SUCCESS, data: cart })
  }
)
