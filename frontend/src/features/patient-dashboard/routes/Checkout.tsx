import React, { useState } from 'react';
import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!elements) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await fetch('/create-intent', {
            method: 'POST',
        });

        const { client_secret: clientSecret } = await res.json();

        const { error } = await stripe?.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'https://example.com/order/123/complete',
            },
        }) ?? {};

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error?.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
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
    );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options:StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with the appearance API.
    appearance: {
        /*...*/
    },
};

const Checkout: React.FC = () => (
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
    </Elements>
);

export default Checkout;
