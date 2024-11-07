import { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"

function Payment(props){
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
      console.log(publishableKey);
    });
  }, []);


    useEffect(() => {
      fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
      }).then(async (result) => {
        var { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      });
    }, []);
  return (
<>
<h1> React stripe element </h1>
</>
 )
 }

 export default Payment
