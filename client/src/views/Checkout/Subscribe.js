import React, { useEffect, useState } from 'react';
import StripeScriptLoader from 'react-stripe-script-loader'
import { StripeProvider, Elements } from 'react-stripe-elements';
import SubscriptionForm from './../../components/SubscriptionForm';
import { useAuth0 } from "../../react-auth0-spa";

const Subscribe = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { isLoading, user, loginWithRedirect, logout} = useAuth0();
  const [success, setSuccess] = useState(false);
  return (
    <StripeScriptLoader
    uniqueId="pk_test_9xbqkUZGpn89mzhDuQaRxJAd002TLcQLbB"
    script="https://js.stripe.com/v3/"
    loader="Loading..."
  >
    <StripeProvider apiKey="pk_test_9xbqkUZGpn89mzhDuQaRxJAd002TLcQLbB">
      <Elements>
        <SubscriptionForm user={user} success={success} setSuccess={setSuccess} />
      </Elements>
    </StripeProvider>
    </StripeScriptLoader>
  )
}

export default Subscribe