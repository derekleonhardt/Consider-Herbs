import React, { useEffect, useState } from 'react';
import StripeScriptLoader from 'react-stripe-script-loader'
import { StripeProvider, Elements } from 'react-stripe-elements';
import SubscriptionForm from './../../components/SubscriptionForm';
import { useAuth0 } from "../../react-auth0-spa";
import stripePublicKey from './../../config/stripeConfig';

const Subscribe = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [success, setSuccess] = useState(false);
  return (
    <StripeScriptLoader
    uniqueId={stripePublicKey}
    script="https://js.stripe.com/v3/"
    loader="Loading..."
  >
    <StripeProvider apiKey={stripePublicKey}>
      <Elements>
        <SubscriptionForm 
        user={props.user} 
        success={success} 
        setSuccess={setSuccess} 
        access = {props.access}
        config = {props.config}
        />
      </Elements>
    </StripeProvider>
    </StripeScriptLoader>
  )
}

export default Subscribe