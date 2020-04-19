import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {CardElement,injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import './CheckoutForm.scss'

class SubscriptionForm extends React.Component {

    handleSubmit = async event => {
      event.preventDefault();
      console.log(this.props.user.email);
      console.log(this.props.elements.getElement('card'));
      const result = await this.props.stripe.createPaymentMethod({
        type: 'card',
        card: this.props.elements.getElement('card'),
        billing_details: {
          email: this.props.user.email
        }
      });
      if (result.error) {
        alert("error!");
      } else {
        fetch('http://127.0.0.1:5000/api/payment/subscribe', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.props.user.email,
            payment_method: result.paymentMethod.id
          }),
        }).then((result)=> {
          result.json().then((data)=>{
            console.log(data);
            if(data.error)
              alert("error!");
            if(data.message)
              this.props.setSuccess(true);
          })
        })
      }
    }
    render(){
      if(!this.props.user){
        alert("only users can view this page.");
        return(<>please log in</>);
      }
      if(this.props.success)
      return (
        <div className="success">
        <h2>Congratulations! now you are a premium member.</h2>
        <Link to="/">Home</Link>
      </div>
      )
      return (
        
        <div className="checkout-background">
          <div className="checkout-form">
            <form onSubmit={this.handleSubmit}>
              <label>
                Card details
                <CardElement class="thisiscardbro"/>
              </label>
              <button type="submit" className="order-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )
    }
  }
    
    export default injectStripe(SubscriptionForm)