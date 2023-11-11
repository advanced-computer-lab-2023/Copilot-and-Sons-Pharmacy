// import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import Button from '@mui/material/Button'
import { useState } from 'react'

const CheckoutForm = ({ handleSubmitCustom }: any) => {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (elements == null) {
      return
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()

    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message)

      return
    }

    handleSubmitCustom()
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/*<button type="submit" disabled={!stripe || !elements}>*/}
      {/*    Pay*/}
      {/*</button>*/}
      <Button
        variant="contained"
        type="submit"
        disabled={!stripe || !elements}
        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: 10 }}
      >
        Pay
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const options: any = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
}

const StripCheckout = ({ handleSubmitCustom }: any) => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm handleSubmitCustom={handleSubmitCustom} />
  </Elements>
)

export default StripCheckout
