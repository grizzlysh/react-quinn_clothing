import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51K7kyHF0fZwJ7rrgoJwCwFR4km5SxajDI2Bf5JvjUJ2NgM81ND9zZtKVOLNW1gKbepr4zluFO2lICaPKsdOuMHO100oEjw5km1'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');

        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful')
        }).catch(error => {
            console.log('Payment Error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Quinn Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;