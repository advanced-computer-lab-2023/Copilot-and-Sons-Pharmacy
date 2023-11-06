import express from 'express'
import {
  addToCart,
  changeCartItemQuantity,
  removeItemFromCart,
  viewCart,
} from '../controllers/cart.controller'
const router = express.Router()

router.route('/add').post(addToCart)
router.route('/view').get(viewCart)
router.route('/remove').delete(removeItemFromCart)
router.route('/change-quantity').put(changeCartItemQuantity)

export default router
