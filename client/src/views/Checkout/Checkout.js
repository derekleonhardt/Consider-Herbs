import React, { useEffect } from 'react';
import StripeScriptLoader from 'react-stripe-script-loader'
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './../../components/CheckoutForm';

const Checkout = ({ selectedProduct, history }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <StripeScriptLoader
    uniqueId="pk_test_9xbqkUZGpn89mzhDuQaRxJAd002TLcQLbB"
    script="https://js.stripe.com/v3/"
    loader="Loading..."
  >
    <StripeProvider apiKey="pk_test_9xbqkUZGpn89mzhDuQaRxJAd002TLcQLbB">
      <Elements>
        <CheckoutForm selectedProduct={selectedProduct} history={history} />
      </Elements>
    </StripeProvider>
    </StripeScriptLoader>
  )
}

export default Checkout