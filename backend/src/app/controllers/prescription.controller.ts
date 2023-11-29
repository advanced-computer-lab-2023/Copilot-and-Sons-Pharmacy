import axios from 'axios'
import asyncWrapper from '../middlewares/asyncWrapper'

export const prescriptionController = asyncWrapper(async (req) => {
  console.log('hi')
  axios
    .post('http://localhost:3000/prescriptions', req.body)
    .then((response) => {
      return response
    })
})
